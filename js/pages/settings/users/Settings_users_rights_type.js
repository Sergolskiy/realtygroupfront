import React from 'react'
import {NavTabs} from "../../../elements/NavTabs";
import {Settings_users_rights_table} from "./Settings_users_rights_table";

export class Settings_users_rights_type extends React.Component {
    render() {
        return (
            <NavTabs className="tabs _level-4" tabsName="users_type" defaultActiveKey="profile" options={[
                {value: 'profile', title: 'Продажа объектов', content: <Settings_users_rights_table/>},
                {value: 'notice', title: 'Аренда объектов', content: <Settings_users_rights_table/>},
                {value: 'category', title: 'Заявка на покупку', content: <Settings_users_rights_table/>},
                {value: 'advertising', title: 'Заявка на аренду', content: <Settings_users_rights_table/>},
                {value: 'contact', title: 'Контакты', content: <Settings_users_rights_table/>},
                {value: 'tasks', title: 'Задачи', content: <Settings_users_rights_table/>}
            ]}/>
        )
    }
}