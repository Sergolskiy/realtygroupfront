import React from 'react'
import {Link} from 'react-router-dom'

import Select from "react-select";

// Регистрация нового пользователя
export class Settings_IP extends React.PureComponent {

  state = {
    ipList: [],
    ip: '',
    description: '',
    editId: '',
    editIp: '',
    editDescription: '',
    editUsers: '',
    isOpenEdit: false,
    active: false,
    usersEditSelect: '',

    users: [],
  };


  componentDidMount() {

    get_all_users().done((response) => {
      this.setState({users: response.data});

      check_active_ip().done((response) => {
        console.log(response.data[0].value);
        if (response.data[0].value === '1') {
          this.getIpAddress();
          this.setState({active: true})
        }
      })
    })

  }

  changeActiveIp = () => {
    let state = !this.state.active;
    let data = {
      property: 'ip_filter',
      value: state === true ? 1 : 0
    }

    change_active_ip(data).done(() => {
      this.setState({active: state})
      if(state) this.getIpAddress();
    }).fail(() => {
      alert('Ошибка');
    })

  }

  getIpAddress = () => {
    get_access_ip().done((response) => {
      this.setState({ipList: response.list})
    })
  }

  addIpAddress = () => {
    let editUsers = this.state.editUsers;

    let data = {
      ip: this.state.ip,
      description: this.state.description,
    }

    editUsers.map((item) => {
      data['userIds[' + item.id + ']'] = item.id;
    });

    add_access_ip(data).done((response) => {
      console.log(response);
      this.getIpAddress();

      document.getElementById('ip').value = '';
      document.getElementById('desc').value = '';
      this.setState({editUsers: ''})
    }).fail((error) => {
      alert('Неправильный айпи пример 188.163.19.116');
    })
  }

  removeIpAddress = (id) => {
    remove_access_ip(id).done((response) => {
      console.log(response);
      this.getIpAddress();
    })
  }

  closeEditPopup = () => {
    this.setState({isOpenEdit: false})
  };

  updateIpAddress = () => {

    let usersEditSelect = this.state.usersEditSelect;

    let data = {
      ip: this.state.editIp,
      description: this.state.editDescription
    }

    usersEditSelect.map((item) => {
      data['userIds[' + item.id + ']'] = item.id;
    });


    update_access_ip(data, this.state.editId).done((response) => {
      console.log(response);
      this.getIpAddress();
      this.closeEditPopup();
    }).fail((error) => {
      alert('Неправильный айпи пример 188.163.19.116');
    })
  };

  render() {
    console.log('render Settings_IP');



    return (
      <div className="settings-ip">
        <div className="settings-ip__inner">
          <div className="settings-ip__title">
            Добавленые IP
          </div>

          {/*<div className="ipToggle">*/}
          {/*<input type="checkbox" id="presentationSwitch" onChange={this.onChangeAction} defaultChecked={this.state.active}/>*/}
          {/*<label htmlFor="presentationSwitch">Toggle</label>*/}
          {/*<span>On</span>*/}
          {/*<span>Off</span>*/}
          {/*</div>*/}
          <div className="rentSale ipToggle">
            <input type="checkbox" id="rentSale" onChange={this.changeActiveIp} checked={this.state.active ? 'checked' : false}/>
            <label htmlFor="rentSale">Toggle</label>
            <span>On</span>
            <span>Off</span>
          </div>

          {this.state.active ?
            <React.Fragment>
              {this.state.ipList.length > 0 ?
                this.state.ipList.map((item, index) => {
                  return (
                    <div className="settings-ip__list" key={index}>
                      <div className="settings-ip__item">
                        <div className="settings-ip__ip">
                          {item.ip}
                        </div>
                        <div className="settings-ip__desc">
                          {item.description}
                        </div>

                        <div className="settings-ip__desc">
                          {item.hasOwnProperty('ip_access_users') && item.ip_access_users.map((itemInner, index) => {
                            return (
                              <div key={index}>
                                {itemInner.user.name + ' ' + itemInner.user.surname}
                              </div>
                            )
                          })}
                        </div>

                        <div className="settings-ip__remove">
                          <i className="mdi mdi-pencil btn-style" title="Редактировать пользователя"
                             style={{marginRight: 10}}
                             onClick={() => {
                               let users = [];
                               item.ip_access_users.map((itemInner) => {
                                 users.push(itemInner.user)
                               });
                               this.setState({
                                 isOpenEdit: true,
                                 editIp: item.ip,
                                 editDescription: item.description,
                                 editId: item.id,
                                 usersEditSelect: users,
                               })
                             }}/>
                          <span onClick={() => this.removeIpAddress(item.id)}>✖</span>
                        </div>
                      </div>
                    </div>
                  )
                })

                : 'Записей нет'}



            </React.Fragment>
            : null}


        </div>

        {this.state.active &&
          <div className="settings-ip__add">
            <div>
              <input type="text" placeholder="Ip" id={'ip'} onChange={(e) => this.setState({ip: e.target.value})}/>
              <input type="text" placeholder="Описание"  id={'desc'}
                     onChange={(e) => this.setState({description: e.target.value})}/>
              <Select
                id={'users'}
                isMulti={true}
                isClearable={false}
                isSearchable={false}
                className="w-100 mb-15"
                placeholder={'Пользователи'}
                options={this.state.users}
                getOptionValue={user => user.id}
                value={this.state.editUsers}
                getOptionLabel={user => {
                  if(user.is_archived === 1){
                    return user.name +  user.surname + ' (удален)'
                  }
                  return user.name +  user.surname
                }}
                onChange={el => {
                  this.setState({editUsers: el})
                }
                }
              />
            </div>
            <button className={'btn btn-success'} onClick={this.addIpAddress}>
              Добавить
            </button>

          </div>
        }

        <div className={"popup-edit-comment custom-popup" + (this.state.isOpenEdit ? ' open' : '')} onClick={(e) => {
          e.target.classList[0] === 'popup-edit-comment' ? this.closeEditPopup() : ''
        }}>
          {this.state.isOpenEdit}
          <div className="custom-popup__inner">
            <div className="custom-popup__header">
              <div className="custom-popup__name">
                Редактировать комментарий
              </div>
              <div className="custom-popup__close" onClick={this.closeEditPopup}>
                ✖
              </div>
            </div>
            <div className="custom-popup__content">
              <input className="w-100 p-1" defaultValue={this.state.editIp}
                     onChange={(e) => this.setState({editIp: e.target.value})}/>
              <br/>
              <br/>
              <input className="w-100 p-1" defaultValue={this.state.editDescription}
                     onChange={(e) => this.setState({editDescription: e.target.value})}/>

              <br/>
              <br/>
              {console.log(this.state.usersEditSelect)}
              <Select
                isMulti={true}
                isClearable={false}
                isSearchable={false}
                className="w-100 mb-15"
                placeholder={'Пользователи'}
                options={this.state.users}
                value={this.state.usersEditSelect}
                getOptionValue={user => user.id}
                getOptionLabel={user => {
                  if(user.is_archived === 1){
                    return user.name +  user.surname + ' (удален)'
                  }
                  return user.name +  user.surname
                }}
                onChange={el => {
                  this.setState({usersEditSelect: el})
                }
                }
              />

              <div className="custom-popup__btn">
                <button className="btn btn-outline-primary" onClick={this.closeEditPopup}>отменить</button>
                <button className="btn btn-outline-success" onClick={this.updateIpAddress}>Изменить</button>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}
