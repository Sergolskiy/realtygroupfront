import React from 'react'
import shallowCompare from 'react-addons-shallow-compare';
import {Card_main} from "./Card_main";
import {NavTabs} from "../elements/NavTabs";
import {Card_tasks} from "./Card_tasks";
import {Card_activity} from "./Card_activity";
import {Card_main_edit_mode} from "./Card_main_edit_mode";
import {toast} from "react-toastify";
import {ButtonEdit} from "../elements/ButtonEdit";
import {ButtonSave} from "../elements/ButtonSave";
import {ButtonCancel} from "../elements/ButtonCancel";
import {ButtonDel} from "../elements/ButtonDel";
import {Card_main_request} from "./Card_main_request";
import {Card_main_request_edit_mode} from "./Card_main_request_edit_mode";
import {Card_suitable} from "./Card_suitable";
import {ModalBootstrap} from "../elements/ModalBootstrap";
import {Back} from "../elements/Elements";

export class Card extends React.Component {
    state = {
        cardInfo: {},
        cardInfoInitial: {},
        displayCardInfoInitial: {},
        cities: {},
        cityArr: {},
        office: {},
        users: [],
        // user_profile: {},
        nbu_quotes: [],
        //isTabMainShow: !location.hash.split('-')[1], // открыта ли главная вкладка
        showTab: location.hash.split('-')[1] || 'main', // активная вкладка
        loading: true,
        error: false,
        isEdit: this.props.location.state || false, // берем из ModalAddDeal или External_sources_add
        // presentationMode: stor.local.get('presentationMode')
        access: true,
    };

    loadData = () => {
        const {changeStateCard} = this;
        const cardId = this.props.match.params.id;
        const {user_profile} = this.props;
        const newState = {};

        $.when(
            get_users({page: 1, size: 99999}).done(users => Object.assign(newState, {users: users.data})),
            get_cities().done(cities => Object.assign(newState, {cities})),

            get_office(user_profile.office_id).done(function (office) {
                Object.assign(newState, {office});
            }),

            get_card(cardId).done(function (cardInfo) {
                Object.assign(newState, {
                    cardInfo,
                    cardInfoInitial: Object.assign({}, cardInfo)
                })
            }).fail((err) => {
                console.log(err);
                // access
            })

        ).done(function () {
            Object.assign(newState, {loading: false});
            changeStateCard(newState)
        }).fail(function (err) {
            let access = true;
            if(err.status === 403){
                access = false;
            }
            changeStateCard({error: true, loading: false, access: access})
        });

        get_nbu_quotes_only().done(nbu_quotes => changeStateCard({nbu_quotes}));

    };

    loadCard = cardId => {
        const {changeStateCard} = this;

        changeStateCard({loading: true});
        get_card(cardId).done(function (cardInfo) {

            changeStateCard({
                cardInfo,
                cardInfoInitial: Object.assign({}, cardInfo),
                loading: false
            })

        })
    };

    componentDidMount() {
        legitRipple();
        this.loadData();
        window.Card = this;
    }

    ifChangeCity = (cardCity, officeCity, prevCity) => { // Если базовый город присутствует в выборе, то отображаем его районы
        const {cities, cityArr} = this.state;
        const {changeStateCard} = this;
        const emptyObj = prevCity ? {area: null, street: null, building: null, apartment: null, landmark: null} : {};
        const cardInfo = Object.assign({}, this.state.cardInfo, emptyObj);
        const cardCityArr = cardCity ? cardCity.split(',') : [];
        const prevCityArr = prevCity ? prevCity.split(',') : [];


        // let city_value;
        //
        // // Ранее не было офисного города, а потом появился
        // if (!prevCityArr.includes(officeCity) && cardCityArr.includes(officeCity)) {
        //     city_value = officeCity
        // }
        // // Выбран один город и он не является офисным городом
        // else if (cardCityArr.length === 1 && cardCity !== officeCity) {
        //     city_value = cardCity
        // }
        // // Выбрано несколько городов, среди которых нет офисного
        // else if (cardCityArr.length > 1 && !cardCityArr.includes(officeCity)) {
        //     city_value = false
        // }


        const city_value = cardCityArr.length === 1 ?
            cardCityArr[0] :
            cardCityArr.includes(officeCity) ?
                officeCity :
                false;


        const newCity = cities[city_value] || ($.isEmptyObject(cityArr) ? cityArr : {});

        changeStateCard({cityArr: newCity, cardInfo});

/*
        // Ранее не было офисного города, а потом появился
        if (!prevCityArr.includes(officeCity) && cardCityArr.includes(officeCity)) {
            get_city(officeCity).done(function (cityArr) {
                changeStateCard({cityArr, cardInfo})
            }).fail(function () {
                changeStateCard({cityArr: {}, cardInfo})
            });

            return
        }

        // Выбран один город и он не является офисным городом
        if (cardCityArr.length === 1 && cardCity !== officeCity) {

            get_city(cardCity).done(function (cityArr) {
                changeStateCard({cityArr, cardInfo})
            }).fail(function () {
                changeStateCard({cityArr: {}, cardInfo})
            });

            return
        }

        // Выбрано несколько городов, среди которых нет офисного
        if (cardCityArr.length > 1 && !cardCityArr.includes(officeCity)) {
            changeStateCard({cityArr: {}, cardInfo})
        }
*/
    };

