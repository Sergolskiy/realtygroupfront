import React from 'react'

// Число вида 23 456 000

// className
// title
// placeholder
// defaultValue - первоначальное значение
// onchange(value) - функция, вызывается при нажатии одной клавиши
// onblur(value) - функция, вызывается при снятии фокуса

export class InputMoney extends React.Component {

    state = {
        value: this.props.defaultValue || ''
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.value !== nextState.value ||
            this.props.className !== nextProps.className ||
            this.props.title !== nextProps.title ||
            this.props.placeholder !== nextProps.placeholder
        )
    }

    inputChange = e => {
        const {value} = this.state;
        const {onchange} = this.props;

        const newValue = e.target.value.replace(/\D/g, ''); // Удаляем все символы, кроме цифр

        if (newValue !== value) {
            this.setState({value: newValue});
            onchange && onchange(newValue || null)
        }
    };

    inputBlur = () => {
        const {value} = this.state;
        const {onblur} = this.props;

        const newValue = value ? String(+value) : value;

        this.setState({value: newValue});
        onblur && onblur(newValue || null)
    };

    render() {
        console.log('render InputMoney');

        const {className, title, placeholder} = this.props;
        const {value} = this.state;

        return (
            <input type="tel"
                   className={className}
                   title={title}
                   placeholder={placeholder}
                   value={moneyMask(value)}
                   data-focus="modalAddDeal"
                   onChange={this.inputChange}
                   onBlur={this.inputBlur}
            />
        )
    }
}