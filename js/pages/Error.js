import React from 'react'

export class Error extends React.Component {
    componentDidMount() {
        legitRipple();
    }
    render() {
        return (
            <div>
                Ошибка, такой страницы нет
            </div>
        )
    }
}