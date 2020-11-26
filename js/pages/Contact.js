import React from 'react'
import {Back, Title} from "../elements/Elements";
import {toast} from "react-toastify";
import {ButtonEdit} from "../elements/ButtonEdit";
import {ButtonSave} from "../elements/ButtonSave";
import {ButtonCancel} from "../elements/ButtonCancel";
import {ButtonDel} from "../elements/ButtonDel";
import {NavTabs} from "../elements/NavTabs";
import {Input_phone_contact} from "../elements/Input_phone_contact";
import {ModalBootstrap} from "../elements/ModalBootstrap";
import {Contact_deals} from "./Contact_deals";
import Select from "react-select";


export class Contact extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            contact: {},
            contactJSON: '',
            // users: [],
            isEdit: this.props.location.state || false, // берем из ModalAddContact
            loading: true,
            isTabMainShow: !location.hash.split('-')[1], // открыта ли главная вкладка
        };
        this.textarea = React.createRef()
    }


    loadData = () => {
        const contactId = this.props.match.params.id;
        const {changeState} = this;
        const newState = {};

        $.when(
            get_contact(contactId).done(function (contact) {
                const contactJSON = JSON.stringify(contact); // избавляемся от мутабельности
                Object.assign(newState, {contact, contactJSON})
            }),
            // get_users().done(function (users) {
            //     Object.assign(newState, {users: users.data})
            // })
        ).done(function () {
            Object.assign(newState, {loading: false});
            changeState(newState)
        }).fail(function () {
            changeState({loading: false})
        })
    };

    changeState = obj => {
        this.setState(obj)
    };

    changeContact = obj => {
        const contact = Object.assign(this.state.contact, obj); // Не рендерим
        this.setState({contact})
    };

    changeContactPhone = (i, phone) => {
        const {contact} = this.state; // Не рендерим
        contact.cards_contacts_phones[i].phone = phone;
        this.setState({contact})
    };

    delPhone = i => {
        const contact = Object.assign({}, this.state.contact); // Рендерим
        contact.cards_contacts_phones.splice(i, 1);
        this.setState({contact})
    };

    oneMorePhone = () => {
        const contact = Object.assign({}, this.state.contact); // Рендерим
        contact.cards_contacts_phones.push({phone: ''});
        this.setState({contact})
    };

    edit = () => {
        this.setState({isEdit: true})
    };

    save = () => {
        const contactId = this.props.match.params.id;
        const {contact} = this.state;
        // console.log(contact);

        contact.cards_contacts_phones.length === 0 && contact.cards_contacts_phones.push("");

        put_contact(contactId, contact).done(function (newContact) {
            toast.success(' ✔ Контакт успешно сохранен');
            this.setState({isEdit: false, contact: newContact})
        }.bind(this)).fail(function () {
            toast.error(' ✖ Ошибка при сохранении контакта')
        });
    };

    del = () => {
        const contacts_id = this.props.match.params.id;
        const {history} = this.props;

        get_cards_filtered({
            page: 1,
            size: 1,
            contacts_id
        }).done(function (cards_query) {
            if (undefsafe(cards_query, 'total') === 0) {
                del_contact(contacts_id).done(function () {
                    toast.success(' ✔ Контакт удалён');
                    history.push('/contacts')
                }).fail(function () {
                    toast.error(' ✖ Ошибка удаления контакта')
                })
            } else {
                toast.warn(' ☝ У контакта имеются недвижимость или заявка на покупку. Сперва удалите всё')
            }
        })
    };

    cancel = () => {
        const contact = JSON.parse(this.state.contactJSON);
        this.setState({contact, isEdit: false})
    };

    insertCommentTemplate = () => {
        const insertText = "" +
            "Решающие лица: \n" +
            "Животные: \n" +
            "Вид деятельности: \n" +
            "Досуг: \n" +
            "Возраст: \n" +
            "В браке: \n" +
            "Место работы: \n" +
            "Авто: \n" +
            "Дети: \n"
        ;

        const {contact} = this.state;
        contact.comment = insertText;
        this.setState({contact});

        this.textarea.current.value = insertText
    };

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState) {
        // В режиме редактирования при переключении с главной вкладки показываем модальное окно
        const {isEdit, isTabMainShow} = this.state;
        // Сейчас: режим редактирования, не главная вкладка. Перед этим: была открыта главная вкладка
        if (isEdit && !isTabMainShow && prevState.isTabMainShow) {
            $('#modalSaveContact').modal('show')
        }
    }

    render() {
        console.log('render Contact');

        const {user_profile} = this.props;
        const {isEdit, contact, loading, isTabMainShow} = this.state;
        const {save, cancel, edit, del, changeState, changeContact, changeContactPhone, oneMorePhone, delPhone, insertCommentTemplate} = this;
        const {cards_contacts_phones = [{phone: ''}]} = contact;

        if (loading) return (<div className="google-loader"><span/><span/><span/><span/></div>);
        if ($.isEmptyObject(contact)) return (<div>Такой страницы нет</div>);

        const rightEditDel = !data.rights.banEditDelContacts.includes(user_profile.id); // Нет запрета на редактирование

        document.title = '';
        document.title = contact.name;

        let permissions = JSON.parse(window.localStorage.getItem('access')).permissions;

        const contact_options = [
            {
                value: {is_realtor: 0, is_client: 1},
                label: "Клиент"
            },
            {
                value: {is_realtor: 1, is_client: 0},
                label: "Риэлтор"
            }
        ];

        const contact_options_default = contact_options.find(option => includeObj(contact, option.value)) || {};

        return (
            <>

                <div className="head navbar flex-nowrap justify-content-start" id="head">

                    <div className="d-flex align-items-center">

                        <Back isEdit={isEdit} onclick={() => $('#modalSaveContact').modal('show')}/>

                        <Title data={contact.name}/>

                    </div>

                    {
                        // isTabMainShow && rightEditDel && (
                          isTabMainShow && !permissions.hasOwnProperty('editDelContacts') && permissions.editDelContacts.hasOwnProperty('edit') && (
                            isEdit ?
                            <div className="d-flex align-items-center ml-auto">
                                <ButtonSave handler={save}/>
                                <ButtonCancel handler={cancel}/>
                            </div>
                            :
                            <div className="d-flex align-items-center ml-auto">
                                <ButtonEdit handler={edit}/>
                                <ButtonDel modalId="modalDelContact"/>
                            </div>
                        )
                    }

                </div>

                <div className="content">

                    <NavTabs
                        className="tabs _level-2 flex-fill"
                        urlTabs={true}
                        tabsName="contact"
                        defaultActiveKey="main"
                        onChange={(e, value) => changeState({isTabMainShow: value === 'main'})}
                        options={[
                            {
                                value: 'main',
                                title: <>
                                    <span className="d-none d-md-inline">Основное</span>
                                    <i className="mdi mdi-account-details d-inline d-md-none fs22"/>
                                </>,
                                content: <div className="d-flex flex-wrap p-3">

                                    <div className="mr-3 mb-3">








                                        {/*<div className="flex-between">*/}
                                        {/*    <div className="mr-3">*/}
                                        {/*        <input type="checkbox" className="checkbox" id="is_client"*/}
                                        {/*               defaultChecked={!!contact.is_client} disabled={!isEdit}*/}
                                        {/*               onChange={e => changeContact({is_client: +e.target.checked})}/>*/}
                                        {/*        <label htmlFor="is_client">Клиент</label>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="mr-3">*/}
                                        {/*        <input type="checkbox" className="checkbox" id="is_partner"*/}
                                        {/*               defaultChecked={!!contact.is_partner} disabled={!isEdit}*/}
                                        {/*               onChange={e => changeContact({is_partner: +e.target.checked})}/>*/}
                                        {/*        <label htmlFor="is_partner">Партнер</label>*/}
                                        {/*    </div>*/}
                                        {/*    <div>*/}
                                        {/*        <input type="checkbox" className="checkbox" id="is_realtor"*/}
                                        {/*               defaultChecked={!!contact.is_realtor} disabled={!isEdit}*/}
                                        {/*               onChange={e => changeContact({is_realtor: +e.target.checked})}/>*/}
                                        {/*        <label htmlFor="is_realtor">Риэлтор</label>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}


                                        <div className="table-contact">
                                            <div className="_tr">
                                                <div className="_td1"><i className="mdi mdi-account-question-outline fs24"/></div>
                                                <div className="_td2">
                                                    {
                                                        isEdit ?
                                                            <Select
                                                                styles={{
                                                                    ...selectStyleDefault
                                                                }}
                                                                options={contact_options}
                                                                defaultValue={contact_options_default}
                                                                onChange={el => changeContact(el.value)}
                                                            /> :
                                                            <span>{contact_options_default.label}</span>
                                                    }
                                                </div>
                                            </div>

                                            <div className="_tr">
                                                <div className="_td1"><i className="mdi mdi-account-edit fs24"/></div>
                                                <div className="_td2">
                                                    {
                                                        !isEdit ?
                                                            contact.name :
                                                            <input className="input" defaultValue={contact.name || ''}
                                                                   onChange={e => changeContact({name: e.target.value})}/>
                                                    }
                                                </div>
                                            </div>
                                            <div className="_tr">
                                                <div className="_td1"><i className="mdi mdi-email-outline fs24"/></div>
                                                <div className="_td2">
                                                    {
                                                        !isEdit ?
                                                            contact.email :
                                                            <input className="input" defaultValue={contact.email || ''}
                                                                   onChange={e => changeContact({email: e.target.value})}/>
                                                    }
                                                </div>
                                            </div>
                                            <div className="_tr">
                                                <div className="_td1"><i className="mdi mdi-phone fs24"/></div>
                                                <div className="_td2">
                                                    {
                                                        cards_contacts_phones.map(
                                                            (item, i) =>
                                                                <div key={i} className="_phone">

                                                                    {
                                                                        !isEdit ?
                                                                            item.phone :
                                                                            <Input_phone_contact
                                                                                classname="input"
                                                                                phoneId={i}
                                                                                contactId={contact.id}
                                                                                readonly={!isEdit}
                                                                                value={item.phone}
                                                                                oncomplete={changeContactPhone}
                                                                                onincomplete={delPhone}
                                                                            />
                                                                    }

                                                                    {/*{isEdit && <i className="mdi mdi-eraser" onClick={() => delPhone(i)}/>}*/}

                                                                </div>
                                                        )
                                                    }
                                                    {
                                                        isEdit &&
                                                        <div className="_oneMorePhone">
                                                            <i onClick={oneMorePhone}>+ Ещё один номер</i>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="contact-comment">
                                        {
                                            !isEdit ?
                                                <div className="text-pre">{contact.comment || 'Комментарий...'}</div> :
                                                <>
                                                <textarea
                                                    placeholder="Комментарий..."
                                                    ref={this.textarea}
                                                    readOnly={!isEdit}
                                                    defaultValue={contact.comment || ''}
                                                    onChange={e => changeContact({comment: e.target.value})}
                                                />
                                                    <i className="mdi mdi-clipboard-text-outline"
                                                       title="Вставить шаблон"
                                                       onClick={insertCommentTemplate}
                                                    />
                                                </>
                                        }
                                    </div>
                                </div>
                            },
                            {
                                value: 'deals',
                                title: <>
                                    <span className="d-none d-md-inline">Сделки</span>
                                    <i className="mdi mdi-clipboard-text-outline d-inline d-md-none fs22"/>
                                </>,
                                content:
                                    <Contact_deals
                                        size={30}
                                        contacts_id={contact.id}
                                        user_profile={user_profile}
                                    />
                            },
                            {
                                value: 'audio',
                                title: <>
                                    <span className="d-none d-md-inline">Аудио</span>
                                    <i className="mdi mdi-headphones d-inline d-md-none fs22"/>
                                </>,
                                content: ''
                            },
                            {
                                value: 'tasks',
                                title: <>
                                    <span className="d-none d-md-inline">Задачи</span>
                                    <i className="mdi mdi-calendar-clock d-inline d-md-none fs22"/>
                                </>,
                                content: ''
                            },
                            {
                                value: 'activity',
                                title: <>
                                    <span className="d-none d-md-inline">Активность</span>
                                    <i className="mdi mdi-information-outline d-inline d-md-none fs22"/>
                                </>,
                                content: ''
                            }
                        ]}/>

                    {/*{*/}
                    {/*isEdit ?*/}
                    {/*<Contact_main_edit_mode*/}
                    {/*contact={contact}*/}
                    {/*changeStateContact={changeStateContact}*/}
                    {/*changeContact={changeContact}*/}
                    {/*/>*/}
                    {/*:*/}
                    {/*<Contact_main*/}
                    {/*contact={contact}*/}
                    {/*changeStateContact={changeStateContact}*/}
                    {/*changeContact={changeContact}*/}
                    {/*/>*/}
                    {/*}*/}

                    {/*<ModalBootstrap callback={del}/>*/}


                    <ModalBootstrap
                        id="modalDelContact"
                        title="Удаление контакта"
                        body="Вы уверены, что хотите удалить контакт?"
                        btns={[
                            {
                                label: "Удалить",
                                className: "btn btn-primary",
                                handler: del
                            },
                            {
                                label: "Отменить",
                                className: "btn btn-secondary"
                            }
                        ]}
                    />


                    <ModalBootstrap
                        id="modalSaveContact"
                        title="Сохранить изменения"
                        body="Вы не сохранили изменения, сохранить сейчас?"
                        btns={[
                            {
                                label: "Сохранить",
                                className: "btn btn-primary",
                                handler: save
                            },
                            {
                                label: "Отменить",
                                className: "btn btn-secondary",
                                handler: cancel
                            }
                        ]}
                    />

                </div>
            </>
        )
    }
}
