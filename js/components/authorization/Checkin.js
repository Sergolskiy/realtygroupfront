import React from 'react'
import {Link} from 'react-router-dom'

import {Card_main_field} from "../../pages/Card_main_field";
import Select from "react-select";

// Регистрация нового пользователя
export class Checkin extends React.PureComponent {

  state = {
    validateMail: true,
    validatePas: true,
    validateCPas: true,
    validateName: true,
    validateSurname: true,
    validateMiddleName: true,
    loader: false,
    messages: [],
    success: false,
    login: '',
    password: '',

    roles: [],
    permissions: [],

    permissionsIds: {},
    rolesId: {},

    select: [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
  };


  componentDidMount() {
    get_new_roles().done((response)=>{
      this.setState({
        roles: response.roles,
        permissions: response.permissions,
      })
    })
  }

  validateEmail = email => {
    return /^(?:[\w!#$%&'*+\-\/=?^`{|}~]+\.)*[\w!#$%&'*+\-\/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!\.)){0,61}[a-zA-Z0-9_-]?\.)+[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!$)){0,61}[a-zA-Z0-9_]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])]))$/.test(email)
  };


  changeState = state => {
    this.setState(state)
  };


  register = e => {
    e.preventDefault();

    const {changeState} = this;
    const inputs = $(e.target).children('input'),
      email = inputs.eq(0).val(),
      password = inputs.eq(1).val(),
      cpassword = inputs.eq(2).val(),
      name = inputs.eq(3).val(),
      surname = inputs.eq(4).val(),
      middle_name = inputs.eq(5).val(),
      messages = [];

    // Сброс состояния
    let validateMail = true,
      validatePas = true,
      validateCPas = true,
      validateName = true,
      validateSurname = true,
      validateMiddleName = true,
      loader = false;

    // Валидация
    if (!this.validateEmail(email)) {
      validateMail = false;
      messages.push('Неправильный E-mail');
    }
    if (password !== cpassword) {
      validateCPas = false;
      messages.push('Пароли не совпадают');
    } else if (password.length < 8) {
      validatePas = validateCPas = false;
      messages.push('Пароль слишком короткий');
    }
    if (!name) {
      validateName = false;
      messages.push('Введите имя');
    }
    if (!surname) {
      validateSurname = false;
      messages.push('Введите фамилию');
    }
    if (!middle_name) {
      validateMiddleName = false;
      messages.push('Введите отчество');
    }

    if (messages.length === 0) { // Если нет ошибок

      loader = true;
      changeState({loader});

      let permissionsIds = this.state.permissionsIds;
      let ids = '';
      permissionsIds.map((item)=>{
        if(ids === ''){
          ids = ids + item.id
        } else {
          ids = ids + ',' + item.id
        }

      });

      let rolesId = this.state.rolesId;


      post_create_user(
        {
          email,
          password,
          name,
          surname,
          middle_name,
          "permissionsIds": ids,
          "role_id": rolesId.id,
          agency_id: 6,
          office_id: 4,
          offices_partition_id: 3
        }
      ).done(function () {

        changeState({success: true, login: email, password});
        // post_auth(email, password).done(function (data, textStatus, jqXHR) {
        //     $.cookie('token', jqXHR.responseText, {expires: 365, path: '/'});
        //     window.Index.loadData(true);
        //     store.dispatch({type: 'LOGIN', login: true})
        // }).fail(function (jqXHR) {
        //     messages.push(jqXHR.responseJSON.message);
        //     changeState({validateMail, validatePas, loader: false, messages})
        // })

        // store.dispatch({type: 'AUTH', page: 'confirmCode'/*, email: email*/});
        // messages.push('Вы успешно зарегистрировались. Теперь залогинтесь')
      }).fail(function (jqXHR, textStatus, errorThrown) {
        messages.push(undefsafe(jqXHR.responseJSON, 'error.message') || textStatus);
      }).always(function () {
        loader = false;
        changeState({
          validateMail,
          validatePas,
          validateCPas,
          validateName,
          validateSurname,
          validateMiddleName,
          loader,
          messages
        })
      })
    } else {
      changeState({
        validateMail,
        validatePas,
        validateCPas,
        validateName,
        validateSurname,
        validateMiddleName,
        messages
      })
    }
  };


  render() {
    console.log('render Checkin');

    const {register} = this;
    const {validateMail, validatePas, validateCPas, validateName, validateSurname, validateMiddleName, loader, messages, success, login, password} = this.state;

    const message = messages.map((item, i) => <p className='message _error' key={i}>{item}</p>);

    return (
      <div className="login-page">
        {
          success ?
            <div className="p-3">
              Вы успешно зарегистрировали пользователя
              <div>Логин: <span className="badge badge-info">{login}</span></div>
              <div>Пароль: <span className="badge badge-info">{password}</span></div>
              <div className="d-flex flex-center flex-wrap">
                <Link to="/" className="btn btn-danger m-1">На главную</Link>
                <Link to="/8e4c494bb5f3cf91444c82103579b1ba" className="btn btn-danger m-1">Зарегистрировать ещё</Link>
              </div>
            </div> :
            <div className="form">
              <form onSubmit={register}>


                <input className={validateMail ? '' : '_error'} type="text" placeholder="E-mail"/>
                <input className={validatePas ? '' : '_error'} type="password" placeholder="Пароль"/>
                <input className={validateCPas ? '' : '_error'} type="password" placeholder="Пароль (подтверждение)"/>
                <input className={validateName ? '' : '_error'} type="text" placeholder="Имя"/>
                <input className={validateSurname ? '' : '_error'} type="text" placeholder="Фамилия"/>
                <input className={validateMiddleName ? '' : '_error'} type="text" placeholder="Отчество"/>

                <Select
                  styles={{
                    ...selectStyleDefault
                  }}
                  isMulti={false}
                  isClearable={false}
                  isSearchable={false}
                  className="w-100 login-select"
                  placeholder={'Роль'}
                  options={this.state.roles}
                  onChange={el => {
                    this.setState({rolesId: el})
                  }
                  }
                />
                <Select
                  isMulti={true}
                  isClearable={false}
                  isSearchable={false}
                  className="w-100 mb-15"
                  placeholder={'Права'}
                  options={this.state.permissions}
                  onChange={el => {
                    console.log(el);
                    this.setState({permissionsIds: el})
                  }
                  }
                />


                <button>
                  <span className={loader ? 'd-none' : ''}>Зарегистрироваться</span>
                  <div className={'lds-dual-ring' + (loader ? '' : ' d-none')}/>
                </button>
                <div>{message}</div>
                {/*<p className="message">Уже зарегистрированы? <a onClick={toggleForm}>Войти</a></p>*/}
              </form>
            </div>
        }
      </div>
    )
  }
}
