import React from 'react'
import Select from "react-select";
import {MenuList} from "../elements/MenuList";
import {toast} from "react-toastify";
import {withRouter} from "react-router";
import {InputInteger} from "../elements/InputInteger";
import {InputMoney} from "../elements/InputMoney";
import {InputFloat} from "../elements/InputFloat";

class External_sources_add extends React.PureComponent {

    constructor(props) {
        super(props);
        const {cities, object_to_add, user_profile} = this.props;

        const cityArr = cities['1']; // Кривой Рог

        const streets = cityArr.streets || {};
        const foundStreetValue = typeof object_to_add.street === 'string' && object_to_add.street.length > 0 ?
            Object.keys(streets).find(street_value => streets[street_value].includes(object_to_add.street.split(' ')[0]))
            : null;


        const areas = cityArr.areas || {};
        const foundAreaValue = Object.keys(areas).find(area_value =>
            areas[area_value].includes(object_to_add.area)
        );

        const {agency_id, id, office_id} = user_profile;

        const cardInfo = {
            // Данные из парсера
            street: foundStreetValue || null,
            area: foundAreaValue || null,
            number_of_floors: (object_to_add.number_of_floors || '').replace(/\D/g, '') || null,
            floors_house: (object_to_add.floors_house || '').replace(/\D/g, '') || null,
            // number_rooms: object_to_add.number_rooms.replace(/\D/g, '') || null,
            price: (object_to_add.price || '').replace(/\D/g, '') || null,
            total_area: toFloat(object_to_add.total_area) || null,
            description: object_to_add.description || null,
            "card_contact[name]": undefsafe(object_to_add, 'parser_cards_phones.0.contact_phone.contact.name') || null,

            // Данные можно выбрать
            type: 'sale', // sale rent
            category: 'apartments',
            subcategory: '',

            // Данные не подлежат выбору
            agency_id,
            user_id: id,
            office_id,
            city: '1',
            sale_type: 'object', // object request
            currency: 'usd',
            "stage_transaction": "1",
            "is_archived": "0",
            "card_contact[is_married]": "0",
            "card_contact[is_client]": "1",
            "card_contact[is_partner]": "0",
            "card_contact[is_realtor]": "0",
            "card_contact[years]": "25",
            "card_contact[is_black_list]": "0"
        };

        object_to_add.parser_cards_phones.forEach((phone, i) =>
            Object.assign(cardInfo, {['card_contact[cards_contacts_phones]['+ i +'][phone]']: phone.phone})
        );

        this.state = {
            cardInfo,
            isBlockButton: false
        }
    }

    componentDidMount() {
        document.getElementById('root').scrollTo(0, 0)
    }

    addDeal = () => {
        const {cardInfo, isBlockButton} = this.state;
        const {object_to_add} = this.props;
        const {changeState} = this;

        // Блокируем кнопки через состояние
        if (isBlockButton) return;
        changeState({isBlockButton: true});

        if (!cardInfo.area || !cardInfo.category || !cardInfo.subcategory || !cardInfo.price ||
            !cardInfo['card_contact[cards_contacts_phones][0][phone]'] ||
            !cardInfo['card_contact[name]']

        )
        {
            toast.warn(' ☝ Все поля обязательны для заполнения');
            changeState({isBlockButton: false});
            return false
        }

        // Удалить второй телефон, если он был введен, затем стерт
        if ('card_contact[cards_contacts_phones][1][phone]' in cardInfo && !cardInfo['card_contact[cards_contacts_phones][1][phone]']) {
            delete cardInfo['card_contact[cards_contacts_phones][1][phone]']
        }

        const {history} = this.props;
        return post_cards(cardInfo).done(function (cardInfo) {
            del_parser_cards(object_to_add.id); // Удаление карточки парсера
            toast.success(' ✔ Сделка успешно добавлена');
            history.push('/cards/' + cardInfo.id, true) // передаем значение в this.props.location.state
        }).fail(function () {
            toast.error(' ✖ Ошибка при добавлении сделки');
            changeState({isBlockButton: false})
        })

    };

