import React from 'react'
import {Back, Title} from "../elements/Elements";
import {NavTabs} from "../elements/NavTabs";

export class Documents extends React.Component {
    componentDidMount() {
        legitRipple();
    }

    render() {
        return (
            <>
                <div className="head navbar flex-nowrap justify-content-start" id="head">
                    <Back/>
                    <Title data="Документы"/>
                </div>
                <div className="content">
                    <NavTabs className="tabs _level-1" tabsName="documents" defaultActiveKey="sale" options={[
                        {
                            value: 'sale',
                            title: 'Продажа',
                            content: 'В этом разделе будут храниться только чистые файлы (бланки)'
                        },
                        {
                            value: 'rent',
                            title: 'Аренда',
                            content: 'В этом разделе будут храниться только чистые файлы (бланки)'
                        }
                    ]}/>
                </div>
            </>
        )
    }
}