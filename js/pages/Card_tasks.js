import React from 'react'

export class Card_tasks extends React.PureComponent {
    render() {
        console.log('render Card_tasks');
        return (
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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}