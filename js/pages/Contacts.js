import React from 'react'
import {Back, Title} from "../elements/Elements";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {Pagination} from "../elements/Pagination";

export class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.clientPhone = React.createRef();
        this.state = {
            contact: {},
            contacts_query: {},
            contacts: [],
            loading: true
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        const newState = {};

        $.when(
            get_contacts().done(function (contacts_query) {
                newState.contacts_query = contacts_query;
                newState.contacts = contacts_query.data || [];
            })
        ).then(function () {
            Object.assign(newState, {loading: false});
            this.setState(newState)
        }.bind(this))
    };

    loadContacts = (page) => {
        this.setState({loading: true});
        get_contacts({page}).done(function (contacts_query) {
            this.setState({contacts_query, loading: false})
        }.bind(this))
    };

    loadContactsMore = () => {
        const {contacts, contacts_query} = this.state;
        this.setState({loading: true});

        get_contacts({page: contacts_query.current_page + 1}).done(function (contacts_query) {
            this.setState({
                contacts_query,
                contacts: contacts.concat(contacts_query.data || []),
                loading: false
            })
        }.bind(this))
    };

    findContact = (e) => {
        e.preventDefault();
        const {user_profile} = this.props;
        const clientPhone = this.clientPhone.current.value;
        post_cards_contact_phone(clientPhone, user_profile.agency_id).done(function (contact) {
            toast.success(' ✔ Контакт найден');
            this.setState({contact})
        }.bind(this)).fail(function () {
            toast.warn(' ☝ Контакт не найден');
            this.setState({contact: {}})
        }.bind(this))
    };

    render() {
        const {findContact} = this;
        const {contact, contacts, contacts_query, loading} = this.state;
        // const contacts = contacts_query.data || [];
        const {current_page, last_page, to, total} = contacts_query;

        return (
            <>
                <div className="head navbar flex-nowrap justify-content-start" id="head">
                    <Back/>
                    <Title data="Контакты"/>
                    <form className="ml-auto" onSubmit={findContact}>
                        <Link to={"/contacts/" + contact.id}>{contact.name}</Link>
                        <input placeholder="Телефон контакта" ref={this.clientPhone} className="ml-2"/>
                        <i className="mdi mdi-magnify fs22 cursor-pointer ml-2" onClick={findContact}/>
                    </form>
                </div>

                {loading && <div className="google-loader"><span/><span/><span/><span/></div>}

                <div className="content">

                    <div className="table-suite">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Телефон</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                contacts.map(function (item, i) {

                                    const cards_contacts_phones = item.cards_contacts_phones || [];

                                    return (
                                        <tr key={i}>

                                            <td>
                                                <Link to={"/contacts/" + item.id}>
                                                    {item.name || <i>Имя неизвестно</i>}
                                                </Link>
                                            </td>

                                            <td>
                                                {cards_contacts_phones.map((item, i) => <div key={i}>{item.phone}</div>)}
                                            </td>

                                        </tr>
                                    )
                                })
                            }

                            </tbody>
                        </table>
                    </div>

                    {
                        current_page < last_page &&
                        <div className="flex-center mb-2">
                            <button className="btn btn-outline-primary btn-sm" onClick={this.loadContactsMore}>
                                <span><i className="mdi mdi-refresh"/> Показать ещё {to} / {total}</span>
                            </button>
                        </div>
                    }

                    {/*<Pagination*/}
                    {/*    last_page={last_page}*/}
                    {/*    current_page={current_page}*/}
                    {/*    load={this.loadContacts}*/}
                    {/*/>*/}

                </div>
            </>
        )
    }
}