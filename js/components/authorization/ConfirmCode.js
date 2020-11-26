import React from 'react'
import {store} from '../../reducers';
import {connect} from "react-redux";

class ConfirmCode extends React.Component {

    confirm = (e) => {
        e.preventDefault();
        let code = $(e.target).children('input').eq(0),
            // email = this.props.email,
            // Начальное состояние
            validateCode = true,
            message = [];

        store.dispatch({type: 'CONFIRM_CODE', loader: true});

        $.ajax({
            url: '/router.php?__url=auth/confirm',
            type: 'POST',
            dataType: 'json',
            data: {
                code: code.val()
            },
            complete: function (jqXHR, textStatus) {
                switch (jqXHR.status) {
                    case 200:
                        $.cookie('token', jqXHR.responseJSON.token, {expires: 365, path: '/'});
                        store.dispatch({type: 'LOGIN', login: true});
                        // message.push('Вы успешно зарегистрировались');
                        break;
                    case 400:
                        message.push(jqXHR.responseJSON.message);
                        validateCode = false;
                        break;
                    case 500:
                        message.push(jqXHR.responseJSON); // ????
                        break;
                    default:
                        message.push('Неизвестная ошибка');
                }
                store.dispatch({type: 'CONFIRM_CODE', loader: false, validateCode, message});
            }
        });
    };
    render() {
        console.log('render ConfirmCode');
        let confirm = this.confirm,
            message = this.props.message.map(function (item, i) {
                return (
                    <p className='message _error' key={i}>{item}</p>
                )
            });
        return (
            <div className="login-page">
                <div className="form">
                    <form className="confirm-form" onSubmit={function(e){confirm(e)}}>
                        <input className={this.props.validateCode ? '' : '_error'} type="text" placeholder="Код подтверждения"/>
                        <button>
                            <span className={this.props.loader ? 'd-none' : ''}>Подтвердить</span>
                            <div className={"lds-dual-ring" + (this.props.loader ? '' : ' d-none')}></div>
                        </button>
                        <div>{message}</div>
                    </form>
                </div>
            </div>
        )
    }
}

ConfirmCode = connect((store) => {return store.reducerConfirmCode})(ConfirmCode);

export {ConfirmCode}