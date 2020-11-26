import React from 'react'
import {toast} from 'react-toastify';
import {Calendar} from "../elements/Calendar";
import {SingleSelect} from "../elements/SingleSelect";
import {Input_phone_profile} from "../elements/Input_phone_profile";
import Select from "react-select";

export class Settings_profile extends React.Component {
  state = {
    agency: {},
    office: {},
    offices_partition: {},
    role: {},
    social_networks: [],

    roles: [],
    permissions: [],

    permissionsIds: this.props.editPermissions,
    rolesId: this.props.editRole,

  };


  changeState = (obj) => {
    this.setState(obj)
  };

  loadData = () => {
    const {user_profile} = this.props;
    const {changeState} = this;
    const newState = {};

    $.when(
      get_agency(user_profile.agency_id).done(function (agency) {
        Object.assign(newState, {agency})
      }),
      get_office(user_profile.office_id).done(function (office) {
        Object.assign(newState, {office})
      }),
      get_offices_partition(user_profile.offices_partition_id).done(function (offices_partition) {
        Object.assign(newState, {offices_partition})
      }),
      get_role(user_profile.role_id).done(function (role) {
        Object.assign(newState, {role})
      }),
      get_social_networks().done(function (social_networks) {
        Object.assign(newState, {social_networks: social_networks.data})
      })
    ).done(function () {
      changeState(newState)
    })
  };

  changePhoto = () => {
    $('input[type=file]').click()
  };

  changeFile = (e) => {
    const {user_profile} = this.props;
    const {changeState} = this;

    const image_id = undefsafe(user_profile, 'user_details.profile_image.id');

    const file = e.currentTarget.files[0];

    const formData = new FormData();
    formData.append('file', file, encodeURI(file.name));

    // Заливаем файл
    post_files(formData).done(function (newFile) {

      // Меняем id файла в профиле пользователя
      put_user_profile(user_profile.id, {'user_details[profile_image_id]': newFile.id}, true, 5, false).done(function (user_profile) {
        if (undefsafe(user_profile, 'user_details.profile_image.id') === newFile.id) { // Если ID нового файла не сохранилось у юзера
          window.Index.setState({user_profile});
          changeState({user_profile});
          image_id && del_files(image_id); // Удаляем старый файл
          toast.success(' ✔ Фотография успешно загружена')
        } else {
          del_files(newFile.id); // Удаляем новый файл
          toast.error(' ✖ Ошибка загрузки фотографии. Код 001'); // Фото не сохраняется в профиль юзера
        }
      }).fail(function () {
        del_files(newFile.id); // Удаляем новый файл
        toast.error(' ✖ Ошибка загрузки фотографии. Код 002'); // Не работает сохранение в профиль юзера
      })
    }).fail(function () {
      toast.error(' ✖ Ошибка загрузки фотографии. Код 003') // Файл не заливается
    })
  };

  changePassword = () => {
    const {user_profile} = this.props;
    const user_id = user_profile.id;

    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    if (password === passwordConfirm) {
      if (password) {
        if (password.length >= 8) {

          put_user_profile(user_id, {password}, true, 5, false).done(function () {
            toast.success(' ✔ Пароль успешно сохранен')
          }).fail(function () {
            toast.error(' ✖ Ошибка при сохранении пароля')
          })

        } else toast.warn(' ☝ Пароль должен быть не менее 8 символов')
      } else toast.warn(' ☝ Введите пароль')
    } else toast.warn(' ☝ Пароли не совпадают')

  };

  saveChanges = () => {
    let {user_profile} = this.props;
    let {editRole} = this.props;

    console.log(user_profile);

    if(editRole !== undefined) {
      let permissionsIds = this.state.permissionsIds;
      let ids = '';
      permissionsIds.map((item) => {
        if (ids === '') {
          ids = ids + item.id
        } else {
          ids = ids + ',' + item.id
        }
      });

      if(this.state.rolesId !== 1){
        user_profile.permissionsIds = ids;
        user_profile.role_id = this.state.rolesId.id;
      }
    }



    put_user_profile(user_profile.id, user_profile, true, 5, false).done(function (user_profile) {
      window.Index.setState({user_profile});
      toast.success(' ✔ Профиль успешно сохранен')
    }.bind(this)).fail(function () {
      toast.error(' ✖ Ошибка при сохранении профиля')
    })
  };

  onChangePhone_old = (e) => {
    const value = e.currentTarget.value;
    const {user_profile} = this.props;
    const i = e.currentTarget.dataset.phoneId;
    if (value) {
      user_profile.user_phones[i].value = value;
    } else {
      user_profile.user_phones.splice(i, 1);
    }
    this.setState({user_profile});
  };

  onChangePhone = (i, phone) => {
    const {user_profile} = this.props;
    user_profile.user_phones[i].value = phone;
    this.setState({user_profile});
  };

