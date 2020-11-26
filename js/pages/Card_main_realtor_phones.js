import React from 'react'

export class Card_main_realtor_phones extends React.PureComponent {

    constructor(props) {
        super(props);
        this.button = React.createRef();
        this.popover_content = React.createRef();
    }

    componentDidMount() {
        const button = this.button.current;
        const popover_content = this.popover_content.current;
        $(button).popover({
            html: true,
            placement: 'bottom',
            trigger: 'click manual',
            content: function () {
                return $(popover_content).html();
            }
        })
    }


    render() {
        const {user_phones} = this.props;
        return (
            <div className="cursor-pointer">
                <i className="mdi mdi-phone fs26" ref={this.button}/>
                <div className="d-none" ref={this.popover_content}>
                    {
                        user_phones.map((phone, i) =>
                            <div key={i}>
                                <a href={"tel:" + phone.value}>
                                    {phone.value}
                                </a>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}