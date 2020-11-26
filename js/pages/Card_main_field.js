import React from 'react'

export class Card_main_field extends React.PureComponent{
    render() {
        const {title, value, show_in_one_line} = this.props;

        if (show_in_one_line) {
            return (
                <div className="d-flex">
                    <div className="flex-left w-50 p-1 color-gray">
                        {title}
                    </div>
                    <div className="flex-left w-50 p-1">
                        {value}
                    </div>
                </div>
            )
        }
        else return (
            <div>
                <div className="p-1 color-gray">
                    {title}
                </div>
                <div className="p-1 w-50">
                    {value}
                </div>
            </div>
        )


    }
}