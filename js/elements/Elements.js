import React from 'react'
import {store} from '../reducers'
import {Link} from 'react-router-dom'


// Кнопка стрелки назад
export class Back3 extends React.PureComponent {
    render() {
        const {to} = this.props;
        return to ?
            <Link to={to}>
                <i className="mdi mdi-arrow-left text-muted fs24"/>
            </Link> :
            <i className="mdi mdi-arrow-left text-muted fs24 cursor-pointer" onClick={() => window.history.back()}/>
    }
}

// Кнопка стрелки назад (новая версия)
export class Back extends React.PureComponent {
    render() {
        const {to, isEdit, onclick} = this.props;
        const btnClass = "mdi mdi-arrow-left text-muted fs24 cursor-pointer";

        if (isEdit) return <i className={btnClass} onClick={onclick}/>;
        if (to) return <Link to={to}><i className={btnClass}/></Link>;
        if (window.history.length > 2) return <i className={btnClass} onClick={e => window.history.back()}/>;
        return <Link to="/cards"><i className={btnClass}/></Link>
    }
}


// Заголовок страниц
export class Title extends React.Component {
    render() {
        return (
            <div className="_title scrollbar-none">
                <span className="align-text-bottom">{this.props.data}</span>
            </div>
        )
    }
}

// Кнопка добавить объект
export class Add extends React.Component {
    openModalAdd = () => {
        store.dispatch({type: 'MODAL_ADD_IS_OPEN', modalAddIsOpen: true})
    };
    render() {
        return (
            <div className="mr-md-2 text-success ripple circle-hover" onClick={this.openModalAdd}>
                <i className="mdi mdi-loupe fs32 d-none d-md-inline"/>
                <i className="mdi mdi-loupe fs24 d-inline d-md-none"/>
            </div>
        )
    }
}