    changeState = state => {
        this.setState(state)
    };

    changeCardInfo = (obj, forceUpdate) => {
        const cardInfo = forceUpdate ?
            Object.assign({}, this.state.cardInfo, obj) :
            Object.assign(this.state.cardInfo, obj);
        this.setState({cardInfo})
    };
    
    render() {
        console.log('render External_sources_add');

        const {object_to_add, cities} = this.props;
        const {cardInfo} = this.state;
        const {changeCardInfo} = this;

        const cityArr = cities['1']; // Кривой Рог

        const streets = cityArr.streets || {};
        const areas = cityArr.areas || {};
        const optionsStreets = Object.keys(streets).map(key => ({value: key, label: streets[key]}));
        const optionsAreas = Object.keys(areas).map(key => ({value: key, label: areas[key]}));
        const defaultValueStreets = cardInfo.street ? {value: cardInfo.street, label: streets[cardInfo.street]} : null;
        const defaultValueAreas = cardInfo.area ? {value: cardInfo.area, label: areas[cardInfo.area]} : null;

        const optionsType = [{value: 'sale', label: 'Продажа'}, {value: 'rent', label: 'Аренда'}];
        const defaultValueType = optionsType.find(item => item.value === cardInfo.type);

        const dealType = cardInfo.type;
        const all_categories = data.categories;
        const categories = all_categories[dealType] || [];
        const category = categories.find(item => item.value === cardInfo.category) || {};

        const {subcategories = []} = category;
        const subcategory = subcategories.find(item => item.value === cardInfo.subcategory) || null;

        const customer_name = undefsafe(object_to_add, 'parser_cards_phones.0.contact_phone.contact.name');

        const phone0 = cardInfo['card_contact[cards_contacts_phones][0][phone]'];
        const phone1 = cardInfo['card_contact[cards_contacts_phones][1][phone]'];

        return <div className="External_sources_add">
            <table className="table">
                <thead>
                <tr>
                    <th>Поле</th>
                    <th>В парсере</th>
                    <th>В БД</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Тип *</td>
                    <td/>
                    <td className={cardInfo.type ? "" : "_empty"}>
                        <Select
                            styles={{
                                ...selectStyleDefault
                            }}
                            placeholder="Тип"
                            isClearable={false}
                            options={optionsType}
                            defaultValue={defaultValueType}
                            onChange={el => changeCardInfo({type: el && el.value, currency: el.value === 'sale' ? 'usd' : 'uah'})}
                        />
                    </td>
                </tr>

                <tr>
                    <td>Категория *</td>
                    <td/>
                    <td className={cardInfo.category ? "" : "_empty"}>
                        <Select
                            styles={{
                                ...selectStyleDefault
                            }}
                            isSearchable={false}
                            className="w-100"
                            placeholder="Категория"
                            options={categories}
                            defaultValue={category}
                            getOptionLabel={option => option.title}
                            onChange={el => changeCardInfo({category: el && el.value, subcategory: ''}, true)}
                        />
                    </td>
                </tr>

                <tr>
                    <td>Подкатегория *</td>
                    <td>{object_to_add.number_rooms}</td>
                    <td className={cardInfo.subcategory ? "" : "_empty"}>
                        <Select
                            styles={{
                                ...selectStyleDefault
                            }}
                            isSearchable={false}
                            className="w-100"
                            placeholder="Выбрать"
                            options={subcategories}
                            value={subcategory}
                            getOptionLabel={option => option.title}
                            onChange={el => changeCardInfo({subcategory: el && el.value}, true)}
                        />
                    </td>
                </tr>


                <tr>
                    <td>Район *</td>
                    <td>{object_to_add.area}</td>
                    <td className={cardInfo.area ? "" : "_empty"}>
                        {
                            optionsAreas.length > 0 &&
                            <Select
                                styles={{
                                    ...selectStyleDefault
                                }}
                                placeholder="Район"
                                isClearable={true}
                                options={optionsAreas}
                                defaultValue={defaultValueAreas}
                                onChange={el => changeCardInfo({area: el && el.value})}
                            />
                        }
                    </td>
                </tr>
                <tr>
                    <td>Этаж</td>
                    <td>{object_to_add.number_of_floors}</td>
                    <td className={cardInfo.number_of_floors ? "" : "_empty"}>
                        <InputInteger
                            className="p-1 border rounded"
                            defaultValue={cardInfo.number_of_floors}
                            onblur={value => changeCardInfo({number_of_floors: value})}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Этажность</td>
                    <td>{object_to_add.floors_house}</td>
                    <td className={cardInfo.floors_house ? "" : "_empty"}>
                        <InputInteger
                            className="p-1 border rounded"
                            defaultValue={cardInfo.floors_house}
                            onblur={value => changeCardInfo({floors_house: value})}
                        />
                    </td>
                </tr>
                {/*<tr>*/}
                {/*    <td>Комнат</td>*/}
                {/*    <td>{object_to_add.number_rooms}</td>*/}
                {/*    <td><input type="tel" defaultValue={cardInfo.number_rooms} onChange={e => changeCardInfo({number_rooms: e.target.value})}/></td>*/}
                {/*</tr>*/}
                <tr>
                    <td>Цена *</td>
                    <td>{object_to_add.price}</td>
                    <td className={cardInfo.price ? "" : "_empty"}>
                        <InputMoney
                            className="p-1 border rounded"
                            defaultValue={cardInfo.price}
                            onblur={value => changeCardInfo({price: value})}
                        />
                        <span> USD</span>
                    </td>
                </tr>
                <tr>
                    <td>Общая площадь</td>
                    <td>{object_to_add.total_area}</td>
                    <td className={cardInfo.total_area ? "" : "_empty"}>
                        <InputFloat
                            className="p-1 border rounded"
                            defaultValue={cardInfo.total_area}
                            onblur={value => changeCardInfo({total_area: value})}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Описание</td>
                    <td className="w-50">{object_to_add.description}</td>
                    <td className={cardInfo.description ? "" : "_empty"}>
                        <textarea defaultValue={cardInfo.description} onChange={e => changeCardInfo({description: e.target.value})}/>
                    </td>
                </tr>
                <tr>
                    <td>Улица</td>
                    <td>{object_to_add.street}</td>
                    <td className={cardInfo.street ? "" : "_empty"}>
                        {
                            optionsStreets.length > 0 &&
                            <Select
                                styles={{
                                    ...selectStyleDefault
                                }}
                                placeholder="Улица"
                                isClearable={true}
                                components={{MenuList}}
                                options={optionsStreets}
                                defaultValue={defaultValueStreets}
                                onChange={el => changeCardInfo({street: el && el.value})}
                            />
                        }
                    </td>
                </tr>
                <tr>
                    <td>Имя клиента *</td>
                    <td>{customer_name}</td>
                    <td className={cardInfo["card_contact[name]"] ? "" : "_empty"}>
                        <input type="text" className="p-1 border rounded" defaultValue={cardInfo["card_contact[name]"]}
                               onChange={e => changeCardInfo({"card_contact[name]": e.target.value})}/>
                    </td>
                </tr>


                <tr>
                    <td>Телефон *</td>
                    <td>{object_to_add.parser_cards_phones.map((phone, i) => <div key={i}>{phone.phone}</div>)}</td>
                    <td className={phone0 ? "" : "_empty"}>
                        <div>
                            <input type="text"
                                   className="p-1 border rounded"
                                   defaultValue={phone0}
                                   onChange={e => changeCardInfo({'card_contact[cards_contacts_phones][0][phone]': e.target.value})}
                            />
                        </div>
                        <div>
                            <input type="text"
                                   className="p-1 border rounded"
                                   defaultValue={phone1}
                                   onChange={e => changeCardInfo({'card_contact[cards_contacts_phones][1][phone]': e.target.value})}
                            />
                        </div>

                    </td>
                </tr>

                </tbody>
            </table>
            <div className="_btn_add">
                <button className="btn btn-danger btn-lg" onClick={this.addDeal}>Добавить объект</button>
            </div>
        </div>
    }
}

export default withRouter(External_sources_add)