import React from 'react'
import {ModalAddDeal_MultiSelect} from "./ModalAddDeal_MultiSelect";
import {ModalAddDeal_Select} from "./ModalAddDeal_Select";

export class ModalAddDeal_typeAndArea extends React.PureComponent {

    state = {
        city: {}, // Внутряк города: районы, окрестности, ориентиры, улицы
        cities: {}, // Все города
        office: {},
        chosenCategory: '', // Выбранные категории
        chosenSubcategory: '', // Выбранные подкатегории
        countryside: false // Сельская местность
    };

    componentDidMount() {
        this.loadData();

        $('body').on('keypress', this.ifPressEnter)
    }

    componentWillUnmount() {
        $('body').off('keypress', this.ifPressEnter)
    }

    // Если нажат Enter, нажимаем Далее в select модального окна
    ifPressEnter = e => {
        if (e.which === 13) {
            $('#nextSelect').click()
        }
    };

    loadData = () => {
        const {user_profile} = this.props;
        const {changeState} = this;
        const newState = {};

        $.Deferred(function (d) {
            get_office(user_profile.office_id).done(function (office) {
                Object.assign(newState, {office});
                get_cities().done(function (cities) {
                    Object.assign(newState, {cities});
                    Object.assign(newState, {city: cities[office.city] || {}});
                    d.resolve()
                })
            })
        }).done(function () {
            changeState(newState)
        })

    };

    blinking = () => {
        const duration = 300;
        $("._typedeal").fadeTo(duration, 0).fadeTo(duration, 1)
    };

    changeState = state => {
        this.setState(state)
    };

    onChangeCity = keys => { // Если базовый город присутствует в выборе, то отображаем его районы
        const {office, cities, city} = this.state;
        const {changeState} = this;

        // Строку или массив преобразуем в массив
        const keysArr = keys ? (typeof keys === 'string' ? keys.split(',') : keys) : [];


        const city_value = keysArr.length === 1 ?
            keysArr[0] :
            /*keysArr.length > 1 &&*/ keysArr.includes(office.city) ?
                office.city :
                false;


        const newCity = cities[city_value] || ($.isEmptyObject(city) ? city : {});

        changeState({city: newCity})

        // city ?
        //     get_city(city).done(function (city) {
        //         changeState({city})
        //     }).fail(function () {
        //         changeState({city: {}})
        //     }) :
        //     changeState({city: {}});



    };

    // toggleCountryside = (keysArr) => {
    //     this.onChangeCity(keysArr);
    //     this.setState({countryside: !this.state.countryside})
    // };

    render() {

        console.log('render ModalAddDeal_typeAndArea');

        const {dealdirection, dealtype} = this.props;
        const {city, cities, office, countryside, chosenCategory} = this.state;
        const {onChangeCity, changeState} = this;


        // const cityArr = cityValueArr.length === 1 ? cities[city] : (cityValueArr.includes(office.city) ? cities[office.city] : {});


        const all_categories = data.categories;
        const categories = all_categories[dealtype] || [];
        const category = categories.find(item => item.value === chosenCategory) || {};
        const subcategories = category.subcategories;

        const officeCity = cities[office.city] || {};
        const suburbs = officeCity.suburb || [];
        const optionsCities = suburbs.map(item => ({value: item, title: cities[item].title}));
        optionsCities.unshift({value: office.city, title: officeCity.title});

        const areas = city.areas || {};
        const optionsAreas = [];
        for (let key in areas) {
            optionsAreas.push({value: key, title: areas[key]})
        }


        if (dealdirection === 'object') {
            return (
                <div className="flex-between p-10-15">

                    <ModalAddDeal_Select id="city" title="Город" icon="mdi mdi-map-marker-radius"
                                         options={optionsCities} selectedValue={office.city}
                                         onChange={key => onChangeCity(key)}
                    />

                    <ModalAddDeal_Select id="district" title="Район" icon="mdi mdi-routes"
                                         className={optionsAreas.length > 0 ? "" : "disabled"}
                                         options={optionsAreas}
                    />

                    <ModalAddDeal_Select id="categories" title="Тип" icon="mdi mdi-home-city-outline"
                                         options={categories}
                                         onChange={key => changeState({chosenCategory: key})}
                    />

                    <ModalAddDeal_Select id="subcategories" title="Подтип" icon="mdi mdi-home-city-outline"
                                         className={subcategories ? "" : "disabled"}
                                         options={subcategories}
                                         onChange={key => changeState({chosenSubcategory: key})}
                    />

                </div>
            )
        }
        else if (dealdirection === 'request') {
            return (
                <div className="flex-between p-10-15">

                    <ModalAddDeal_MultiSelect id="city" title="Город" icon="mdi mdi-map-marker-radius"
                                              options={optionsCities}
                                              selectedValues={countryside ? suburbs : [office.city]}
                                              onChange={key => onChangeCity(key)}
                    />

                    <ModalAddDeal_MultiSelect id="district" title="Район" icon="mdi mdi-routes"
                                              className={optionsAreas.length > 0 ? "" : "disabled"}
                                              options={optionsAreas}
                    />

                    <ModalAddDeal_Select id="categories" title="Тип" icon="mdi mdi-home-city-outline"
                                         options={categories}
                                         onChange={key => changeState({chosenCategory: key})}
                    />

                    <ModalAddDeal_MultiSelect id="subcategories" title="Подтип" icon="mdi mdi-home-city-outline"
                                         className={subcategories ? "" : "disabled"}
                                         options={subcategories}
                                         onChange={key => changeState({chosenSubcategory: key})}
                    />

                </div>
            )
        }
        else {
            return (
                <div onClick={this.blinking}>
                    <div className="flex-between p-10-15 disabled">
                        <ModalAddDeal_Select title="Город" icon="mdi mdi-map-marker-radius"/>
                        <ModalAddDeal_Select title="Район" icon="mdi mdi-routes"/>
                        <ModalAddDeal_Select title="Тип" icon="mdi mdi-home-city-outline"/>
                        <ModalAddDeal_Select title="Подтип" icon="mdi mdi-home-city-outline"/>
                    </div>
                </div>
            );
        }

    }
}