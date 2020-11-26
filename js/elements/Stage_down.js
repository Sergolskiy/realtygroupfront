import React from 'react'
import {Line} from "rc-progress";

export class Stage_down extends React.PureComponent {

    render() {
        const {cardInfo} = this.props;
        const {dealStages} = data;

        const dealType = cardInfo.type;
        const {stage_transaction} = cardInfo;

        const dealStagesSR = dealStages[dealType] || [];

        const currentStage = dealStagesSR.find(stage => stage.value === stage_transaction) || {};
        const currentPercent = currentStage.percent || 0;

        return (
            <div className="Stage_down">
                <div>{currentStage.label || 'Этап не указан'}</div>
                <Line percent={currentPercent} strokeWidth="1" strokeColor={currentStage.color}/>
            </div>
        )
    }
}