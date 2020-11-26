import React from 'react'
import {Back, Title} from "../elements/Elements";
import {TableNotice} from "../components/tables/TableNotice";
import {NavTabs} from "../elements/NavTabs";
import {Settings_users} from "./settings/Settings_users";
import {Settings_profile} from "./Settings_profile";

export class Settings extends React.PureComponent {
    componentDidMount() {
        legitRipple()
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    render() {
        const {user_profile} = this.props;
        return (
            <>
                <div className="head navbar flex-nowrap justify-content-start" id="head">
                    <Back/>
                    <Title data="Настройки"/>
                </div>
                <div className="content">
                    <NavTabs className="tabs _level-1" tabsName="settings" defaultActiveKey="profile" options={[
                        {value: 'profile', title: 'Профиль', content: <Settings_profile user_profile={user_profile}/>},
                        {value: 'notice', title: 'Уведомления', content: <TableNotice/>},
                        {value: 'users', title: 'Сотрудники', content: <Settings_users user_profile={user_profile}/>},
                        {value: 'stages', title: 'Этапы сделок', content: <img src="/images/settings-stages.png" alt=""/>}
                    ]}/>
                </div>
            </>
        )
    }
}