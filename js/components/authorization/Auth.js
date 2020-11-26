import React from 'react'
import {Login} from './Login'
import {ConfirmCode} from './ConfirmCode'
import {connect} from "react-redux";

class Auth extends React.Component {
    render() {
        switch (this.props.page) {
            case 'login':
                return <Login/>;
            case 'confirmCode':
                return <ConfirmCode email={this.props.email}/>;
        }
    }
}

Auth = connect(store => store.reducerAuth)(Auth);

export {Auth}