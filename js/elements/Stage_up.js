import React from 'react'
import {Line} from "rc-progress";

export class Stage_up extends React.PureComponent {

    render() {
        const {cardInfo} = this.props;
        const {dealStages} = data;

        const dealType = cardInfo.type;
        const {stage_transaction} = cardInfo;

        const dealStagesSR = dealStages[dealType] || [];

        const currentStage = dealStagesSR.find(stage => stage.value === stage_transaction) || {};
        const currentPercent = currentStage.percent || 0;

        /*

        const arrStages = [];
        const arrColor = [];

        // Вставляем все, кроме своего этапа
        dealStagesSR.some(function (stage) {
            if (stage.percent >= currentPercent) return true; // Прерываем поиски
            arrStages.push(stage.percent);
            arrColor.push(stage.color);
        });

        arrStages.push(currentPercent);
        arrColor.push(currentStage.color);

        // Преобразуем в проценты абсолютные в относительные
        const newArrStages = arrStages.map((percent, i, arr) => percent - (arr[i - 1] || 0));

        */

        return (
            <div className="Stage_up">
                <Line percent={currentPercent} strokeWidth="1" strokeColor={currentStage.color}/>
                <div>{currentStage.label}</div>
            </div>
        )
    }
}