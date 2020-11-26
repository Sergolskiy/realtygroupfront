import React from 'react'
import {Back, Title} from "../elements/Elements";
import External_sources_add from "./External_sources_add";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Select from "react-select";

export class External_sources extends React.PureComponent {

    state = {
        //json: '', // Все распарсенные объекты в формате JSON (тип arr)
        parser_cards_query: {}, // Ответ от сервера по методу parser_cards_filtered
        parser_cards: null, // Массив объектов, который прилетает из бэкенда, []
        object_to_add: null, // Выбранный объект для добавления в основную БД, {}
        cities: {},
        loading: true,
        // filter_area: null // Фильтр по району
    };

    scrollTop;

    changeState = state => {
        this.setState(state)
    };

    force_update = () => {
        this.forceUpdate()
    };

    loadData = () => {
        const {changeState} = this;
        const newState = {};

        $.when(
            get_cities().done(cities => newState.cities = cities),
            get_parser_cards({page: 1, size: 9999}).done(function (parser_cards_query) {
                newState.parser_cards_query = parser_cards_query;
                newState.parser_cards = parser_cards_query.data || []
            })
        ).done(function () {
            Object.assign(newState, {loading: false});
            changeState(newState)
        })

    };

    load_cards = area => {
        const {changeState} = this;
        changeState({loading: true});

        get_parser_cards({page: 1, size: 9999, area}).done(function (parser_cards_query) {
            changeState({
                parser_cards_query,
                parser_cards: parser_cards_query.data || [],
                loading: false
            })
        })
    };

