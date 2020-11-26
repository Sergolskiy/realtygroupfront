import React from 'react'
import {PriceSlider} from "../elements/PriceSlider";
import {Card_suitable_tbody} from "./Card_suitable_tbody";
import {toast} from "react-toastify";
import {Th_stage} from "../elements/Th_stage";

export class Card_suitable extends React.PureComponent {

    defaultStage = this.props.cardInfo.sale_type === 'request' ? '2,3' : ''; // Какой этап отображать изначально

    state = {
        cards: [],
        card_statuses: [],
        card_posts: [],
        price: '20', // Отклонение цены, %
        loading: true,
        share_cards: [], // Массив id расшареных карточек. 0 нужен, чтобы отправлять пустые карточки

        // Значения фильтров
        s_stage: this.defaultStage,

        // Непосредственная фильтрация
        f_stage: this.defaultStage
    };

    changeState = obj => {
        this.setState(obj)
    };

    changePrice = price => {
        this.setState({price})
    };

    // e - событие на input
    addShareCard = e => {
        console.log('Меняем значение галочки в состоянии');
        const cardId = +e.currentTarget.dataset.cardId;
        const {share_cards} = this.state;
        const i = share_cards.indexOf(cardId); // Положение найденого элемента в массиве
        if (i < 0) { // Добавляем номер карточки в массив
            share_cards.push(cardId)
        } else { // Удаляем номер карточки из массива
            share_cards.splice(i, 1)
        }
        this.setState({share_cards})
    };

    selectAll = e => {
        const {cards, share_cards} = this.state;
        share_cards.length = 0; // Обнуляем массив
        Object.assign(share_cards, cards.map(item => item.id));
        $("input:checkbox:not(:checked)").prop("checked", true);
        this.setState({share_cards});

        short_tooltip(e.currentTarget, 'Все объекты отмечены')
    };

    takeOffAll = e => {
        const {share_cards} = this.state;
        share_cards.length = 0; // Обнуляем массив
        $("input:checkbox:checked").prop("checked", false);
        this.setState({share_cards});

        short_tooltip(e.currentTarget, 'Все отметки сняты')
    };

    shareCards = e => {
        // Блокируем кнопку
        const element = e.currentTarget;
        element.classList.add('disabled');

        const {share_cards} = this.state;
        const {cardInfo, user_profile} = this.props;

        post_share_cards({card_id: cardInfo.id, user_id: cardInfo.user_id, cards: share_cards}).done(function () {
            toast.success(' ✔ Объекты успешно прикреплены')
        }).fail(function (answer) {
            toast.error(' ✖ Ошибка' + answer)
        }).always(function () {
            setTimeout(function () {
                element.classList.remove('disabled')
            }, 1000)
        })

    };

    loadData = () => {
        const {cardInfo} = this.props;
        const {price, f_stage} = this.state;
        const {changeState} = this;

        this.setState({loading: true});

        const dealDirection = cardInfo.sale_type;

        const filter_options = suitable_cards(cardInfo, price, f_stage);

        const newState = {};

        $.when(
            get_cards_filtered(filter_options).done(function (data) {
                newState.cards = data.data;
                document.getElementById("count_suitable").innerText = data.total;
            }),
            get_cards_request_status({
                [`card_${dealDirection}_id`]: cardInfo.id,
                size: 9999
            }).done(function (data) {
                newState.card_statuses = data.data
            }),
            get_cards_request_posts({
                [`card_${dealDirection}_id`]: cardInfo.id,
                size: 9999
            }).done(function (data) {
                newState.card_posts = data.data
            })
        ).done(function () {
            newState.loading = false;
            changeState(newState)
        });

        // Возможность генерировать ссылку только для заявок
        if (dealDirection === 'request') {
            get_share_cards_id(md5(cardInfo.user_id + '_' + cardInfo.id)).done(function (share_cards) {
                if (Array.isArray(share_cards) && share_cards.length > 0) {
                    changeState({share_cards})
                }
            })
        }

    };

    copyUrl = e => {
        const {cardInfo} = this.props;
        toClipboardByButton(e.currentTarget, window.location.origin + '/share_cards/' + md5(cardInfo.user_id + '_' + cardInfo.id))
    };




