import React from 'react'


export class Card_main_realtor extends React.PureComponent {

    // state = {
    //     user: {}
    // };
    //
    // componentDidMount() {
    //     this.loadData()
    // }
    //
    // loadData = () => {
    //     const {user_id} = this.props;
    //     get_user(user_id).done(function (user) {
    //         this.setState({user})
    //     }.bind(this))
    // };


    render() {
        const {user = {}} = this.props;
        const hash = undefsafe(user, 'user_details.profile_image.hash');
        const img_url = hash ? url_backend + '/public/uploads/files/' + hash : '/images/no_ava.jpg';
        const {user_phones = [], user_socials = []} = user;


        let viber, whatsapp, telegram;
        user_socials.forEach(function (item) {
            switch (item.social_network_id) {
                case 1: viber = item.value; break;
                case 2: whatsapp = item.value; break;
                case 3: telegram = item.value; break;
            }
        });


        return (
            <div className="d-flex">
                <div className="mr-2 img-md rounded-circle img-thumbnail">
                    <img src={img_url} className="object-fit-cover rounded-circle wh-100" alt=''/>
                </div>
                <div>
                    <div>
                        <span>{user.name} {user.surname}</span>
                    </div>
                    <div className="flex-left mt-1">

                        {/*{*/}
                            {/*user_phones.length === 1 &&*/}
                            {/*<a href={"tel:" + user_phones[0].value}>*/}
                                {/*<i className="mdi mdi-phone"/>*/}
                            {/*</a>*/}
                        {/*}*/}

                        {/*{*/}
                            {/*user_phones.length > 0 &&*/}
                            {/*<Card_main_realtor_phones user_phones={user_phones}/>*/}
                        {/*}*/}

                        {
                            user_phones.length > 0 &&
                            <a href="#collapseUserPhones" data-toggle="collapse" aria-expanded="false"
                               aria-controls="collapseExample">
                                <i className="mdi mdi-phone color-black hover-color-lightgray fs26"/>
                            </a>
                        }

                        {
                            viber &&
                            <a href={"viber://add?number=" + viber} className="ml-3" target="_blank" rel="nofollow noopener">
                                <i className="fab fa-viber color-black hover-color-viber fs23"/>
                            </a>
                        }
                        {
                            telegram &&
                            <a href={"https://t.me/" + telegram} className="ml-3" target="_blank" rel="nofollow noopener">
                                <i className="mdi mdi-telegram color-black hover-color-telegram fs26"/>
                            </a>
                        }
                        {
                            whatsapp &&
                            <a href={"https://wa.me/" + whatsapp} className="ml-3" target="_blank" rel="nofollow noopener">
                                <i className="mdi mdi-whatsapp color-black hover-color-whatsapp fs26"/>
                            </a>
                        }
                    </div>

                    {
                        user_phones.length > 0 &&
                        <div className="collapse" id="collapseUserPhones">
                            {
                                user_phones.map((phone, i) =>
                                    <div key={i}>
                                        <a href={"tel:" + phone.value}>
                                            {phone.value}
                                        </a>
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}