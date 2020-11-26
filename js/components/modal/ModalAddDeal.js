import React from 'react'
import {ModalAddDeal_typeAndArea} from "./ModalAddDeal_typeAndArea";
import {ModalAddDeal_typedeal} from "./ModalAddDeal_typedeal";
import {toast} from "react-toastify";
import {store} from "../../reducers";
import {withRouter} from "react-router";
import Select from "react-select";
import {InputMoney} from "../../elements/InputMoney";
import {ModalAddDeal_ContactCards} from "./ModalAddDeal_ContactCards";

class ModalAddDeal extends React.PureComponent {

    state = {
        dealtype: '', // rent sale
        dealdirection: '', // object request

        phones: [''],
        // phone: '',
        phoneMasks: [{}],
        // phoneMask: {},

        foundContacts: [], // Найденные контакты
        // foundContact: {}, // Найденный контакт
        foundUsers: [], // Найденные юзеры

        searching: false, // Спиннер
        isBlockButton: false,

        nbu_quotes: [],

        price: '', // Сумма, прописанная в input
        user_currency_value: '' // Пользовательская валюта
    };

    componentDidMount() {
        this.loadData();

        this.enterFocus("[data-focus='modalAddDeal']"); // Фокус элемента по Enter

        this.addPhoneMask()
    }

    componentDidUpdate(prevProps, prevState) {
        // Если увеличилось кол-во телефонов, добавляем маску
        if (prevState.phones.length !== this.state.phones.length) {
            this.addPhoneMask()
        }
    }

    // Фокус элемента по Enter в модальном окне добавления
    enterFocus = (selector) => {
        const $input = $(selector);
        $input.keypress(function (e) {
            if (e.which === 13) {
                const i = $input.index(this); // Номер текущего элемента, на котором нажали Enter
                if (i + 1 === $input.length - 1) { // Если следующий элемент последний
                    $input.eq(i).blur(); // С текущего элемента снимаем фокус
                    $input.eq(i + 1).click();
                }
                else {
                    $input.eq(i + 1).focus();
                }
            }
        })
    };

    loadData = () => {
        const {changeState} = this;
        get_nbu_quotes_only().done(nbu_quotes => changeState({nbu_quotes}))
    };

    changeState = (state) => {
        this.setState(state)
    };

    clickTypeDeal = (dealtype, dealdirection) => {
        if (this.state.dealtype !== dealtype || this.state.dealdirection !== dealdirection) {
            this.setState({dealtype, dealdirection})
        }
        if (this.state.dealtype !== dealtype) {
            this.setState({
                user_currency_value: dealtype === 'rent' ? 'uah' : (dealtype === 'sale' ? 'usd' : '')
            })
        }
    };

    addPhoneMask = () => {
        const {phones, phoneMasks} = this.state;
        const {changeState} = this;

        $("[name='phone']").inputmask(
            "phone", {
                showMaskOnHover: false,
                clearIncomplete: false,
                oncomplete: function () {
                    changeState({searching: true});
                    const phone = this.value.replace(/[^\d+]/g, '');

                    phones[+this.dataset.number] = phone; // Конкретный телефон

                    // Find contacts
                    // post_cards_contact_phone(phone, user_profile.agency_id).done(function (foundContact) {
                    //     changeState({foundContact, searching: false, phone})
                    // }).fail(function () {
                    //     changeState({foundContact: {},, phone})
                    // });

                    // Find contacts and users
                    contact_user_by_phones(phone).done(function (found) {
                        changeState({
                            foundContacts: found.contacts,
                            foundUsers: found.users,
                            searching: false,
                            phones
                            // phone
                        })
                    })
                },
                onKeyValidation: function (key, result) {
                    const newMask = $(this).inputmask('getmetadata') || {};
                    const currentMask = phoneMasks[+this.dataset.number];
                    if (newMask.cc !== currentMask.cc) {
                        Object.assign(currentMask, newMask);
                        changeState({phoneMasks: [].concat(phoneMasks)})
                    }

                },
                onBeforePaste: onBeforePasteInputMaskPhone
            })
    };

