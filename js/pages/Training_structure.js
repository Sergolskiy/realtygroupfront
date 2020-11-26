import React from 'react'
import {Link, Route, Switch} from "react-router-dom";
import {Back, Title} from "../elements/Elements";

export class Training_structure extends React.Component {
    render() {
        return (
            <div>
                <div className="head navbar flex-nowrap justify-content-start" id="head">
                    <Back/>
                    <Title data="Обучение"/>
                </div>
                <div className="content">

                    <div className="training">
                        <div className="_b1">
                            <h1>Продажа</h1>
                            <div className="_b3">
                                <h2>Работа с контактом</h2>
                                <div className="_b4">
                                    <div className="_b5">
                                        <h3>Покупатель</h3>
                                        <div className="list-group">
                                            <Link to="/training/sale_work_buy_questions" className="list-group-item list-group-item-action">Вопросы</Link>
                                            <Link to="/training/sale_work_buy_objections" className="list-group-item list-group-item-action">Возражения</Link>
                                            <Link to="/training/sale_work_buy_errors" className="list-group-item list-group-item-action">Ошибки</Link>
                                            <Link to="/training/sale_work_buy_video" className="list-group-item list-group-item-action">Видеоматериалы</Link>
                                            <Link to="/training/sale_work_buy_tests" className="list-group-item list-group-item-action">Тесты</Link>
                                        </div>
                                    </div>
                                    <div className="_b5">
                                        <h3>Продавец</h3>
                                        <div className="list-group">
                                            <Link to="/training/sale_work_sell_questions" className="list-group-item list-group-item-action">Вопросы</Link>
                                            <Link to="/training/sale_work_sell_objections" className="list-group-item list-group-item-action">Возражения</Link>
                                            <Link to="/training/sale_work_sell_errors" className="list-group-item list-group-item-action">Ошибки</Link>
                                            <Link to="/training/sale_work_sell_video" className="list-group-item list-group-item-action">Видеоматериалы</Link>
                                            <Link to="/training/sale_work_sell_tests" className="list-group-item list-group-item-action">Тесты</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="_b3">
                                <h2>Приняли в работу</h2>
                            </div>
                            <div className="_b3">
                                <h2>Показ</h2>
                                <div className="_b4">
                                    <div className="_b5">
                                        <h3>Покупатель</h3>
                                        <div className="list-group">
                                            <Link to="/training/sale_show_buy_before" className="list-group-item list-group-item-action">Перед показом</Link>
                                            <Link to="/training/sale_show_buy_now" className="list-group-item list-group-item-action">Во время показа</Link>
                                            <Link to="/training/sale_show_buy_after" className="list-group-item list-group-item-action">В конце показа</Link>
                                            <Link to="/training/sale_show_buy_tests" className="list-group-item list-group-item-action">Тесты</Link>
                                        </div>
                                    </div>
                                    <div className="_b5">
                                        <h3>Продавец</h3>
                                        <div className="list-group">
                                            <Link to="/training/sale_show_sell_before" className="list-group-item list-group-item-action">Перед показом</Link>
                                            <Link to="/training/sale_show_sell_now" className="list-group-item list-group-item-action">Во время показа</Link>
                                            <Link to="/training/sale_show_sell_after" className="list-group-item list-group-item-action">В конце показа</Link>
                                            <Link to="/training/sale_show_sell_tests" className="list-group-item list-group-item-action">Тесты</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="_b3">
                                <h2>Задаток</h2>
                            </div>
                            <div className="_b3">
                                <h2>Оформление документов</h2>
                                <div className="_b4">
                                    <div className="_b5">
                                        <h3>Покупатель</h3>
                                        <div className="list-group">
                                            <Link to="/training/sale_paperwork_buy_list" className="list-group-item list-group-item-action">Список документов</Link>
                                        </div>
                                    </div>
                                    <div className="_b5">
                                        <h3>Продавец</h3>
                                        <div className="list-group">
                                            <Link to="/training/sale_paperwork_sell_list" className="list-group-item list-group-item-action">Список документов</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="_b3">
                                <h2>Успешно</h2>
                            </div>
                            <div className="_b3">
                                <h2>Неуспешно</h2>
                            </div>
                        </div>
                        <div className="_b1">
                            <h1>Аренда</h1>
                            <div className="_b3">
                                <h2>Работа с контактом</h2>
                                <div className="_b4">
                                    <div className="_b5">
                                        <h3>Арендатор</h3>
                                        <div className="list-group">
                                            <Link to="/training/rent_work_tenant_questions" className="list-group-item list-group-item-action">Вопросы</Link>
                                            <Link to="/training/rent_work_tenant_objections" className="list-group-item list-group-item-action">Возражения</Link>
                                            <Link to="/training/rent_work_tenant_errors" className="list-group-item list-group-item-action">Ошибки</Link>
                                            <Link to="/training/rent_work_tenant_video" className="list-group-item list-group-item-action">Видеоматериалы</Link>
                                            <Link to="/training/rent_work_tenant_tests" className="list-group-item list-group-item-action">Тесты</Link>
                                        </div>
                                    </div>
                                    <div className="_b5">
                                        <h3>Арендодатель</h3>
                                        <div className="list-group">
                                            <Link to="/training/rent_work_landlord_questions" className="list-group-item list-group-item-action">Вопросы</Link>
                                            <Link to="/training/rent_work_landlord_objections" className="list-group-item list-group-item-action">Возражения</Link>
                                            <Link to="/training/rent_work_landlord_errors" className="list-group-item list-group-item-action">Ошибки</Link>
                                            <Link to="/training/rent_work_landlord_video" className="list-group-item list-group-item-action">Видеоматериалы</Link>
                                            <Link to="/training/rent_work_landlord_tests" className="list-group-item list-group-item-action">Тесты</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="_b3">
                                <h2>Приняли в работу</h2>
                            </div>
                            <div className="_b3">
                                <h2>Показ</h2>
                                <div className="_b4">
                                    <div className="_b5">
                                        <h3>Арендатор</h3>
                                        <div className="list-group">
                                            <Link to="/training/rent_show_tenant_before" className="list-group-item list-group-item-action">Перед показом</Link>
                                            <Link to="/training/rent_show_tenant_now" className="list-group-item list-group-item-action">Во время показа</Link>
                                            <Link to="/training/rent_show_tenant_after" className="list-group-item list-group-item-action">В конце показа</Link>
                                            <Link to="/training/rent_show_tenant_tests" className="list-group-item list-group-item-action">Тесты</Link>
                                        </div>
                                    </div>
                                    <div className="_b5">
                                        <h3>Арендодатель</h3>
                                        <div className="list-group">
                                            <Link to="/training/rent_show_landlord_before" className="list-group-item list-group-item-action">Перед показом</Link>
                                            <Link to="/training/rent_show_landlord_now" className="list-group-item list-group-item-action">Во время показа</Link>
                                            <Link to="/training/rent_show_landlord_after" className="list-group-item list-group-item-action">В конце показа</Link>
                                            <Link to="/training/rent_show_landlord_tests" className="list-group-item list-group-item-action">Тесты</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="_b3">
                                <h2>Успешно</h2>
                            </div>
                            <div className="_b3">
                                <h2>Неуспешно</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}