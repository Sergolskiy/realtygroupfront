import React from 'react'

// Любой текст

// className
// title
// placeholder
// defaultValue - первоначальное значение
// onchange(value) - функция, вызывается при нажатии одной клавиши
// onblur(value) - функция, вызывается при снятии фокуса
// forbidden_symbols - регулярное выражение, что нельзя печатать в поле. Например /[ |,]/g - запрет на ввод " " и ","


export class InputText extends React.Component {

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
        const {onchange, forbidden_symbols} = this.props;

        const newValue = forbidden_symbols ?
            e.target.value.replace(forbidden_symbols, '') :
            e.target.value;

        if (newValue !== value) {
            this.setState({value: newValue});
            onchange && onchange(newValue || null)
        }
    };

    inputBlur = () => {
        const {value} = this.state;
        const {onblur} = this.props;

        onblur && onblur(value || null)
    };

    render() {
        console.log('render InputText');

        const {className, title, placeholder} = this.props;
        const {value} = this.state;

        return (
            <input className={className}
                   title={title}
                   placeholder={placeholder}
                   value={value}
                   onChange={this.inputChange}
                   onBlur={this.inputBlur}
            />
        )
    }
}