    componentDidMount() {
        window.Card_suitable = this;
        this.loadData();

        $(document).on("click.bs.dropdown.data-api", ".noclose", function (e) {
            if (!$(e.target).hasClass("hide-dropdown")) { // Закрыть меню при нажатии на кнопку с class="hide-dropdown"
                e.stopPropagation()
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.price !== this.state.price || prevState.f_stage !== this.state.f_stage) {
            this.loadData()
        }
    }

    componentWillUnmount() {
        delete window.Card_suitable
    }


    render() {
        console.log('render Card_suitable');

        const {cardInfo, office, cities, users, user_profile} = this.props;
        const {cards, card_statuses, card_posts, price, loading, share_cards, s_stage, f_stage} = this.state;
        const {changePrice, addShareCard, shareCards, copyUrl, selectAll, takeOffAll, changeState} = this;

        const dealType = cardInfo.type;
        const dealDirection = cardInfo.sale_type;
        const category = cardInfo.category;


        const dealStagesSR = data.dealStages[dealType] || [];

        const presentationMode = stor.local.get('presentationMode');

        return <>
            {loading && <div className="google-loader"><span/><span/><span/><span/></div>}

            <div className="table-cards">
                <table className="table">
                    <thead>
                    <tr>
                        {
                            dealDirection === 'request' &&
                            <th scope="col">

                                <div className="_th">

                                    <div className="dropdown noclose">

                                        <div className="dropdown_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical fs20"/>
                                        </div>

                                        <div className="dropdown-menu">

                                            <div onClick={shareCards} className="cursor-pointer hover-bg-lightgray p-1">
                                                <i className="mdi mdi-link-variant-plus fs20 mr-1" title="Прикрепить выбранные объекты к ссылке, для показа их клиенту" data-toggle="tooltip"/>
                                                Прикрепить объекты
                                            </div>

                                            <div onClick={copyUrl} className="cursor-pointer hover-bg-lightgray p-1">
                                                <i className="mdi mdi-content-copy fs20 mr-1" title="Скопировать ссылку в буфер обмена" data-toggle="tooltip"/>
                                                Скопировать ссылку
                                            </div>

                                            <div onClick={selectAll} className="cursor-pointer hover-bg-lightgray p-1">
                                                <i className="mdi mdi-checkbox-multiple-marked-outline fs20 mr-1" title="Отметить все объекты" data-toggle="tooltip"/>
                                                Отметить всё
                                            </div>

                                            <div onClick={takeOffAll} className="cursor-pointer hover-bg-lightgray p-1">
                                                <i className="mdi mdi-checkbox-multiple-blank-outline fs20 mr-1" title="Снять выбор со всех объектов" data-toggle="tooltip"/>
                                                Снять всё
                                            </div>


                                        </div>
                                    </div>

                                </div>

                            </th>
                        }


                        <th scope="col" className="_nodropdown">Подтип</th>

                        {
                            !(dealDirection === 'object' && dealType === 'sale' && category === 'apartments') &&
                            <th scope="col" className="_nodropdown">Этажность</th>
                        }

                        {
                            dealDirection === 'request' && dealType === 'sale' && category === 'houses_cottages' &&
                            <th scope="col" className="_nodropdown">Площадь</th>
                        }

                        {
                            dealDirection === 'request' && dealType === 'sale' && category === 'houses_cottages' &&
                            <th scope="col" className="_nodropdown">Участок, м²</th>
                        }

                        <th scope="col">
                            <div className="dropdown noclose">
                                <div className="dropdown_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Цена
                                </div>
                                <div className="dropdown-menu">
                                    <PriceSlider defaultValue={price} min={0} max={100} step={5} handler={changePrice}/>
                                </div>
                            </div>
                        </th>

                        {
                            dealDirection === 'request' &&
                            <th scope="col" className="_nodropdown">
                                <i className="mdi mdi-image-area fs22" title="Наличие фотографий" data-toggle="tooltip"/>
                            </th>
                        }

                        {/*Описание и комментарий*/}
                        <th scope="col" className="_nodropdown">
                            <i className="mdi mdi-information-variant fs22" title="Описание, комментарий" data-toggle="tooltip"/>
                        </th>


                        {/*Этап сделки*/}
                        {/*<th scope="col" className="_nodropdown">Этап сделки</th>*/}
                        {
                            !presentationMode &&
                            <Th_stage
                                f_stage={f_stage}
                                s_stage={s_stage}
                                dealStagesSR={dealStagesSR}
                                defaultStages={this.defaultStage}
                                changeState={changeState}
                            />
                        }



                        {/*<th scope="col" className="_nodropdown">Сходств</th>*/}

                        {
                            !presentationMode &&
                            <th scope="col" className="_nodropdown">Статус</th>
                        }


                        {
                            !(dealType === 'sale' && category === 'apartments') &&
                            <th scope="col" className="_nodropdown">
                                <i className="mdi mdi-dots-vertical fs22" title="Информация" data-toggle="tooltip"/>
                            </th>
                        }


                        <th scope="col" className="_nodropdown">
                            <i className="mdi mdi-account-outline fs22" title="Сотрудник" data-toggle="tooltip"/>
                        </th>

                        {
                            !(dealDirection === 'request' && dealType === 'sale' && category === 'apartments') &&
                            <>
                                <th scope="col" className="_nodropdown">Телефон клиента</th>
                                <th scope="col" className="_nodropdown">Имя клиента</th>
                            </>
                        }

                        {/*<th scope="col" className="_nodropdown">В работе</th>*/}

                    </tr>
                    </thead>
                    <tbody>
                        <Card_suitable_tbody
                            cardInfoInitial={cardInfo}
                            cards={cards}
                            card_statuses={card_statuses}
                            card_posts={card_posts}
                            office={office}
                            cities={cities}
                            users={users}
                            user_profile={user_profile}
                            addShareCard={addShareCard}
                            share_cards={share_cards}
                        />
                    </tbody>
                </table>
                {
                    cards.length === 0 && !loading ?
                        <div className="text-center">
                            <img src="/images/empty_content.png" alt="Нет данных для отображения" className="wmax-100"/>
                        </div>
                        : null
                }
            </div>
        </>
    }
}