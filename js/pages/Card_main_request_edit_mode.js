import React from 'react';
import {NavTabs} from "../elements/NavTabs";
import {Card_main_documents_edit_mode} from "./Card_main_documents_edit_mode";
import Select from 'react-select';
import {Card_main_audio_edit_mode} from "./Card_main_audio_edit_mode";
import {Calendar} from "../elements/Calendar";
import {InputMoney} from "../elements/InputMoney";
import {MenuList} from "../elements/MenuList";
import {Card_main_field_edit_mode} from "./Card_main_field_edit_mode";
import {InputText} from "../elements/InputText";
import {Card_main_change_contact} from "./Card_main_change_contact";



export class Card_main_request_edit_mode extends React.Component {

    change_price = value => this.props.changeCardInfo({price: value});

    render() {
        console.log('render Card_main_request_edit_mode');

        const {cardInfo, cityArr, office, cities, changeCardInfo, categories, users, cardId, user_profile} = this.props;
        const {contract_expiration_date, card_files = []} = cardInfo;

        const {currencies, fields, dealStages} = data;

        const dealDirection = cardInfo.sale_type; // object request


        // Города
        const cityValues = cardInfo.city || '';
        const officeCity = cities[office.city] || {};
        const suburbs = [office.city].concat(officeCity.suburb || []);
        const optionsCities = suburbs.map(key => ({value: key, label: cities[key].title}));
        const defaultValueCities = cityValues ? cityValues.split(',').map(value => ({value, label: cities[value].title})) : null;
        // const defaultValueCities = [];
        // const officeCity = cities[office.city] || {};
        // const suburbs = [office.city].concat(officeCity.suburb || []);
        // const optionsCities = suburbs.map(function (item) {
        //     const option = {value: item, label: cities[item].title};
        //     if ((cardInfo.city || '').split(',').includes(item)) {
        //         defaultValueCities.push(option)
        //     }
        //     return option
        // });


        // Районы
        const areaValues = cardInfo.area || '';
        const areas = cityArr.areas || {};
        const optionsAreas = Object.keys(areas).map(key => ({value: key, label: areas[key]}));
        const defaultValueAreas = areaValues ? areaValues.split(',').map(value => ({value, label: areas[value]})) : null;
        // const areas = cityArr.areas || {};
        // const defaultValueAreas = [];
        // const optionsAreas = [];
        // for (let key in areas) {
        //     const option = {value: key, label: areas[key]};
        //     optionsAreas.push(option);
        //     if ((cardInfo.area || '').split(',').includes(key)) {
        //         defaultValueAreas.push(option)
        //     }
        // }


        // Ориентиры
        const landmarksValues = cardInfo.landmark || '';
        const landmarks = cityArr.landmarks || {};
        const optionsLandmarks = Object.keys(landmarks).map(key => ({value: key, label: landmarks[key]}));
        const defaultValueLandmarks = landmarksValues ? landmarksValues.split(',').map(value => ({value, label: landmarks[value]})) : null;
        // const landmarks = cityArr.landmarks || {};
        // const defaultValueLandmarks = [];
        // const optionsLandmarks = [];
        // for (let key in landmarks) {
        //     const option = {value: key, label: landmarks[key]};
        //     optionsLandmarks.push(option);
        //     if ((cardInfo.landmark || '').split(',').includes(key)) {
        //         defaultValueLandmarks.push(option)
        //     }
        // }


        // Улицы
        const streetValues = cardInfo.street || '';
        const streets = cityArr.streets || {};
        const optionsStreets = Object.keys(streets).map(key => ({value: key, label: streets[key]}));
        const defaultValueStreets = streetValues ? streetValues.split(',').map(value => ({value, label: streets[value]})) : null;



        const category = categories.find(item => item.value === cardInfo.category) || {};
        const {subcategories = []} = category;
        const subcategory = subcategories.filter(item => (cardInfo.subcategory || '').split(',').indexOf(item.value) >= 0);


        const currency_option = currencies.find(item => item.value === cardInfo.currency) || {};
        const currency_title = currency_option.title || '';


        const categoryFields = category.fields || [];

        const contract_ymd = dateMsToFormat(contract_expiration_date, "YYYY-MM-DD", currentZone());

        const dealStagesSR = dealStages[cardInfo.type] || [];

        let permissions = JSON.parse(window.localStorage.getItem('access')).permissions;

        return (
            <div className="Card_main">

                <div className="_block1">

                    <Select
                        styles={{
                            ...selectStyleDefault
                        }}
                        isMulti
                        placeholder="Город"
                        options={optionsCities}
                        value={defaultValueCities}
                        onChange={el => changeCardInfo({city: el && el.map(item => item.value).join(',')}, true)}
                    />

                    {
                        optionsAreas.length > 0 &&
                        <Select
                            styles={{
                                ...selectStyleDefault
                            }}
                            isMulti
                            className="mt-2"
                            placeholder="Район"
                            options={optionsAreas}
                            defaultValue={defaultValueAreas}
                            onChange={el => changeCardInfo({area: el && el.map(item => item.value).join(',')})}
                        />
                    }

                    {
                        optionsLandmarks.length > 0 &&
                        <Select
                            styles={{
                                ...selectStyleDefault
                            }}
                            isMulti
                            className="mt-2"
                            placeholder="Ориентир"
                            options={optionsLandmarks}
                            defaultValue={defaultValueLandmarks}
                            onChange={el => changeCardInfo({landmark: el && el.map(item => item.value).join(',')})}
                        />
                    }

                    {
                        optionsStreets.length > 0 &&
                            <div>
                                <Select
                                    styles={{
                                        ...selectStyleDefault
                                    }}
                                    isMulti
                                    className="mt-2"
                                    placeholder="Улица"
                                    components={{MenuList}}
                                    options={optionsStreets}
                                    defaultValue={defaultValueStreets}
                                    onChange={el => changeCardInfo(
                                        {street: el && el.map(item => item.value).join(',')},
                                        (el && !cardInfo.street) || (!el && cardInfo.street) // Обновить компонент, если не было улицы, потом появилась или наоборот
                                    )}
                                />
                                {
                                    cardInfo.street &&
                                    <span className="fs12 color-red">При указании улиц подбор подходящих не будет учитывать районы</span>
                                }
                            </div>
                    }

                    <InputText
                        className="w-50 border p-1 rounded mt-2"
                        placeholder="Номера домов"
                        title="Введите номера домов через запятую без пробелов"
                        defaultValue={cardInfo.building}
                        onblur={value => changeCardInfo({building: value})}
                        forbidden_symbols={/ /g}
                    />

                    <div className="flex-between mt-2">

                        {/*<span>&#60; </span>*/}

                        <InputMoney
                            className="border ml-2 p-1 rounded"
                            title="Цена"
                            placeholder="Цена"
                            defaultValue={cardInfo.price}
                            onblur={this.change_price}
                        />

                        <div className="ml-2 h34">
                            {/*<Currency_old_20190501 selected_id={cardInfo.currency} handler={value => changeCardInfo({currency: value})}/>*/}
                            {currency_title}
                            {/*<SingleSelect*/}
                            {/*    iconWrapper={true}*/}
                            {/*    internalClass="btn-dropdown ripple"*/}
                            {/*    selected_id={cardInfo.currency}*/}
                            {/*    options={currencies}*/}
                            {/*    handler={value => changeCardInfo({currency: value})}*/}
                            {/*/>*/}
                        </div>

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
                                stage_transaction: el.value,
                                is_archived: +(el.value === 'successfully' || el.value === 'poorly' || el.value === 'statistics')
                            })}
                    />



                    {
                        // data.rights.changeCardContact.includes(user_profile.id) &&
                        permissions.hasOwnProperty('changeCardContact') && permissions.changeCardContact.hasOwnProperty('edit') &&
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
                                onChange={e => changeCardInfo({contract_expiration_date: Date.parse(e.date)})}
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



                    <div>
                        <div className="p-1 color-gray">Тип</div>
                        <div className="p-1">
                            <Select
                                styles={{
                                    ...selectStyleDefault
                                }}
                                isSearchable={false}
                                options={categories}
                                placeholder="Выбрать"
                                defaultValue={category}
                                getOptionLabel={option => option.title}
                                onChange={el => changeCardInfo({category: el && el.value, subcategory: ''}, true)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="p-1 color-gray">Подтип</div>
                        <div className="p-1">
                            <Select
                                styles={{
                                    ...selectStyleDefault
                                }}
                                isMulti
                                isSearchable={false}
                                options={subcategories}
                                placeholder="Выбрать"
                                defaultValue={subcategory}
                                getOptionLabel={option => option.title}
                                onChange={el => changeCardInfo({subcategory: el && el.map(item => item.value).join(',')})}
                            />
                        </div>
                    </div>


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
                            value: 'audio',
                            title: <>
                                <span className="d-none d-md-inline">Аудио</span>
                                <i className="mdi mdi-headphones d-inline d-md-none fs20"/>
                            </>,
                            content: <Card_main_audio_edit_mode
                                cardId={cardId}
                                changeCardInfo={changeCardInfo}
                                card_files={card_files}
                                filtered_card_files={card_files.filter(item => item.type === 'audio/*')}
                            />
                        }
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
