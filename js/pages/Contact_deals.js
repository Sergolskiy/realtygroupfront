import React from 'react'
import {Link} from 'react-router-dom'
import {Stage_up} from "../elements/Stage_up";
import {User_photo} from "../elements/User_photo";

// contacts_id - id контакта для фильтрации карточек (опция)
// size - кол-во строк пагинации

export class Contact_deals extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            cards_query: {},
            cards: [],
            cities: {},
            office: {},
            loading: true
        }
    }

    loadData = () => {
        const {size, contacts_id, user_profile} = this.props;
        const {changeState} = this;
        const newState = {};

        $.when(
            get_office(user_profile.office_id).done(office => Object.assign(newState, {office})),
            get_cities().done(cities => Object.assign(newState, {cities})),
            get_cards_filtered({
                page: 1,
                size,
                contacts_id
            }).done(function (cards_query) {
                Object.assign(newState, {
                    cards_query,
                    cards: cards_query.data || []
                })
            })
        ).done(function () {
            Object.assign(newState, {loading: false});
            changeState(newState)
        })
    };


    loadCardsMore = () => {
        const {size, contacts_id} = this.props;
        const {cards, cards_query} = this.state;
        const {changeState} = this;


        changeState({loading: true});
        get_cards_filtered({
            page: cards_query.current_page + 1,
            size,
            contacts_id
        }).done(function (cards_query) {
            changeState({
                cards_query,
                cards: cards.concat(cards_query.data || []),
                loading: false
            })
        })
    };

    componentDidMount() {
        this.loadData()
    }

    changeState = (obj) => {
        this.setState(obj)
    };

    trDoubleClick = (e) => {
        document.getElementById('card' + e.currentTarget.dataset.cardId).click()
    };

    render() {
        console.log('render Cards_table');

        const {loading, cards, cards_query, office, cities} = this.state;
        const {trDoubleClick} = this;
        const {current_page, last_page, to, total} = cards_query;

        const all_categories = data.categories;
        const {currencies} = data;


        const tbody = cards
            .map(function (cardInfo, i) {

                const {city, area, street} = cardInfo;
                const cityValueArr = city ? city.split(',') : [];
                const cityValue = cityValueArr.includes(office.city) ? office.city : (cityValueArr.length === 1 ? city : '');
                const {areas, streets} = cities[cityValue] || {};
                const area_titles = area && areas && area.split(',').map(item => areas[item]).join(', ');
                const street_titles = street && streets && street.split(',').map(item => streets[item]).join(', ');


                const price = +cardInfo.price;

                const {contract_expiration_date} = cardInfo;
                let classContract, contract_ymd;
                if (contract_expiration_date) {
                    classContract = contract_expiration_date + 86400000 > Date.now() ? 'text-warning' : 'text-danger';
                    contract_ymd = dateMsToFormat(contract_expiration_date, "YYYY-MM-DD", currentZone());
                }
                else {
                    classContract = 'd-none'
                }

                const dealtype = cardInfo.type;
                const dealDirection = cardInfo.sale_type;

                const files = cardInfo.card_files;
                const isPhoto = files.some(item => item.type === 'image/*');

                const categories = all_categories[dealtype] || [];
                const category = categories.find(item => item.value === cardInfo.category) || {};
                const subcategories = category.subcategories || [];
                const subcategory = subcategories
                    .filter(item => (cardInfo.subcategory || '').split(',').indexOf(item.value) >= 0)
                    .map(item => item.title)
                    .join(', ');

                const link = "/cards/" + cardInfo.id;

                const currency_value = dealtype === 'rent' ? 'uah' : (dealtype === 'sale' ? 'usd' : '');
                const currency_option = currencies.find(item => item.value === currency_value) || {};
                const currency_title = currency_option.title || '';

                return (
                    <tr key={cardInfo.id} data-card-id={cardInfo.id} onDoubleClick={trDoubleClick} className="cursor-pointer">

                        <td>
                            <Link to={link} id={"card" + cardInfo.id}>
                                <div className="title-card">
                                    <div>
                                        {dealDirection === "object" && <i className="mdi mdi-home-city-outline color-blue mr-1"/>}
                                        {dealDirection === "request" && <i className="mdi mdi-account-box-outline color-red mr-1"/>}
                                        {subcategory}
                                    </div>
                                    <div>
                                        {area_titles ? area_titles : ''}
                                        {street_titles ? ', ' + street_titles : ''}
                                    </div>
                                    {/*<div>{transform_typedeal(dealtype, cardInfo.sale_type)} №{cardInfo.id}</div>*/}
                                </div>
                            </Link>
                        </td>

                        <td>
                            <Stage_up cardInfo={cardInfo}/>
                        </td>

                        <td>
                            {
                                // howMuchTimeHasPassed(cardInfo.created_at)
                                moment.utc(cardInfo.created_at, "YYYY-MM-DD HH:mm:ss").fromNow(true)
                            }
                        </td>

                        <td>
                            {
                                // dateMsToFormat(Date.parse(cardInfo.updated_at + 'Z'), 'YYYY-MM-DD', currentZone())
                                moment.utc(cardInfo.updated_at, "YYYY-MM-DD HH:mm:ss").local().format('DD-MM-YYYY')
                            }
                        </td>

                        <td>
                            <User_photo user={cardInfo.card_user}/>
                        </td>

                        <td className="text-nowrap">
                            {moneyMask(price)} {currency_title}
                        </td>

                        <td>
                            {isPhoto && <i className="mdi mdi-image-area fs22"/>}
                        </td>

                        <td title={contract_ymd} data-toggle="tooltip">
                            <span className={classContract}>
                                <i className="mdi mdi-key"/>
                            </span>
                        </td>

                        <td>
                            <i className="mdi mdi-information-outline fs22"/>
                        </td>

                    </tr>
                )
            });


        return (
            <>
                {loading && <div className="google-loader"><span/><span/><span/><span/></div>}

                <div className="table-cards">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col" className="_nodropdown">Подтип</th>
                            <th scope="col" className="_nodropdown">Этап сделки</th>
                            <th scope="col" className="_nodropdown">В работе</th>
                            <th scope="col" className="_nodropdown">Изменение</th>
                            <th scope="col" className="_nodropdown">
                                <i className="mdi mdi-account-outline fs22" title="Сотрудник" data-toggle="tooltip"/>
                            </th>
                            <th scope="col" className="_nodropdown">Цена</th>
                            <th scope="col" className="_nodropdown">
                                <i className="mdi mdi-image-area fs22" title="Наличие фотографий" data-toggle="tooltip"/>
                            </th>
                            <th scope="col" className="_nodropdown">
                                <i className="mdi mdi-key" title="Дата истечения договора" data-toggle="tooltip"/>
                            </th>
                            <th scope="col" className="_nodropdown">
                                <i className="mdi mdi-dots-vertical fs22"/>
                            </th>
                        </tr>

                        </thead>
                        <tbody>
                        {tbody}
                        </tbody>
                    </table>

                    {
                        tbody.length === 0 && !loading ?
                        <div className="text-center">
                            <img src="/images/empty_content.png" alt="Нет данных для отображения" className="wmax-100"/>
                        </div>
                        : null
                    }

                </div>


                {
                    current_page < last_page &&
                    <div className="flex-center mb-2">
                        <button className="btn btn-outline-primary btn-sm" onClick={this.loadCardsMore}>
                            <span><i className="mdi mdi-refresh"/> Показать ещё {to} / {total}</span>
                        </button>
                    </div>
                }

                {/*<Pagination*/}
                {/*    last_page={last_page}*/}
                {/*    current_page={current_page}*/}
                {/*    load={this.loadCards}*/}
                {/*/>*/}

            </>
        )
    }
}