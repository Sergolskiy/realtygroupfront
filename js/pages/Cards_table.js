import React from 'react'
import {Link} from 'react-router-dom'
import Select from 'react-select';
import {Stage_up} from "../elements/Stage_up";
import {InputMoney} from "../elements/InputMoney";
import {Cards_table_photo} from "./Cards_table_photo";
import {MenuList} from "../elements/MenuList";
import {User_photo} from "../elements/User_photo";
import {Th_stage} from "../elements/Th_stage";
import {Cards_td_description_comment} from "./Cards_td_description_comment";


// dealtype - rent, sale (опция)
// dealdirection - object, request (опция)
// category - категория (опция)
// defaultStages - этапы по умолчанию '1,2,3,4' (опция)
// contacts_id - id контакта для фильтрации карточек (опция)
// defaultRealtor - id риэлтора по умолчанию (опция)
// users - список юзеров
// size - кол-во строк пагинации
// office - офис

export class Cards_table extends React.PureComponent {

    constructor(props) {
        super(props);


        // Фильтры
        const searchParams = new URLSearchParams(location.search);

        const subcategory = searchParams.get('subcategory') || stor.session.get('f_subcategory');
        const city = searchParams.get('city') || stor.session.get('f_city');
        const area = searchParams.get('area') || stor.session.get('f_area');
        const street = searchParams.get('street') || stor.session.get('f_street');
        const stage =
            searchParams.has('stage') ? // GET запрос в адресной строке
                searchParams.get('stage') :
                stor.session.is('f_stage') ? // Session Storage
                    stor.session.get('f_stage') :
                    this.props.defaultStages; // Props

        const realtor =
            searchParams.has('realtor') ?
                searchParams.get('realtor') :
                stor.session.is('f_realtor') ?
                    stor.session.get('f_realtor') :
                    this.props.defaultRealtor;
        const price_from = stor.session.get('f_price_from');
        const price_to = stor.session.get('f_price_to');

        this.state = {

            cards_query: {},
            cards: [],
            loading: true,

            // Значения фильтров
            s_subcategory: subcategory,
            s_city: city,
            s_area: area,
            s_street: street,
            s_stage: stage,
            s_realtor: realtor,
            s_price_from: price_from,
            s_price_to: price_to,

            // Непосредственная фильтрация
            f_subcategory: subcategory,
            f_city: city,
            f_area: area,
            f_street: street,
            f_stage: stage,
            f_realtor: realtor,
            f_price_from: price_from,
            f_price_to: price_to,

            // Значение сортировки
            // sort: {
            //     field: stor.session.get('s_field'), // поле в БД
            //     by: stor.session.get('s_field') // asc или desc
            // },

            // Непосредственная сортировка
            // sort_field: stor.session.get('sort_field') || 'created_at',
            // sort_by: stor.session.get('sort_by') || 'desc',

            sort: stor.session.get('sort') || 'created_at,desc'
        }
    };


