import React from 'react'

export class ButtonDel extends React.Component {
    render() {
        const {modalId} = this.props;
        return (
            <div className="_del circle-hover ripple" data-toggle="modal" data-target={'#' + modalId}>
                <i className="mdi mdi-delete fs24"/>
            </div>
        )
    }
}