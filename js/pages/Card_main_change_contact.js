import React from "react";
import {toast} from "react-toastify";
import PropTypes from "prop-types";

export class Card_main_change_contact extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            foundContact: {}
        };
        this.foundContact = React.createRef()
    }

    changeState = state => {
        this.setState(state)
    };

    render() {
        console.log('render Card_main_change_contact');

        const {card_contact_name, agency_id, changeCardInfo} = this.props;
        const foundContact_ref = this.foundContact;
        const {foundContact} = this.state;
        const {changeState} = this;


        return <div className="mt-2">
            <span>Текущий контакт: {card_contact_name}</span>

            <div className="flex-around">
                <input type="text"
                       ref={this.foundContact}
                       className="form-control mt-2"
                       title="Найти контакт по номеру телефона"
                       placeholder="Телефон контакта"
                />
                <i className="mdi mdi-magnify fs22 cursor-pointer ml-2"
                   onClick={function () {

                       post_cards_contact_phone(foundContact_ref.current.value, agency_id).done(function (foundContact) {
                           changeState({foundContact})
                       }).fail(function () {
                           toast.warn(' ☝ Контакт не найден')
                       })

                   }}
                />
            </div>

            <span className="cursor-pointer" onClick={function () {
                if (foundContact.id) {
                    changeCardInfo({cards_contacts_id: foundContact.id});
                    toast.warn(' ☝ Контакт будет изменен на ' + foundContact.name)
                }
            }}>
                {
                    foundContact.name ?
                        'Будет изменён на ' + foundContact.name :
                        ''
                }
            </span>
        </div>
    }

}



Card_main_change_contact.propTypes = {
    card_contact_name: PropTypes.string.isRequired,
    agency_id: PropTypes.number.isRequired,
    changeCardInfo: PropTypes.func.isRequired
};