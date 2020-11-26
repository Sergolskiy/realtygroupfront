import React from 'react'
import {NavTabs} from "../elements/NavTabs";
import {Card_main_documents} from "./Card_main_documents";
import {Card_main_description} from "./Card_main_description";
import {Card_main_realtor} from "./Card_main_realtor";
import {Card_main_field} from "./Card_main_field";
import {Card_main_audio} from "./Card_main_audio";
import {Link} from "react-router-dom"
import {Stage_up} from "../elements/Stage_up";
import {Card_main_price} from "./Card_main_price";
import {Card_main_comments} from "./Card_main_comments";

export class Card_main_request extends React.PureComponent {


    render() {
        console.log('render Card_main_request');

        const {cardInfo, cityArr, cities, categories, nbu_quotes, cardId, changeCardInfo, user_profile_id, users, changeStateCard} = this.props;
        const {contract_expiration_date, number_contract, card_files = [], commission} = cardInfo;
        const {city, area, landmark, street, building} = cardInfo;
        const {areas, landmarks, streets} = cityArr;
        const typedeal = cardInfo.type;
        const dealDirection = cardInfo.sale_type;


        const {fields} = data;
        const city_titles = city && city.split(',').map(item => undefsafe(cities, item + '.title')).join(', ');
        const area_titles = area && areas && area.split(',').map(item => areas[item]).join(', ');
        const landmark_titles = landmark && landmarks && landmark.split(',').map(item => landmarks[item]).join(', ');
        const street_titles = street && streets && street.split(',').map(item => streets[item]).join(', ');


        // const currency_option = currencies.find(item => item.value === cardInfo.currency) || {};
        // const currency_value = currency_option.value || '';
        // const currency_title = currency_option.title || '';
        // const otherCurrencies = ['usd', 'eur', 'uah', 'rub'].filter(item => item !== currency_value);
        // const otherPrices = currencies_converter(nbu_quotes, price, currency_value, otherCurrencies);


        const category = categories.find(item => item.value === cardInfo.category) || {};
        const {subcategories = []} = category;
        const subcategory = subcategories
            .filter(item => (cardInfo.subcategory || '').split(',').indexOf(item.value) >= 0)
            .map(item => item.title)
            .join(', ');

        const categoryFields = category.fields || [];







        let classContract, contract_ymd;
        if (contract_expiration_date) {
            classContract = contract_expiration_date + 86400000 > Date.now() ? 'text-warning' : 'text-danger';
            contract_ymd = dateMsToFormat(contract_expiration_date, "YYYY-MM-DD", currentZone());
        }


        const cards_contacts_id = undefsafe(cardInfo, 'card_contact.id');
        const cards_contacts_name = undefsafe(cardInfo, 'card_contact.name');
        const cards_contacts_phones = undefsafe(cardInfo, 'card_contact.cards_contacts_phones') || [];

        const seeCardContact =
            user_profile_id === cardInfo.card_user.id || // Если юзер владелец карточки
            data.rights.seeCardContact[typedeal].includes(user_profile_id); // Если юзер есть в списке разрешённых

        return (
            <div className="Card_main">


                <div className="_block1">

                    <table className="table table-borderless table-middle">
                        <tbody>


                        {
                            (city_titles || area_titles) &&
                            <tr>
                                <td>
                                    <i className="mdi mdi-map-marker color-darkgray fs22"
                                       title="Локация" data-toggle="tooltip"/>
                                </td>
                                <td>
                                    {city_titles && <div>{city_titles}</div>}
                                    {area_titles && <div>{area_titles}</div>}
                                    {street_titles && <div>{street_titles}</div>}
                                    {building && <div>{building} дом</div>}
                                </td>
                            </tr>
                        }


                        {
                            !!landmark_titles &&
                            <tr>
                                <td>
                                    <i className="mdi mdi-routes color-darkgray fs22"
                                       title="Ориентир" data-toggle="tooltip"/>
                                </td>
                                <td>
                                    <div className="color-gray fs14">
                                        {landmark_titles}
                                    </div>
                                </td>
                            </tr>
                        }

                        <Card_main_price cardInfo={cardInfo} nbu_quotes={nbu_quotes} users={users}/>

                        <tr>
                            <td>
                                <i className="mdi mdi-format-list-numbered color-darkgray fs24"
                                   title="Этап сделки" data-toggle="tooltip"/>
                            </td>
                            <td>
                                <Stage_up cardInfo={cardInfo}/>
                            </td>
                        </tr>



                        {
                            !!contract_expiration_date &&
                            <tr>
                                <td>
                                    <span className={classContract}>
                                        <i className="mdi mdi-key fs20" title="Дата истечения договора" data-toggle="tooltip"/>
                                    </span>
                                </td>
                                <td>
                                    <div className="flex-left">
                                        <span>
                                            {contract_ymd}
                                        </span>
                                        {
                                            number_contract &&
                                            <span className="ml-2" title="Номер договора" data-toggle="tooltip">
                                                № {number_contract}
                                            </span>
                                        }
                                    </div>
                                </td>
                            </tr>
                        }


                        {
                            commission &&
                            <tr>
                                <td>
                                    <i className="mdi mdi-percent color-darkgray fs22"
                                       title="Комиссия" data-toggle="tooltip"/>
                                </td>
                                <td>
                                    {commission}
                                </td>
                            </tr>
                        }


                        {
                            seeCardContact &&
                            <tr>
                                <td>
                                    <i className="mdi mdi-account-outline color-darkgray fs22"
                                       title="Клиент" data-toggle="tooltip"/>
                                </td>
                                <td>
                                    <Link to={"/contacts/" + cards_contacts_id} className="btn btn-outline-primary btn-sm">{cards_contacts_name}</Link>
                                    <div className="ml-2 fs18 hover-rounded" data-toggle="collapse"
                                         data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                        <i className="mdi mdi-chevron-down"/>
                                    </div>
                                    <div className="collapse" id="collapseExample">
                                        <div className="card-body">
                                            {cards_contacts_phones.map((item, i) =>
                                                <div key={i}>
                                                    <a title="Viber" href={"viber://chat?number=" + item.phone}
                                                       className="align-middle">
                                                        <i className="fab fa-viber fs20 mr-1"/>
                                                    </a>
                                                    <a href={"tel:" + item.phone}>{item.phone}</a>
                                                    <a href={"https://ua.m2bomber.com/phone/" + item.phone.replace('+38', '')}
                                                       target="_blank" className="ml-2">
                                                        <i className="mdi mdi-alpha-b-circle-outline fs20 color-gray"/>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        }

                        <tr>
                            <td>
                                <i className="mdi mdi-account-tie color-darkgray fs24"
                                   title="Риэлтор" data-toggle="tooltip"/>
                            </td>
                            <td>
                                <Card_main_realtor user={cardInfo.card_user}/>
                            </td>
                        </tr>


                        </tbody>
                    </table>

                </div>


                <div className="_block2">

                    {/*
                    <div className="d-flex">
                        <div className="flex-left p-1 w-50 color-gray">Площадь</div>
                        <div className="flex-left p-1 w-50">
                            <span title="Общая" data-toggle="tooltip">{cardInfo.total_area || '--'}</span>
                            <span>/</span>
                            <span title="Жилая" data-toggle="tooltip">{cardInfo.living_area || '--'}</span>
                            <span>/</span>
                            <span title="Кухня" data-toggle="tooltip">{cardInfo.kitchen_area || '--'}</span>
                        </div>
                    </div>
                   */}


                    <Card_main_field title="Тип" value={category.title} show_in_one_line={true}/>
                    <Card_main_field title="Подтип" value={subcategory} show_in_one_line={true}/>

                    {
                        categoryFields.map(function (categoryField, i) {

                            const field = fields[categoryField] || {};

                            const value = get_field_title(cardInfo, categoryField);

                            // Скрываем поле, если его значение не найдено, не указано, или поле имеет статус hide: true, и не равно нулю
                            if (!value && value !== 0) return null;

                            return <Card_main_field key={i} title={field.label} value={value} show_in_one_line={true}/>
                        })
                    }

                </div>


                <div className="_block3">

                    <NavTabs className="tabs _level-2" tabsName="addition" defaultActiveKey="description" options={[
                        {
                            value: 'description',
                            title: <>
                                <span className="d-none d-md-inline">Описание</span>
                                <i className="mdi mdi-format-align-left d-inline d-md-none fs20"/>
                            </>,
                            content: <Card_main_description description={cardInfo.description}/>
                        },
                        {
                            value: 'documents',
                            title: <>
                                <span className="d-none d-md-inline">Документы</span>
                                <i className="mdi mdi-file-document d-inline d-md-none fs20"/>
                            </>,
                            content: <Card_main_documents
                                card_files={card_files}
                                cardId={cardId}
                                changeCardInfo={changeCardInfo}
                            />
                        },
                        {
                            value: 'audio',
                            title: <>
                                <span className="d-none d-md-inline">Аудио</span>
                                <i className="mdi mdi-headphones d-inline d-md-none fs20"/>
                            </>,
                            content: <Card_main_audio
                                cardId={cardId}
                                changeCardInfo={changeCardInfo}
                                card_files={card_files}
                            />
                        }
                    ]}/>

                    <div className="_comment">
                        <Card_main_comments
                            user_profile_id={user_profile_id}
                            card_id={cardInfo.id}
                            comment={cardInfo.comment}
                            users={users}
                            changeStateCard={changeStateCard}
                        />
                    </div>

                    {/*<div className="_btns mt-2">*/}
                        {/*<i className="mdi mdi-share-variant" title="Поделиться" data-toggle="tooltip"/>*/}
                        {/*<i className="mdi mdi-alarm-plus" title="Добавить задачу" data-toggle="tooltip"/>*/}
                        {/*<i className="mdi mdi-printer" title="Распечатать" data-toggle="tooltip"/>*/}
                        {/*<i className="mdi mdi-rocket" title="Авто отправка на сайты объявлений" data-toggle="tooltip"/>*/}
                        {/*<i className="mdi mdi-share" title="Создание внешней ссылки" data-toggle="tooltip"/>*/}
                    {/*</div>*/}

                </div>


            </div>
        )
    }

}