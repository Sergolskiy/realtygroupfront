import React from 'react'
import {Link} from "react-router-dom";
import {Stage_up} from "../elements/Stage_up";
import Select from "react-select";
import {ModalChat} from "../components/modal/ModalChat";
import {Cards_table_photo} from "./Cards_table_photo";
import {User_photo} from "../elements/User_photo";
import {Calendar_ShowTime} from "../elements/Calendar_ShowTime";
import {Cards_td_description_comment} from "./Cards_td_description_comment";

export class Card_suitable_tr extends React.PureComponent {

    state = {
        status: this.props.card_status_initial.status
    };

    trDoubleClick = e => {
        document.getElementById('card' + e.currentTarget.dataset.cardId).click()
    };

    changeStatus = el => {
        const {cardInfoInitial, cardInfo} = this.props;

        this.setState({status: el ? el.value : null});

        post_cards_request_status({
            [`card_${cardInfoInitial.sale_type}_id`]: cardInfoInitial.id,
            [`card_${cardInfo.sale_type}_id`]: cardInfo.id,
            status: el ? el.value : 'null'
        });

        post_cards_request_post({
            [`card_${cardInfoInitial.sale_type}_id`]: cardInfoInitial.id,
            [`card_${cardInfo.sale_type}_id`]: cardInfo.id,
            initial_card: cardInfoInitial.sale_type,
            post: el ? "Изменил статус на " + el.label : "Удалил статус"
        })
    };

    changeShowTime = e => {
        const {cardInfoInitial, cardInfo} = this.props;

        post_cards_request_status({
            [`card_${cardInfoInitial.sale_type}_id`]: cardInfoInitial.id,
            [`card_${cardInfo.sale_type}_id`]: cardInfo.id,
            show_time: Date.parse(e.date) || 'null'
        });

        post_cards_request_post({
            [`card_${cardInfoInitial.sale_type}_id`]: cardInfoInitial.id,
            [`card_${cardInfo.sale_type}_id`]: cardInfo.id,
            initial_card: cardInfoInitial.sale_type,
            post: e.date ? "Изменил время показа на " + moment(e.date).format('YYYY-MM-DD HH:mm') : "Удалил время показа"
        })
    };