    componentDidUpdate(prevProps, prevState) {
        const {cardInfo} = this.state;

        const cardCity = cardInfo.city;
        const prevCity = prevState.cardInfo.city;

        const category = cardInfo.category;
        const prevCategory = prevState.cardInfo.category;

        const {changeStateCard} = this;

        // console.log('Сравниваем предыдущий и текущий города', prevCity, cardCity);
        // Затираем улицу, ориентир, дом, квартиру при смене города
        if (prevCity !== cardCity) {
            this.ifChangeCity(cardCity, this.state.office.city, prevCity)
        }

        // Затираем подкатегорию при смене категории
        if (prevCategory && prevCategory !== category) {
            changeStateCard({cardInfo: Object.assign({}, this.state.cardInfo, {subcategory: null})})
        }

        // В режиме редактирования при переключении с главной вкладки показываем модальное окно
        const {isEdit, showTab} = this.state;
        // Сейчас: режим редактирования, не главная вкладка. Перед этим: была открыта главная вкладка
        if (isEdit && showTab !== 'main' && prevState.showTab === 'main') {
            $('#modalSaveCard').modal('show')
        }

        // Что-то связанное с логированием
        const {cardInfoInitial, displayCardInfoInitial, cities, users} = this.state;
        if (!$.isEmptyObject(cities)) { // Если города прогрузились
            if ($.isEmptyObject(displayCardInfoInitial) || cardInfoInitial !== prevState.cardInfoInitial) {
                changeStateCard({
                    displayCardInfoInitial: Object.assign(displayCardInfoInitial, getDisplayCardInfo(cardInfoInitial, cities, users))
                })
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {loadCard} = this;
        const cardId = this.props.match.params.id;
        const nextCardId = nextProps.match.params.id;
        if (cardId !== nextCardId) { // Если изменилась карточка
            loadCard(nextCardId);
            return false
        }

        return shallowCompare(this, nextProps, nextState)
    }

    changeCardInfo = (obj, forceUpdate) => {
        const cardInfo = forceUpdate ?
            Object.assign({}, this.state.cardInfo, obj) :
            Object.assign(this.state.cardInfo, obj);
        this.setState({cardInfo})
    };

    changeStateCard = state => {
        this.setState(state)
    };

    edit = () => {
        this.setState({isEdit: true})
    };

    save = () => {
        const cardId = this.props.match.params.id;
        const {cardInfo} = this.state;

        if (!cardInfo.subcategory) {
            return toast.warn(' ☝ Укажите подтип недвижимости')
        }

        // Высчитываем поле floor_location
        const dealDirection = cardInfo.sale_type;
        if (dealDirection === 'object') {
            const {number_of_floors, floors_house} = cardInfo;
            cardInfo.floor_location = floor_location(number_of_floors, floors_house)
        }


        // Считаем процент заполненности
        if (cardInfo.type === 'sale' && cardInfo.sale_type === 'object') {

            const dealType = cardInfo.type;
            const categories = data.categories[dealType] || [];
            const category = categories.find(item => item.value === cardInfo.category) || {};
            const addFieldsArr = category.fields || [];
            const commonFieldsArr = ['city', 'area', 'street', 'landmark', 'building', 'apartment', 'price', 'stage_transaction', 'commission', 'description', 'reason_for_sale', 'site_url', 'category', 'subcategory'];

            const hasPhoto = (cardInfo.card_files || []).some(file => file.type === "image/*");

            const fieldsArr = [...addFieldsArr, ...commonFieldsArr];

            const countFields = fieldsArr.length + 1; // Прибавляем поле photo

            let n = 0;

            fieldsArr.forEach(function (item) {
                if (cardInfo[item]) n++; else console.log('Не заполнено поле ', item)
            });

            if (hasPhoto) n++;

            cardInfo.complete_percent = math.round(n / countFields * 100, 1);
        }


        // Логирование
        const {displayCardInfoInitial, cities, users} = this.state;
        const displayCardInfo = getDisplayCardInfo(cardInfo, cities, users);
        const data_change_logs = compareObj(displayCardInfoInitial, displayCardInfo);

        // const data_change_logs = compareObj(cardInfoInitial, cardInfo);
        // console.log('Изменения', data_change_logs);


        // Исключаем лишнее сохранение карточки, если ничего не поменяли. Выключаем, так как сравниваем не все поля
        // if (data_change_logs.length === 0) {
        //     this.setState({
        //         isEdit: false
        //     });
        //     return toast.success(' ✔ Карточка успешна сохранена.');
        // }


        put_card(cardId, Object.assign(cardInfo, {data_change_logs})).done(function (newCardInfo) {
            toast.success(' ✔ Карточка успешна сохранена');
            this.setState({
                isEdit: false,
                cardInfo: newCardInfo,
                cardInfoInitial: Object.assign({}, newCardInfo)
            })
        }.bind(this)).fail(function () {
            toast.error(' ✖ Ошибка при сохранении карточки')
        })
    };

    del = () => {
        const cardId = this.props.match.params.id;
        const {history} = this.props;

        del_card(cardId).done(function () {
            toast.success(' ✔ Карточка удалена');
            history.push('/cards')
        }).fail(function () {
            toast.error(' ✖ Ошибка удаления карточки')
        })
    };

    cancel = () => {
        const {cardInfoInitial} = this.state;
        this.setState({
            cardInfo: Object.assign({}, cardInfoInitial),
            isEdit: false
        })
    };

    copyUrl = e => {
        toClipboardByButton(e.currentTarget, window.location.href)
    };

    render() {
        console.log('render Card');

        const {user_profile} = this.props;
        const {cardInfo, cities, cityArr, office, users, loading, error, access, isEdit, nbu_quotes, /*isTabMainShow,*/ showTab} = this.state;
        const {edit, save, del, cancel, changeStateCard, copyUrl} = this;
        const cardId = this.props.match.params.id;
        const all_categories = data.categories;

        if (loading) return <div className="google-loader"><span/><span/><span/><span/></div>;
        if(error && !access) return <div>Такой страницы нет</div>;
        if (error) return <div>Ошибка. Обновите страницу</div>;
        if ($.isEmptyObject(cardInfo)) return <div>Такой страницы нет</div>;


        const dealtype = cardInfo.type;
        const dealdirection = cardInfo.sale_type;

        const categories = all_categories[dealtype] || [];
        const category = categories.find(item => item.value === cardInfo.category) || {};

        const subcategories = category.subcategories || [];
        // const subcategory = subcategories.find(item => item.value === cardInfo.subcategory) || {};
        const subcategory = subcategories
            .filter(item => (cardInfo.subcategory || '').split(',').includes(item.value))
            .map(item => item.title)
            .join(', ');


        const deal_title = transform_typedeal(dealtype, dealdirection);
        document.title = ''; // По-другому не работает
        document.title = deal_title + ' - ' + subcategory;

        const rightEdit =
            !data.rights.banEditDelCards.includes(user_profile.id) && // Нет запрета на редактирование
            (
                user_profile.id === cardInfo.card_user.id || // Если юзер владелец карточки
                (data.rights.editCards[dealtype] || []).includes(user_profile.id) // Если юзер есть в списке разрешённых
            );

        const rightDel =
            !data.rights.banEditDelCards.includes(user_profile.id) && // Нет запрета на редактирование
            (
                // user_profile.id === cardInfo.card_user.id || // Если юзер владелец карточки
                (data.rights.delCards[dealtype] || []).includes(user_profile.id) // Если юзер есть в списке разрешённых
            );

        let permissions = JSON.parse(window.localStorage.getItem('access')).permissions;

        return (
            <>
                <div className="head navbar flex-nowrap" id="head">

                    <Back isEdit={isEdit} onclick={() => $('#modalSaveCard').modal('show')}/>

                    <div className="title-card" onClick={copyUrl}>
                        <div>
                            {dealdirection === 'object' && <i className="mdi mdi-home-city-outline color-blue mr-1"/>}
                            {dealdirection === 'request' && <i className="mdi mdi-account-box-outline color-red mr-1"/>}
                            {subcategory}
                        </div>
                        <div>{deal_title} №{cardId}</div>
                    </div>


                    {
                        showTab === "main" && (
                            isEdit ?
                                <div className="d-flex">
                                    <ButtonSave handler={save}/>
                                    <ButtonCancel handler={cancel}/>
                                </div>
                                :
                                <div className="d-flex">
                                    { permissions.hasOwnProperty('cards') && permissions.cards.hasOwnProperty('edit') && <ButtonEdit handler={edit}/>}
                                    { permissions.hasOwnProperty('cards') && permissions.cards.hasOwnProperty('delete') && <ButtonDel modalId="modalDelCard"/>}
                                    {/*{rightEdit && <ButtonEdit handler={edit}/>}*/}
                                    {/*{rightDel && <ButtonDel modalId="modalDelCard"/>}*/}
                                </div>
                        )
                    }

                    {
                        showTab === 'suitable' &&
                        <i className="mdi mdi-refresh fs24 cursor-pointer"
                           title="Обновить подходящие"
                           data-toggle="tooltip"
                           onClick={() => window.Card_suitable.loadData()}
                        />
                    }
                </div>


                <div className="content h-100 overflow-hidden">

                    <NavTabs
                        className="tabs _level-1 h-100"
                        urlTabs={true}
                        tabsName="card"
                        defaultActiveKey="main"
                        onChange={(e, value) => changeStateCard({/*isTabMainShow: value === 'main',*/ showTab: value})}
                        options={[
                        {
                            value: 'main',
                            title: <>
                                <i className="mdi mdi-clipboard-text-outline fs22 d-inline d-md-none"/> {/*Моб*/}

                                <i className="mdi mdi-clipboard-text-outline fs18 d-none d-md-inline"/> {/*ПК*/}
                                <span className="d-none d-md-inline">Основное</span>
                            </>,
                            content: <>
                                {
                                    !isEdit && dealdirection === 'object' &&
                                    <Card_main
                                        cardInfo={cardInfo}
                                        nbu_quotes={nbu_quotes}
                                        cities={cities}
                                        cityArr={cityArr}
                                        categories={categories}
                                        cardId={cardId}
                                        user_profile_id={user_profile.id}
                                        users={users}
                                        changeStateCard={changeStateCard}
                                        changeCardInfo={this.changeCardInfo}
                                        // presentationMode={this.state.presentationMode}
                                    />
                                }
                                {
                                    !isEdit && dealdirection === 'request' &&
                                    <Card_main_request
                                        cardInfo={cardInfo}
                                        nbu_quotes={nbu_quotes}
                                        cities={cities}
                                        cityArr={cityArr}
                                        categories={categories}
                                        cardId={cardId}
                                        user_profile_id={user_profile.id}
                                        users={users}
                                        changeStateCard={changeStateCard}
                                        changeCardInfo={this.changeCardInfo}
                                        // presentationMode={this.state.presentationMode}
                                    />
                                }
                                {
                                    isEdit && dealdirection === 'object' &&
                                    <Card_main_edit_mode
                                        cardInfo={cardInfo}
                                        cities={cities}
                                        cityArr={cityArr}
                                        office={office}
                                        users={users}
                                        categories={categories}
                                        cardId={cardId}
                                        changeCardInfo={this.changeCardInfo}
                                        user_profile={user_profile}
                                    />
                                }
                                {
                                    isEdit && dealdirection === 'request' &&
                                    <Card_main_request_edit_mode
                                        cardInfo={cardInfo}
                                        cities={cities}
                                        cityArr={cityArr}
                                        office={office}
                                        users={users}
                                        categories={categories}
                                        cardId={cardId}
                                        changeCardInfo={this.changeCardInfo}
                                        user_profile={user_profile}
                                    />
                                }
                            </>
                        },
                        !cardInfo.is_archived && {
                            value: 'suitable',
                            title: <>
                                {
                                    dealdirection === 'object' &&
                                    <>
                                        <i className="mdi mdi-swap-horizontal-bold fs22 d-inline d-md-none"/> {/*Моб*/}
                                        <i className="mdi mdi-swap-horizontal-bold fs18 d-none d-md-inline"/> {/*ПК*/}
                                        <span className="d-none d-md-inline">Подходящие заявки</span>
                                        <sup id="count_suitable" className="count_sup"/>
                                    </>
                                }
                                {
                                    dealdirection === 'request' &&
                                    <>
                                        <i className="mdi mdi-swap-horizontal-bold fs22 d-inline d-md-none"/> {/*Моб*/}
                                        <i className="mdi mdi-swap-horizontal-bold fs18 d-none d-md-inline"/> {/*ПК*/}
                                        <span className="d-none d-md-inline">Подходящие объекты</span>
                                        <sup id="count_suitable" className="count_sup"/>
                                    </>
                                }
                            </>,
                            content: <Card_suitable
                                cardInfo={cardInfo}
                                all_categories={all_categories}
                                office={office}
                                cities={cities}
                                users={users}
                                user_profile={user_profile}
                            />
                        },
                        //     !cardInfo.is_archived && dealdirection === 'object' && {
                        //     value: 'similar',
                        //     title: <>
                        //         <i className="mdi mdi-map-marker-distance fs22 d-inline d-md-none"/> {/*Моб*/}
                        //
                        //         <i className="mdi mdi-map-marker-distance fs18 d-none d-md-inline"/> {/*ПК*/}
                        //         <span className="d-none d-md-inline">Похожие объекты</span>
                        //     </>,
                        //     content: <Card_suitable_or_similar
                        //         cardInfo={cardInfo}
                        //         all_categories={all_categories}
                        //         suitable_or_similar={1}
                        //         office={office}
                        //         cities={cities}
                        //         users={users}
                        //     />
                        // },
                        {
                            value: 'tasks',
                            title: <>
                                <i className="mdi mdi-calendar-clock fs22 d-inline d-md-none"/> {/*Моб*/}

                                <i className="mdi mdi-calendar-clock fs18 d-none d-md-inline"/> {/*ПК*/}
                                <span className="d-none d-md-inline">Задачи</span>
                            </>,
                            content: <Card_tasks/>
                        },
                        {
                            value: 'activity',
                            title: <>
                                <i className="mdi mdi-information-outline fs22 d-inline d-md-none"/> {/*Моб*/}

                                <i className="mdi mdi-information-outline fs18 d-none d-md-inline"/> {/*ПК*/}
                                <span className="d-none d-md-inline">Активность</span>
                            </>,
                            content: <Card_activity
                                cardInfo={cardInfo}
                                users={users}
                            />
                        }
                    ]}/>
                </div>


                <ModalBootstrap
                    id="modalDelCard"
                    title="Удаление карточки"
                    body="Вы уверены, что хотите удалить эту карточку?"
                    btns={[
                        {
                            label: "Удалить",
                            className: "btn btn-primary",
                            handler: del
                        },
                        {
                            label: "Отмена",
                            className: "btn btn-secondary"
                        }
                    ]}
                />


                <ModalBootstrap
                    id="modalSaveCard"
                    title="Сохранить изменения"
                    body="Вы не сохранили изменения, сохранить сейчас?"
                    btns={[
                        {
                            label: "Сохранить",
                            className: "btn btn-primary",
                            handler: save
                        },
                        {
                            label: "Отменить",
                            className: "btn btn-secondary",
                            handler: cancel
                        }
                    ]}
                />

            </>
        )
    }
}
