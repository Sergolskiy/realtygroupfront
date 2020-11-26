import React from 'react'

export class ModalAddDeal_typedeal extends React.Component {

    render() {

        const {clickTypeDeal, dealtype, dealdirection} = this.props;

        return (
            <div className="modal-dealtype-btns">
                <div className="mb-2">
                    <div className={"btn-choose _typedeal mr-2" + ((dealtype === 'rent' && dealdirection === 'request') ? ' active' : '')}
                         onClick={() => clickTypeDeal('rent', 'request')}>Сниму</div>
                    <div className={"btn-choose _typedeal" + ((dealtype === 'rent' && dealdirection === 'object') ? ' active' : '')}
                         onClick={() => clickTypeDeal('rent', 'object')}>Сдам</div>
                </div>
                <div>
                    <div className={"btn-choose _typedeal mr-2" + ((dealtype === 'sale' && dealdirection === 'request') ? ' active' : '')}
                         onClick={() => clickTypeDeal('sale', 'request')}>Куплю</div>
                    <div className={"btn-choose _typedeal" + ((dealtype === 'sale' && dealdirection === 'object') ? ' active' : '')}
                         onClick={() => clickTypeDeal('sale', 'object')}>Продам</div>
                </div>
            </div>
        )
    }
}