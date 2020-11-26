import React from 'react'
import {SingleSelectNew} from "./SingleSelectNew";


export class ObjectsRequests extends React.PureComponent {

    handler = (value, dealdirection) => {
        const {changeStateCards} = this.props;

        sessionStorage.setItem('dealdirection', dealdirection);
        sessionStorage.setItem('category', value);

        changeStateCards({dealdirection: dealdirection, category: value})
    };

    handler_object = (value) => {
        this.handler(value, 'object')
    };

    handler_request = (value) => {
        this.handler(value, 'request')
    };

    render() {
        console.log('render ObjectsRequests');

        const {all_categories, changeStateCards, dealdirection, category} = this.props;

        const dealtype = sessionStorage.getItem('dealtype') || 'sale';
        const categories = all_categories[dealtype] || [];

        return (
            <>
                {/*Objects*/}
                <div className="ml-md-auto mr-md-3">
                    <div className="d-none d-md-block">
                        <SingleSelectNew before={<i className="mdi mdi-home-city-outline color-blue"/>}
                                         iconWrapper={true}
                                         internalClass="_object _noicon"
                                         placeholder="ОБЪЕКТЫ"
                                         selected={dealdirection === 'object' && category}
                                         onChange={this.handler_object}
                                         options={categories.concat({value: '', title: 'ВСЕ ОБЪЕКТЫ'})}/>
                    </div>
                    <div className="d-block d-md-none">
                        <SingleSelectNew before={<i className="mdi mdi-home-city-outline color-blue"/>}
                                         internalClass="_object _icon"
                                         selected={dealdirection === 'object' && category}
                                         onChange={this.handler_object}
                                         options={categories.concat({value: '', title: 'ВСЕ ОБЪЕКТЫ'})}/>
                    </div>
                </div>

                {/*Requests*/}
                <div className="mr-md-auto">
                    <div className="d-none d-md-block">
                        <SingleSelectNew before={<i className="mdi mdi-account-box-outline color-red"/>}
                                         iconWrapper={true}
                                         placeholder="ЗАЯВКИ"
                                         internalClass="_request _noicon"
                                         selected={dealdirection === 'request' && category}
                                         onChange={this.handler_request}
                                         options={categories.concat({value: '', title: 'ВСЕ ЗАЯВКИ'})}/>
                    </div>
                    <div className="d-block d-md-none">
                        <SingleSelectNew before={<i className="mdi mdi-account-box-outline color-red"/>}
                                         internalClass="_request _icon"
                                         selected={dealdirection === 'request' && category}
                                         onChange={this.handler_request}
                                         options={categories.concat({value: '', title: 'ВСЕ ЗАЯВКИ'})}/>
                    </div>
                </div>
            </>
        )
    }
}