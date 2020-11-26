import React from 'react'
import {Link} from 'react-router-dom'

import Select from "react-select";

// Регистрация нового пользователя
export class Settings_IP extends React.PureComponent {

  state = {
    ipList: [],
    ip: '',
    description: '',
    editId: '',
    editIp: '',
    editDescription: '',
    isOpenEdit: false,
  };


  componentDidMount() {
    this.getIpAddress();
  }

  getIpAddress = () => {
    get_access_ip().done((response) => {
      this.setState({ipList: response.list})
    })
  }

  addIpAddress = () => {
    let data = {
      ip: this.state.ip,
      description: this.state.description
    }
    add_access_ip(data).done((response) => {
      console.log(response);
      this.getIpAddress();
    }).fail((error) => {
      alert('Неправильный айпи пример 188.163.19.116');
    })
  }

  removeIpAddress = (id) => {
    remove_access_ip(id).done((response) => {
      console.log(response);
      this.getIpAddress();
    })
  }

  closeEditPopup = () => {
    this.setState({isOpenEdit: false})
  };

  updateIpAddress = () => {
    let data = {
      ip: this.state.editIp,
      description: this.state.editDescription
    }

    update_access_ip(data, this.state.editId).done((response) => {
      console.log(response);
      this.getIpAddress();
    }).fail((error) => {
      alert('Неправильный айпи пример 188.163.19.116');
    })
  };

  render() {
    console.log('render Settings_IP');


    return (
      <div className="settings-ip">
        <div className="settings-ip__inner">
          <div className="settings-ip__title">
            Добавленые IP
          </div>
          {this.state.ipList.length > 0 ?
            this.state.ipList.map((item, index) => {
              return (
                <div className="settings-ip__list" key={index}>
                  <div className="settings-ip__item">
                    <div className="settings-ip__ip">
                      {item.ip}
                    </div>
                    <div className="settings-ip__desc">
                      {item.description}
                    </div>

                    <div className="settings-ip__remove" >
                      <i className="mdi mdi-pencil btn-style" title="Редактировать пользователя"
                         style={{marginRight: 10}}
                         onClick={() => {this.setState({isOpenEdit: true, editIp: item.ip, editDescription: item.description, editId: item.id})}}/>
                      <span onClick={() => this.removeIpAddress(item.id)}>✖</span>
                    </div>
                  </div>
                </div>
              )
            })

            : 'Записей нет'}

          <div className="settings-ip__add">
            <div>
              <input type="text" placeholder="Ip" onChange={(e) => this.setState({ip: e.target.value})}/>
              <input type="text" placeholder="Описание" onChange={(e) => this.setState({description: e.target.value})}/>
            </div>
            <button className={'btn btn-success'} onClick={this.addIpAddress}>
              Добавить
            </button>

          </div>

        </div>

        <div className={"popup-edit-comment custom-popup" + (this.state.isOpenEdit ? ' open' : '')} onClick={(e) => {
          e.target.classList[0] === 'popup-edit-comment' ? this.closeEditPopup() : ''}}>
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
              <input className="w-100 p-1" defaultValue={this.state.editIp} onChange={(e) => this.setState({editIp: e.target.value})}/>
              <br/>
              <br/>
              <input className="w-100 p-1" defaultValue={this.state.editDescription} onChange={(e) => this.setState({editDescription: e.target.value})}/>

              <div className="custom-popup__btn">
                <button className="btn btn-outline-primary" onClick={this.closeEditPopup}>отменить</button>
                <button className="btn btn-outline-success" onClick={this.updateIpAddress}>Изменить</button>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}
