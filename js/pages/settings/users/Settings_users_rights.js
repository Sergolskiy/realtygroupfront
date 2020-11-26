import React from 'react'
import {NavTabs} from "../../../elements/NavTabs";
import {Settings_users_rights_type} from "./Settings_users_rights_type";

export class Settings_users_rights extends React.Component {
    render() {
        return (
            <div>
                <div className="m-3">
                    При регистрации на сайте создаётся аккаунт Директора агентства. У него есть все полномочия<br/>
                    В этом аккаунте уже существуют стандартные Группы пользователей, которые описаны ниже<br/>
                    Директор агентства может удалять/добавлять/редактировать Группы пользователей, а так же присваивать
                    им полномочия
                </div>

                <NavTabs className="tabs _level-3" tabsName="users_rights" defaultActiveKey="profile" options={[
                    {value: 'profile', title: 'Руководитель продаж', content: <Settings_users_rights_type/>},
                    {value: 'notice', title: 'Руководитель аренды', content: <Settings_users_rights_type/>},
                    {value: 'category', title: 'Риэлтор продажник', content: <Settings_users_rights_type/>},
                    {value: 'advertising', title: 'Риэлтор арендник', content: <Settings_users_rights_type/>}
                ]}/>

                <div className="mb-5"/>

                <img src="/images/settings-users-1.jpg"/>
                <img src="/images/settings-users-2.jpg"/>
                <img src="/images/settings-users-3.jpg"/>
            </div>
        )
    }
}