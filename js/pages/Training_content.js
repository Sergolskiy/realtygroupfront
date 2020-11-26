import React from 'react'
import {Back, Title} from "../elements/Elements";
import {Link} from "react-router-dom";

export class Training_content extends React.Component {
    state = {
        data: ''
    };
    loadData = () => {
        const type = this.props.match.params.type;
        $.get(`/data/training/${type}.html`, function (data) {
            this.setState({data: data})
        }.bind(this), 'html');
    };
    componentDidMount() {
        this.loadData();
        // Запрет на выделение текста
        // document.onselectstart = function () {return false};
    };
    render() {
        console.log('content: ', this.props);
        const data = this.state.data,
            type = this.props.match.params.type,
            breadcrumbs = {
                sale_work_buy_questions: 'Продажа / Работа с контактом / Покупатель / Вопросы',
                sale_work_buy_objections: 'Продажа / Работа с контактом / Покупатель / Возражения',
                sale_work_buy_errors: 'Продажа / Работа с контактом / Покупатель / Ошибки',
                sale_work_buy_video: 'Продажа / Работа с контактом / Покупатель / Видеоматериалы',
                sale_work_buy_tests: 'Продажа / Работа с контактом / Покупатель / Тесты',
                sale_work_sell_questions: 'Продажа / Работа с контактом / Продавец / Вопросы',
                sale_work_sell_objections: 'Продажа / Работа с контактом / Продавец / Возражения',
                sale_work_sell_errors: 'Продажа / Работа с контактом / Продавец / Ошибки',
                sale_work_sell_video: 'Продажа / Работа с контактом / Продавец / Видеоматериалы',
                sale_work_sell_tests: 'Продажа / Работа с контактом / Продавец / Тесты',

                sale_show_buy_before: 'Продажа / Показ / Покупатель / Перед показом',
                sale_show_buy_now: 'Продажа / Показ / Покупатель / Во время показа',
                sale_show_buy_after: 'Продажа / Показ / Покупатель / В конце показа',
                sale_show_buy_tests: 'Продажа / Показ / Покупатель / Тесты',
                sale_show_sell_before: 'Продажа / Показ / Продавец / Перед показом',
                sale_show_sell_now: 'Продажа / Показ / Продавец / Во время показа',
                sale_show_sell_after: 'Продажа / Показ / Продавец / В конце показа',
                sale_show_sell_tests: 'Продажа / Показ / Продавец / Тесты',

                sale_paperwork_buy_list: 'Продажа / Оформление документов / Покупатель / Список документов',
                sale_paperwork_sell_list: 'Продажа / Оформление документов / Продавец / Список документов',

                rent_work_tenant_questions: 'Аренда / Работа с контактом / Арендатор / Вопросы',
                rent_work_tenant_objections: 'Аренда / Работа с контактом / Арендатор / Возражения',
                rent_work_tenant_errors: 'Аренда / Работа с контактом / Арендатор / Ошибки',
                rent_work_tenant_video: 'Аренда / Работа с контактом / Арендатор / Видеоматериалы',
                rent_work_tenant_tests: 'Аренда / Работа с контактом / Арендатор / Тесты',
                rent_work_landlord_questions: 'Аренда / Работа с контактом / Арендодатель / Вопросы',
                rent_work_landlord_objections: 'Аренда / Работа с контактом / Арендодатель / Возражения',
                rent_work_landlord_errors: 'Аренда / Работа с контактом / Арендодатель / Ошибки',
                rent_work_landlord_video: 'Аренда / Работа с контактом / Арендодатель / Видеоматериалы',
                rent_work_landlord_tests: 'Аренда / Работа с контактом / Арендодатель / Тесты',

                rent_show_tenant_before: 'Аренда / Показ / Арендатор / Перед показом',
                rent_show_tenant_now: 'Аренда / Показ / Арендатор / Во время показа',
                rent_show_tenant_after: 'Аренда / Показ / Арендатор / В конце показа',
                rent_show_tenant_tests: 'Аренда / Показ / Арендатор / Тесты',
                rent_show_landlord_before: 'Аренда / Показ / Арендодатель / Перед показом',
                rent_show_landlord_now: 'Аренда / Показ / Арендодатель / Во время показа',
                rent_show_landlord_after: 'Аренда / Показ / Арендодатель / В конце показа',
                rent_show_landlord_tests: 'Аренда / Показ / Арендодатель / Тесты',

            };

        const xml =
            <sale title="Продажа">
                <work title="Работа с контактом">
                    <buy title="Покупатель">
                        <questions title="Вопросы"/>
                    </buy>
                </work>
            </sale>
        ;


        return (
            <div>
                <div className="head navbar flex-nowrap justify-content-start" id="head">
                    <Back/>
                    <Title data={"Обучение / " + breadcrumbs[type]}/>
                </div>
                <div className="content">

                    <div dangerouslySetInnerHTML={{__html: data}}/>

                </div>
            </div>
        )
    }
}