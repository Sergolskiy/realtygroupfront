import React from 'react'
import {Link} from 'react-router-dom'

export class Table extends React.Component {
    state = {
        howManySuite: [1, 15],
        oldSuite: []
    };
    showMore = (newSuite) => {
        this.setState({
            howManySuite: [this.state.howManySuite[0] + 15, this.state.howManySuite[1] + 15],
            oldSuite: newSuite
        })
    };
    // Возвращает объекты с n1 по n2 включительно. Счет ведется с 1
    filter = (arr, n1, n2) => { // n1, n2 - начальная новость и конечная новость
        n2 = Math.min(n2, arr.length);
        let newArr = [];
        for (n1--; n1 < n2; n1++) {
            if (n1 < 0) continue;
            newArr.push(arr[n1]);
        }
        return newArr;
    };
    render() {
        let howManySuite = this.state.howManySuite,
            oldSuite = this.state.oldSuite,
            suite = [
                {
                    id: 1,
                    address: 'Кривой Рог, Ватутина, 25',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 24000,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 90,
                    picture: true,
                    whoseSuite: 'red',
                    matches: [3,4,8]
                },
                {
                    id: 2,
                    address: 'Кривой Рог, Кропивницкого, 3',
                    type: 'Дом',
                    room: 4,
                    square: '150/12/20',
                    price: {
                        amount: 45000,
                        currency: 'usd'
                    },
                    floor: '1/1',
                    similarity: 100,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 3,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10000,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 80,
                    picture: true,
                    whoseSuite: 'yellow',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 30,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 50,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 90,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 100,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 70,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 80,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 90,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 20,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 30,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 50,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 90,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 80,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 100,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 40,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 30,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 60,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                },
                {
                    id: 4,
                    address: 'Кривой Рог, Лермонтова, 33',
                    type: 'Квартира',
                    room: 3,
                    square: '50/23/16',
                    price: {
                        amount: 10001,
                        currency: 'usd'
                    },
                    floor: '3/9',
                    similarity: 70,
                    picture: false,
                    whoseSuite: 'green',
                    matches: [3,4,8]
                }
            ],
            addSuite = this.filter(suite, howManySuite[0], howManySuite[1]),
            newSuite,
            btnClass = 'btn btn-outline-dark';
        if (addSuite.length < 15) btnClass += ' d-none'; // Hide btn
        oldSuite.length !== 0 ? newSuite = oldSuite.concat(addSuite) : newSuite = addSuite;
        return (
            <div>
                <div className="table-suite">
                    <table className="table">
                        <thead>
                        <TableHead/>
                        </thead>
                        <TableTr suite={newSuite}/>
                    </table>
                </div>
                <div className='d-flex justify-content-center'>
                    <button className={btnClass} onClick={this.showMore.bind(this, newSuite)}>
                        <i className="mdi mdi-refresh"/> Показать ещё
                    </button>
                    <button className={btnClass}>
                        <i className="mdi mdi-refresh"/> Показать скрытые
                    </button>
                </div>
            </div>
        );
    }
}
class TableHead extends React.Component {
    render() {
        const head = [
            'Адрес',
            'Комнат',
            'Тип',
            'Площадь',
            'Цена',
            'Этажность',
            'Сходств',
            <i className="mdi mdi-message-text-outline"/>,
            <i className="mdi mdi-phone"/>,
            <i className="mdi mdi-image-area"/>,
            <i className="mdi mdi-account-outline"/>,
            <i className="mdi mdi-account-group"/>
        ];
        return (
            <tr>
                {head.map(function (item, i) {
                    return (
                        <th key={i} scope='col'>
                            <div>
                                {item}
                                <div className="icon-wrapper">
                                    <i className="mdi mdi-chevron-down"/>
                                </div>
                            </div>
                        </th>
                    )
                })}
            </tr>
        )
    }
}
class TableTr extends React.Component {
    render() {
        const suite = this.props.suite;
        const obj = {
            green: 'text-success',
            yellow: 'text-warning',
            red: 'text-danger'
        };

        return (
            <tbody>
            {suite.map(function (item, i) {
                return (
                    <tr key={i}>
                        <td><Link to="/cards">{item.address}</Link></td>
                        <td>{item.type}</td>
                        <td>{item.room}</td>
                        <td>{item.square}</td>
                        <td>{item.price.amount + ' ' + item.price.currency}</td>
                        <td>{item.floor}</td>
                        <td>{item.similarity}</td>
                        <td><i className="mdi mdi-message-text-outline"/></td>
                        <td><i className="mdi mdi-phone"/></td>
                        <td>{item.picture && <i className="mdi mdi-image-area"/>}</td>
                        <td className={obj[item.whoseSuite]}><i className="mdi mdi-account-outline"/></td>
                        <td>
                            <span className="text-success mr-1">{item.matches[0]}</span>
                            <span className="text-warning mr-1">{item.matches[1]}</span>
                            <span className="text-secondary">{item.matches[2]}</span>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        )
    }
}