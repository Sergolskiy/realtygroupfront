import React from 'react'
import {NavTabs} from "../../elements/NavTabs";
import {Settings_users_rights} from "./users/Settings_users_rights";
import {Settings_users_coworker} from "./users/Settings_users_coworker";

export class Settings_users extends React.PureComponent {

    render() {
        console.log('render Settings_users');

        const {user_profile} = this.props;

        return (
            <NavTabs className="tabs _level-2" tabsName="users" defaultActiveKey="coWorkers" options={[
                // {value: 'office', title: 'Офисы', content: <img src="/images/settings-users-4.jpg"/>},
                {value: 'coWorkers', title: 'Сотрудники', content: <Settings_users_coworker user_profile={user_profile}/>},
                {value: 'rights', title: 'Роли и права', content: <Settings_users_rights/>}
            ]}/>
        )
    }
}