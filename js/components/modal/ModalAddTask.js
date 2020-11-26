import React from 'react'
import {SingleSelect} from '../../elements/SingleSelect';

export class ModalAddTask extends React.Component {
    componentDidMount() {

        $('input[name="phone"]').mask('(000)-000-00-00');

        $('#datetimepicker').datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            autoclose: true,
            language: 'ru'
        });
    }

    clickTypeDeal = (e) => {

    };

    render() {
        console.log('render ModalAddTask');
        return (

            <>
                <div className="modal-tasks">
                    <div className="inputGroup mb-2">
                        <input type="text" size="30" id="datetimepicker" placeholder="Дата и время" readOnly/>
                        <span/>
                    </div>
                    <div className="mb-2 h36">
                        <SingleSelect iconWrapper={true} internalClass="btn-dropdown ripple" id="typeTask"
                                      selected_value="perform" options={{
                            perform: 'Выполнить',
                            connect: 'Связаться',
                            meeting: 'Встреча',
                            show: 'Показ'
                        }}/>
                    </div>

                    <textarea placeholder="Описание"/>
                    <div className="_remindFor mb-2">
                        <span>Напомнить за</span>
                        <div className="inputGroup">
                            <input type="tel" name="time"/>
                            <span/>
                        </div>
                        <div className="h36">
                            <SingleSelect iconWrapper={true} internalClass="btn-dropdown-center ripple" id="timeline"
                                          selected_value="min" options={{
                                min: 'мин',
                                hour: 'ч',
                                day: 'дн'
                            }}/>
                        </div>
                    </div>
                    <div className="inputGroup">
                        <input placeholder="Ответственные" type="text"/>
                        <span/>
                    </div>
                </div>

                <div className="modal-one-btn">
                    <div className="ripple">Добавить</div>
                </div>
            </>
        )
    }
}