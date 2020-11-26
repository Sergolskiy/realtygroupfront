import React from 'react'
import {Back, Title} from "../elements/Elements";

export class Tasks extends React.Component {
    componentDidMount() {
        legitRipple()
    }

    render() {
        return (
            <>
                <div className="head navbar flex-nowrap justify-content-start" id="head">
                    <Back/>
                    <Title data="Задачи"/>
                </div>
                <div className="content">
                    <div className="table-suite">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Ответственный</th>
                                <th>Контакт или сделка</th>
                                <th>Текст задачи</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>29.08.2018</td>
                                <td>Исаак Ньютон</td>
                                <td>Дом у моря</td>
                                <td>фыдшвмодфшывоадфышовафдвышао</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}