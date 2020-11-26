import React from 'react'

export class SingleSelectNew extends React.PureComponent {

    componentDidMount() {
        legitRipple()
    }

    componentDidUpdate(prevProps) {
        const {selected} = this.props;
        if (prevProps.selected !== selected) {
            this.setState({selected})
        }
    }

    state = {
        selected: this.props.selected
    };

    onClick = (value) => {
        this.setState({selected: value});
        const {onChange} = this.props;
        onChange && onChange(value)
    };


    render() {
        console.log('render SingleSelect');

        const {id, internalClass = '', before, iconWrapper, placeholder = 'Select...', options = []} = this.props;
        const {selected} = this.state;
        const {onClick} = this;

        let span = placeholder;
        let chosen = "";

        const list = options.map((item, i) => {
            if (item.value === selected) {
                span = item.title;
                chosen = " _chosen"
            }
            return <li className="dropdown-item" key={i} onClick={() => onClick(item.value)}>{item.title}</li>
        });

        return (
            <div className="dropdown objectsRequests" id={id} data-selected={selected}>
                <div className={internalClass + chosen + ' ripple legitRipple _btn'} data-toggle="dropdown">
                    {/*<div className="ripple">*/}
                        {before}
                        <span className="_span">{span}</span>
                        {iconWrapper && <div className="icon-wrapper"><i className="mdi mdi-chevron-down"/></div>}
                    {/*</div>*/}
                </div>
                <ul className="dropdown-menu">
                    {list}
                </ul>
            </div>
        )
    }
}