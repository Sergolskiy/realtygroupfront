import React from 'react'

export class TableNotice extends React.Component {
    render() {
        return (
            <div className="table-suite">
                <table className="table">
                    <thead><TableNoticeHead/></thead>
                    <tbody><TableNoticeTr/></tbody>
                </table>
            </div>
        );
    }
}
class TableNoticeHead extends React.Component {
    render() {
        const head = [
            'Событие',
            'E-mail',
            'Телеграм',
            'Система',
            'Браузер'
        ];
        let result = head.map(function (item, index) {
            return (
                <th scope='col' key={index}>
                    {item}
                </th>
            )
        });
        return (
            <tr>{result}</tr>
        )
    }
}
class TableNoticeTr extends React.Component {
    render() {
        const event = [
            'Новое сообщение чата',
            'Входящий звонок',
            'Обновление системы',
            'Получено новое письмо',
            'Сообщения автоматизаций',
            'Новый пользователь',
            'Задача просрочена',
            'Начато событие',
            'Событие завершено',
            'Задача завершена'
        ];
        return event.map(function (item, index) {
            let checkbox = [];
            for (let i = 1; i <= 4; i++) {
                checkbox.push(
                    <td key={i}>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id={'check-notice' + index + i} />
                            <label className="custom-control-label" htmlFor={'check-notice' + index + i}>&nbsp;</label>
                        </div>
                    </td>
                )
            }
            return (
                <tr key={index}>
                    <td key={0}>{item}</td>
                    {checkbox}
                </tr>
            );
        });
    }
}