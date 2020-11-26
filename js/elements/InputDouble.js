import React from 'react'

// Число вида 1234.5678
// Если второй input === '99999999', то поле должно быть пустое

// className
// defaultValue - первоначальное значение ('10,20')
// onchange(value) - функция, вызывается при нажатии одной клавиши
// onblur(value) - функция, вызывается при снятии фокуса
export class InputDouble extends React.Component {

    constructor(props) {
        super(props);
        const arr = (props.defaultValue || '').split(',');
        this.state = {
            value0: arr[0] || '',
            value1: (!arr[1] || arr[1] === '99999999') ? '' : arr[1]
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.value0 !== nextState.value0 ||
            this.state.value1 !== nextState.value1 ||
            this.props.className !== nextProps.className
        )
    }

    changeParent = (value0, value1, handler) => {
        if (!value0 && !value1) handler(null);
        else if (value0 && !value1) handler(value0 + ',99999999');
        else handler(value0 + ',' + value1)
    };

    changeState = (newState) => {
        this.setState(newState)
    };

    render() {
        console.log('render InputDouble');

        const {className, onchange, onblur} = this.props;
        const {value0, value1} = this.state;
        const {changeState, changeParent} = this;

        return (
            <>
                <input type="tel"
                       className={className}
                       placeholder="От"
                       value={value0}
                       onChange={e => {
                           const {value1} = this.state;
                           const value0 = e.target.value
                               .replace(/,/g, '.') // Заменяем запятую на точку
                               .replace(/[^\d.]/g, '') // Удаляем все символы, кроме цифр и точки
                               .replace(/^\./, '0.'); // Точку вначале заменяем на "0."
                           const match = /^\d+(\.\d*)?$/.test(value0);
                           if (!value0 || match) {
                               changeState({value0});
                               onchange && changeParent(value0, value1, onchange)
                           }
                       }}
                       onBlur={() => {
                           const {value0, value1} = this.state;
                           const newValue0 = value0 ? String(+value0) : value0;
                           value0 && changeState({value0: newValue0});
                           onblur && changeParent(newValue0, value1, onblur)
                       }}
                />
                <input type="tel"
                       className={className}
                       placeholder="До"
                       value={value1}
                       onChange={e => {
                           const {value0} = this.state;
                           const value1 = e.target.value
                               .replace(/,/g, '.') // Заменяем запятую на точку
                               .replace(/[^\d.]/g, '') // Удаляем все символы, кроме цифр и точки
                               .replace(/^\./, '0.'); // Точку вначале заменяем на "0."
                           const match = /^\d+(\.\d*)?$/.test(value1);
                           if (!value1 || match) {
                               changeState({value1});
                               onchange && changeParent(value0, value1, onchange)
                           }
                       }}
                       onBlur={() => {
                           const {value0, value1} = this.state;
                           const newValue1 = value1 ? String(+value1) : value1;
                           value1 && changeState({value1: newValue1});
                           onblur && changeParent(value0, newValue1, onblur)
                       }}
                />
            </>
        )
    }
}