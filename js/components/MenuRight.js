import React from 'react'
import {Link} from 'react-router-dom'
import {store} from "../reducers";
import {MenuRight_head} from "./MenuRight_head";

export class MenuRight extends React.PureComponent {

    componentDidMount() {
        toggle_menu_right()
    }

    render() {
        console.log('render MenuRight');

        const {user_profile, dealtype} = this.props;

        // const showSections = location.hostname !== 'crm.realtygroup.biz';
        const showSections = location.hostname !== 'asabix.net.ua';


        let permissions = JSON.parse(window.localStorage.getItem('access')).permissions;
        let role = JSON.parse(window.localStorage.getItem('access')).role;

        return (
            <div className="substrate" id="substrate">

                <div className="menu-right" id="menu-right">

                    <MenuRight_head user_profile={user_profile} dealtype={dealtype}/>

                    <div className="menu-right-list">

                        {
                            showSections &&
                            <>
                                <Link to="/cards" className="_transactions">
                                    <i className="mdi mdi-clipboard-text-outline"/>
                                    <span>Сделки</span>
                                </Link>

                                <Link to="/contacts" className="_contact">
                                    <i className="mdi mdi-account-multiple"/>
                                    <span>Контакты</span>
                                </Link>

                                <Link to="/tasks" className="_tasks">
                                    <i className="mdi mdi-calendar-clock"/>
                                    <span>Задачи</span>
                                </Link>
                            </>
                        }


                        {/*<Link to="/documents" className="_doc">*/}
                            {/*<i className="mdi mdi-file-document"/>*/}
                            {/*<span>Документы</span>*/}
                        {/*</Link>*/}

                        {
                            data.rights.showAnalytics.includes(user_profile.id) &&
                            <Link to="/analytics" className="_analitic">
                                <i className="mdi mdi-chart-bar"/>
                                <span>Аналитика</span>
                            </Link>
                        }


                        {/*<Link to="/archive" className="_archive">*/}
                        {/*    <i className="mdi mdi-database"/>*/}
                        {/*    <span>Архив</span>*/}
                        {/*</Link>*/}

                        <hr/>

                        <Link to="/settings" className="_other">
                            <i className="mdi mdi-settings"/>
                            <span>Настройки</span>
                        </Link>

                        {/*<Link to="/support" className="_other">*/}
                            {/*<i className="mdi mdi-message-text-outline"/>*/}
                            {/*<span>Поддержка</span>*/}
                        {/*</Link>*/}

                        <Link to="/training" className="_other">
                            <i className="mdi mdi-sitemap"/>
                            <span>Обучение</span>
                        </Link>

                        <Link to="/cards-archive" className="_other">
                            <i className="mdi mdi-sitemap"/>
                            <span>Архив</span>
                        </Link>

                        <Link to="/external_sources" className="_other">
                            <i className="mdi mdi-sitemap"/>
                            <span>Внешние источники</span>
                        </Link>

                        {role === 'ROLE_ADMIN' &&
                            <Link to="/admin" className="_other">
                                <i className="mdi mdi-panda"/>
                                <span>Админка</span>
                            </Link>
                        }

                    </div>

                </div>

            </div>

        )
    }
}
