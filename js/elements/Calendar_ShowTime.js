import React from 'react'

export class Calendar_ShowTime extends React.PureComponent {
    constructor(props) {
        super(props);
        this.input = React.createRef()
    }

    componentDidMount() {
        const {onChange} = this.props;

        $(this.input.current).datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            autoclose: true,
            language: 'ru',
            clearBtn: true
            // format: 'd M yyyy, h:ii',
            // minView: 'hour',
            // initialDate: new Date(defaultValue),
        }).on('changeDate', onChange)
    }

    render() {
        console.log('render Calendar_ShowTime');

        const {defaultValue} = this.props;

        return (
            <input type="text"
                   readOnly={true}
                   ref={this.input}
                   value={defaultValue ? moment(defaultValue).format('YYYY-MM-DD HH:mm') : ''}
                   placeholder='Дата показа'
            />
        )
    }
}