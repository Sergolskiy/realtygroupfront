import React from 'react'
import {connect} from "react-redux"
import {Add} from "../elements/Elements"
import {MenuRight} from '../components/MenuRight'
import {Cards_table} from './Cards_table'
import {ModalAdd} from '../components/modal/ModalAdd'
import {ObjectsRequests} from "../elements/ObjectsRequests";
import ReactToPrint from "react-to-print";

class Cards extends React.PureComponent {

    componentDidMount() {
        legitRipple();
        this.loadData();
        window.Cards = this
    }

    constructor(props) {
        super(props);

        const searchParams = new URLSearchParams(location.search);

        this.state = {
            cities: {},
            office: {},
            offices_partition: {},
            users: [],
            loading: true,

            // Фильтрация
            dealtype: '', // rent sale (type)
            dealdirection: searchParams.get('dealdirection') || sessionStorage.getItem('dealdirection'), // object request (sale_type)
            category: searchParams.get('category') || sessionStorage.getItem('category'),

            print_mode: false
        }
    }

    changeStateCards = obj => {
        this.setState(obj)
    };

    loadData = () => {
        const {user_profile} = this.props;
        const {changeStateCards} = this;
        const newState = {};

        $.when(
            get_office(user_profile.office_id).done(office => Object.assign(newState, {office})), // Для городов, районов, улиц
            get_offices_partition(user_profile.offices_partition_id).done(function (offices_partition) { // Для аренды продажи
                Object.assign(newState, {
                    offices_partition,
                    dealtype: sessionStorage.getItem('dealtype') || offices_partition.type
                })
            }),
            get_users().done(users => Object.assign(newState, {users: users.data})), // Для фильтра по юзерам
            get_cities().done(cities => Object.assign(newState, {cities})) // Для правильно отображения карточек и для фильтров тоже
        ).done(function () {
            Object.assign(newState, {loading: false});
            changeStateCards(newState)
        })
    };

    // Этапы, которые светить по умолчанию и после сброса фильтрации
    func_defaultStages = (dealtype, defaultStages) => {
        const {dealStages} = data;
        const dealStagesSR = dealStages[dealtype] || [];
        return dealStagesSR
            .filter(option => defaultStages.every(item => item !== option.value)) // Оставить все, кроме defaultStages
            .map(option => option.value)
            .join(',')
    };

    render() {
        console.log('render Cards');

        const {loading, dealtype, dealdirection, category, users, office, cities} = this.state;
        const {modalAddIsOpen, user_profile} = this.props;
        const {changeStateCards, func_defaultStages} = this;

        if (loading) return <div className="google-loader"><span/><span/><span/><span/></div>;

        const defaultStages = func_defaultStages(dealtype, ['successfully', 'poorly', 'statistics']);

        let permissions = JSON.parse(window.localStorage.getItem('access')).permissions;

        return (
            <>

                <div className="head navbar flex-nowrap">

                    <Add/>

                    {/* Currency_old_20190501 */}
                    {/*<div className="d-none d-md-block w75 h33">*/}
                    {/*</div>*/}


                    <ObjectsRequests all_categories={data.categories} changeStateCards={changeStateCards} dealdirection={dealdirection} category={category}/>

                    <div className="d-none d-md-block">
                        {
                            data.rights.print.includes(user_profile.id) &&
                            <ReactToPrint
                                trigger={() => <i className="mdi mdi-printer fs26 color-gray cursor-pointer"/>}
                                content={() => this.componentRef}
                                onBeforeGetContent={() => new Promise(resolve => this.setState({print_mode: true}, resolve))}
                                onAfterPrint={() => this.setState({print_mode: false})}
                            />
                        }
                    </div>

                    <div className="dropdown ml-md-3 mr-md-4">
                        <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false">
                            <div className="ripple circle-hover">
                                <i className="mdi mdi-bell-outline fs24 color-yellow"/>
                                {/*<span class="count">4</span>*/}
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                            <a className="dropdown-item" href="#">Нет уведомлений</a>
                        </div>
                    </div>

                    <div className="btn-menu-right" id="btn-menu-right">
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                    </div>

                </div>


                <div className="content">
                    <div className="wh-100 overflow-auto">
                        { permissions.hasOwnProperty('cards') && permissions.cards.hasOwnProperty('see') ?
                        <Cards_table
                            dealtype={dealtype}
                            dealdirection={dealdirection}
                            category={category}
                            defaultStages={defaultStages}
                            defaultRealtor={user_profile.id}
                            users={users}
                            office={office}
                            cities={cities}
                            size={15}
                            ref={el => (this.componentRef = el)}
                            print_mode={this.state.print_mode}
                        />
                        : 'У вас не достаточно прав для просмотра' }
                    </div>
                </div>

                <MenuRight user_profile={user_profile} dealtype={dealtype}/>

                {modalAddIsOpen && <ModalAdd user_profile={user_profile} cities={cities} office={office}/>}

            </>
        )
    }
}

Cards = connect(store => store.reducerCards)(Cards);
export {Cards}

