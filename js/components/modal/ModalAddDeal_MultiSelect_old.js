import React from 'react'

// Множественный select модальный. Значения выбранных элементов находится в data-selected
export class ModalAddDeal_MultiSelect_old extends React.Component {
    state = {
        showModal: false,
        selectedValues: this.props.selectedValues || []
    };

    componentDidUpdate(prevProps) {
        const {selectedValues, options} = this.props;
        if (JSON.stringify(selectedValues) !== JSON.stringify(prevProps.selectedValues)) {
            this.setState({selectedValues})
        }
        if (JSON.stringify(options) !== JSON.stringify(prevProps.options)) {
            this.setState({selectedValues: []})
        }
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    };

    clickOptions = (key) => {
        const {selectedValues} = this.state;

        const newArr = selectedValues.filter(item => item !== key); // Удаляем элемент
        if (selectedValues.length === newArr.length) { // Если ничего не удалило, то прибавляем элемент
            newArr.push(key)
        }

        const {onChange} = this.props;
        onChange && onChange(newArr.join(','));

        this.setState({selectedValues: newArr})
    };

    chooseAll = () => {
        const fullArr = this.props.options.map(item => item.value);
        this.setState({selectedValues: fullArr})
    };

    render() {
        console.log('render ModalAddDeal_MultiSelect');

        const {selectedValues, showModal} = this.state;

        const {
            title, // Заголовок, который отображается вначале при невыбранных элементах
            id, // id компонента для работы с ним через DOM
            options = [], // Список элементов selecta в виде массива [{value: "zovt", title: "Жоветневый"}]
            nameValue = 'value', // Название ключа, в котором лежит value элемента
            nameTitle = 'title' // Название ключа, в котором лежит title элемента
        } = this.props;

        const {clickOptions, toggleModal, chooseAll} = this;

        let span, selectedTitle = '';


        const list = options.map(function (item, i) {
            const value = item[nameValue],
                  title = item[nameTitle];
            if (selectedValues.indexOf(value) !== -1) {
                selectedTitle = title
            }
            return (
                <div className={"modal-options-select-list-item" + (selectedValues.indexOf(value) !== -1 ? ' selected' : '')} key={i}
                     onClick={() => clickOptions(value)}>
                    {title}
                </div>
            )
        });

        const modal = (
            <div className="modal-options">
                <div className="modal-options-win">
                    <div className="modal-options-title">
                        <i className="mdi mdi-arrow-left circle-hover" onClick={toggleModal}/>
                        <span>{title}</span>
                        <i className="mdi mdi-check-all w36 cursor-pointer" onClick={chooseAll}/>
                    </div>
                    <div className="modal-options-select-list">{list}</div>
                    <div className="modal-options-btns" onClick={toggleModal}><span>Ок</span></div>
                </div>
            </div>
        );

        switch(selectedValues.length) {
            case 0:
                span = title;
                break;
            case 1:
                span = selectedTitle;
                break;
            default:
                span = title + ': ' + selectedValues.length + ' шт.';
        }


        return (
            <div id={id} data-selected={selectedValues.join(',')}>
                <div className="btn-dropdown h36" onClick={this.toggleModal}>
                    <span>{span}</span>
                    <div className="icon-wrapper"><i className="mdi mdi-chevron-down"/></div>
                </div>
                {showModal && modal}
            </div>
        )
    }
}