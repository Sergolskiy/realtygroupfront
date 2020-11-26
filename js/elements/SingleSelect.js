import React from 'react'

// Единичный select на основе dropdown bootstrap. Значение выбранного элемента находится в data-selected b
// iconWrapper = false - Стрелка в кружке справа. По умолчанию её нету
// internalClass = "btn-dropdown ripple" - Класс кнопки, как она выглядит

// Старая версия: options - объект с элементами. В ключе default указывается значение по умолчанию, которое потом не светится
// Новая версия: options = [{value: 'usd', title: 'Доллар'}]

export class SingleSelect extends React.PureComponent {
    componentDidMount() {
        legitRipple()
    }

    state = {
        selected_value: '',
        selected_id: ''
    };

    clickOptions = (value, id) => {
        this.setState({selected_value: value, selected_id: id});
        const {handler} = this.props;
        handler && handler(id, value);
    };

    render() {
        console.log('render SingleSelect');

        const {id, internalClass, before, iconWrapper, title = '...', options} = this.props;
        const {clickOptions} = this;

        let selected_value = this.state.selected_value || this.props.selected_value, // Если состояние пустое, то берем свойство
            selected_id = this.state.selected_id || this.props.selected_id,
            list = [],
            count = 0,
            span;


        // Новая модель, когда options = []
        if (Array.isArray(options)) { // Если массив

            if (options.length === 0) { // Если массив пустой
                span = title
            }
            else { // Если массив полный

                if (selected_value) { // selected указан

                    if (!options.some(item => item.value === selected_value)) { // Если нет совпадений, выбираем первый элемент
                        selected_value = options[0].value
                    }


                }
                else if (selected_id) { // если selected_id указан

                    if (!options.some(item => item.id == selected_id)) { // Если нет совпадений, выбираем первый элемент
                        selected_id = options[0].id
                    }

                }
                else { // selected и selected_id не указан
                    span = title;
                }

                // Формируем список элементов
                options.forEach(function (item) {
                    if (item.value === selected_value || item.id == selected_id) { // Пропускаем уже выбранный элемент
                        selected_value = item.value;
                        selected_id = item.id;
                        span = item.title;
                        return;
                    }
                    list.push(<li className="dropdown-item" key={count++} onClick={() => clickOptions(item.value, item.id)}>{item.title}</li>)
                }, this);

            }

            return (
                <div className="dropdown wh-100" id={id} data-selected-value={selected_value} data-selected-id={selected_id}>
                    <div className={internalClass + ' wh-100'} data-toggle="dropdown">
                        {before}
                        <span className="_selected">{span}</span>
                        {iconWrapper && <div className="icon-wrapper"><i className="mdi mdi-chevron-down"/></div>}
                    </div>
                    <ul className="dropdown-menu">
                        {list}
                    </ul>
                </div>
            )

        }
        // Старая модель, когда options = {}
        else {
            for (let key in options) {
                if (key === selected_value || key === 'default') continue; // Пропускаем уже выбранный элемент и элемент default
                list.push(<li className="dropdown-item" key={count++} onClick={() => clickOptions(key)}>{options[key]}</li>)
            }
            return (
                <div className="dropdown wh-100" id={id} data-selected={selected_value}>
                    <div className={internalClass + ' wh-100'} data-toggle="dropdown">
                        {before}
                        <span className="_selected">{selected_value ? options[selected_value] : options.default}</span>
                        {iconWrapper && <div className="icon-wrapper"><i className="mdi mdi-chevron-down"/></div>}
                    </div>
                    <ul className="dropdown-menu">
                        {list}
                    </ul>
                </div>
            )
        }
    }
}