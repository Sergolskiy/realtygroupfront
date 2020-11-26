import React from 'react'

// Единичный select модальный. Значение выбранного элемента находится в data-selected
export class ModalAddDeal_Select_old extends React.PureComponent {
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
        });
    };
    clickOptions = (key) => {
        // if (this.state.selectedValue !== key){

            // Callback
            const {onChange} = this.props;
            onChange && onChange(key);

            this.setState({selectedValue: key, showModal: false})
        // }
    };
    render() {
        console.log('render ModalAddDeal_Select_old');

        const {selectedValue, showModal} = this.state;

        const {
            title, // Заголовок, который отображается вначале при невыбранных элементах
            id, // id компонента для работы с ним через DOM
            options = [], // Список элементов selecta в виде массива [{value: "zovt", title: "Жоветневый"}]
            nameValue = 'value', // Название ключа, в котором лежит value элемента
            nameTitle = 'title' // Название ключа, в котором лежит title элемента
        } = this.props;

        const {clickOptions, toggleModal} = this;

        let selectedTitle = '';

        const list = options.map(function (item, i) {
            const value = item[nameValue],
                  title = item[nameTitle];
            if (value === selectedValue) {
                selectedTitle = title
            }
            return (
                <div className={"modal-options-select-list-item" + (selectedValue === value ? ' selected' : '')} key={i} onClick={() => clickOptions(value)}>
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
                        <div className="w36"/>
                    </div>
                    <div className="modal-options-select-list">{list}</div>
                    <div className="modal-options-btns" onClick={toggleModal}><span>Ок</span></div>
                </div>
            </div>
        );

        return (
            <div id={id} data-selected={selectedValue}>
                <div className="btn-dropdown h36" onClick={toggleModal}>
                    <span>{selectedValue ? selectedTitle : title}</span>
                    <div className="icon-wrapper">
                        <i className="mdi mdi-chevron-down"/>
                    </div>
                </div>
                {showModal && modal}
            </div>
        )
    }
}