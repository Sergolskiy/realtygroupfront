import React from 'react'

// Множественный select модальный. Значения выбранных элементов находится в data-selected
export class ModalAddDeal_MultiSelect extends React.PureComponent {

    constructor(props) {
        super(props);
        this.select = React.createRef()
    }

    state = {
        showModal: false,
        selectedValues: this.props.selectedValues || [],
        isChooseAll: false
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
        const {isChooseAll} = this.state;

        const fullArr = isChooseAll ? [] : this.props.options.map(item => item.value);

        const {onChange} = this.props;
        onChange && onChange(fullArr.join(','));

        this.setState({selectedValues: fullArr, isChooseAll: !isChooseAll})
    };

    nextSelect = (elem) => {
        const nextElem = elem.nextSibling;

        if (!nextElem) {
            this.toggleModal();
            $(document.getElementById('price')).focus();
            return
        }
        if (nextElem.classList.contains('disabled')) {
            this.nextSelect(nextElem);
            return;
        }

        this.toggleModal();
        $(nextElem).children('.modal-square-btns').click()
    };

    prevSelect = (elem) => {
        const prevElem = elem.previousSibling;

        if (!prevElem) {
            this.toggleModal();
            return
        }
        if (prevElem.classList.contains('disabled')) {
            this.prevSelect(prevElem);
            return;
        }

        this.toggleModal();
        $(prevElem).children('.modal-square-btns').click()
    };

    render() {
        console.log('render ModalAddDeal_MultiSelect');

        const {selectedValues, showModal} = this.state;

        const {
            title, // Заголовок
            icon, // Иконка для кнопки
            id, // id компонента для работы с ним через DOM
            className = '', // Класс
            options = [], // Список элементов selecta в виде массива [{value: "zovt", title: "Жоветневый"}]
            nameValue = 'value', // Название ключа, в котором лежит value элемента
            nameTitle = 'title' // Название ключа, в котором лежит title элемента
        } = this.props;

        const {clickOptions, toggleModal, chooseAll, nextSelect, prevSelect} = this;

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
                        <i className="mdi mdi-close circle-hover" onClick={toggleModal}/>
                        <span>{title}</span>
                        <i className="mdi mdi-check-all circle-hover" onClick={chooseAll}/>
                    </div>
                    <div className="modal-options-select-list">{list}</div>
                    <div className="modal-options-btns">
                        <div onClick={() => prevSelect(this.select.current)}>
                            <i className="mdi mdi-arrow-left"/>&nbsp;&nbsp;&nbsp;Назад
                        </div>
                        <div onClick={() => nextSelect(this.select.current)} id="nextSelect">
                            Далее&nbsp;&nbsp;&nbsp;<i className="mdi mdi-arrow-right"/>
                        </div>
                    </div>
                </div>
            </div>
        );

        switch(selectedValues.length) {
            case 0:
                span = '';
                break;
            case 1:
                span = selectedTitle;
                break;
            default:
                span = title + ': ' + selectedValues.length + ' шт.';
        }


        return (
            <div className={className} id={id} data-selected={selectedValues.join(',')} ref={this.select}>
                <div className={"modal-square-btns" + (selectedValues.length > 0 ? " active" : "")}
                     title={span} onClick={toggleModal}>
                    <div><i className={icon}/></div>
                    <div>{title}</div>
                </div>
                {showModal && modal}
            </div>
        )
    }
}