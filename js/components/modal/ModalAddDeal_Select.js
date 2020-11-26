import React from 'react'

// Единичный select модальный. Значение выбранного элемента находится в data-selected
export class ModalAddDeal_Select extends React.PureComponent {

    constructor(props) {
        super(props);
        this.select = React.createRef()
    }

    state = {
        showModal: false,
        selectedValue: this.props.selectedValue || ''
    };

    componentDidUpdate(prevProps) {
        const {selectedValue} = this.props;
        if (selectedValue !== prevProps.selectedValue) {
            this.setState({selectedValue})
        }
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    };

    clickOptions = (key) => {
        const {onChange} = this.props;
        onChange && onChange(key);
        this.setState({selectedValue: key})
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
            return
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
            return
        }

        this.toggleModal();
        $(prevElem).children('.modal-square-btns').click()
    };


    render() {
        console.log('render ModalAddDeal_Select');

        const {selectedValue, showModal} = this.state;

        const {
            title, // Заголовок
            icon, // Иконка для кнопки
            id, // id компонента для работы с ним через DOM
            className = '', // Класс
            options = [], // Список элементов selecta в виде массива [{value: "zovt", title: "Жоветневый"}]
            nameValue = 'value', // Название ключа, в котором лежит value элемента
            nameTitle = 'title' // Название ключа, в котором лежит title элемента
        } = this.props;

        const {clickOptions, toggleModal, nextSelect, prevSelect} = this;


        let selectedTitle = '';

        const list = options.map(function (item, i) {
            const value = item[nameValue],
                  title = item[nameTitle];
            if (value === selectedValue) {
                selectedTitle = title
            }
            return (
                <div className={"modal-options-select-list-item" + (selectedValue === value ? ' selected' : '')} key={i}
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
                        <div className="w36"/>
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

        return (
            <div className={className} id={id} data-selected={selectedValue} ref={this.select}>
                <div className={"modal-square-btns" + (selectedValue ? " active" : "")} title={selectedTitle} onClick={toggleModal}>
                    <div><i className={icon}/></div>
                    <div>{title}</div>
                </div>
                {showModal && modal}
            </div>
        )
    }
}