import React from 'react'

export class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.input = React.createRef()
    }

    componentDidMount() {
        const {onChange} = this.props;
        $(this.input.current).datetimepicker({
            format: 'yyyy-mm-dd',
            minView: 'month',
            autoclose: true,
            language: 'ru',
            clearBtn: true
        }).on('changeDate', onChange)
    }

    render() {
        const {value, className, placeholder, title} = this.props;
        return (
            <input type="text"
                // data-toggle="tooltip"
                   readOnly={true}
                   ref={this.input}
                   value={value}
                   className={className}
                   placeholder={placeholder}
                   title={title}
            />
        )
    }
}