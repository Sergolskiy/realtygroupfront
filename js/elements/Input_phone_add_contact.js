import React from 'react'
import {ModalAddDeal_ContactCards} from "../components/modal/ModalAddDeal_ContactCards";


// onChangePhones(phones - arr)
// onChangeName(name - text). Не работает пока
export class Input_phone_add_contact extends React.PureComponent {

    state = {
        phones: [''],
        name: '',
        phoneMasks: [{}],
        foundContacts: [],
        foundUsers: [],
        searching: false
    };

    changeState = state => {
        this.setState(state)
    };

    componentDidMount() {
        this.addPhoneMask()
    }

    componentDidUpdate(prevProps, prevState) {
        // Если изменилось кол-во телефонов, добавляем маску
        if (prevState.phones.length !== this.state.phones.length) {
            this.addPhoneMask()
        }
    }

    oneMorePhone = () => {
        this.setState({
            phones: this.state.phones.concat(''),
            phoneMasks: this.state.phoneMasks.concat({})
        })
    };

    addPhoneMask = () => {
        const {phones, phoneMasks} = this.state;
        const {onChangePhones} = this.props;
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

                    onChangePhones && onChangePhones(phones);

                    // Где-то здесь добавить foundContactName в name (state)
                    // Find contacts and users
                    contact_user_by_phones(phone).done(function (found) {
                        changeState({
                            foundContacts: found.contacts,
                            foundUsers: found.users,
                            searching: false,
                            phones
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

    render() {
        console.log('render Input_phone_add_profile');

        const {foundContacts, foundUsers, searching, phones, phoneMasks, name} = this.state;
        const {cities, office} = this.props;
        const {changeState} = this;

        const foundContact = foundContacts[0] || {};
        const foundContactId = foundContact.id;
        const foundContactName = foundContact.name;

        const foundUser = foundUsers[0] || {};
        const foundUserId = foundUser.id;
        const foundUserName = foundUser.surname + ' ' + foundUser.name;
        const hash = undefsafe(foundUser, 'user_details.profile_image.hash');
        const image_url = hash ? url_backend + '/public/uploads/files/' + hash : '/images/no_ava.jpg'; // '/images/substrate.png'

        return (
            <div>
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
                               data-focus="modalAddDeal" defaultValue={foundContactName}
                               // onChange={e => changeState({name: e.target.value})}
                        />

                        {/*<InputText*/}
                        {/*    placeholder="Имя"*/}
                        {/*    data-focus="modalAddDeal" // Нужно как то задействовать*/}

                        {/*/>*/}
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
        )
    }
}