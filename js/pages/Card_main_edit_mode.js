import React from 'react';
import {NavTabs} from "../elements/NavTabs";
import {Card_main_documents_edit_mode} from "./Card_main_documents_edit_mode";
import {Card_main_photo_edit_mode} from "./Card_main_photo_edit_mode";
import Select from 'react-select';
import {Card_main_field} from "./Card_main_field";
import {Calendar} from "../elements/Calendar";
import {InputMoney} from "../elements/InputMoney";
import {MenuList} from "../elements/MenuList";
import {Card_main_field_edit_mode} from "./Card_main_field_edit_mode";
import {InputText} from "../elements/InputText";
import {Card_main_links_edit_mode} from "./Card_main_links_edit_mode";
import {Card_main_change_contact} from "./Card_main_change_contact";


export class Card_main_edit_mode extends React.Component {

    change_price = value => this.props.changeCardInfo({price: value});

    render() {
        console.log('render Card_main_edit_mode');

        const {cardInfo, cityArr, office, cities, changeCardInfo, categories, users, cardId, user_profile} = this.props;
        const {contract_expiration_date, card_files = []} = cardInfo;

        const {currencies, fields, dealStages} = data;

        const dealDirection = cardInfo.sale_type; // object request


        // Города
        const cityValue = cardInfo.city || '';
        const officeCity = cities[office.city] || {};
        const suburbs = [office.city].concat(officeCity.suburb || []);
        const optionsCities = suburbs.map(key => ({value: key, label: cities[key].title}));
        const defaultValueCities = cityValue ? {value: cityValue, label: cities[cityValue].title} : null;

        // Районы
        const areaValue = cardInfo.area || '';
        const areas = cityArr.areas || {};
        const optionsAreas = Object.keys(areas).map(key => ({value: key, label: areas[key]}));
        const defaultValueAreas = areaValue ? {value: areaValue, label: areas[areaValue]} : null;

        // Ориентиры
        const landmarkValue = cardInfo.landmark || '';
        const landmarks = cityArr.landmarks || {};
        const optionsLandmarks = Object.keys(landmarks).map(key => ({value: key, label: landmarks[key]}));
        const defaultValueLandmarks = landmarkValue ? {value: landmarkValue, label: landmarks[landmarkValue]} : null;

        // Улицы
        const streetValue = cardInfo.street || '';
        const streets = cityArr.streets || {};
        const optionsStreets = Object.keys(streets).map(key => ({value: key, label: streets[key]}));
        const defaultValueStreets = streetValue ? {value: streetValue, label: streets[streetValue]} : null;



        const category = categories.find(item => item.value === cardInfo.category) || {};
        const {subcategories = []} = category;
        const subcategory = subcategories.find(item => item.value === cardInfo.subcategory) || null;


        const currency_option = currencies.find(item => item.value === cardInfo.currency) || {};
        const currency_title = currency_option.title || '';


        const categoryFields = category.fields || [];

        const contract_ymd = dateMsToFormat(contract_expiration_date, "YYYY-MM-DD", currentZone());

        const dealStagesSR = dealStages[cardInfo.type] || [];

        const reason_for_sale = fields['reason_for_sale'] || {};


        return (
            <div className="Card_main">

                <div className="_block1">

                    <div className="d-flex">
                        <div className="color-green fs22 mr-1">
                            <i className="mdi mdi-map-marker"/>
                        </div>
                        <div className="w-100">

                            <Select
                                styles={{
                                    ...selectStyleDefault
                                }}
                                className="mb-1"
                                placeholder="Город"
                                options={optionsCities}
                                value={defaultValueCities}
                                onChange={el => changeCardInfo({city: el && el.value}, true)}
                            />

                            {
                                optionsAreas.length > 0 &&
                                <Select
                                    styles={{
                                        ...selectStyleDefault
                                    }}
                                    className="mb-1"
                                    placeholder="Район"
                                    isClearable={true}
                                    options={optionsAreas}
                                    defaultValue={defaultValueAreas}
                                    onChange={el => changeCardInfo({area: el && el.value})}
                                />
                            }


                            {
                                optionsStreets.length > 0 &&
                                <Select
                                    styles={{
                                        ...selectStyleDefault
                                    }}
                                    className="mb-1"
                                    placeholder="Улица"
                                    isClearable={true}
                                    components={{MenuList}}
                                    options={optionsStreets}
                                    defaultValue={defaultValueStreets}
                                    onChange={el => changeCardInfo({street: el && el.value})}
                                />
                            }

                            {/*Ручной ввод улицы*/}
                            {
                                optionsStreets.length === 0 &&
                                <input type="text"
                                       className="border p-1 rounded mb-1 w-100"
                                       placeholder="Улица"
                                       title="Улица"
                                       defaultValue={cardInfo.street}
                                       onChange={e => changeCardInfo({street: e.target.value || null})}
                                />
                            }

                            <div className="d-flex mb-1">

                                <InputText
                                    className="w-50 border p-1 rounded"
                                    placeholder="Дом"
                                    title="Дом"
                                    defaultValue={cardInfo.building}
                                    onblur={value => changeCardInfo({building: value})}
                                    forbidden_symbols={/[ |,]/g}
                                />

                                {/*<input type="text"*/}
                                {/*       className="w-50 border p-1 rounded"*/}
                                {/*       placeholder="Дом"*/}
                                {/*       title="Дом"*/}
                                {/*       defaultValue={cardInfo.building}*/}
                                {/*       onChange={e => changeCardInfo({building: e.target.value || null})}*/}
                                {/*/>*/}

                                <input type="text"
                                       className="w-50 ml-1 border p-1 rounded"
                                       title="Квартира"
                                       placeholder="Квартира"
                                       defaultValue={cardInfo.apartment}
                                       onChange={e => changeCardInfo({apartment: e.target.value || null})}
                                />
                            </div>

                            {
                                optionsLandmarks.length > 0 &&
                                <Select
                                    styles={{
                                        ...selectStyleDefault
                                    }}
                                    isClearable={true}
                                    className="mb-1"
                                    placeholder="Ориентир"
                                    options={optionsLandmarks}
                                    defaultValue={defaultValueLandmarks}
                                    onChange={el => changeCardInfo({landmark: el && el.value})}
                                />
                            }

                        </div>
                    </div>

                    <div className="flex-between mt-2">

                        <InputMoney
                            className="border ml-2 p-1 rounded"
                            title="Цена"
                            placeholder="Цена"
                            defaultValue={cardInfo.price}
                            onblur={this.change_price}
                        />

                        <div className="ml-2 h34">
                            {currency_title}
                        </div>

                        <i className="mdi mdi-arrow-down-bold color-green fs28"/>
                    </div>


                    <Select
                        styles={{
                            ...selectStyleDefault
                        }}
                        isSearchable={false}
                        className="mt-2"
                        placeholder="Этап сделки"
                        options={dealStagesSR}
                        defaultValue={dealStagesSR.find(item => item.value === cardInfo.stage_transaction)}
                        onChange={el =>
                            changeCardInfo({
                                stage_transaction: el && el.value,
                                is_archived: +(el.value === 'successfully' || el.value === 'poorly' || el.value === 'statistics')
                            })
                        }
                    />



                    {
                        data.rights.changeCardContact.includes(user_profile.id) &&
                        <Card_main_change_contact
                            card_contact_name={undefsafe(cardInfo, 'card_contact.name')}
                            agency_id={user_profile.agency_id}
                            changeCardInfo={changeCardInfo}
                        />
                    }



                    <div className="d-flex mt-2">

                        <div className="mr-2 position-relative">
                            <Calendar
                                className="form-control"
                                placeholder="Дата истечения договора"
                                title="Дата истечения договора"
                                value={contract_ymd}
                                onChange={e => changeCardInfo({contract_expiration_date: Date.parse(e.date) || null})}
                            />
                        </div>


                        <input type="text"
                               className="form-control"
                               placeholder="Номер договора"
                               title="Номер договора"
                               defaultValue={cardInfo.number_contract}
                               onChange={e => changeCardInfo({number_contract: e.target.value || null})}
                        />

                    </div>


                    <input type="text"
                           className="form-control mt-2"
                           placeholder="Комиссия"
                           defaultValue={cardInfo.commission}
                           onChange={e => changeCardInfo({commission: e.target.value || null})}
                    />


                    {
                        (cardInfo.type === 'sale' && cardInfo.sale_type === 'object') &&
                        <Select
                            styles={{
                                ...selectStyleDefault
                            }}
                            isClearable={true}
                            className="mt-2"
                            placeholder="Причина продажи"
                            options={reason_for_sale.options}
                            defaultValue={reason_for_sale.options.find(item => item.value === cardInfo.reason_for_sale)}
                            onChange={el => changeCardInfo({reason_for_sale: el && el.value})}
                        />
                    }


                    <Select
                        styles={{
                            ...selectStyleDefault
                        }}
                        className="mt-2"
                        placeholder="Риэлтор"
                        options={users}
                        // defaultValue={users.find(item => item.id === cardInfo.user_id)}
                        defaultValue={cardInfo.card_user}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.name + ' ' + option.surname}
                        onChange={el => changeCardInfo({user_id: el && el.id})}
                    />


                </div>


                <div className="_block2">


                    {/*
                    <div className="d-flex">
                        <div className="flex-left p-1 w-50 color-gray">Площадь</div>
                        <div className="flex-left p-1 w-50">
                            <InputText className="w-100 text-center border rounded-left" title="Общая"
                                       value={cardInfo.total_area} onChange={(value)=>{changeCardInfo({'total_area': value})}}/>
                            /
                            <InputText className="w-100 text-center border" title="Жилая"
                                       value={cardInfo.living_area} onChange={(value)=>{changeCardInfo({'living_area': value})}}/>
                            /
                            <InputText className="w-100 text-center border rounded-right" title="Кухня"
                                       value={cardInfo.kitchen_area} onChange={(value)=>{changeCardInfo({'kitchen_area': value})}}/>
                        </div>
                    </div>
                    */}


                    <Card_main_field
                        title="Тип"
                        value={
                            <Select
                                styles={{
                                    ...selectStyleDefault
                                }}
                                isSearchable={false}
                                className="w-100"
                                placeholder="Выбрать"
                                options={categories}
                                defaultValue={category}
                                getOptionLabel={option => option.title}
                                onChange={el => changeCardInfo({category: el && el.value, subcategory: ''}, true)}
                            />
                        }
                        show_in_one_line={true}
                    />

                    <Card_main_field
                        title="Подтип"
                        value={
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
                        }
                        show_in_one_line={true}
                    />


                    {/*Все поля*/}
                    <Card_main_field_edit_mode
                        cardInfo={cardInfo}
                        categoryFields={categoryFields}
                        changeCardInfo={changeCardInfo}
                    />


                </div>


                <div className="_block3">

                    <NavTabs className="tabs _level-2" tabsName="addition" defaultActiveKey="description" options={[
                        {
                            value: 'description',
                            title: <>
                                <span className="d-none d-md-inline">Описание</span>
                                <i className="mdi mdi-format-align-left d-inline d-md-none fs20"/>
                            </>,
                            content: <textarea
                                className="_description-edit"
                                placeholder="Описание"
                                defaultValue={cardInfo.description}
                                onChange={e => changeCardInfo({description: e.target.value || null})}
                            />
                        },
                        {
                            value: 'photo',
                            title: <>
                                <span className="d-none d-md-inline">Фото</span>
                                <i className="mdi mdi-image-area d-inline d-md-none fs20"/>
                            </>,
                            content: <Card_main_photo_edit_mode
                                cardId={cardId}
                                changeCardInfo={changeCardInfo}
                                card_files={card_files}
                                filtered_card_files={card_files.filter(item => item.type === 'image/*')}
                            />
                        },
                        {
                            value: 'documents',
                            title: <>
                                <span className="d-none d-md-inline">Документы</span>
                                <i className="mdi mdi-file-document d-inline d-md-none fs20"/>
                            </>,
                            content: <Card_main_documents_edit_mode
                                cardId={cardId}
                                changeCardInfo={changeCardInfo}
                                card_files={card_files}
                                filtered_card_files={card_files.filter(item => item.type === 'application/*')}
                            />
                        },
                        {
                            value: 'links',
                            title: <>
                                <span className="d-none d-md-inline">Ссылки</span>
                                <i className="mdi mdi-link-variant d-inline d-md-none fs20"/>
                            </>,
                            content: <Card_main_links_edit_mode
                                cardInfo={cardInfo}
                                changeCardInfo={changeCardInfo}
                            />
                        },
                        // {
                        //     value: 'audio',
                        //     title: <>
                        //         <span className="d-none d-md-inline">Аудио</span>
                        //         <i className="mdi mdi-headphones d-inline d-md-none fs20"/>
                        //     </>,
                        //     content: <Card_main_audio_edit_mode
                        //         cardId={cardId}
                        //         changeCardInfo={changeCardInfo}
                        //         card_files={card_files}
                        //         filtered_card_files={card_files.filter(item => item.type === 'audio/*')}
                        //     />
                        // }
                    ]}/>



                    {/*<textarea*/}
                    {/*    className="_comment-edit"*/}
                    {/*    placeholder="Комментарий"*/}
                    {/*    defaultValue={cardInfo.comment}*/}
                    {/*    onChange={e => changeCardInfo({comment: e.target.value || null})}*/}
                    {/*/>*/}


                </div>

            </div>
        )
    }
}