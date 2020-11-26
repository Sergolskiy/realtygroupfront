import React from 'react'

export class Analytics_users extends React.PureComponent {

    render() {
        console.log('render Analytics_users');

        const {stages, users, users_statistics} = this.props;

        let totalCards = 0; // Общее кол-во карточек у всех юзеров

        let totalPercent = 0; // Суммарный процент
        let countPercent = 0; // Кол-во данных, отличных от Null


        return (
            <>

                <table className="table text-center table-sm table-bordered">
                    <thead>
                    <tr>
                        <td>Кол-во карточек</td>
                        {stages.map((stage, i) => <td key={i}>{stage.label}</td>)}
                        <td>Всего</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(function (user) {
                            return (
                                <tr key={user.id}>
                                    <td>{user.surname} {user.name}</td>
                                    {
                                        stages.map(function (stage, i) {
                                            const info = (users_statistics[user.id] || {})[stage.value] || {};
                                            return <td key={i}>
                                                {info.count}
                                            </td>
                                        })
                                    }
                                    <td>
                                        {
                                            stages.reduce(function(sum, stage) {
                                                const info = (users_statistics[user.id] || {})[stage.value] || {};
                                                return sum + +(info.count || 0)
                                            }, 0)
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td>Всего</td>
                        {
                            stages.map((stage, i) => <td key={i}>
                                {
                                    users.reduce(function(sum, user) {
                                        const info = (users_statistics[user.id] || {})[stage.value] || {};
                                        totalCards += +(info.count || 0);
                                        return sum + +(info.count || 0)
                                    }, 0) || ''
                                }
                            </td>)
                        }
                        <td>{totalCards}</td>
                    </tr>
                    </tbody>
                </table>






                <table className="table text-center table-sm table-bordered">
                    <thead>
                    <tr>
                        <td>Процент заполненности</td>
                        {stages.map((stage, i) => <td key={i}>{stage.label}</td>)}
                        <td>Среднее</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(function (user) {

                            let totalPercentLocal = 0; // Суммарный процент
                            let countPercentLocal = 0; // Кол-во данных, отличных от Null

                            stages.forEach(function (stage) {
                                const info = (users_statistics[user.id] || {})[stage.value] || {};
                                if (info.percent) {
                                    totalPercentLocal += +info.percent;
                                    countPercentLocal++;
                                }
                            });

                            return (
                                <tr key={user.id}>
                                    <td>{user.surname} {user.name}</td>
                                    {
                                        stages.map(function (stage, i) {
                                            const info = (users_statistics[user.id] || {})[stage.value] || {};
                                            return <td key={i}>
                                                {math.round(info.percent, 1) || ''}
                                            </td>
                                        })
                                    }
                                    {/*Правый столбец*/}
                                    <td>
                                        {countPercentLocal > 0 && math.round(totalPercentLocal / countPercentLocal, 1)}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {/*Нижняя строка*/}
                    <tr>
                        <td>Среднее</td>
                        {
                            stages.map(function (stage, i) {

                                let totalPercentLocal = 0; // Суммарный процент
                                let countPercentLocal = 0; // Кол-во данных, отличных от Null

                                users.forEach(function (user) {
                                    const info = (users_statistics[user.id] || {})[stage.value] || {};
                                    if (info.percent) {
                                        totalPercent += +info.percent;
                                        countPercent++;
                                        totalPercentLocal += +info.percent;
                                        countPercentLocal++;
                                    }
                                });

                                return <td key={i}>
                                    {countPercentLocal > 0 && math.round(totalPercentLocal / countPercentLocal, 1)}
                                </td>
                            })
                        }
                        {/*Сумма всех*/}
                        <td>
                            {countPercent > 0 && math.round(totalPercent / countPercent, 1)}
                        </td>
                    </tr>
                    </tbody>
                </table>

            </>
        )
    }
}