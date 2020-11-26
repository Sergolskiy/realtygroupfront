import React from 'react'

export class Analytics_areas extends React.PureComponent {

    state = {
        analytics_areas: [],
        cities: {},
        isLoad: false
    };

    changeState = state => {
        this.setState(state)
    };

    loadData = () => {
        const {changeState} = this;

        get_cities().done(function (cities) {

            const areas = cities['1'].areas || {};

            get_analytics_areas(Object.keys(areas)).done(function (analytics_areas) {
                changeState({analytics_areas, cities, isLoad: true})
            })
        })

    };

    componentDidMount() {
        this.loadData()
    }

    // type = sale || rent
    one_table = type => {

        const {analytics_areas, cities} = this.state;
        const areas = cities['1'].areas || {};

        return <table className="table text-center table-sm table-bordered">
            <thead>
            <tr>
                <td>Район</td>
                <td>Объекты</td>
                <td>Заявки</td>
            </tr>
            </thead>
            <tbody>
            {
                Object.keys(areas).map(function (area_value, i) {
                    return (
                        <tr key={i}>
                            <td>{areas[area_value]}</td>
                            <td>
                                {
                                    (
                                        analytics_areas.find(item =>
                                            item.type === type && item.sale_type === 'object' && item.area === area_value
                                        ) || {}
                                    ).count
                                }
                            </td>
                            <td>
                                {
                                    (
                                        analytics_areas.find(item =>
                                            item.type === type && item.sale_type === 'request' && item.area === area_value
                                        ) || {}
                                    ).count
                                }
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    };


    render() {
        console.log('render Analytics_areas');

        const {isLoad} = this.state;
        const {one_table} = this;

        return (
            <>
                <div>Статистика квартир по районам</div>

                {
                    isLoad && <div className="flex-evenly">

                        <div>
                            <div>Продажа</div>
                            {one_table('sale')}
                        </div>

                        <div>
                            <div>Аренда</div>
                            {one_table('rent')}
                        </div>

                    </div>
                }
            </>
        )
    }
}