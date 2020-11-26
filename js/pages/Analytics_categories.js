import React from 'react'

export class Analytics_categories extends React.PureComponent {

    state = {
        analytics_categories: [],
        isLoad: false
    };

    changeState = state => {
        this.setState(state)
    };

    loadData = () => {
        const {changeState} = this;

        get_analytics_categories().done(function (analytics_categories) {
            changeState({analytics_categories, isLoad: true})
        })
    };

    componentDidMount() {
        this.loadData()
    }

    // type = sale || rent
    one_table = type => {

        const {analytics_categories} = this.state;
        const {categories} = data;

        return <table className="table text-center table-sm table-bordered">
            <thead>
            <tr>
                <td>Тип недвижимости</td>
                <td>Объекты</td>
                <td>Заявки</td>
            </tr>
            </thead>
            <tbody>
            {
                categories[type].map(function (category, i) {
                    return (
                        <tr key={i}>
                            <td>{category.title}</td>
                            <td>
                                {
                                    (
                                        analytics_categories.find(item =>
                                            item.type === type && item.sale_type === 'object' && item.category === category.value
                                        ) || {}
                                    ).count
                                }
                            </td>
                            <td>
                                {
                                    (
                                        analytics_categories.find(item =>
                                            item.type === type && item.sale_type === 'request' && item.category === category.value
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
        console.log('render Analytics_categories');

        const {isLoad} = this.state;
        const {one_table} = this;

        return (
            <>
                <div>Статистика по типам недвижимости</div>

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