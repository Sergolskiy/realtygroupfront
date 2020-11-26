import React from 'react'
import Select from "react-select";

export class Th_stage extends React.PureComponent {

    render() {

        const {f_stage, s_stage, dealStagesSR, defaultStages, changeState} = this.props;
        // onChange(chose_el: text) - "2,poorly"

        const filterStageArr = (s_stage || '').split(',');

        return <th scope="col" className={f_stage !== defaultStages ? ' filtered' : ''}>
            <div className="_th">
                <div className="dropdown noclose">
                    <div className="dropdown_btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Этап сделки
                    </div>
                    <div className="dropdown-menu">
                        {
                            dealStagesSR.length > 0 ?
                                <>
                                    <Select
                                        styles={{
                                            ...selectStyleDefault,
                                            ...selectStyleMenuList
                                        }}
                                        isMulti
                                        isSearchable={false}
                                        isClearable={true}
                                        placeholder="Показать всё"
                                        options={dealStagesSR}
                                        // value={dealStagesSR.find(item => item.value === s_stage)}
                                        // onChange={el => changeState({s_stage: el && el.value})}
                                        value={dealStagesSR.filter(option => filterStageArr.includes(option.value))}
                                        onChange={el => changeState({
                                            s_stage: el ? el.map(item => item.value).join(',') : ''
                                        })}
                                    />
                                    <button className="btn btn-success hide-dropdown w-100 mt-2" onClick={() => changeState({f_stage: s_stage})}>Применить</button>
                                    <button className="btn btn-choose hide-dropdown mt-2">Отмена</button>
                                </> :
                                "Фильтрация не доступна"
                        }
                    </div>
                </div>
                {
                    f_stage !== defaultStages ?
                        <i className="mdi mdi-close" onClick={() =>
                            changeState({f_stage: defaultStages, s_stage: defaultStages})}/>
                        : null
                }
            </div>
        </th>

    }
}