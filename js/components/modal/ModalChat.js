import React from 'react'

export class ModalChat extends React.PureComponent {

    constructor(props) {
        super(props);
        this.inputMessage = React.createRef();
        this.chatArea = React.createRef();
        this.sendMessageZone = React.createRef();
        this.state = {
            show: false,
            card_post_arr: this.props.card_post_arr
        }
    }

    toggleChat = () => {
        this.setState({show: !this.state.show})
    };

    changeState = state => {
        this.setState(state)
    };

    sendMessage = () => {
        const {cardInfoInitial, cardInfo} = this.props;
        const {card_post_arr} = this.state;
        const {changeState} = this;
        const input = this.inputMessage.current;
        const $sendMessageZone = $(this.sendMessageZone.current);

        
        if (input.value) {
            $sendMessageZone.addClass('disabled');
            post_cards_request_post({
                [`card_${cardInfoInitial.sale_type}_id`]: cardInfoInitial.id,
                [`card_${cardInfo.sale_type}_id`]: cardInfo.id,
                post: input.value,
                initial_card: cardInfoInitial.sale_type
            }).done(function (last_card_post) {
                input.value = '';
                changeState({card_post_arr: card_post_arr.concat(last_card_post)})
            }).always(function () {
                $sendMessageZone.removeClass('disabled');
            })
        }
    };

    pressEnter = e => {
        if (e.which === 13) this.sendMessage()
    };


    componentDidUpdate() {
        // Прокрутка сообщений вниз
        if (this.state.show) {
            const chat = this.chatArea.current;
            $(chat).animate({
                scrollTop: chat.scrollHeight - chat.offsetHeight
            }, 1000)
        }

        // Эффект крестика
        if (this.state.show) {
            legitRipple()
        }
    };

    render() {
        console.log('render ModalChat');

        const {show, card_post_arr} = this.state;
        const {users} = this.props;

        const comment_icon = card_post_arr.length > 0 ? "mdi-message-text-outline" : "mdi-message-outline";

        return (
            <div onDoubleClick={e => e.stopPropagation()}>
                <i className={`mdi ${comment_icon} fs22 align-bottom cursor-pointer`} onClick={this.toggleChat}/>
                {
                    show &&
                    <div className="modal-add">
                        <div className="modal-win p-2">

                            <div className="chat-head flex-between">
                                <i className="mdi mdi-information-outline fs24" title="Здесь записывается вся история работы между двумя встречными карточками сделок" data-toggle="tooltip"/>
                                <span>История работы</span>
                                <i className="mdi mdi-close fs22 circle-hover ripple" onClick={this.toggleChat}/>
                            </div>

                            <div className="chat-area" ref={this.chatArea}>
                                {
                                    card_post_arr.map(function (post) {

                                        const user = users.find(user => user.id === post.user_id) || {};
                                        const userName = user.name + ' ' + user.surname;
                                        const hash = undefsafe(user, 'user_details.profile_image.hash');
                                        const img_url = hash ? url_backend + '/public/uploads/files/' + hash : '/images/no_ava.jpg';

                                        const time = moment.utc(post.created_at, "YYYY-MM-DD HH:mm:ss").local().format("DD MMMM YYYY, HH:mm");

                                        return (
                                            <div key={post.id} className="chat-message">
                                                <div className="img-xs" title={userName} data-toggle="tooltip">
                                                    <img src={img_url} className="object-fit-cover rounded-circle wh-100" alt=""/>
                                                </div>
                                                {/*<i className="mdi mdi-information-outline fs20"/>*/}
                                                <div className="_body">
                                                    <div className="_head">{time}</div>
                                                    <div className="_message">{post.post}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>


                            <div className="chat-footer" ref={this.sendMessageZone}>
                                <input className="w-100 p-1 border-0 rounded" placeholder="Введите комментарий" ref={this.inputMessage} onKeyPress={this.pressEnter}/>
                                <i className="mdi mdi-telegram fs32 cursor-pointer" onClick={this.sendMessage}/>
                            </div>


                        </div>
                    </div>
                }
            </div>


        )
    }
}