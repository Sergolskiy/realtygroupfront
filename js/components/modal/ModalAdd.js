import React from 'react'
import {store} from '../../reducers';
import ModalAddContact from './ModalAddContact'
import {ModalAddTask} from './ModalAddTask'
import ModalAddDeal from "./ModalAddDeal";


export class ModalAdd extends React.Component {

    componentDidMount() {
        legitRipple()
    }

    state = {
        typeadd: 'deal'
    };

    closeModalAdd = () => {
        store.dispatch({type: 'MODAL_ADD_IS_OPEN', modalAddIsOpen: false})
    };

    clickTypeAdd = e => {
        const {typeadd} = e.currentTarget.dataset;
        if (this.state.typeadd !== typeadd) {
            this.setState({typeadd})
        }
    };

    render() {
        console.log('render ModalAdd');

        const {user_profile, cities, office} = this.props;
        const {clickTypeAdd, closeModalAdd} = this;

        let title, Body, deal = '', contact = '', task = '';
        switch (this.state.typeadd) {
            case 'deal':
                title = 'Сделка';
                Body = <ModalAddDeal user_profile={user_profile} cities={cities} office={office}/>;
                deal = ' active';
                break;
            case 'contact':
                title = 'Контакт';
                Body = <ModalAddContact user_profile={user_profile} cities={cities} office={office}/>;
                contact = ' active';
                break;
            case 'task':
                title = 'Задача';
                Body = <ModalAddTask/>;
                task = ' active';
                break;
        }
        return (
            <div className="modal-add">
                <div className="modal-win">
                    <div className="modal-head" id="typeadd">
                        <div className={"_typeadd" + deal} data-typeadd="deal" onClick={clickTypeAdd}><i className="mdi mdi-clipboard-text-outline color-green circle-icon"/></div>
                        <div className={"_typeadd" + contact} data-typeadd="contact" onClick={clickTypeAdd}><i className="mdi mdi-account-multiple color-red circle-icon"/></div>
                        <div className={"_typeadd" + task} data-typeadd="task" onClick={clickTypeAdd}><i className="mdi mdi-calendar-clock color-yellow circle-icon"/></div>
                        <div className="fs20 ml-auto mr-auto">{title}</div>
                        <div><i className="mdi mdi-close circle-hover ripple" onClick={closeModalAdd}/></div>
                    </div>
                    {Body}
                </div>
            </div>
        )
    }
}