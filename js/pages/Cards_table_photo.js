import React from 'react'

export class Cards_table_photo extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.el = React.createRef()
    }

    componentDidMount() {
        const {url} = this.props;
        $(this.el.current).popover({
            trigger: 'hover',
            html: true,
            boundary: document.getElementsByClassName('table'), // Если картинка не влазит, будет прокручиваться этот элемент
            placement: 'auto',
            content: "<img width='200px' src='" + url + "' alt/>"
        })
    }

    componentWillUnmount() {
        $(this.el.current).popover('hide')
    }

    render() {
        console.log('render Cards_table_photo');
        return (
            <i className="mdi mdi-image-area fs22" ref={this.el}/>
        )
    }
}