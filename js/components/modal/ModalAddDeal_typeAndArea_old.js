import React from 'react'
import {ModalAddDeal_Select_old} from "./ModalAddDeal_Select_old";
import {ModalAddDeal_MultiSelect} from "./ModalAddDeal_MultiSelect";

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
        this.loadData()
    }

    loadData = () => {
        const {user_profile} = this.props;

        const newState = {};

        $.when(
            $.Deferred(function (d) {
                get_office(user_profile.office_id).done(function (office) {
                    Object.assign(newState, {office});
                    get_city(office.city).done(function (city) {
                        d.resolve(city)
                    }).fail(function () {
                        d.resolve({})
                    })
                })
            }).done(function (city) {
                Object.assign(newState, {city})
            }),

            get_cities().done(function (cities) {
                Object.assign(newState, {cities})
            })

        ).done(function () {
            this.setState(newState)
        }.bind(this))
    };

    blinking = () => {
        const duration = 300;
        $("._typedeal").fadeTo(duration, 0).fadeTo(duration, 1)
    };

    changeState = (state) => {
        this.setState(state)
    };

    onChangeCity = (keys) => { // Если базовый город присутствует в выборе, то отображаем его районы
        const {changeState} = this;
        const officeCity = this.state.office.city;

        // let keysArr = keys;
        // if (typeof keysArr === 'string') keysArr = keysArr.split(',');

        const keysArr = typeof keys === 'string' ? keys.split(',') : keys;


        const city = keysArr.length === 1 ?
            keysArr[0]:
            keysArr.length > 1 && keysArr.indexOf(officeCity) >= 0 ?
                officeCity :
                false;

        city ?
            get_city(city).done(function (city) {
                changeState({city})
            }).fail(function () {
                changeState({city: {}})
            }) :
            changeState({city: {}})


        // if (keysArr.length === 1) { // Если выбран один город
        //     get_city(keys).done(function (city) {
        //         changeState({city})
        //     }).fail(function () {
        //         changeState({city: {}})
        //     })
        // }
        // else {
        //     changeState({city: {}})
        // }
    };

    toggleCountryside = (keysArr) => {
        this.onChangeCity(keysArr);
        this.setState({countryside: !this.state.countryside})
    };

    render() {

        const {dealdirection, dealtype} = this.props;
        const {city, cities, office, countryside, chosenCategory} = this.state;
        const {onChangeCity, changeState, toggleCountryside} = this;


        const all_categories = data.categories;
        const categories = all_categories[dealtype] || [];
        const category = categories.find(item => item.value === chosenCategory) || {};
        const subcategories = category.subcategories;

        const officeCity = cities[office.city] || {};
        const suburbs = officeCity.suburb || [];
        // const suburbs = undefsafe(cities, office.city + '.suburb') || [];
        const optionsCities = suburbs.map(item => ({value: item, title: cities[item].title}));
        optionsCities.unshift({value: office.city, title: officeCity.title});

        const areas = city.areas || {};
        const optionsAreas = [];
        for (let key in areas) {
            optionsAreas.push({value: key, title: areas[key]})
        }



        const common =
            <div className="w-100 mb-2">
                <ModalAddDeal_Select_old id="categories" title="Тип" options={categories}
                                         onChange={key => changeState({chosenCategory: key})}/>
            </div>
        ;

        if (dealdirection === 'object') {
            return (
                <div className="w-100">

                    <div className="w-100 mb-2">
                        <ModalAddDeal_Select_old id="city" title="Город" options={optionsCities} selectedValue={office.city}
                                                 onChange={key => onChangeCity(key)}
                        />
                    </div>

                    {
                        optionsAreas.length > 0 &&
                        <div className="w-100 mb-2">
                            <ModalAddDeal_Select_old id="district" title="Район" options={optionsAreas}/>
                        </div>
                    }

                    {common}

                    {
                        subcategories &&
                        <div className="w-100 mb-2">
                            <ModalAddDeal_Select_old id="subcategories" title="Подтип" options={subcategories}
                                                     onChange={key => changeState({chosenSubcategory: key})}/>
                        </div>
                    }

                </div>
            )
        }
        else if (dealdirection === 'request') {
            return (
                <div className="w-100">

                    <div className="w-100 mb-2 flex-center">
                        <div className="flex-fill">
                            <ModalAddDeal_MultiSelect id="city" title="Город" options={optionsCities}
                                                      selectedValues={countryside ? suburbs : [office.city]}
                                                      onChange={key => onChangeCity(key)}/>
                        </div>
                        <span className="hover-rounded fs24" onClick={() => toggleCountryside(countryside ? [office.city] : suburbs)}>
                            {
                                countryside ?
                                    <i className="mdi mdi-home-group" title="Сельская местность"/> :
                                    <i className="mdi mdi-city-variant-outline" title="Город"/>
                            }
                        </span>
                    </div>

                    {
                        optionsAreas.length > 0 &&
                        <div className="w-100 mb-2">
                            <ModalAddDeal_MultiSelect id="district" title="Район" options={optionsAreas}/>
                        </div>
                    }

                    {common}

                    {
                        subcategories &&
                        <div className="w-100 mb-2">
                            <ModalAddDeal_MultiSelect id="subcategories" title="Подтип" options={subcategories}
                                                      onChange={key => changeState({chosenSubcategory: key})}/>
                        </div>
                    }
                </div>
            )
        }
        else {
            return (
                <div className="w-100" onClick={this.blinking}>
                    <div className="w-100 mb-2 disabled">
                        <ModalAddDeal_Select_old title="Тип"/>
                    </div>
                    <div className="w-100 mb-2 disabled">
                        <ModalAddDeal_Select_old title="Район"/>
                    </div>
                </div>
            );
        }
    }
}