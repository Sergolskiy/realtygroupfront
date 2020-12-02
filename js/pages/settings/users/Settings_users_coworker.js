import React from 'react'
import {User_photo} from "../../../elements/User_photo";
import {toast} from "react-toastify";
import {Link} from 'react-router-dom'
import Select from "react-select";

export class Settings_users_coworker extends React.PureComponent {

  state = {
    users: [],
    offices: [],
    offices_partitions: [],
    roles: [],
    show_archived_users: 0,
    isOpenDelete: false,
  };

  changeState = (obj) => {
    this.setState(obj)
  };

  loadData = () => {

    const newState = {};

    $.when(
      get_users({page: 1, size: 99999, is_archived: 0}).done(function (users) {
        newState.users = users.data
      }),

      get_offices({}, true, 5, true).done(function (offices) {
        newState.offices = offices.data
      }),

      get_offices_partitions({}, true, 5, true).done(function (offices_partitions) {
        newState.offices_partitions = offices_partitions.data
      }),

      get_roles({}, true, 0.01, true).done(function (roles) {
        newState.roles = roles.data
      })
    ).then(function () {
      this.setState(newState)
    }.bind(this))

  };

  loadUsers = (param) => {
    const {changeState} = this;

    get_users(param).done(function (users) {
      changeState({users: users.data})
    })
  };

  componentDidUpdate(prevProps, prevState) {
    const {show_archived_users} = this.state;
    if (prevState.show_archived_users !== show_archived_users) {
      this.loadUsers({page: 1, size: 99999, is_archived: show_archived_users})
    }
  }

  componentDidMount() {
    this.loadData()
  }

  del_user = e => {
    this.setState({userRemoveID: e.currentTarget.dataset}) ;
    this.setState({isOpenDelete: true})
  };

  remove = () => {
    const {loadUsers} = this;
    if (confirm('Удалить пользователя?')) {
      user_archived(this.state.userRemoveID.userId).done(() => {
        loadUsers({page: 1, size: 99999, is_archived: 0});
        toast.success(' ✔ Пользователь удален');
        this.closeDeletePopup();
      })
    }
  }

  removeAndTransport = () => {
    const {loadUsers} = this;
    if (confirm('Удалить пользователя?')) {
      user_archived_transport(this.state.userRemoveID.userId, this.state.userTransportID).done(() => {
        loadUsers({page: 1, size: 99999, is_archived: 0});
        toast.success(' ✔ Пользователь удален');
        this.closeDeletePopup();
      })
    }
  }

  closeDeletePopup = () => {
    this.setState({isOpenDelete: false})
  }

  recover_user = e => {
    const {userId} = e.currentTarget.dataset;
    const {loadUsers} = this;
    if (confirm('Восстановить пользователя?')) {
      user_unarchived(userId).done(function () {
        loadUsers({page: 1, size: 99999, is_archived: 1});
        toast.success(' ✔ Пользователь восстановлен');
      })
    }
  };

  change_archived = e => {
    const show_archived_users = +e.currentTarget.dataset.archived;
    console.log(e.currentTarget.dataset.archived, show_archived_users);
    this.setState({show_archived_users})
  };

  render() {
    console.log('render Settings_users_coworker');

    const {user_profile} = this.props;
    const {fromAdmin} = this.props;
    const {users, offices, offices_partitions, roles, show_archived_users} = this.state;
    const {del_user, recover_user, change_archived} = this;

    let canDelUsers = data.rights.delUser.includes(user_profile.id);
    canDelUsers = true;
    return (
      <div className="table-suite">
        {
          canDelUsers && (
            show_archived_users ?
              <button className="btn btn-success" data-archived={0} onClick={change_archived}>
                Активные пользователи
              </button> :
              <button className="btn btn-success" data-archived={1} onClick={change_archived}>
                Удаленные пользователи
              </button>
          )
        }

        <table className="table">
          <thead>
          <tr>
            <th scope="col">ФИО</th>
            <th scope="col">Объектов и заявок</th>
            <th scope="col">Роль</th>
            <th scope="col">Отдел</th>
            <th scope="col">Офис</th>
            <th scope="col"><i className="mdi mdi-phone"/></th>
            {canDelUsers && <th scope="col"><i className="mdi mdi-delete"/></th>}
            {fromAdmin && <th scope="col"><i className="mdi mdi-pencil fs24 color-blue"></i></th>}
          </tr>
          </thead>
          <tbody>
          {
            users.map(function (user) {

              const office = offices.find(item => item.id === user.office_id);
              const office_partition = offices_partitions.find(item => item.id === user.offices_partition_id);
              const role = roles.find(item => item.id === user.role_id);

              return (
                <tr key={user.id}>
                  <td>
                    <div className="flex-left">
                      <User_photo user={user}/>
                      <span className="ml-2" title={user.id}>
                                                {user.surname + ' ' + user.name + ' ' + user.middle_name}
                                            </span>
                    </div>
                  </td>
                  <td>{user.count_cards_not_archived || ''}</td>
                  <td>{role ? role.title : ''}</td>
                  <td>{office_partition ? office_partition.title : ''}</td>
                  <td>{office ? office.title : ''}</td>
                  <td><i className="mdi mdi-phone cursor-pointer"/></td>
                  {
                    canDelUsers &&
                    <td>
                      {
                        user.is_archived ?
                          <i className="mdi mdi-backup-restore cursor-pointer"
                             data-user-id={user.id}
                             onClick={recover_user}
                             title="Восстановить пользователя"/> :
                          <i className="mdi mdi-window-close cursor-pointer"
                             data-user-id={user.id}
                             onClick={del_user}
                             title="Удалить пользователя"/>
                      }
                    </td>
                  }

                  {fromAdmin && <th scope="col"><Link to={'/admin/' + user.id}><i className="mdi mdi-pencil btn-style"></i></Link></th>}
                </tr>
              )
            })
          }
          </tbody>
        </table>



        {/*<img src="/images/settings-users-5.jpg"/>*/}

        <div className={"popup-del-user custom-popup" + (this.state.isOpenDelete ? ' open' : '')} onClick={(e) => {
          e.target.classList[0] === 'popup-del-user' ? this.closeDeletePopup() : ''}}>
          <div className="custom-popup__inner">
            <div className="custom-popup__header">
              <div className="custom-popup__name">
                Передать права другому пользователю?
              </div>
              <div className="custom-popup__close" onClick={this.closeDeletePopup}>
                ✖
              </div>
            </div>
            <div className="custom-popup__content">
              <Select
                styles={{
                  ...selectStyleDefault
                }}
                isMulti={false}
                isClearable={false}
                isSearchable={false}
                className="w-100 login-select"
                placeholder={'Пользователь'}
                options={users}
                getOptionLabel={users => users.name + ' ' + users.surname + ' ' + users.middle_name}
                onChange={el => {
                  this.setState({userTransportID: el.id})
                }
                }
              />

              <div className="custom-popup__btn">
                <button className="btn btn-outline-success" onClick={this.removeAndTransport}>Передать</button>
                <button className="btn btn-outline-primary" onClick={this.remove}>Удалить без передачи</button>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}
