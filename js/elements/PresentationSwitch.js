import React from 'react'

export class PresentationSwitch extends React.PureComponent {

    onChangeAction = e => {
        const {checked} = e.currentTarget;
        stor.local.set('presentationMode', checked);
        // window.Card.setState({presentationMode: checked})
    };

    render() {
        console.log('render PresentationSwitch');

        const {onChangeAction} = this;

        return (
            <div className="rentSale">
                <input type="checkbox" id="presentationSwitch" onChange={onChangeAction} defaultChecked={stor.local.get('presentationMode')}/>
                <label htmlFor="presentationSwitch">Toggle</label>
                <span>Презентация</span>
                <span>Обычный</span>
            </div>
        )
    }
}