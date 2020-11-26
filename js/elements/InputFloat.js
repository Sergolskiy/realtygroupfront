import React from 'react'

// Число вида 1234.5678

// className
// title
// placeholder
// defaultValue - первоначальное значение
// onchange(value) - функция, вызывается при нажатии одной клавиши
// onblur(value) - функция, вызывается при снятии фокуса

export class InputFloat extends React.Component {

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

        const newValue = e.target.value
            .replace(/,/g, '.') // Заменяем запятые на точки
            .replace(/[^\d.]/g, '') // Удаляем все символы, кроме цифр и точки

            // .replace(/(?<=\..*)\./, ''); // Удаляем все точки, кроме первой. ?<= не работает во многих браузерах

            .replace('.', ',') // Заменяем первую точку на запятую
            .replace(/\./g, '') // Удаляем все точки
            .replace(/,/g, '.'); // Заменяем оставшуюся запятую на точку

            // .replace(/^\./, '0.'); // Точку вначале заменяем на "0."

        // const match = /^\d+(\.\d*)?$/.test(newValue);
        // if (!match) return;

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
        console.log('render InputFloat');

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