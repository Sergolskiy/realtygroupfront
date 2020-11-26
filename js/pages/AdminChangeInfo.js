import React from 'react'
import {Back, Title} from "../elements/Elements";
import {Settings_profile} from "./Settings_profile";

export class AdminChangeInfo extends React.Component {

  state = {
    activeTab: 0,
    userEdit: {},
    editRole: {},
    editPermissions: {},
    loading: true,
  }

  getUserFromId = () => {
    get_user(this.props.match.params.id).done((user) => {
      this.setState( {
        userEdit: user.user,
        editRole: user.role,
        editPermissions: user.permissions,
        loading: false
      })
    })
  }

  componentDidMount() {
    // console.log(useParams());
    this.getUserFromId();
  }

  render() {
    // const {user_profile} = this.props;
    // console.log();
    return (
      <>
        <div className="head navbar flex-nowrap justify-content-start" id="head">
          <Back/>
          <Title data="Редактирование информации"/>
        </div>
        <div className="content">

          {this.state.loading ? null :
            <Settings_profile user_profile={this.state.userEdit} editRole={this.state.editRole} editPermissions={this.state.editPermissions}/>
          }


        </div>
      </>
    )
  }
}
