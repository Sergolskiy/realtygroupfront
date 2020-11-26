import React from 'react'
import {Back, Title} from "../elements/Elements";
import {NavTabs} from "../elements/NavTabs";
import {Analytics_users} from "./Analytics_users";
import {Analytics_categories} from "./Analytics_categories";
import {Analytics_areas} from "./Analytics_areas";

export class Analytics extends React.PureComponent {

    state = {
        users_statistics: {},
        users: [],
        stages: data.dealStages.sale,
        isLoad: false
    };

    changeState = obj => {
        this.setState(obj)
    };

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        const {changeState} = this;
        const {stages} = this.state;
        get_users({page: 1, size: 100, is_archived: 0}).done(function (answer) {
            const users = answer.data;
            changeState({users});
            get_analytics_users(users.map(user => user.id), stages.map(stage => stage.value)).done(function (answer) {
                changeState({users_statistics: answer, isLoad: true})
            })
        })

    };

    render() {
        console.log('render Analytics');

        const {users_statistics, users, stages, isLoad} = this.state;
        const {user_profile} = this.props;


        return (
            <>
                <div className="head navbar flex-nowrap justify-content-start" id="head">
                    <Back/>
                    <Title data="Аналитика"/>
                </div>
                <div className="content">

                    <NavTabs
                        className="tabs _level-1"
                        tabsName="analytics"
                        defaultActiveKey="sale"
                        urlTabs={true}
                        options={[
                            {
                                value: 'property',
                                title: <>
                                    <i className="mdi mdi-clipboard-text-outline fs22 d-inline d-md-none"/> {/*Моб*/}
                                    <i className="mdi mdi-clipboard-text-outline fs18 d-none d-md-inline"/> {/*ПК*/}
                                    <span className="d-none d-md-inline">Недвижимость</span>
                                </>,
                                content: <div>
                                    <Analytics_categories/>
                                    <Analytics_areas/>
                                </div>
                            },
                            {
                                value: 'sale',
                                title: <>
                                    <i className="mdi mdi-clipboard-text-outline fs22 d-inline d-md-none"/> {/*Моб*/}
                                    <i className="mdi mdi-clipboard-text-outline fs18 d-none d-md-inline"/> {/*ПК*/}
                                    <span className="d-none d-md-inline">Отдел продаж</span>
                                </>,
                                content: isLoad ?
                                    <Analytics_users
                                        stages={stages}
                                        users={users}
                                        users_statistics={users_statistics}
                                    />
                                    : 'Загрузка данных'
                            },
                            {
                                value: 'rent',
                                title: <>
                                    <i className="mdi mdi-clipboard-text-outline fs22 d-inline d-md-none"/> {/*Моб*/}
                                    <i className="mdi mdi-clipboard-text-outline fs18 d-none d-md-inline"/> {/*ПК*/}
                                    <span className="d-none d-md-inline">Отдел аренды</span>
                                </>,
                                content: ''
                            },
                            {
                                value: 'agency',
                                title: <>
                                    <i className="mdi mdi-clipboard-text-outline fs22 d-inline d-md-none"/> {/*Моб*/}
                                    <i className="mdi mdi-clipboard-text-outline fs18 d-none d-md-inline"/> {/*ПК*/}
                                    <span className="d-none d-md-inline">Агентство</span>
                                </>,
                                content: ''
                            }
                        ]}
                    />


                </div>
            </>
        )
    }
}