    render() {
        console.log('render Card_suitable_tr');

        const {cardInfoInitial, cardInfo, card_status_initial, card_post_arr, selectStyleStatus, cities, office, users, user_profile, addShareCard, share_cards} = this.props;
        const {status} = this.state;
        const {trDoubleClick, changeStatus} = this;

        const all_categories = data.categories;
        const statuses_options = data.statuses || [];

        const dealTypeInitial = cardInfoInitial.type;
        const dealDirectionInitial = cardInfoInitial.sale_type;
        const categoryInitial = cardInfoInitial.category;

        const {city, area, street, landmark} = cardInfo;
        const cityValueArr = city ? city.split(',') : [];
        const cityValue = cityValueArr.includes(office.city) ? office.city : (cityValueArr.length === 1 ? city : '');
        const {areas, streets, landmarks} = cities[cityValue] || {};


        // Прописываем условия отображения
        const area_titles = !(dealTypeInitial === 'sale' && categoryInitial === 'apartments')
            && area && areas && area.split(',').map(item => areas[item]).join(', ');
        const street_titles = !(dealDirectionInitial === 'object' && dealTypeInitial === 'sale' && categoryInitial === 'apartments')
            && street && streets && street.split(',').map(item => streets[item]).join(', ');
        const landmark_titles = (dealDirectionInitial === 'request' && dealTypeInitial === 'sale' && categoryInitial === 'apartments') && landmark && landmarks && landmark.split(',').map(item => landmarks[item]).join(', ');

        // Фильтруем пустые значения, объединяем
        const location_titles = [area_titles, street_titles, landmark_titles].filter(item => item).join(', ');


        const {number_of_floors, number_of_floors_end, floors_house, floors_house_end} = cardInfo;
        const price = cardInfo.price;
        const dealType = cardInfo.type;
        const dealDirection = cardInfo.sale_type;

        const categories = all_categories[dealType] || [];
        const category = categories.find(item => item.value === cardInfo.category) || {};
        const subcategories = category.subcategories || [];
        const subcategory = subcategories
            .filter(item => (cardInfo.subcategory || '').split(',').includes(item.value))
            .map(item => item.title)
            .join(', ');

        const link = "/cards/" + cardInfo.id;


        const floor = dealDirection === "object" ? number_of_floors : fieldsInterval_new(number_of_floors, number_of_floors_end);
        const floors = dealDirection === "object" ? floors_house : fieldsInterval_new(floors_house, floors_house_end);


        const {card_files} = cardInfo;
        const filtered_card_files = card_files.filter(item => item.type === 'image/*');
        const url = filtered_card_files.length > 0 ?
            url_backend + '/public/uploads/files/' + filtered_card_files[0].file.hash : '';


        const user_profile_id = user_profile.id;

        const seeCardContact =
            user_profile_id === cardInfo.card_user.id || // Если юзер владелец карточки
            data.rights.seeCardContact[dealType].includes(user_profile_id); // Если юзер есть в списке разрешённых

        const cards_contacts_phones = undefsafe(cardInfo, 'card_contact.cards_contacts_phones') || [];
        const cards_contact_name = undefsafe(cardInfo, 'card_contact.name') || '';

        const presentationMode = stor.local.get('presentationMode');

        return (

            <tr data-card-id={cardInfo.id} onDoubleClick={trDoubleClick}>

                {
                    dealDirectionInitial === 'request' &&
                    <td>
                        <div>
                            <input type="checkbox" className="checkbox" id={"cb" + cardInfo.id} data-card-id={cardInfo.id} onChange={addShareCard} defaultChecked={share_cards.includes(cardInfo.id)}/>
                            <label htmlFor={"cb" + cardInfo.id}/>
                        </div>
                    </td>
                }

                {/*Подтип*/}
                <td>
                    <Link to={link} id={"card" + cardInfo.id}>
                        <div className="title-card">
                            <div>
                                {subcategory}
                                {cardInfo.commission && <i className="mdi mdi-percent color-darkgray fs20"/>}
                            </div>
                            <div>{location_titles}</div>
                            {/*<div>{transform_typedeal(dealType, cardInfo.sale_type)}</div>*/}
                        </div>
                    </Link>
                </td>

                {/*Этажность*/}
                {
                    !(dealDirectionInitial === 'object' && dealTypeInitial === 'sale' && categoryInitial === 'apartments') &&
                    <td>
                        {floor ? floor + ' / ' : ''}
                        {floors || ''}
                    </td>
                }

                {/*Общая площадь*/}
                {
                    dealDirectionInitial === 'request' && dealTypeInitial === 'sale' && categoryInitial === 'houses_cottages' &&
                    <td>
                        {cardInfo.total_area}
                    </td>
                }

                {/*Площадь участка*/}
                {
                    dealDirectionInitial === 'request' && dealTypeInitial === 'sale' && categoryInitial === 'houses_cottages' &&
                    <td>
                        {cardInfo.land_area}
                    </td>
                }


                {/*Цена*/}
                <td className="text-nowrap">
                    {moneyMask(price)}
                    {/*<i className="mdi mdi-trending-up color-red"/>*/}
                </td>


                {/*Фотографии*/}
                {
                    dealDirectionInitial === 'request' &&
                    <td>{url && <Cards_table_photo url={url}/>}</td>
                }

                {/*Описание и комментарий*/}
                <Cards_td_description_comment description={cardInfo.description}
                                              comment={cardInfo.comment}/>


                {/*Этап сделки*/}
                {
                    !presentationMode &&
                    <td>
                        <Stage_up cardInfo={cardInfo}/>
                    </td>
                }


                {/*Сходств*/}
                {/*<td>{cardInfo.percent}</td>*/}

                {/*Статус*/}
                {
                    !presentationMode &&
                    <td>

                        <div onDoubleClick={e => e.stopPropagation()}>
                            <div className="d-inline-block w220">
                                <Select
                                    styles={{
                                        ...selectStyleDefault,
                                        ...selectStyleStatus
                                    }}
                                    isClearable={true}
                                    isSearchable={false}
                                    placeholder=""
                                    options={statuses_options}
                                    defaultValue={statuses_options.find(item => item.value === card_status_initial.status) || null}
                                    onChange={changeStatus}
                                />
                            </div>

                            <div className="d-inline-block ml-2">
                                <ModalChat
                                    cardInfoInitial={cardInfoInitial}
                                    cardInfo={cardInfo}
                                    card_post_arr={card_post_arr}
                                    users={users}
                                />
                            </div>

                            {
                                status === 'show' &&
                                <div className="inputGroup w210">
                                    <Calendar_ShowTime
                                        defaultValue={card_status_initial.show_time}
                                        onChange={this.changeShowTime}
                                    />
                                    <span/>
                                </div>
                            }

                        </div>

                    </td>

                }


                {/*Информация*/}
                {
                    !(dealTypeInitial === 'sale' && categoryInitial === 'apartments') &&
                    <td>
                        <i className="mdi mdi-information-outline fs22" title={cardInfo.description} data-toggle="tooltip"/>
                    </td>
                }

                {/*Риэлтор*/}
                <td><User_photo user={cardInfo.card_user}/></td>

                {/*Номер телефона покупателя*/}
                {
                    !(dealDirectionInitial === 'request' && dealTypeInitial === 'sale' && categoryInitial === 'apartments') &&
                    <>
                        <td>
                            {
                                seeCardContact ? cards_contacts_phones.map(item =>
                                    <div key={item.id}>
                                        <a title="Viber" href={window.device.desktop() ?
                                            `viber://chat?number=${item.phone}` :
                                            `viber://add?number=${item.phone.replace('+', '')}`}
                                           className="align-middle">
                                            <i className="fab fa-viber fs20 mr-1"/>
                                        </a>
                                        {item.phone}
                                    </div>
                                ) : 'Нет прав'
                            }
                        </td>
                        <td>
                            {cards_contact_name}
                        </td>
                    </>
                }



                {/*В работе*/}
                {/*<td>{moment.utc(cardInfo.created_at, "YYYY-MM-DD HH:mm:ss").fromNow(true)}</td>*/}

            </tr>
        )
    }
}