  onChangeSocial = (i, social_value) => {
    const {user_profile} = this.props;
    user_profile.user_socials[i].value = social_value;
    this.setState({user_profile});
  };

  onBlurSocial = (i, social_value) => {
    !social_value && this.delSocial(i)
  };

  oneMorePhone = () => {
    const {user_profile} = this.props;
    user_profile.user_phones.push({});
    this.setState({user_profile});
  };

  oneMoreSocial = (social_network_id) => {
    const {user_profile} = this.props;
    user_profile.user_socials.push({social_network_id});
    this.setState({user_profile});
  };

  delPhone = (i) => {
    const {user_profile} = this.props;
    user_profile.user_phones.splice(i, 1);
    this.setState({user_profile});
  };

  delSocial = (i) => {
    const {user_profile} = this.props;
    user_profile.user_socials.splice(i, 1);
    this.setState({user_profile});
  };

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  componentDidMount() {
    this.loadData();

    get_new_roles().done((response) => {
      this.setState({
        roles: response.roles,
        permissions: response.permissions,
      })
    })
  }

  render() {
    console.log('render Settings_profile');

    const {user_profile} = this.props;
    const {editRole} = this.props;
    const {isAdmin} = this.props;
    const {editPermissions} = this.props;
    console.log(user_profile);
    const {agency, office, offices_partition, role, social_networks} = this.state;
    const {onChangePhone, onChangeSocial, onBlurSocial, changePhoto, changeFile, changePassword, oneMorePhone, oneMoreSocial, saveChanges, delPhone, delSocial} = this;

    const birthday = undefsafe(user_profile, 'user_details.birthday');
    const user_phones = user_profile.user_phones || [];
    const currency_id = undefsafe(user_profile, 'user_details.currency') || ''; // было +
    const hash = undefsafe(user_profile, 'user_details.profile_image.hash');
    const image_url = hash ? url_backend + '/public/uploads/files/' + hash : '/images/no_ava.jpg'; // '/images/substrate.png'
    const user_socials = user_profile.user_socials || [];


    const iconSocial = {
      "1": <i className="fab fa-viber color-viber fs24"/>,
      "2": <i className="mdi mdi-whatsapp color-whatsapp fs26"/>,
      "3": <i className="mdi mdi-telegram color-telegram fs26"/>
    };

    const filteringSocial = social_networks.filter(social_network =>
      !user_socials.some(item =>
        item.social_network_id === social_network.id
      )
    );

    const actualSocial = filteringSocial.map(function (social_network, i) {
      return (
        <span key={i} className="cursor-pointer ml-1 mr-1" onClick={e => oneMoreSocial(social_network.id)}
              title={social_network.title} data-toggle="tooltip">
                    {iconSocial[social_network.id]}
                </span>
      )
    });

    return (
      <div className="d-flex flex-wrap">
        <div className="p-2">

          <div className="avatar img-lg ml-auto mr-auto mb-3 mt-3">
            <img src={image_url}/>
          </div>
          <button className="btn btn-outline-primary btn-block mb-1" onClick={changePhoto}>Изменить фото</button>
          <input type="file" accept="image/*" className="d-none" onChange={changeFile}/>


          <div>
            <button className="btn btn-outline-primary btn-block mb-1" type="button" data-toggle="collapse"
                    data-target="#changepassword" aria-expanded="false" aria-controls="collapseExample">
              Изменить пароль
            </button>
            <div className="collapse" id="changepassword">
              <div className="inputGroup mb-2">
                <input type="password" placeholder="Новый пароль" id="password"/>
                <span/>
              </div>
              <div className="inputGroup mb-2">
                <input type="password" placeholder="Еще раз" id="passwordConfirm"/>
                <span/>
              </div>
              <button className="btn btn-outline-success" onClick={changePassword}>Изменить</button>
            </div>
          </div>

          <table className="table table-borderless table-sm">
            <tbody>
            <tr>
              <th scope="row">Агентство</th>
              <td>{agency && agency.title}</td>
            </tr>
            <tr>
              <th scope="row">Офис</th>
              <td>{office && office.title}</td>
            </tr>
            <tr>
              <th scope="row">Отдел</th>
              <td>{offices_partition && offices_partition.title}</td>
            </tr>
            <tr>
              <th scope="row">Роль</th>
              <td>{role && role.title}</td>
            </tr>
            </tbody>
          </table>


        </div>


        <div className="p-2">
          <div className="flex-between m-1">
            <span>Фамилия</span>
            <div className="inputGroup w210">
              <input type="text" value={user_profile.surname}
                     onChange={e => {
                       const {user_profile} = this.props;
                       user_profile.surname = e.currentTarget.value;
                       window.Index.setState({user_profile});
                     }}
              />
              <span/>
            </div>
          </div>
          <div className="flex-between m-1">
            <span>Имя</span>
            <div className="inputGroup w210">
              <input type="text" value={user_profile.name}
                     onChange={e => {
                       const {user_profile} = this.props;
                       user_profile.name = e.currentTarget.value;
                       window.Index.setState({user_profile});
                     }}
              />
              <span/>
            </div>
          </div>
          <div className="flex-between m-1">
            <span>Отчество</span>
            <div className="inputGroup w210">
              <input type="text" value={user_profile.middle_name}
                     onChange={e => {
                       const {user_profile} = this.props;
                       user_profile.middle_name = e.currentTarget.value;
                       window.Index.setState({user_profile});
                     }}
              />
              <span/>
            </div>
          </div>
          <div className="flex-between m-1">
            <span>E-mail</span>
            <div className="inputGroup w210">
              <input type="text" value={user_profile.email}
                     onChange={e => {
                       const {user_profile} = this.props;
                       user_profile.email = e.currentTarget.value;
                       window.Index.setState({user_profile});
                     }}
              />
              <span/>
            </div>
          </div>

          {
            user_phones.map(function (item, i) {
              return (
                <div key={i} className="flex-between m-1">
                  <span>{i === 0 && 'Телефон'}</span>
                  <div className="w210">

                    <div className="inputGroup">
                      <Input_phone_profile
                        phoneId={i}
                        value={item.value}
                        oncomplete={onChangePhone}
                        onincomplete={delPhone}
                      />
                      <span/>
                    </div>

                  </div>
                </div>
              )
            })
          }

          <div className="flex-between m-1">
            <span/>
            <div className="flex-center w210 h36">
              <i className="ml-auto cursor-pointer" onClick={oneMorePhone}>Добавить номер</i>
            </div>
          </div>


          {
            user_socials.map(function (user_social, i) {
              const social_network = social_networks.find(item => item.id === user_social.social_network_id) || {};
              return (
                <div key={i} className="flex-between m-1">
                  <div className="flex-fill text-right pr-3">
                                        <span title={social_network.title} data-toggle="tooltip">
                                            {iconSocial[social_network.id]}
                                        </span>
                  </div>
                  <div className="w210">

                    <div className="inputGroup">
                      <input type="text"
                             value={user_social.value || ''}
                             onChange={e => onChangeSocial(i, e.target.value)}
                             onBlur={e => onBlurSocial(i, e.target.value)}
                      />
                      <span/>
                    </div>

                  </div>
                </div>
              )
            })
          }

          {
            actualSocial.length > 0 &&
            <div className="flex-between m-1">
              <span>Добавить соц. сеть</span>
              <div className="flex-center w210 h36">
                {actualSocial}
              </div>
            </div>
          }

          <div className="flex-between m-1">
            <span>Дата рождения</span>
            <div className="inputGroup w210">
              <Calendar value={birthday}
                        onChange={e => {
                          const {user} = this.state;
                          user.user_details.birthday = e.currentTarget.value;
                          this.setState({user});
                        }}
              />
              <span/>
            </div>
          </div>

          {/*<div className="flex-between m-1">*/}
          {/*    <span>Валюта</span>*/}
          {/*    <div className="w210 h36">*/}
          {/*        <SingleSelect selected_id={currency_id}*/}
          {/*                      options={data.currencies}*/}
          {/*                      iconWrapper={true}*/}
          {/*                      internalClass="btn-dropdown ripple"*/}
          {/*                      handler={id => {*/}
          {/*                          const {user} = this.state;*/}
          {/*                          user.user_details.currency = id;*/}
          {/*                          this.setState({user});*/}
          {/*                      }}*/}
          {/*        />*/}
          {/*    </div>*/}
          {/*</div>*/}


          <div className="mt-3">
            <button className="btn btn-outline-success" onClick={saveChanges}>Сохранить изменения</button>
          </div>

        </div>

        {isAdmin !== undefined ?
          <div className="p-2" style={{'width': '500px'}}>
            <div className="flex-between m-1">
              <div className="inputGroup ">
                <Select
                  styles={{
                    ...selectStyleDefault
                  }}
                  isMulti={false}
                  isClearable={false}
                  isSearchable={false}
                  className="w-100 login-select"
                  placeholder={'Роль'}
                  defaultValue={editRole !== false ? editRole : null}
                  options={this.state.roles}
                  isDisabled={editRole !== false && editRole.id === 1 ? true : false}
                  onChange={el => {
                    this.setState({rolesId: el})
                  }
                  }
                />
                <span/>
              </div>
            </div>
            <div className="flex-between m-1">
              <div className="inputGroup ">
                <Select
                  isMulti={true}
                  isClearable={false}
                  isSearchable={false}
                  className="w-100 mb-15"
                  placeholder={'Права'}
                  options={this.state.permissions}
                  isDisabled={editRole !== false && editRole.id === 1 ? true : false}
                  defaultValue={editPermissions}
                  onChange={el => {
                    console.log(el);
                    this.setState({permissionsIds: el})
                  }
                  }
                />
                <span/>
              </div>
            </div>
          </div>
        : null}



      </div>
    )
  }
}
