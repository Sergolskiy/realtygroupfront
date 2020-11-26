import React from 'react'

// Число вида 2345600. Отдаёт только тип Number

// className
// title
// placeholder
// defaultValue - первоначальное значение
// onchange(value) - функция, вызывается при нажатии одной клавиши
// onblur(value) - функция, вызывается при снятии фокуса

export class InputInteger extends React.Component {

    state = {
        value: (this.props.defaultValue || this.props.defaultValue === 0) ? this.props.defaultValue : ""
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
            onchange && onchange(newValue ? +newValue : null)
        }
    };

    inputBlur = () => {
        const {value} = this.state;
        const {onblur} = this.props;

        const newValue = value ? String(+value) : value;

        this.setState({value: newValue});
        onblur && onblur(newValue ? +newValue : null)
    };

    render() {
        console.log('render InputInteger');

        const {className, title, placeholder} = this.props;
        const {value} = this.state;

        return (
            <input type="tel"
                   className={className}
                   title={title}
                   placeholder={placeholder}
                   value={value}
                   onChange={this.inputChange}
                   onBlur={this.inputBlur}
            />
        )
    }
}