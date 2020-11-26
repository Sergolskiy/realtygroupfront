import React from 'react'
import Select from "react-select";
import {Input_phone_add_contact} from "../../elements/Input_phone_add_contact";
import {toast} from "react-toastify";
import {store} from "../../reducers";
import {withRouter} from "react-router";

class ModalAddContact extends React.PureComponent {

    state = {
        contact: {
            is_realtor: 1,
            is_client: 0,
            email: '',

            is_married: 0,
            is_partner: 0,
            years: 0,
            is_black_list: 0
        },
        phones: [''],
        isBlockButton: false
    };

    changeContact = obj => {
        this.setState({
            contact: Object.assign(this.state.contact, obj)
        })
    };

    changeState = state => {
        this.setState(state)
    };

    addContact = e => {
        const {isBlockButton, phones, contact} = this.state;
        const {user_profile} = this.props;
        const {changeState} = this;

        const {agency_id} = user_profile;

        // Блокируем кнопки через состояние
        if (isBlockButton) return;
        changeState({isBlockButton: true});


        const name = document.getElementById('customer_name').value;

        if (!name || !phones[0]) {
            toast.warn(' ☝ Не все поля были заполнены');
            changeState({isBlockButton: false});
            return false
        }


        // const form = new FormData();
        // form.append("name", name);
        // form.append("agency_id", agency_id);
        // phones.forEach((phone, i) => phone && form.append('cards_contacts_phones['+ i +'][phone]', phone));
        // Object.keys(contact).forEach(key => form.append(key, contact[key]));


        const obj = {name, agency_id};
        phones.forEach((phone, i) => Object.assign(obj, {['cards_contacts_phones['+ i +'][phone]']: phone}));
        Object.assign(obj, contact);


        const {history} = this.props;
        const {role} = e.currentTarget.dataset;
        return post_contact_obj(obj).done(function (contact) {
            toast.success(' ✔ Контакт успешно добавлен');
            if (role === 'next') {
                history.push('/contacts/' + contact.id, true) // передаем значение в this.props.location.state
            }
            else {
                store.dispatch({type: 'MODAL_ADD_IS_OPEN', modalAddIsOpen: false});
            }
        }).fail(function (error) {
            toast.error(' ✖ ' + undefsafe(error, 'responseJSON.error.message'));
            changeState({isBlockButton: false})
        })


    };

    componentDidMount() {
        // window.ModalAddContact_state_contact = this.state.contact;
    }

    render() {
        console.log('render ModalAddContact');

        const {changeState, changeContact, addContact} = this;
        const {cities, office} = this.props;


        const contact_post_options = [
            {
                value: {is_realtor: 0, is_client: 1},
                label: "Клиент"
            },
            {
                value: {is_realtor: 1, is_client: 0},
                label: "Риэлтор"
            }
        ];

        return (
            <>
                <div className="p-10-15">

                    <Select
                        styles={{
                            ...selectStyleDefault
                        }}
                        placeholder="Контакт"
                        options={contact_post_options}
                        defaultValue={contact_post_options[1]}
                        onChange={el => changeContact(el.value)}
                    />

                    <div className="mt-2">
                        <Input_phone_add_contact
                            cities={cities}
                            office={office}
                            onChangePhones={phones_arr => {

                                changeState({phones: phones_arr});

                                // const obj = {};
                                // phones_arr.forEach((phone, i) => Object.assign(obj, {
                                //     ['cards_contacts_phones['+ i +'][phone]']: phone
                                // }));
                                // changeContact(obj)
                            }}
                            // onChangeName={name => changeContact({name})}
                        />
                    </div>

                    <div className="inputGroup w-100 mt-2">
                        <input type="email" placeholder="E-mail"
                            onChange={el => changeContact({email: el.target.value})}
                        />
                        <span/>
                    </div>

                </div>

                <div className="modal-two-btns">
                    <div className="border-right ripple" onClick={addContact}>
                        Добавить
                    </div>
                    <div className="ripple" data-role="next" onClick={addContact}>
                        Далее
                        <i className="mdi mdi-arrow-right"/></div>
                </div>
            </>
        )
    }
}

export default withRouter(ModalAddContact)