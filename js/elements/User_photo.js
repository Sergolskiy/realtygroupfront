import React from 'react'

export class User_photo extends React.PureComponent {

    render() {
        console.log('render User_photo');

        const {user} = this.props;

        const userName = user.name + ' ' + user.surname;
        const hash = undefsafe(user, 'user_details.profile_image.hash');
        const img_url = hash ? url_backend + '/public/uploads/files/' + hash : '/images/no_ava.jpg';

        return (
            <div className="img-xs" title={userName} data-toggle="tooltip">
                <img src={img_url} className="object-fit-cover rounded-circle wh-100" alt=''/>
            </div>
        )
    }
}