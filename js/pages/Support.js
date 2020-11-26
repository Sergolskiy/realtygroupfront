import React from 'react'
import {Back, Title} from "../elements/Elements";

export class Support extends React.Component {
    componentDidMount() {
        legitRipple();
    }
    render() {
        return (
            <div className="head navbar flex-nowrap justify-content-start" id="head">
                <Back/>
                <Title data="Поддержка"/>
            </div>
        )
    }
}