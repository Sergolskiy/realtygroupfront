import React from 'react'
import {store} from '../../reducers';

export class Login extends React.Component {

    state = {
        validateMail: true,
        validatePas: true,
        validateCPas: true,
        validateName: true,
        validateSurname: true,
        validateMiddleName: true,
        loader: false,
        messages: []
    };

    toggleForm = e => {
        e.preventDefault();
        $('.login-page form').animate({height: "toggle", opacity: "toggle"}, "slow");
    };

    validateEmail = email => {
        return /^(?:[\w!#$%&'*+\-\/=?^`{|}~]+\.)*[\w!#$%&'*+\-\/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!\.)){0,61}[a-zA-Z0-9_-]?\.)+[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!$)){0,61}[a-zA-Z0-9_]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])]))$/.test(email)
    };

    authProcedure = (email, pas) => {

    };

    changeState = state => {
        this.setState(state)
    };

    login = e => {
        e.preventDefault();

        const {changeState} = this;
        const inputs = $(e.target).children('input'),
            email = inputs.eq(0).val(),
            pas = inputs.eq(1).val(),
            messages = [];

        // Сброс состояния
        let validateMail = true,
            validatePas = true,
            loader = false;

        // Валидация
        if (!this.validateEmail(email)) {
            validateMail = false;
            messages.push('Неправильный E-mail');
        }
        if (pas.length < 8) {
            validatePas = false;
            messages.push('Пароль слишком короткий');
        }
        if (messages.length === 0) { // Если нет ошибок

            loader = true;
            changeState({loader});

            post_auth(email, pas).done(function (data, textStatus, jqXHR) {
                // console.log(data, jqXHR);
                $.cookie('token', jqXHR.responseText, {expires: 365, path: '/'});
                window.Index.loadData(true);
                store.dispatch({type: 'LOGIN', login: true});
            }).fail(function (jqXHR) {
                messages.push(jqXHR.responseJSON.message);
                changeState({validateMail, validatePas, loader: false, messages})
            })

        }
        else {
            changeState({validateMail, validatePas, messages})
        }
    };

    // register = e => {
    //     e.preventDefault();
    //
    //     const {changeState} = this;
    //     const inputs = $(e.target).children('input'),
    //         email = inputs.eq(0).val(),
    //         password = inputs.eq(1).val(),
    //         cpassword = inputs.eq(2).val(),
    //         name = inputs.eq(3).val(),
    //         surname = inputs.eq(4).val(),
    //         middle_name = inputs.eq(5).val(),
    //         messages = [];
    //
    //     // Сброс состояния
    //     let validateMail = true,
    //         validatePas = true,
    //         validateCPas = true,
    //         validateName = true,
    //         validateSurname = true,
    //         validateMiddleName = true,
    //         loader = false;
    //
    //     // Валидация
    //     if (!this.validateEmail(email)) {
    //         validateMail = false;
    //         messages.push('Неправильный E-mail');
    //     }
    //     if (password !== cpassword) {
    //         validateCPas = false;
    //         messages.push('Пароли не совпадают');
    //     }
    //     else if (password.length < 8) {
    //         validatePas = validateCPas = false;
    //         messages.push('Пароль слишком короткий');
    //     }
    //     if (!name) {
    //         validateName = false;
    //         messages.push('Введите имя');
    //     }
    //     if (!surname) {
    //         validateSurname = false;
    //         messages.push('Введите фамилию');
    //     }
    //     if (!middle_name) {
    //         validateMiddleName = false;
    //         messages.push('Введите отчество');
    //     }
    //
    //     if (messages.length === 0) { // Если нет ошибок
    //
    //         loader = true;
    //         changeState({loader});
    //
    //         post_create_user(
    //             {
    //                 email,
    //                 password,
    //                 name,
    //                 surname,
    //                 middle_name,
    //                 role_id: 4,
    //                 agency_id: 6,
    //                 office_id: 4,
    //                 offices_partition_id: 3
    //             }
    //         ).done(function () {
    //
    //             post_auth(email, password).done(function (data, textStatus, jqXHR) {
    //                 $.cookie('token', jqXHR.responseText, {expires: 365, path: '/'});
    //                 window.Index.loadData(true);
    //                 store.dispatch({type: 'LOGIN', login: true})
    //             }).fail(function (jqXHR) {
    //                 messages.push(jqXHR.responseJSON.message);
    //                 changeState({validateMail, validatePas, loader: false, messages})
    //             })
    //
    //             // store.dispatch({type: 'AUTH', page: 'confirmCode'/*, email: email*/});
    //             // messages.push('Вы успешно зарегистрировались. Теперь залогинтесь')
    //         }).fail(function (jqXHR, textStatus, errorThrown) {
    //             messages.push(undefsafe(jqXHR.responseJSON, 'error.message') || textStatus);
    //         }).always(function () {
    //             loader = false;
    //             changeState({validateMail, validatePas, validateCPas, validateName, validateSurname, validateMiddleName, loader, messages})
    //         })
    //     }
    //     else {
    //         changeState({validateMail, validatePas, validateCPas, validateName, validateSurname, validateMiddleName, messages})
    //     }
    // };


    render() {
        console.log('render Login');
        const {login, register, toggleForm} = this;
        const {validateMail, validatePas, validateCPas, validateName, validateSurname, validateMiddleName, loader, messages} = this.state;

        const message = messages.map((item, i) => <p className='message _error' key={i}>{item}</p>);

        return (
            <div className="login-page">
                <div className="form">
                    {/*<form className="register-form" onSubmit={register}>*/}
                    {/*    <input className={validateMail ? '' : '_error'} type="text" placeholder="E-mail"/>*/}
                    {/*    <input className={validatePas ? '' : '_error'} type="password" placeholder="Пароль"/>*/}
                    {/*    <input className={validateCPas ? '' : '_error'} type="password" placeholder="Пароль (подтверждение)"/>*/}
                    {/*    <input className={validateName ? '' : '_error'} type="text" placeholder="Имя"/>*/}
                    {/*    <input className={validateSurname ? '' : '_error'} type="text" placeholder="Фамилия"/>*/}
                    {/*    <input className={validateMiddleName ? '' : '_error'} type="text" placeholder="Отчество"/>*/}
                    {/*    <button>*/}
                    {/*        <span className={loader ? 'd-none' : ''}>Зарегистрироваться</span>*/}
                    {/*        <div className={'lds-dual-ring' + (loader ? '' : ' d-none')}/>*/}
                    {/*    </button>*/}
                    {/*    <div>{message}</div>*/}
                    {/*    <p className="message">Уже зарегистрированы? <a onClick={toggleForm}>Войти</a></p>*/}
                    {/*</form>*/}
                    <form className="login-form" onSubmit={login}>
                        <input className={validateMail ? '' : '_error'} type="text" placeholder="E-mail" onBlur={e => e.target.value = e.target.value.trim()}/>
                        <input className={validatePas ? '' : '_error'} type="password" placeholder="Пароль"/>
                        <button>
                            <span className={loader ? 'd-none' : ''}>Войти</span>
                            <div className={"lds-dual-ring" + (loader ? '' : ' d-none')}/>
                        </button>
                        <div>{message}</div>
                        {/*{!production && <p className="message">Не зарегистрированы? <a onClick={toggleForm}>Создайте аккаунт</a></p>}*/}
                    </form>
                </div>
            </div>
        )
    }
}