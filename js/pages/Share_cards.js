import React from "react";
import {Share_cards_slider} from "./Share_cards_slider";
import ReactGA from 'react-ga';
import {Card_main_field} from "./Card_main_field";
import {Card_main_realtor} from "./Card_main_realtor";
import {Link} from "react-router-dom";

export class Share_cards extends React.PureComponent {

    state = {
        share_cards: [],
        user: {},
        cities: {},
        loading: true
    };

    changeState = obj => {
        this.setState(obj)
    };

    loadData = () => {
        const {changeState} = this;
        const {hash} = this.props.match.params;

        get_share_cards(hash).done(function (answer) {
            changeState({share_cards: answer.content, user: answer.user, loading: false})
        }).fail(function () {
            changeState({loading: false})
        });
        get_cities().done(cities => changeState({cities}))

    };

    componentDidMount() {
        this.loadData();

        ReactGA.initialize('UA-96182961-2');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    // Логика для сортировки карточек: по убыванию ID и архивные всегда снизу
    sort_share_cards = (a, b) => {
        const x = a.is_archived;
        const y = b.is_archived;
        const z = a.id > b.id;
        return !x && (z || y) || y && z ? -1 : 1;

        // if (a.is_archived) {
        //     if (b.is_archived) {
        //         if (a.id > b.id) {
        //             return -1
        //         } else {
        //             return 1
        //         }
        //     } else {
        //         return 1
        //     }
        // } else {
        //     if (b.is_archived) {
        //         return -1
        //     } else {
        //         if (a.id > b.id) {
        //             return -1
        //         } else {
        //             return 1
        //         }
        //     }
        // }
    };

    render() {
        console.log('render Share_cards');

        const {share_cards, cities, user, loading} = this.state;

        const fields_values_arr = ['layout', 'bathroom', 'corner', 'balcony', 'roof', 'electricity', 'sewage', 'gas', 'water_pipes', 'land_area', 'how_plot_fenced', 'year_built', 'payments', 'household_appliances'];
        const {fields} = data;

        return (
            loading ?

                <div className="google-loader"><span/><span/><span/><span/></div> :

                share_cards.length === 0 ?

                    <div className="text-center">
                        <img src="/images/empty_content.png" alt="Нет данных для отображения" className="wmax-100"/>
                    </div> :

                    <div className="Share_cards">

                        <div className="flex-center mb-5">
                            <Card_main_realtor user={user}/>
                        </div>


                        {
                            share_cards.sort(this.sort_share_cards).map(function (share_card) {

                                const dealType = share_card.type;
                                const dealDirection = share_card.sale_type;

                                const all_categories = data.categories;

                                const categories = all_categories[dealType] || [];
                                const category = categories.find(item => item.value === share_card.category) || {};

                                const subcategories = category.subcategories || [];
                                const subcategory = subcategories
                                    .filter(item => (share_card.subcategory || '').split(',').includes(item.value))
                                    .map(item => item.title)
                                    .join(', ');



                                const city_value = share_card.city;
                                const cityArr = cities[city_value] || {};
                                const streets = cityArr.streets;
                                const street_values = share_card.street;
                                const street_titles = street_values && streets && street_values.split(',').map(item => streets[item]).join(', ');


                                return (
                                    <div className="card" key={share_card.id}>

                                        <h5 className="card-header">
                                            <div>
                                                {dealDirection === 'object' && <i className="mdi mdi-home-city-outline color-blue mr-1"/>}
                                                {dealDirection === 'request' && <i className="mdi mdi-account-box-outline color-red mr-1"/>}
                                                {subcategory}
                                                {street_titles && ', ' + street_titles}
                                            </div>

                                            {!!share_card.is_archived && <span className="color-red fs30">ПРОДАНО</span>}
                                        </h5>
                                        <div className="card-body">

                                            <Share_cards_slider files={share_card.files}/>

                                            <div className="flex-between">
                                                <h5 className="mt-2">Этаж: {share_card.number_of_floors || '-'}/{share_card.floors_house || '-'}</h5>
                                                <h5>{share_card.price} {(share_card.currency || '').toUpperCase()}</h5>
                                            </div>

                                            <div className="text-right">

                                                <Link to={"/cards/" + share_card.id} target="_blank" rel="noreferrer noopener">
                                                    № {share_card.id}
                                                </Link>

                                            </div>


                                            <div>
                                                {
                                                    fields_values_arr.map(function (categoryField, i) {

                                                        const field = fields[categoryField] || {};

                                                        const value = get_field_title(share_card, categoryField);

                                                        // Скрываем поле, если его значение не найдено, не указано, или поле имеет статус hide: true, и не равно нулю
                                                        if (!value && value !== 0) return null;

                                                        return <Card_main_field key={i} title={field.label} value={value} show_in_one_line={true}/>
                                                    })
                                                }
                                            </div>


                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
        )
    }
}