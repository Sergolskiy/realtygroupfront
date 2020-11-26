import React from 'react'

export class Settings_users_rights_table extends React.Component {
    render() {
        return (
            <table className="table">
                <tbody>
                <tr>
                    <td>Создание</td>
                    <td><label><input type="radio" name="create" value="allowed"/> Разрешено</label></td>
                    <td><label><input type="radio" name="create" value="forbidden"/> Запрещено</label></td>
                </tr>
                <tr>
                    <td>Просмотр</td>
                    <td><label><input type="radio" name="view" value="allowed"/> Разрешено</label></td>
                    <td><label><input type="radio" name="view" value="forbidden"/> Запрещено</label></td>
                    <td><label><input type="radio" name="view" value="ifResponsible"/> Если ответственный</label></td>
                </tr>
                <tr>
                    <td>Правка</td>
                    <td><label><input type="radio" name="edit" value="allowed"/> Разрешено</label></td>
                    <td><label><input type="radio" name="edit" value="forbidden"/> Запрещено</label></td>
                    <td><label><input type="radio" name="edit" value="ifResponsible"/> Если ответственный</label></td>
                </tr>
                <tr>
                    <td>Удаление</td>
                    <td><label><input type="radio" name="del" value="allowed"/> Разрешено</label></td>
                    <td><label><input type="radio" name="del" value="forbidden"/> Запрещено</label></td>
                    <td><label><input type="radio" name="del" value="ifResponsible"/> Если ответственный</label></td>
                </tr>
                </tbody>
            </table>
        )
    }
}