import React from 'react'

// Ползунок для указания диапазона
// defaultValue - первоначальное значение
// min, max - максимальное и минимальное значения
// handler - хендлер, срабатывает при клике на Ок. Передается значение ползунка

export class PriceSlider extends React.PureComponent {

    state = {
        value: this.props.defaultValue
    };

    onChange = e => {
        this.setState({value: e.target.value});
    };

    okClick = () => {
        const {handler} = this.props;
        handler && handler(this.state.value)
    };

    render() {
        console.log('render Slider');

        const {min, max, step} = this.props;
        const {value} = this.state;
        const {onChange, okClick} = this;

        return (
            <div>
                <div className="fs14 mb-2 color-gray"
                     title="Допустимое отклонение цены. Если 0%, подбор идет строго по указанному бюджету"
                     data-toggle="tooltip">
                    <span>Отклонение цены</span><span className="font-weight-bold"> {value} %</span>
                </div>
                <div className="slidecontainer flex-around">
                    <input type="range" className="slider" min={min} max={max} step={step} value={value} onChange={onChange}/>
                    <button onClick={okClick}>Ок</button>
                </div>
            </div>

        )
    }
}