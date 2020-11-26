import React from 'react'
import {toast} from "react-toastify";
import {Link} from "react-router-dom";


export class Input_phone_contact extends React.PureComponent {

    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            foundContacts: [],
            foundUsers: [],
            searching: false,
            ok: false
        }
    }

    changeState = state => {
        this.setState(state)
    };

    componentDidMount() {
        const {changeState} = this;
        const {oncomplete = () => {}, onincomplete = () => {}, contactId} = this.props;
        $(this.input.current).inputmask(
            "phone", {
                showMaskOnHover: false,
                clearIncomplete: false,
                oncomplete: function () {
                    console.log('oncomplete');
                    changeState({searching: true});
                    const i = this.dataset.phoneId;
                    const phone = this.value.replace(/[^\d+]/g, '');
                    const input = this;

                    contact_user_by_phones(phone).done(function (found) {

                        if (found.contacts.length > 0 && found.contacts[0].id !== contactId) {
                            input.value = '';
                            changeState({foundContacts: found.contacts, foundUsers: found.users, searching: false, ok: false});
                            toast.warn(' ☝ Этот номер телефона уже принадлежит одному из контактов');
                        }
                        else {
                            changeState({foundContacts: [], foundUsers: [], searching: false, ok: true});
                            oncomplete(i, phone)
                        }
                    })
                },
                oncleared: function () {
                    console.log('oncleared');
                },
                onincomplete: function () {
                    console.log('onincomplete');
                    const i = this.dataset.phoneId;
                    onincomplete(i)
                },
                onBeforePaste: onBeforePasteInputMaskPhone
            })
    }

    render() {
        console.log('render Input_phone_profile');
        const {classname, readonly, value = '', phoneId} = this.props;
        const {foundContacts, foundUsers, searching, ok} = this.state;

        const foundContact = foundContacts[0] || {};
        const foundContactId = foundContact.id;
        const foundContactName = foundContact.name;

        const foundUser = foundUsers[0] || {};
        const foundUserId = foundUser.id;
        const foundUserName = foundUser.surname + ' ' + foundUser.name;

        return (
            <>
                <input className={classname}
                       data-phone-id={phoneId}
                       readOnly={readonly}
                       defaultValue={value}
                       ref={this.input}
                       type="tel"
                />
                {
                    searching &&
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Search...</span>
                    </div>
                }
                {
                    ok && <i className="mdi mdi-hand-okay fs28"/>
                }
                {
                    foundUserId &&
                    <i className="mdi mdi-account-tie cursor-pointer color-red fs28 mr-1 ml-1"
                       title={'Сотрудник нашего агентства ' + foundUserName}/>
                    // <img className="wh24 rounded-circle" src={image_url} title={'Сотрудник нашего агентства ' + foundUserName}/>
                }
                {
                    foundContactId &&
                    <Link to={"/contacts/" + foundContactId} target="_blank" rel="noreferrer noopener">
                        <i className="mdi mdi-account-arrow-right cursor-pointer color-green fs28 mr-1 ml-1"
                           title={foundContactName}/>
                    </Link>
                }
            </>
        )
    }
}