    addDeal = e => {
        const {dealtype, dealdirection, phone, phones, isBlockButton, user_currency_value, price, nbu_quotes} = this.state;
        const {user_profile} = this.props;
        const {changeState} = this;
        const {agency_id, id, office_id} = user_profile;

        // Блокируем кнопки через состояние
        if (isBlockButton) return;
        changeState({isBlockButton: true});

        const dealtype_currency_value = dealtype === 'rent' ? 'uah' : (dealtype === 'sale' ? 'usd' : '');

        const
            el_city = document.getElementById('city'),
            el_district = document.getElementById('district'),
            el_category = document.getElementById('categories'),
            el_subcategory = document.getElementById('subcategories'),
            el_price = document.getElementById('price'),
            // currency = document.getElementById('dealCurrency'),
            el_customerName = document.getElementById('customer_name');


        const
            chosenCity = undefsafe(el_city, 'dataset.selected'),
            chosenDistrict = undefsafe(el_district, 'dataset.selected'),
            chosenCategory = undefsafe(el_category, 'dataset.selected'),
            chosenSubcategory = undefsafe(el_subcategory, 'dataset.selected'),
            chosenPrice =
                dealtype_currency_value !== user_currency_value ?
                currency_converter(nbu_quotes, price, user_currency_value, dealtype_currency_value) :
                price,
            chosenCurrency = dealtype_currency_value,
            chosenCustomerName = el_customerName.value;


        if (
            !dealtype || !dealdirection ||
            (el_city && !el_city.classList.contains('disabled') && !chosenCity) ||
            (el_district && !el_district.classList.contains('disabled') && !chosenDistrict) ||
            (el_category && !el_category.classList.contains('disabled') && !chosenCategory) ||
            (el_subcategory && !el_subcategory.classList.contains('disabled') && !chosenSubcategory) ||
            (!chosenPrice) ||
            (el_customerName && !chosenCustomerName) ||
            !phones[0]
            // !phone
        ) {
            toast.warn(' ☝ Все поля обязательны для заполнения');
            changeState({isBlockButton: false});
            return false
        }

        const form_obj = {
            agency_id,
            office_id,
            user_id: id,
            type: dealtype,
            sale_type: dealdirection,
            area: chosenDistrict,
            city: chosenCity,
            price: chosenPrice,
            currency: chosenCurrency,
            category: chosenCategory,
            subcategory: chosenSubcategory,
            stage_transaction: "1",
            is_archived: "0",
            "card_contact[name]": chosenCustomerName,
            "card_contact[is_married]": "0",
            "card_contact[is_client]": "1",
            "card_contact[is_partner]": "0",
            "card_contact[is_realtor]": "0",
            "card_contact[years]": "25",
            "card_contact[is_black_list]": "0"
        };

        phones.forEach((phone, i) =>
            phone && Object.assign(form_obj, {['card_contact[cards_contacts_phones]['+ i +'][phone]']: phone})
        );

        // const form = new FormData();
        // form.append("card_contact[name]", chosenCustomerName);
        // form.append("agency_id", agency_id);
        // form.append("user_id", id);
        // form.append("office_id", office_id);
        // form.append("type", dealtype); // sale rent
        // form.append("sale_type", dealdirection); // object request
        // form.append("area", chosenDistrict);
        // form.append("city", chosenCity);
        // form.append("price", chosenPrice);
        // form.append("currency", chosenCurrency);
        // form.append("category", chosenCategory);
        // form.append("subcategory", chosenSubcategory);
        // phones.forEach((phone, i) => phone && form.append('card_contact[cards_contacts_phones]['+ i +'][phone]', phone));
        // form.append("stage_transaction", "1");
        // form.append("is_archived", "0");
        // form.append("card_contact[is_married]", "0");
        // form.append("card_contact[is_client]", "1");
        // form.append("card_contact[is_partner]", "0");
        // form.append("card_contact[is_realtor]", "0");
        // form.append("card_contact[years]", "25");
        // form.append("card_contact[is_black_list]", "0");


        const {history} = this.props;
        const {role} = e.currentTarget.dataset;
        return post_cards(form_obj).done(function (cardInfo) {
            toast.success(' ✔ Сделка успешно добавлена');
            if (role === 'next') {
                history.push('/cards/' + cardInfo.id, true) // передаем значение в this.props.location.state
            }
            else {
                store.dispatch({type: 'MODAL_ADD_IS_OPEN', modalAddIsOpen: false});
                window.Cards_table.loadData()
            }
        }).fail(function () {
            toast.error(' ✖ Ошибка при добавлении сделки');
            changeState({isBlockButton: false})
        })

    };

    oneMorePhone = () => {
        this.setState({
            phones: this.state.phones.concat(''),
            phoneMasks: this.state.phoneMasks.concat({})
        })
    };

    change_price = value => this.setState({price: value});

