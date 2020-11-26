import React from 'react'

export class ModalBootstrap extends React.PureComponent{

    render() {
        const {id, title, body, btns = []} = this.props;
        return (
            <div className="modal fade" id={id} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">{body}</div>
                        <div className="modal-footer">
                            {
                                btns.map(function (item, i) {
                                    return (
                                        <button key={i} type="button" className={item.className} data-dismiss="modal" onClick={item.handler}>
                                            {item.label}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}