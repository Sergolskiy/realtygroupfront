import React from 'react'

export class ButtonCancel extends React.Component {
    render() {
        const {handler} = this.props;
        return (
            <div className="mr-3" onClick={handler}>
                <div className="d-none d-md-flex btn-dropdown h33 ripple">
                    <i className="mdi mdi-undo fs24 color-blue"/>
                    <span>ОТМЕНИТЬ</span>
                </div>
                <div className="d-flex d-md-none circle-hover ripple">
                    <i className="mdi mdi-undo fs24 color-blue"/>
                </div>
            </div>
        )
    }
}