import React from 'react'

export class ModalAddDeal_typedeal extends React.Component {

  render() {

    const {clickTypeDeal, dealtype, dealdirection} = this.props;

    let role = JSON.parse(window.localStorage.getItem('access')).role;

    return (
      <div className="modal-dealtype-btns">

        {role === 'ROLE_ADMIN' || role === 'ROLE_REALTOR_RENT' || role === 'ROLE_REALTOR_SALE_RENT' || role === 'ROLE_TRAINEE_RENT' ?
        <div className="mb-2">
          <div
            className={"btn-choose _typedeal mr-2" + ((dealtype === 'rent' && dealdirection === 'request') ? ' active' : '')}
            onClick={() => clickTypeDeal('rent', 'request')}>Сниму
          </div>
          <div
            className={"btn-choose _typedeal" + ((dealtype === 'rent' && dealdirection === 'object') ? ' active' : '')}
            onClick={() => clickTypeDeal('rent', 'object')}>Сдам
          </div>
        </div>
          : null
        }

        {role === 'ROLE_ADMIN' || role === 'ROLE_REALTOR_SALE' || role === 'ROLE_REALTOR_SALE_RENT' || role === 'ROLE_TRAINEE_SALE' ?
        <div>
          <div
            className={"btn-choose _typedeal mr-2" + ((dealtype === 'sale' && dealdirection === 'request') ? ' active' : '')}
            onClick={() => clickTypeDeal('sale', 'request')}>Куплю
          </div>
          <div
            className={"btn-choose _typedeal" + ((dealtype === 'sale' && dealdirection === 'object') ? ' active' : '')}
            onClick={() => clickTypeDeal('sale', 'object')}>Продам
          </div>
        </div>
          : null
        }
      </div>
    )
  }
}
