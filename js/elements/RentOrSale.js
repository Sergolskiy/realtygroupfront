import React from 'react'

export class RentOrSale extends React.PureComponent {

    // state = {
    //     type: sessionStorage.getItem('dealtype') || this.props.type || 'sale'
    // };

    // componentDidUpdate(prevProps) {
    //     const dealtype = sessionStorage.getItem('dealtype');
    //     const newType = this.props.type;
    //     const prevType = prevProps.type;
    //
    //     if (!dealtype) { // Нет данных в хранилище
    //         if (newType !== prevType) { // Обновилось свойство
    //             if (newType) { // Если свойство есть
    //                 sessionStorage.setItem('dealtype', newType);
    //                 this.setState({type: newType})
    //             }
    //         }
    //     }
    // }


    onChangeAction = () => {
        // const newType = this.state.type === 'sale' ? 'rent' : 'sale';
        const newType = this.props.type === 'sale' ? 'rent' : 'sale';
        sessionStorage.setItem('dealtype', newType);
        // this.setState({type: newType});
        window.Cards.setState({dealtype: newType})
    };

    render() {
        console.log('render rentOrSale');

        const {onChangeAction} = this;
        // const {type} = this.state;
        const {type} = this.props;

        if (!type) return null;

        return (
            <div className="rentSale">
                <input type="checkbox" id="rentSale" onChange={onChangeAction} checked={type === 'rent'}/>
                <label htmlFor="rentSale">Toggle</label>
                <span>Аренда</span>
                <span>Продажа</span>
            </div>
        )
    }
}