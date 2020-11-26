import React from 'react'

export class Card_main_price extends React.PureComponent {

    componentDidMount() {
        $('#collapseOtherPrices').on('show.bs.collapse', function () {
            $('#collapseHistoryPrices').collapse('hide')
        });
        $('#collapseHistoryPrices').on('show.bs.collapse', function () {
            $('#collapseOtherPrices').collapse('hide')
        })

    }

    toggleOtherPrices = () => {
        $('#collapseOtherPrices').collapse('toggle')
    };

    toggleHistoryPrices = e => {
        e.preventDefault();
        $('#collapseHistoryPrices').collapse('toggle')
    };

    render() {
        console.log('render Card_main_price');

        const {cardInfo, nbu_quotes, users} = this.props;
        const {price, total_area} = cardInfo;
        const dealDirection = cardInfo.sale_type;
        const {currencies} = data;

        const currency_option = currencies.find(item => item.value === cardInfo.currency) || {};
        const currency_value = currency_option.value || '';
        const currency_title = currency_option.title || '';
        const otherCurrencies = ['usd', 'eur', 'uah', 'rub'].filter(item => item !== currency_value);
        const otherPrices = currencies_converter(nbu_quotes, price, currency_value, otherCurrencies);

        const {data_change_prices} = cardInfo;
        const change_prices_arr = JSON.parse(data_change_prices) || [];
        const penult_price = (change_prices_arr[change_prices_arr.length - 2] || {}).price;
        const price_change = +price - +penult_price;

        const icon = price_change > 0 ? 'mdi-trending-up' : 'mdi-trending-down';
        const color = dealDirection === 'object' ?
            price_change > 0 ? 'color-red' : 'color-green' :
            price_change > 0 ? 'color-green' : 'color-red';

        const pricePerMeter = Math.round(price / cardInfo.total_area);
        const pricePerHundred = Math.round(price / cardInfo.land_area);

        const renewal_cost_2 = total_area ? Math.round(total_area * 2700 * 0.02 + 4500) : null;
        const renewal_cost_85 = total_area ? Math.round(total_area * 2700 * 0.085 + 4500) : null;

        const showHistory = data_change_prices && change_prices_arr.length > 1;

        return (
            <tr>
                <td>
                    <i className="mdi mdi-cash-multiple color-darkgray fs22"
                       title="Цена" data-toggle="tooltip"/>
                </td>
                <td>

                    {/*Текущая цена*/}
                    <div>

                        <span className="fs28 mr-2">{moneyMask(price)}</span>

                        <span className="fs24 mr-1 cursor-pointer hover-color-black color-gray" onClick={this.toggleOtherPrices}>
                            {currency_title}<i className="mdi mdi-chevron-down fs20"/>
                        </span>

                        {/*<div className="hover-rounded fs18" onClick={this.toggleOtherPrices}>*/}
                        {/*    <i className="mdi mdi-chevron-down" title="Цена в другой валюте"/>*/}
                        {/*</div>*/}

                        {
                            showHistory &&
                            <div className="hover-rounded fs24" onClick={this.toggleHistoryPrices}>
                                <i className={`mdi ${icon} ${color}`}/>
                            </div>
                        }
                    </div>

                    {/*Цены в других валютах*/}
                    <div className="collapse" id="collapseOtherPrices">
                        {
                            otherPrices.map(function (price, i) {
                                return (
                                    <div key={i} className="fs16">
                                        <span>
                                            {moneyMask(price.amount)} {(currencies.find(currency => currency.value === price.currency) || {}).title || price.currency.toUpperCase()}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/*История изменения цены*/}
                    {
                        showHistory &&
                        <div className="collapse" id="collapseHistoryPrices">
                            {
                                change_prices_arr.map(function (historyPrice, i, arr) {

                                    const user = users.find(item => item.id === historyPrice.user_id) || {};
                                    const userName = user ? user.name + ' ' + user.surname : 'Пользователь №' + historyPrice.user_id;


                                    const previous_price = (arr[i - 1] || {}).price;
                                    const price_change = +historyPrice.price - +previous_price;

                                    const icon = price_change > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down';
                                    const color = dealDirection === 'object' ?
                                        price_change > 0 ? 'color-red' : 'color-green' :
                                        price_change > 0 ? 'color-green' : 'color-red';

                                    const date = moment(+historyPrice.time * 1000).format('DD.MM.YYYY');
                                    const time = moment(+historyPrice.time * 1000).format('HH:mm:ss');

                                    const title = i > 0 ?
                                        `${userName} в ${time} ${price_change > 0 ? 'повысил' : 'понизил'} цену на ${Math.abs(price_change)} ${currency_title}` :
                                        `${userName} в ${time} установил цену`
                                    ;

                                    return (
                                        <div key={i} className="flex-left fs16 mb-1">

                                            <i className="mdi mdi-information-outline hover-color-black color-gray fs22 mr-1" title={title} data-toggle="tooltip"/>

                                            <span className="color-gray mr-2">{date}</span>

                                            <span className="mr-1 font-weight-bold">{moneyMask(historyPrice.price)} </span>

                                            {i > 0 && <i className={`mdi ${icon} ${color}`}/>}

                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                    {/*Цена за сотку*/}
                    {
                        dealDirection === "object" &&
                        <div className="d-flex color-gray fs14">
                            {cardInfo.land_area && <div className="mr-2">{pricePerHundred} {currency_title}/сотку</div>}
                            {cardInfo.total_area && <div>{pricePerMeter} {currency_title}/м²</div>}
                        </div>
                    }

                    {/*Стоимость оформления*/}
                    {
                        (renewal_cost_2 || renewal_cost_85) &&
                        <div className="color-gray fs14">
                            <span title="Стоимость переоформления при владении более 3-х лет" data-toggle="tooltip" className="mr-3">~ {renewal_cost_2} грн</span>
                            <span title="Стоимость переоформления при владении менее 3-х лет" data-toggle="tooltip">~ {renewal_cost_85} грн</span>
                        </div>
                    }

                </td>
            </tr>
        )
    }
}