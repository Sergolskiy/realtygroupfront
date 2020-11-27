import React from 'react'
import {store} from "../reducers";
import {RentOrSale} from "../elements/RentOrSale";
import {PresentationSwitch} from "../elements/PresentationSwitch";

export class MenuRight_head extends React.PureComponent {

  logout = e => {
    e.preventDefault();
    if ($.removeCookie('token', {path: '/'})) {
      store.dispatch({
        type: 'LOGIN',
        login: false
      })
    }
  };

  render() {
    console.log('render MenuRight_head');

    const {user_profile, dealtype} = this.props;
    const {name, surname} = user_profile;

    const hash = undefsafe(user_profile, 'user_details.profile_image.hash');
    const image_url = hash ? url_backend + '/public/uploads/files/' + hash : '/images/no_ava.jpg';

    let permissions = JSON.parse(window.localStorage.getItem('access')).permissions;

    return (
      <div className="menu-right-head">

        <div>
          <img className="img-xs rounded-circle" src={image_url}/>
        </div>
        <div>
          <div>{name}</div>
          <div>{surname}</div>
        </div>
        <div className="cursor-pointer" onClick={this.logout}><i className="mdi mdi-logout"/></div>
        <div/>

        {permissions.hasOwnProperty('cards') &&
        permissions.cards.hasOwnProperty('seeRent') &&
        permissions.cards.hasOwnProperty('seeSale') ?
          <RentOrSale type={dealtype}/>
          : null}


        <PresentationSwitch/>

      </div>
    )
  }
}
