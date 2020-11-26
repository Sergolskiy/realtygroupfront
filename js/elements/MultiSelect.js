import React from 'react'

// Множественный select на основе dropdown bootstrap. Значения выбранных элементов находится в data-selected
export class MultiSelect extends React.Component {
    componentDidMount() {
        legitRipple();
    }
    state = {
        selected: []
    };
    clickMenu = (e) => {
        let target = delegation(e, '.dropdown-item');
        let $currentTarget = $(e.currentTarget);
        if (target) {
            $(target).toggleClass('active');
            this.setState({
                selected: function () {
                    let objKey = $currentTarget.children('.active').map(function (index, element) {
                        return element.dataset.key; // Возвращаем свойство data-key элементов с классом 'active'
                    });
                    return objKey.get(); // Объект jQuery в массив
                }()
            });
        }
        $currentTarget.siblings().dropdown('toggle'); // Открываем меню заново
    };
    render() {
        let id = this.props.id,
            options = this.props.options,
            selected = this.state.selected,
            list = [],
            count = 0;
        for (let key in options) {
            if (key === 'default') continue; // Пропускаем элемент default
            list.push(<li className="dropdown-item" key={count++} data-key={key}><span>{options[key]}</span></li>)
        }
        return (
            <div className="dropdown" id={id} data-selected={selected.join(' ')}>
                <div className="btn-dropdown ripple" data-toggle="dropdown">
                    <span>{selected.length === 0 ? options.default : options.default + ': ' + selected.length + ' шт.'}</span>
                    <div className="icon-wrapper"><i className="mdi mdi-chevron-down"/></div>
                </div>
                <ul className="dropdown-menu" onClick={(e)=>{this.clickMenu(e)}}>
                    {list}
                </ul>
            </div>
        )
    }
}