    loadData = () => {
        const {f_subcategory, f_city, f_area, f_street, f_stage, f_realtor, f_price_from, f_price_to, sort_field, sort_by, sort} = this.state;
        const {dealtype, dealdirection, category, size, contacts_id} = this.props;
        const {changeState} = this;
        const newState = {};

        $.when(
            get_cards_filtered({
                page: 1,
                size,
                // sort: sort_field + ',' + sort_by,
                sort: sort,
                type: dealtype,
                sale_type: dealdirection,
                category,
                subcategory: f_subcategory,
                city: f_city,
                area: f_area,
                street: f_street,
                stage_transaction: f_stage,
                user_id: f_realtor,
                contacts_id,
                price_from: f_price_from,
                price_to: f_price_to
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

    loadCards = page => {
        const {dealtype, dealdirection, category, size, contacts_id} = this.props;
        const {f_subcategory, f_city, f_area, f_street, f_stage, f_realtor, f_price_from, f_price_to, sort_field, sort_by, sort} = this.state;
        const {changeState} = this;

        this.setState({loading: true});
        get_cards_filtered({
            page,
            size,
            // sort: sort_field + ',' + sort_by,
            sort: sort,
            type: dealtype,
            sale_type: dealdirection,
            category,
            contacts_id,
            subcategory: f_subcategory,
            city: f_city,
            area: f_area,
            street: f_street,
            stage_transaction: f_stage,
            user_id: f_realtor,
            price_from: f_price_from,
            price_to: f_price_to
        }).done(function (cards_query) {
            changeState({
                cards_query,
                cards: cards_query.data || [],
                loading: false
            })
        })
    };

    loadCardsMore = () => {
        const {dealtype, dealdirection, category, size, contacts_id} = this.props;
        const {f_subcategory, f_city, f_area, f_street, f_stage, f_realtor, f_price_from, f_price_to, sort_field, sort_by, sort, cards, cards_query} = this.state;
        const {changeState} = this;


        this.setState({loading: true});
        get_cards_filtered({
            page: cards_query.current_page + 1,
            size,
            // sort: sort_field + ',' + sort_by,
            sort: sort,
            type: dealtype,
            sale_type: dealdirection,
            category,
            contacts_id,
            subcategory: f_subcategory,
            city: f_city,
            area: f_area,
            street: f_street,
            stage_transaction: f_stage,
            user_id: f_realtor,
            price_from: f_price_from,
            price_to: f_price_to
        }).done(function (cards_query) {
            changeState({
                cards_query,
                cards: cards.concat(cards_query.data || []),
                loading: false
            })
        })
    };

    componentDidMount() {
        this.loadData();
        window.Cards_table = {
            loadData: this.loadData
        };

        $(document).on("click.bs.dropdown.data-api", ".noclose", function (e) {
            if (!$(e.target).hasClass("hide-dropdown")) { // Закрыть меню при нажатии на кнопку с class="hide-dropdown"
                e.stopPropagation()
            }
        });

    }

    changeState = obj => {
        this.setState(obj)
    };



    // Содержит ли obj2 совпадения по значениям ключей obj1
    // compareObj = (obj1, obj2) => {
    //     return Object.keys(obj1).every(item => obj1[item] === obj2[item]);
    // };

    componentDidUpdate(prevProps, prevState) {
        const {changeState} = this;
        const {f_subcategory, f_city, f_area, f_street, f_stage, f_realtor, f_price_from, f_price_to, sort_field, sort_by, sort} = this.state;

        // Изменился ли параметр
        const ch_dealtype = prevProps.dealtype !== this.props.dealtype;
        const ch_category = prevProps.category !== this.props.category;
        const ch_dealdirection = prevProps.dealdirection !== this.props.dealdirection;
        const ch_subcategory = prevState.f_subcategory !== f_subcategory;
        const ch_city = prevState.f_city !== f_city;
        const ch_area = prevState.f_area !== f_area;
        const ch_street = prevState.f_street !== f_street;
        const ch_stage = prevState.f_stage !== f_stage;
        const ch_realtor = prevState.f_realtor !== f_realtor;
        const ch_price_from = prevState.f_price_from !== f_price_from;
        const ch_price_to = prevState.f_price_to !== f_price_to;
        // const ch_sort_field = prevState.sort_field !== sort_field;
        // const ch_sort_by = prevState.sort_by !== sort_by;
        const ch_sort = prevState.sort !== sort;


        // А это ещё нужно проверить
        // if (ch_dealtype) { // Если поменяли аренда/продажа
        //     const defaultStages = func_defaultStages();
        //     const newState = {
        //         f_stage: defaultStages,
        //         s_stage: defaultStages
        //     };
        //     compareObj(newState, this.state) ? this.loadCards(1) : changeState(newState)
        // }

        // Новая версия
        if (ch_dealtype) { // Если поменяли аренда/продажа
            const {defaultStages} = this.props;
            if (f_stage !== defaultStages) {
                changeState({f_stage: defaultStages, s_stage: defaultStages})
            }
            else {
                changeState({s_stage: defaultStages});
                this.loadCards(1)
            }
        }

        // Это готово и проверено
        if (ch_category) {
            if (f_subcategory) {
                changeState({f_subcategory: '', s_subcategory: ''})
            }
            else {
                changeState({s_subcategory: ''});
                this.loadCards(1)
            }
        }
        else {
            if (ch_dealdirection) {
                this.loadCards(1)
            }
        }


        if (ch_subcategory || ch_city || ch_area || ch_street || ch_stage || ch_realtor || ch_price_from || ch_price_to || ch_sort) {
            this.loadCards(1)
        }

        if (ch_subcategory) stor.session.set('f_subcategory', this.state.f_subcategory);
        if (ch_city) stor.session.set('f_city', this.state.f_city);
        if (ch_area) stor.session.set('f_area', this.state.f_area);
        if (ch_street) stor.session.set('f_street', this.state.f_street);
        if (ch_stage) stor.session.set('f_stage', this.state.f_stage);
        if (ch_realtor) stor.session.set('f_realtor', this.state.f_realtor);
        if (ch_price_from) stor.session.set('f_price_from', this.state.f_price_from);
        if (ch_price_to) stor.session.set('f_price_to', this.state.f_price_to);
        // if (ch_sort_field) stor.session.set('sort_field', this.state.sort_field);
        // if (ch_sort_by) stor.session.set('sort_by', this.state.sort_by);
        if (ch_sort) stor.session.set('sort', this.state.sort);


    }

    change_s_price_from = value => this.setState({s_price_from: value});
    change_s_price_to = value => this.setState({s_price_to: value});

    componentWillUnmount() {
        $('[data-toggle="tooltip"]').tooltip('hide')
    }

    change_sort = e => {
        this.setState({
            // sort_field: e.currentTarget.dataset.sortField,
            // sort_by: e.currentTarget.dataset.sortBy
            sort: e.currentTarget.dataset.sort
        })
    };

    sort_btn = arr => {

        const {sort} = this.state;
        const {change_sort} = this;

        return (
            <>
                <div className="mb-1 fs13 color-gray">Сортировка</div>
                <div className="list-group">
                    {
                        arr.map(function (item, i) {
                            const active = sort === item.sort;
                            return (
                                <div key={i}
                                     className={"hide-dropdown cursor-pointer" + (active ? ' color-blue' : '')}
                                     data-sort={item.sort}
                                     onClick={change_sort}>
                                    <i className={"mdi mdi-check mr-1" + (active ? "" : " opacity-0")}/>
                                    {/*{active ? <i className="mdi mdi-check mr-1"/> : <span className="w36"/>}*/}
                                    {item.title}
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    };

    trDoubleClick = e => {
        document.getElementById('card' + e.currentTarget.dataset.cardId).click()
    };

    render() {
        console.log('render Cards_table');

        const {loading, cards, cards_query, f_subcategory, f_city, f_area, f_street, f_stage, f_realtor, f_price_from, f_price_to, s_subcategory, s_city, s_area, s_street, s_stage, s_realtor, s_price_from, s_price_to, filter, sort_by, sort_field, sort} = this.state;
        const {dealtype, category, users, office, cities, print_mode} = this.props;
        const {changeState, trDoubleClick, sort_btn} = this;

        // if (loading) return <div className="google-loader"><span/><span/><span/><span/></div>;

        const {current_page, last_page, to, total} = cards_query;

        const all_categories = data.categories;
        const {currencies} = data;

        const categories = all_categories[dealtype] || [];
        const category_obj = categories.find(item => item.value === category) || {};
        const subcategories = category_obj.subcategories || [];


        const dealStagesSR = data.dealStages[dealtype] || [];


        const {defaultRealtor, defaultStages} = this.props;
        // const defaultRealtor = this.func_defaultRealtor();


        const output_currency_value = dealtype === 'rent' ? 'uah' : (dealtype === 'sale' ? 'usd' : '');
        const output_currency_option = currencies.find(item => item.value === output_currency_value) || {};
        const output_currency_title = output_currency_option.title || '';

        // const sort_options = [{value: 'asc', label: 'По возрастанию'}, {value: 'desc', label: 'По убыванию'}];


        // Города
        const officeCity = cities[office.city] || {};
        const suburbs = [office.city].concat(officeCity.suburb || []);
        const optionsCities = suburbs.map(item => ({value: item, label: undefsafe(cities, `${item}.title`)}));
        const defaultValueCities = optionsCities.find(option => option.value === s_city) || null;

        // Районы
        const areas = (cities[s_city] || {}).areas || {};
        const optionsAreas = Object.keys(areas).map(key => ({value: key, label: areas[key]}));
        const defaultValueAreas = s_area ? {value: s_area, label: areas[s_area]} : null;

        // Улицы
        const streets = (cities[s_city] || {}).streets || {};
        const optionsStreets = Object.keys(streets).map(key => ({value: key, label: streets[key]}));
        const defaultValueStreets = s_street ? {value: s_street, label: streets[s_street]} : null;




        const tbody = cards
            .map(function (cardInfo) {

                const {city, area, street} = cardInfo;
                const cityValueArr = city ? city.split(',') : [];
                const cityValue = cityValueArr.includes(office.city) ? office.city : (cityValueArr.length === 1 ? city : '');
                const {areas, streets} = cities[cityValue] || {};
                const city_titles = city && cities && city.split(',').map(item => (cities[item] || {}).title).join(', ');
                const area_titles = area && areas && area.split(',').map(item => areas[item]).join(', ');
                const street_titles = street && streets && street.split(',').map(item => streets[item]).join(', ');
                const {building} = cardInfo;

                // Фильтруем пустые значения, объединяем
                const location_titles = [city_titles, area_titles, street_titles, building].filter(item => item).join(', ');

                // const currency_option = currencies.find(item => item.id === +cardInfo.currency) || {};
                // const currency_value = currency_option.value || '';
                // const newPrice = currency_converter(nbu_quotes, cardInfo.price, currency_value, output_currency_value);

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

                const typedeal = cardInfo.type;

                const cards_contacts_phones = undefsafe(cardInfo, 'card_contact.cards_contacts_phones') || [];
                const card_contact_name = undefsafe(cardInfo, 'card_contact.name') || '';

                const {card_files} = cardInfo;
                // const isPhoto = card_files.some(item => item.type === 'image/*');
                const filtered_card_files = card_files.filter(item => item.type === 'image/*');
                const url = filtered_card_files.length > 0 ?
                    url_backend + '/public/uploads/files/' + filtered_card_files[0].file.hash : '';


                const subcategory_title = get_subcategory_title(cardInfo);

                const link = "/cards/" + cardInfo.id;

                return (
                    <tr key={cardInfo.id} data-card-id={cardInfo.id} onDoubleClick={trDoubleClick} className="cursor-pointer">

                        {/*ID*/}
                        {print_mode && <td>{cardInfo.id}</td>}

                        {/*Подтип, город, район, улица*/}
                        <td>
                            <Link to={link} id={"card" + cardInfo.id}>
                                <div className="title-card">
                                    <div>{subcategory_title}</div>
                                    <div>{location_titles}</div>
                                    {/*<div>{transform_typedeal(typedeal, cardInfo.sale_type)} №{cardInfo.id}</div>*/}
                                </div>
                            </Link>
                            {/*{transform_typedeal(typedeal, cardInfo.sale_type) + ', ' + subcategory}*/}
                            {/*{transform_typedeal(typedeal, cardInfo.sale_type) + ', ' + (transform_categories(cardInfo.category, categories) || '')}*/}
                        </td>

                        {/*Имя контакта*/}
                        {
                            print_mode &&
                            <td>
                                {card_contact_name}
                            </td>
                        }

                        {/*Телефоны контакта*/}
                        {
                            print_mode &&
                            <td>
                                {cards_contacts_phones.map((item, i) => <div key={i}>{item.phone}</div>)}
                            </td>
                        }

                        {/*Этап сделки*/}
                        {
                            !print_mode &&
                            <td>
                                <Stage_up cardInfo={cardInfo}/>
                            </td>
                        }

                        {/*В работе*/}
                        {
                            !print_mode &&
                            <td>
                                {
                                    // howMuchTimeHasPassed(cardInfo.created_at)
                                    moment.utc(cardInfo.created_at, "YYYY-MM-DD HH:mm:ss").fromNow(true)
                                }
                            </td>
                        }

                        {/*Изменен*/}
                        {
                            !print_mode &&
                            <td>
                                {
                                    // dateMsToFormat(Date.parse(cardInfo.updated_at + 'Z'), 'YYYY-MM-DD', currentZone()) // Не работает на айфонах
                                    moment.utc(cardInfo.updated_at, "YYYY-MM-DD HH:mm:ss").local().format('DD-MM-YYYY')
                                }
                                {
                                    dealtype === 'sale' && // Только в продажах
                                    cardInfo.stage_transaction === '1' && // Если этап сделки "Работа с контактом"
                                    // Если последнее изменение было сделано больше 7 дней назад
                                    moment().diff(moment.utc(cardInfo.updated_at, "YYYY-MM-DD HH:mm:ss"), 'days', true) >= 10 &&
                                    <b className="color-red fs22" title="Связывались более 10-ти дней назад"
                                       data-toggle="tooltip"> !</b>
                                }
                            </td>
                        }

                        {/*Цена*/}
                        <td className="text-nowrap">
                            {moneyMask(price)}
                        </td>

                        {/*Фото*/}
                        {
                            !print_mode &&
                            <td>
                                {url && <Cards_table_photo url={url}/>}
                            </td>
                        }

                        {/*Описание и комментарий*/}
                        {
                            !print_mode &&
                            <Cards_td_description_comment description={cardInfo.description}
                                                          comment={cardInfo.comment}/>
                        }

                        {/*Риэлтор*/}
                        {
                            !print_mode &&
                            <td>
                                <User_photo user={cardInfo.card_user}/>
                            </td>
                        }

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
                            {/*ID*/}
                            {print_mode && <th scope="col" className="_nodropdown">ID</th>}

                            {/*Подтип, город, район, улица*/}
                            <th scope="col" className={f_subcategory || f_city || f_area || f_street ? ' filtered' : ''}>
                                <div className="_th">
                                    <div className="dropdown noclose">
                                        <div className="dropdown_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Подтип
                                            <sup className="count_sup">{total}</sup>
                                        </div>
                                        <div className="dropdown-menu">
                                            {
                                                subcategories.length > 0 &&
                                                    <div className="mb-2">
                                                        <Select
                                                            styles={{
                                                                ...selectStyleDefault,
                                                                ...selectStyleMenuList
                                                            }}
                                                            // closeMenuOnSelect={false}
                                                            isSearchable={false}
                                                            isClearable={true}
                                                            placeholder="Подтип"
                                                            options={subcategories}
                                                            value={subcategories.find(item => item.value === s_subcategory) || null}
                                                            getOptionLabel={option => option.title}
                                                            onChange={el => changeState({s_subcategory: el && el.value})}

                                                            // Для мульти
                                                            // isMulti
                                                            // value={subcategories.filter(item => s_subcategory.split(',').includes(item.value))}
                                                            // onChange={el => changeState({
                                                            //     s_subcategory: el ? el.map(item => item.value).join(',') : ''
                                                            // })}
                                                        />
                                                    </div>
                                            }
                                            {
                                                optionsCities.length > 0 &&
                                                <div className="mb-2">
                                                    <Select
                                                        styles={{
                                                            ...selectStyleDefault,
                                                            ...selectStyleMenuList
                                                        }}
                                                        // closeMenuOnSelect={false}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        placeholder="Город"
                                                        options={optionsCities}
                                                        value={defaultValueCities}
                                                        onChange={el => changeState({
                                                            s_city: el && el.value,
                                                            s_area: '',
                                                            s_street: ''
                                                        })}

                                                        // Для мульти
                                                        // isMulti
                                                        // value={optionsCities.filter(item => s_city.split(',').includes(item.value))}
                                                        // onChange={el => changeState({
                                                        //     s_city: el ? el.map(item => item.value).join(',') : ''
                                                        // })}
                                                    />
                                                </div>
                                            }
                                            {
                                                optionsAreas.length > 0 &&
                                                <div className="mb-2">
                                                    <Select
                                                        styles={{
                                                            ...selectStyleDefault,
                                                            ...selectStyleMenuList
                                                        }}
                                                        // closeMenuOnSelect={false}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        placeholder="Район"
                                                        options={optionsAreas}
                                                        value={defaultValueAreas}
                                                        onChange={el => changeState({s_area: el && el.value})}

                                                        // Для мульти
                                                        // isMulti
                                                        // value={optionsAreas.filter(item => s_area.split(',').includes(item.value))}
                                                        // onChange={el => changeState({
                                                        //     s_area: el ? el.map(item => item.value).join(',') : ''
                                                        // })}
                                                    />
                                                </div>
                                            }
                                            {
                                                optionsStreets.length > 0 &&
                                                <div className="mb-2">
                                                    <Select
                                                        styles={{
                                                            ...selectStyleDefault,
                                                            // ...selectStyleMenuList
                                                        }}
                                                        // closeMenuOnSelect={false}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        placeholder="Улица"
                                                        components={{MenuList}}
                                                        options={optionsStreets}
                                                        value={defaultValueStreets}
                                                        onChange={el => changeState({s_street: el && el.value})}

                                                        // Для мульти
                                                        // isMulti
                                                        // value={optionsStreets.filter(item => s_street.split(',').includes(item.value))}
                                                        // onChange={el => changeState({
                                                        //     s_street: el ? el.map(item => item.value).join(',') : ''
                                                        // })}
                                                    />
                                                </div>
                                            }
                                            <button className="btn btn-success hide-dropdown w-100 mb-2"
                                                    onClick={() => changeState({
                                                        f_subcategory: s_subcategory,
                                                        f_city: s_city,
                                                        f_area: s_area,
                                                        f_street: s_street,
                                                        // sort_by: sort.by,
                                                        // sort_field: sort.field
                                                    })}>
                                                Применить
                                            </button>
                                            <button className="btn btn-choose hide-dropdown">Отмена</button>
                                        </div>
                                    </div>


                                    {
                                        (f_subcategory || f_city || f_area || f_street) &&
                                        <i className="mdi mdi-close"
                                           onClick={() => changeState({
                                               f_subcategory: '',
                                               s_subcategory: '',
                                               f_city: '',
                                               s_city: '',
                                               f_area: '',
                                               s_area: '',
                                               f_street: '',
                                               s_street: ''
                                           })}
                                        />
                                    }
                                </div>
                            </th>

                            {
                                print_mode && <>
                                    <th scope="col" className="_nodropdown">Имя</th>
                                    <th scope="col" className="_nodropdown">Телефоны</th>
                                </>
                            }

                            {
                                !print_mode && <>

                                    {/*Этап сделки*/}
                                    <Th_stage
                                        f_stage={f_stage}
                                        s_stage={s_stage}
                                        dealStagesSR={dealStagesSR}
                                        defaultStages={defaultStages}
                                        changeState={changeState}
                                    />

                                    {/*В работе*/}
                                    <th scope="col">
                                        <div className="_th">
                                            <div className="dropdown noclose">
                                                <div className="dropdown_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    В работе
                                                    {sort === "created_at,desc" && <i className="mdi mdi-sort-descending ml-1"/>}
                                                    {sort === "created_at,asc" && <i className="mdi mdi-sort-ascending ml-1"/>}
                                                </div>
                                                <div className="dropdown-menu">
                                                    {sort_btn(
                                                        [{
                                                            sort: "created_at,desc",
                                                            title: "Сначала новые"
                                                        }, {
                                                            sort: "created_at,asc",
                                                            title: "Сначала старые"
                                                        }]
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </th>

                                    {/*Изменен*/}
                                    <th scope="col">
                                        <div className="_th">
                                            <div className="dropdown noclose">
                                                <div className="dropdown_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Изменение
                                                    {sort === "updated_at,desc" && <i className="mdi mdi-sort-descending ml-1"/>}
                                                    {sort === "updated_at,asc" && <i className="mdi mdi-sort-ascending ml-1"/>}
                                                </div>
                                                <div className="dropdown-menu">
                                                    {sort_btn(
                                                        [{
                                                            sort: "updated_at,desc",
                                                            title: "Сначала новые"
                                                        }, {
                                                            sort: "updated_at,asc",
                                                            title: "Сначала старые"
                                                        }]
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </>
                            }

                            {/*Цена*/}
                            <th scope="col" className={(f_price_from || f_price_to) ? 'filtered' : ''}>
                                        <div className="_th">
                                            <div className="dropdown noclose">
                                                <div className="dropdown_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {output_currency_title}
                                                    {sort === "price,desc" && <i className="mdi mdi-sort-descending ml-1"/>}
                                                    {sort === "price,asc" && <i className="mdi mdi-sort-ascending ml-1"/>}

                                                </div>
                                                <div className="dropdown-menu">


                                                    {sort_btn(
                                                        [{
                                                            sort: "price,desc",
                                                            title: "По убыванию"
                                                        }, {
                                                            sort: "price,asc",
                                                            title: "По возрастанию"
                                                        }]
                                                    )}

                                                    <hr/>

                                                    <div className="fs13 color-gray">Фильтр</div>

                                                    <InputMoney
                                                        className="input mt-2"
                                                        placeholder="От"
                                                        defaultValue={s_price_from}
                                                        onblur={this.change_s_price_from}
                                                    />

                                                    <InputMoney
                                                        className="input mt-2"
                                                        placeholder="До"
                                                        defaultValue={s_price_to}
                                                        onblur={this.change_s_price_to}
                                                    />

                                                    <button className="btn btn-success hide-dropdown w-100 mt-2"
                                                            onClick={() => changeState({
                                                                f_price_from: s_price_from,
                                                                f_price_to: s_price_to
                                                            })}>
                                                        Применить
                                                    </button>

                                                    <button className="btn btn-choose hide-dropdown mt-2">Отмена</button>

                                                </div>
                                            </div>
                                            {
                                                (f_price_from || f_price_to) ?
                                                    <i className="mdi mdi-close" onClick={() =>
                                                        changeState({
                                                            f_price_from: '',
                                                            f_price_to: '',
                                                            s_price_from: '',
                                                            price_to: ''
                                                        })
                                                    }/> : null
                                            }
                                        </div>
                                    </th>

                            {
                                !print_mode && <>
                                    {/*Фото*/}
                                    <th scope="col" className="_nodropdown">
                                        <i className="mdi mdi-image-area fs22" title="Наличие фотографий" data-toggle="tooltip"/>
                                    </th>

                                    {/*<th scope="col" className="_nodropdown">*/}
                                    {/*    <i className="mdi mdi-key" title="Дата истечения договора" data-toggle="tooltip"/>*/}
                                    {/*</th>*/}

                                    {/*Описание*/}
                                    <th scope="col">
                                        <div className="_th">
                                            <div className="dropdown">
                                                <div className="dropdown_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="mdi mdi-dots-vertical fs22"/>
                                                </div>
                                                <div className="dropdown-menu">
                                                    <button className="btn btn-success hide-dropdown w-100"
                                                            onClick={() => changeState({
                                                                f_subcategory: '',
                                                                f_city: '',
                                                                f_area: '',
                                                                f_street: '',
                                                                f_stage: defaultStages,
                                                                f_realtor: defaultRealtor,
                                                                f_price_from: '',
                                                                f_price_to: '',
                                                                s_subcategory: '',
                                                                s_city: '',
                                                                s_area: '',
                                                                s_street: '',
                                                                s_stage: defaultStages,
                                                                s_realtor: defaultRealtor,
                                                                s_price_from: '',
                                                                s_price_to: ''
                                                            })}>
                                                        Очистить фильтры
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </th>

                                    {/*Риэлтор*/}
                                    <th scope="col" className={f_realtor !== defaultRealtor ? 'filtered' : ''}>
                                        <div className="_th">
                                            <div className="dropdown noclose">
                                                <div className="dropdown_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="mdi mdi-account-outline fs22" title="Сотрудник" data-toggle="tooltip"/>
                                                </div>
                                                <div className="dropdown-menu">
                                                    <Select
                                                        styles={{
                                                            ...selectStyleDefault,
                                                            ...selectStyleMenuList
                                                        }}
                                                        isSearchable={true}
                                                        isClearable={true}
                                                        placeholder="Показать всё"
                                                        options={users}
                                                        value={users.find(item => item.id === s_realtor)}
                                                        getOptionValue={option => option.id}
                                                        getOptionLabel={option => option.name + ' ' + option.surname}
                                                        onChange={el => changeState({s_realtor: el && el.id})}
                                                    />
                                                    <button className="btn btn-success hide-dropdown w-100 mt-2" onClick={() => changeState({f_realtor: s_realtor})}>Применить</button>
                                                    <button className="btn btn-choose hide-dropdown mt-2">Отмена</button>
                                                </div>
                                            </div>
                                            {
                                                f_realtor !== defaultRealtor ?
                                                    <i className="mdi mdi-close" onClick={() =>
                                                        changeState({f_realtor: defaultRealtor, s_realtor: defaultRealtor})
                                                    }/> :
                                                    null
                                            }
                                        </div>
                                    </th>
                                </>
                            }


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

                {/*<div>{total_cards} всего карточек</div>*/}

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
//
// Cards_table = connect((store) => {return store.reducerCardsTable})(Cards_table);
//
// export {Cards_table}