    render() {
        console.log('render ModalAddDeal');

        const {dealtype, dealdirection, foundContacts, phones, foundUsers, searching, phoneMasks, price, user_currency_value, nbu_quotes} = this.state;
        const {user_profile, cities, office} = this.props;
        const {addDeal, changeState, clickTypeDeal} = this;

        const currencies = data.currencies;
        // const user_currency_id = undefsafe(user_profile, 'user_details.currency'); // + был
        const dealtype_currency_value = dealtype === 'rent' ? 'uah' : (dealtype === 'sale' ? 'usd' : '');
        const dealtype_currency_option = currencies.find(item => item.value === dealtype_currency_value) || {};
        const dealtype_currency_title = dealtype_currency_option.title || '';
        const newPrice = currency_converter(nbu_quotes, price, user_currency_value, dealtype_currency_value);


        const foundContact = foundContacts[0] || {};
        const foundContactId = foundContact.id;
        const foundContactName = foundContact.name;

        const foundUser = foundUsers[0] || {};
        const foundUserId = foundUser.id;
        const foundUserName = foundUser.surname + ' ' + foundUser.name;
        const hash = undefsafe(foundUser, 'user_details.profile_image.hash');
        const image_url = hash ? url_backend + '/public/uploads/files/' + hash : '/images/no_ava.jpg'; // '/images/substrate.png'



        return (
            <>

                <div className="p-10-15">

                    {/*<div className="mb-2">*/}
                    {/*<i className="mdi mdi-phone color-gray fs22"/>*/}
                    {/*<TelephoneInput unique="_add"/>*/}
                    {/*</div>*/}

                    {
                        phoneMasks.map((phoneMask, i, arr) =>
                            <div className="flex-around mb-2" key={i}>
                                <div className="inputGroup w-100">
                                    <input
                                        type="tel"
                                        className="letter-spacing-1"
                                        name="phone"
                                        placeholder="Телефон"
                                        data-focus="modalAddDeal"
                                        data-number={i}
                                        autoFocus={arr.length > 1 && arr.length - i === 1}
                                    />
                                    <span/>
                                </div>
                                <span title={phoneMask.name_ru}>{phoneMask.cc}</span>
                                {
                                    foundContacts.length === 0 && // Не найдено контактов
                                    phones[0] && // Вбит хотя бы один номер
                                    arr.length - i === 1 && // Отображать только на последнем элементе
                                    <i onClick={this.oneMorePhone}
                                       className="mdi mdi-phone-plus cursor-pointer color-green fs21 ml-2"
                                       title="Ещё один телефон"/>
                                }
                            </div>
                        )
                    }



                    <div className="flex-between">
                        <div className="inputGroup w-100">
                            <input type="text" id="customer_name" placeholder="Имя"
                                   data-focus="modalAddDeal" defaultValue={foundContactName}/>
                            <span/>
                        </div>
                        {
                            searching &&
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Search...</span>
                            </div>
                        }
                        {
                            foundUserId &&
                            <i className="mdi mdi-account-tie color-red fs28 mr-1 ml-1" title={'Сотрудник нашего агентства ' + foundUserName}/>
                            // <img className="wh24 rounded-circle" src={image_url} title={'Сотрудник нашего агентства ' + foundUserName}/>
                        }
                        {
                            foundContactId &&
                                <ModalAddDeal_ContactCards
                                    foundContact={foundContact}
                                    cities={cities}
                                    office={office}
                                />

                        }
                        {/*<Link to={"/contacts/" + foundContactId + "#contact-deals"} target="_blank" rel="noreferrer noopener">*/}
                        {/*    <i className="mdi mdi-clipboard-account-outline cursor-pointer color-green fs28 mr-1 ml-1"*/}
                        {/*       title={foundContactName}/>*/}
                        {/*</Link>*/}
                    </div>
                </div>


                <ModalAddDeal_typedeal dealtype={dealtype} dealdirection={dealdirection}
                                       clickTypeDeal={clickTypeDeal}/>


                <ModalAddDeal_typeAndArea user_profile={user_profile}
                                          dealdirection={dealdirection}
                                          dealtype={dealtype}/>


                <div className="p-10-15">

                    <div className="d-flex">
                        <div className="inputGroup mr-2">
                            <InputMoney
                                placeholder="Цена"
                                onblur={this.change_price}
                            />
                            <span/>
                        </div>

                        <div className="h36 w170">
                            <Select
                                styles={{
                                    ...selectStyleDefault
                                }}
                                placeholder="Валюта"
                                options={currencies}
                                value={currencies.find(item => item.value === user_currency_value) || null}
                                getOptionLabel={option => option.title}
                                onChange={el => changeState({user_currency_value: el && el.value})}
                            />
                        </div>
                    </div>


                    {
                        dealtype_currency_value !== user_currency_value &&
                        <div className="ml-2 mt-2 fs12">
                            {moneyMask(newPrice)} {dealtype_currency_title} по курсу НБУ
                        </div>
                    }

                </div>


                <div className="modal-two-btns">
                    <div className="border-right ripple" data-focus="modalAddDeal" onClick={addDeal}>
                        Добавить
                    </div>
                    <div className="ripple" data-role="next" onClick={addDeal}>
                        Далее<i className="mdi mdi-arrow-right"/>
                    </div>
                </div>

            </>
        )
    }
}

export default withRouter(ModalAddDeal)