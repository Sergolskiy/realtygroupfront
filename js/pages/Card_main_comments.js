import React from 'react';
import PropTypes from 'prop-types';

export class Card_main_comments extends React.PureComponent {

    constructor(props) {
        super(props);
        this.inputMessage = React.createRef();
        this.chatArea = React.createRef();
        this.sendMessageZone = React.createRef();
        // this.state = {
        //     comment: props.comment
        // }
    }

    componentDidMount() {
        this.scrollChat()
    };

    componentDidUpdate() {
        this.scrollChat()
    };

    // changeState = state => {
    //     this.setState(state)
    // };

    // Прокрутка сообщений вниз
    scrollChat = () => {
        const chat = this.chatArea.current;
        $(chat).animate({
            scrollTop: chat.scrollHeight - chat.offsetHeight
        }, 1000)
    };

    sendMessage = () => {

        const input = this.inputMessage.current;

        if (input.value) {

            const {card_id, user_profile_id, changeStateCard} = this.props;
            // const {changeState} = this;
            const $sendMessageZone = $(this.sendMessageZone.current);
            const comments_arr = json_parse(this.props.comment) || [];

            comments_arr.push({
                user_id: user_profile_id,
                created_at: new Date().getTime(),
                post: input.value
            });

            const comment = JSON.stringify(comments_arr);

            $sendMessageZone.addClass('disabled');
            put_card(card_id, {comment}).done(function (newCardInfo) {
                input.value = '';
                // changeState({comment});
                changeStateCard({cardInfo: newCardInfo, cardInfoInitial: Object.assign({}, newCardInfo)})
            }).always(function () {
                $sendMessageZone.removeClass('disabled');
            })
        }
    };

    pressEnter = e => {
        if (e.which === 13) this.sendMessage()
    };

    render() {
        console.log('render Card_main_comments');

        const {users} = this.props;

        const comments_arr = json_parse(this.props.comment);

        return <>

            <div className="comments-chat-area" ref={this.chatArea}>
                {
                    Array.isArray(comments_arr) && comments_arr.length > 0 ?

                        comments_arr.map(function (comment) {

                            const user = users.find(user => user.id === comment.user_id) || {};

                            const userName = user.name + ' ' + user.surname;
                            const hash = undefsafe(user, 'user_details.profile_image.hash');
                            const img_url = hash ? url_backend + '/public/uploads/files/' + hash : '/images/no_ava.jpg';

                            const time = moment(comment.created_at).format("DD MMMM YYYY, HH:mm");

                            return (
                                <div key={comment.created_at} className="comments-chat-message">
                                    <div className="img-xs" title={userName} data-toggle="tooltip">
                                        <img src={img_url} className="object-fit-cover rounded-circle wh-100" alt=""/>
                                    </div>
                                    <div className="_body">
                                        <div className="_head">{time}</div>
                                        <div className="_message">{comment.post}</div>
                                    </div>
                                </div>
                            )
                        }) :

                        <div className="d-flex flex-center h-100"><i className="mdi mdi-message-processing-outline"/></div>
                }

            </div>


            <div className="comments-chat-footer" ref={this.sendMessageZone}>
                {/*Если не смогло распарсить (comments_arr === false), значит что-то не так*/}
                <input className="w-100 p-1 border-0 rounded" placeholder={comments_arr === false ? "Ошибка в комментариях" : "Введите комментарий"} ref={this.inputMessage} onKeyPress={this.pressEnter} disabled={comments_arr === false}/>
                <i className="mdi mdi-telegram fs32 cursor-pointer" onClick={this.sendMessage}/>
            </div>


        </>

    }
}

Card_main_comments.propTypes = {
    user_profile_id: PropTypes.number.isRequired,
    card_id: PropTypes.number.isRequired,
    comment: PropTypes.string,
    users: PropTypes.array,
    changeStateCard: PropTypes.func.isRequired
};

Card_main_comments.defaultProps = {
    users: []
};