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

  state = {
    isOpenEdit: false,
    editComment: '',
    editCommentIndex: '',
    cardId: '',
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

  closeEditPopup = () => {
    this.setState({isOpenEdit: false})
  };

  editComment = () => {
   let data = {
     commentText: this.state.editComment,
     commentKey: this.state.editCommentIndex,
     cardId: this.state.cardId,
   }

    update_commet(data).done((response) => {
      console.log(response);
      console.log(JSON.parse(response.comment)[this.state.editCommentIndex].post);
      document.querySelector('div[data-comment-id="'+this.state.editCommentIndex+'"]').innerHTML = JSON.parse(response.comment)[this.state.editCommentIndex].post
      this.closeEditPopup();
    }).fail(() => {
      alert('Ошибка при редактировании')
    })
    // remove_comment
  };

  removeComment = (index, card_id) => {
   let data = {
     commentKey: index,
     cardId: card_id,
   }

    remove_comment(data).done((response) => {
      console.log(response);
      document.querySelector('div[data-comment-id="'+index+'"]').parentNode.parentNode.remove()
    }).fail(() => {
      alert('Ошибка при удалении')
    })
    // remove_comment
  };

  render() {
    console.log('render Card_main_comments');

    const {users} = this.props;
    console.log(this.props);

    const comments_arr = json_parse(this.props.comment);

    const {card_id} = this.props;

    let permissions = JSON.parse(window.localStorage.getItem('access')).permissions;
    let role = JSON.parse(window.localStorage.getItem('access')).role;

    return <>

      <div className="comments-chat-area" ref={this.chatArea}>
        {
          Array.isArray(comments_arr) && comments_arr.length > 0 ?

            comments_arr.map((comment, index) => {

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
                    <div className="_message" data-comment-id={index}>{comment.post}</div>
                  </div>
                  {role === 'ROLE_ADMIN' &&
                  <div className="comments-chat-message-edit">
                    <i className="mdi mdi-pencil btn-style" title="Редактировать комментарий"
                       onClick={() => {
                         this.setState({isOpenEdit: true, editComment: comment.post, editCommentIndex: index, cardId: card_id})
                       }}/>

                    <i className="mdi mdi-window-close cursor-pointer"
                      // data-user-id={user.id}
                      onClick={() => this.removeComment(index, card_id)}
                       title="Удалить комментарий"/>
                  </div>
                  }
                </div>
              )
            }) :

            <div className="d-flex flex-center h-100"><i className="mdi mdi-message-processing-outline"/></div>
        }

      </div>


      <div className="comments-chat-footer" ref={this.sendMessageZone}>
        {/*Если не смогло распарсить (comments_arr === false), значит что-то не так*/}
        <input className="w-100 p-1 border-0 rounded"
               placeholder={comments_arr === false ? "Ошибка в комментариях" : "Введите комментарий"}
               ref={this.inputMessage} onKeyPress={this.pressEnter} disabled={comments_arr === false}/>
        <i className="mdi mdi-telegram fs32 cursor-pointer" onClick={this.sendMessage}/>
      </div>

      {role === 'ROLE_ADMIN' &&
        <div className={"popup-edit-comment custom-popup" + (this.state.isOpenEdit ? ' open' : '')} onClick={(e) => {
          e.target.classList[0] === 'popup-edit-comment' ? this.closeEditPopup() : ''
        }}>
          {this.state.isOpenEdit}
          <div className="custom-popup__inner">
            <div className="custom-popup__header">
              <div className="custom-popup__name">
                Редактировать комментарий
              </div>
              <div className="custom-popup__close" onClick={this.closeEditPopup}>
                ✖
              </div>
            </div>
            <div className="custom-popup__content">
              <input className="w-100 p-1" defaultValue={this.state.editComment}
                     onChange={e => this.setState({editComment: e.target.value})}/>

              <div className="custom-popup__btn">
                <button className="btn btn-outline-primary" onClick={this.closeEditPopup}>отменить</button>
                <button className="btn btn-outline-success" onClick={this.editComment}>Изменить</button>
              </div>

            </div>
          </div>
        </div>
      }

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
