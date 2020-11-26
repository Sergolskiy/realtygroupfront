import React from 'react'
import {Back, Title} from "../elements/Elements";
import {Admin_settings} from "./Admin_settings";
import {Settings_users_coworker} from "./settings/users/Settings_users_coworker";
import {Checkin} from "../components/authorization/Checkin";
import {Settings_IP} from "./Settings_IP";

export class Admin extends React.Component {

  state = {
    activeTab: 0,
  }

  render() {
    const {user_profile} = this.props;

    if(user_profile.user_role.id !== 1){
      // history.push("/");
      // this.context.history.push('/')
      location.href = '/cards'
    }

    return (
      <>
        <div className="head navbar flex-nowrap justify-content-start" id="head">
          <Back/>
          <Title data="Админка"/>
        </div>
        <div className="content">
          <div className="tabs _level-1">
            <nav className="nav nav-tabs nav-fill scrollbar-none">
              <a className={"nav-item nav-link" + (this.state.activeTab === 0 ? ' active' : '') }
                 href="javascript:void(0)"
                 aria-controls="nav-notice"
                 data-value="notice"
                 data-toggle="tab"
                 role="tab"
                 aria-selected="true"
                 onClick={() => {this.setState({activeTab: 0})}}>
                Пользователи
              </a>
              <a className={"nav-item nav-link" + (this.state.activeTab === 1 ? ' active' : '')}
                 href="javascript:void(0)"
                 aria-controls="nav-notice"
                 data-value="notice"
                 data-toggle="tab"
                 role="tab"
                 aria-selected="true"
                 onClick={() => {this.setState({activeTab: 1})}}>
                Создать пользователя
              </a>
              <a className={"nav-item nav-link" + (this.state.activeTab === 2 ? ' active' : '')}
                 href="javascript:void(0)"
                 aria-controls="nav-notice"
                 data-value="notice"
                 data-toggle="tab"
                 role="tab"
                 aria-selected="true"
                 onClick={() => {this.setState({activeTab: 2})}}>
                Доступы по IP
              </a>
            </nav>

            <div className="tab-content">
              {this.state.activeTab === 0 ?
                <div>
                  <Settings_users_coworker user_profile={user_profile} fromAdmin={true}/>
                </div>
                : null}


              {this.state.activeTab === 1 ?
                <div>
                  <Checkin/>
                </div>
                : null}

              {this.state.activeTab === 2 ?
                <div>
                  <Settings_IP/>
                </div>
                : null}
            </div>
          </div>

        </div>
      </>
    )
  }
}
