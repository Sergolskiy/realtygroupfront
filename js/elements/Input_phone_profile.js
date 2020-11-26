import React from 'react'


export class Input_phone_profile extends React.PureComponent {

    constructor(props) {
        super(props);
        this.input = React.createRef()
    }

    componentDidMount() {
        const {oncomplete = () => {}, onincomplete = () => {}} = this.props;
        $(this.input.current).inputmask(
            "phone", {
                showMaskOnHover: false,
                clearIncomplete: true,
                oncomplete: function () {
                    console.log('oncomplete');
                    const i = this.dataset.phoneId;
                    const phone = this.value.replace(/[^\d+]/g, '');
                    oncomplete(i, phone)
                },
                oncleared: function () {
                    console.log('oncleared');
                },
                onincomplete: function () {
                    console.log('onincomplete');
                    const i = this.dataset.phoneId;
                    onincomplete(i)
                },
                onBeforePaste: onBeforePasteInputMaskPhone
            })
    }

    render() {
        console.log('render Input_phone_profile');
        const {classname, readonly, value = '', phoneId} = this.props;
        return (
            <input className={classname}
                   data-phone-id={phoneId}
                   readOnly={readonly}
                   value={value}
                   ref={this.input}
                   type="tel"
                   onChange={() => {}}
            />
        )
    }
}