    componentDidMount() {
        this.loadData()
    }


    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Запоминаем скролл
        if (this.state.object_to_add && !prevState.object_to_add) {
            this.scrollTop = document.getElementById('root').scrollTop;
        }
        return null
    }

    componentDidUpdate(prevProps, prevState) {
        // Пролистываем страницу до предыдущего места
        if (!this.state.object_to_add && prevState.object_to_add) {
            document.getElementById('root').scrollTop = this.scrollTop
        }
    }

    csv_to_json = csv => {
        const json = csv.split('\n').filter((item, i) => i >= 3 && item).map(function (item) {
            const object = item.split(';');
            return {
                street: object[0],
                area: object[1],
                number_of_floors: object[2],
                floors_house: object[3],
                number_rooms: object[4],
                price: object[5],
                total_area: object[6],
                description: object[7],
                phones: (object[12] || '').split(', ').filter(item => item).map(item => '+38' + item)
            }
        });
        post_parser_cards(json).done(function () {
            toast.success(' ✔ Файл успешно загружен. Обновите страницу');
        }).fail(function () {
            toast.error(' ✖ Ошибка при загрузке файла');
        })
    };

    handleFileSelect = evt => {

        const {csv_to_json} = this;

        const file = evt.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.readAsText(file, 'windows-1251');

        reader.onload = () => csv_to_json(reader.result)

    };

    modeAddOn = object => {
        this.setState({object_to_add: object})
    };

    modeAddOff = () => {
        this.setState({object_to_add: null})
    };

    delCard = e => {
        const {parser_cards} = this.state;
        const {force_update} = this;


        const id = e.currentTarget.dataset.id;
        const i = +e.currentTarget.dataset.i;
        if (confirm('Удалить карточку?')) {
            del_parser_cards(id)
                .done(function() {
                    // const new_parser_cards = parser_cards.concat();
                    // new_parser_cards.splice(i, 1);
                    // changeState({parser_cards: new_parser_cards}); // Удаляем объект из отображаемой таблицы
                    parser_cards.splice(i, 1); // Удаляем объект из отображаемой таблицы
                    force_update();
                    toast.success(' ✔ Объект удалён');
                })
                .fail(() => toast.error(' ✖ Ошибка удаления'))
        }
    };

    render() {
        console.log('render External_sources');

        const {handleFileSelect, modeAddOn, modeAddOff, delCard, load_cards} = this;
        const {object_to_add, cities, parser_cards_query, parser_cards, loading} = this.state;
        const {user_profile} = this.props;

        const arrAreas = ['Жовтневый', 'Ингулецкий', 'Долгинцевский', 'Терновской', 'Дзержинский', 'Центрально-Городской', 'Саксаганский'];
        const optionsAreas = arrAreas.map(item => ({value: item, label: item}));

        let permissions = JSON.parse(window.localStorage.getItem('access')).permissions;

        return (
            <>
                <div className="head navbar flex-nowrap justify-content-start" id="head">
                    <Back/>
                    <Title data="Внешние источники"/>
                </div>

                <div className="content">

                    {loading && <div className="google-loader"><span/><span/><span/><span/></div>}

                    <div className="d-flex flex-between">
                        {
                            object_to_add ?
                                <button onClick={modeAddOff}>Вернуться к списку</button> :
                                // data.rights.addFromExternalSources.includes(user_profile.id) && <input type="file" accept="text/csv" onChange={handleFileSelect}/>
                                permissions.hasOwnProperty('addFromExternalSources') && permissions.addFromExternalSources.hasOwnProperty('add') && <input type="file" accept="text/csv" onChange={handleFileSelect}/>
                        }
                        <div>Кол-во карточек: {parser_cards_query.total}, дата загрузки: {undefsafe(parser_cards, '0.created_at')}</div>
                    </div>


                    <div /*className="overflow-auto"*/>
                        {
                            !object_to_add && parser_cards &&
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>
                                        <div className="w180">
                                            <Select
                                                styles={{
                                                    ...selectStyleDefault,
                                                    // ...selectStyleMenuList
                                                }}
                                                // closeMenuOnSelect={false}
                                                isSearchable={false}
                                                isClearable={true}
                                                placeholder="Район"
                                                options={optionsAreas}
                                                onChange={el => load_cards(el ? el.value : '')}
                                            />
                                        </div>
                                    </th>
                                    <th>Комнат</th>
                                    <th>Этажность</th>
                                    <th>Цена</th>
                                    <th>м<sup>2</sup></th>
                                    <th>Описание</th>
                                    <th>Телефоны</th>
                                    <th><i className="mdi mdi-account-arrow-right fs28"/></th>
                                    <th><i className="mdi mdi-plus fs28"/></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    parser_cards.map(function (item, i) {
                                        return (
                                            <tr key={i}>
                                                <td className="text-nowrap">
                                                    <i className="mdi mdi-close fs20 color-gray cursor-pointer"
                                                       data-id={item.id} data-i={i} onClick={delCard}/>
                                                       {item.id}
                                                </td>
                                                <td>{item.area}</td>
                                                <td>{item.number_rooms}</td>
                                                <td>{item.number_of_floors} / {item.floors_house}</td>
                                                <td>{item.price}</td>
                                                <td>{item.total_area}</td>
                                                <td>
                                                    <div className="break-word">
                                                        {item.description} <span className="color-gray">{item.street}</span>
                                                    </div>
                                                </td>
                                                <td>{item.parser_cards_phones.map((phone, i) =>
                                                    <div key={i} className="text-nowrap">
                                                        <a href={"tel:" + phone.phone}>{phone.phone}</a>
                                                        <a href={"https://ua.m2bomber.com/phone/" + phone.phone.replace('+38', '')}
                                                           target="_blank" className="ml-2">
                                                            <i className="mdi mdi-alpha-b-circle-outline fs28"/>
                                                        </a>
                                                    </div>
                                                )}</td>
                                                <td>{item.parser_cards_phones.map(function (phone, i) {
                                                    const {contact_phone} = phone;
                                                    if (contact_phone) {
                                                        const contactId = contact_phone.contact.id;
                                                        const contactName = contact_phone.contact.name;
                                                        const is_realtor = contact_phone.contact.is_realtor;
                                                        return (
                                                            <div key={i}>
                                                                <Link to={"/contacts/" + contactId + "#contact-deals"} target="_blank" rel="noreferrer noopener">
                                                                    <i className={`mdi ${is_realtor ? 'mdi-parking' : 'mdi-account-arrow-right'} cursor-pointer color-green fs28 mr-1 ml-1`} title={contactName}/>
                                                                </Link>
                                                            </div>
                                                        )
                                                    }
                                                })}</td>
                                                <td><i className="mdi mdi-plus fs28 color-gray cursor-pointer" onClick={() => modeAddOn(item)}/></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        }
                        {
                            object_to_add &&
                            <External_sources_add
                                modeAddOff={modeAddOff}
                                object_to_add={object_to_add}
                                cities={cities}
                                user_profile={user_profile}
                            />
                        }
                    </div>
                </div>
            </>
        )
    }
}
