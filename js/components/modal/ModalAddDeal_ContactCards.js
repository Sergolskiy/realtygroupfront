import React from 'react'
import {Link} from "react-router-dom"
import {Stage_down} from "../../elements/Stage_down";
import {User_photo} from "../../elements/User_photo";


export class ModalAddDeal_ContactCards extends React.PureComponent {

    state = {
        showModal: false,
        cards: []
    };

    componentDidMount() {
        const {foundContact} = this.props;

        this.loadContactCards(foundContact.id)
    }

    componentDidUpdate(prevProps) {
        const {foundContact} = this.props;

        if (prevProps.foundContact !== foundContact) {
            this.loadContactCards(foundContact.id)
        }
    }

    changeState = (state) => {
        this.setState(state)
    };

    loadContactCards = (contacts_id) => {
        const {changeState} = this;
        get_cards_filtered({
            page: 1,
            size: 20,
            stage_transaction: '1,2,3,4',
            contacts_id
        }).done(cards_query =>
            changeState({
                cards: cards_query.data || []
            })
        )
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    };



    render() {
        console.log('render ModalAddDeal_ContactCards');

        const {showModal, cards} = this.state;
        const {foundContact, cities, office} = this.props;
        const {toggleModal} = this;


        const foundContactId = foundContact.id;
        const foundContactName = foundContact.name;


        const list = showModal && cards.map(function (cardInfo) {

            const dealDirection = cardInfo.sale_type;
            const subcategory_title = get_subcategory_title(cardInfo);

            const {currencies} = data;
            const currency_option = currencies.find(item => item.value === cardInfo.currency) || {};
            const currency_title = currency_option.title || '';


            // Локация
            const {city, area, landmark, street} = cardInfo;

            const cityValueArr = city ? city.split(',') : [];

            const cityArr = cityValueArr.length === 1 ? cities[city] : (cityValueArr.includes(office.city) ? cities[office.city] : {});

            const {areas, landmarks, streets} = cityArr;
            const city_titles = city && city.split(',').map(item => undefsafe(cities, item + '.title')).join(', ');
            const area_titles = area && areas && area.split(',').map(item => areas[item]).join(', ');
            const landmark_titles = landmark && landmarks && landmark.split(',').map(item => landmarks[item]).join(', ');
            const street_titles = street && streets && street.split(',').map(item => streets[item]).join(', ');

            const location_titles =
                (city_titles ? city_titles : '') +
                (area_titles ? ', ' + area_titles : '') +
                (street_titles ? ', ' + street_titles : '') +
                (landmark_titles ? ', ' + landmark_titles : '') +
                (cardInfo.building ? ', д.' + cardInfo.building : '') +
                (cardInfo.apartment ? ', кв.' + cardInfo.apartment : '');
            // Локация


            return (
                <div key={cardInfo.id} className="modal-options-contact-card">

                    <Link to={"/cards/" + cardInfo.id} className="clear-a">

                        <div className="flex-between _block1">
                            <div className="_left-block">
                                <div className="text-crop">
                                    {dealDirection === 'object' && <i className="mdi mdi-home-city-outline color-blue mr-1"/>}
                                    {dealDirection === 'request' && <i className="mdi mdi-account-box-outline color-red mr-1"/>}
                                    <span className="_title">{subcategory_title}</span>
                                </div>
                                <div className="flex-between fs12">
                                    <span/>
                                    <span>
                                        {moment.utc(cardInfo.created_at, "YYYY-MM-DD HH:mm:ss").local().format('DD-MM-YYYY')}
                                    </span>
                                </div>
                            </div>
                            <User_photo user={cardInfo.card_user}/>
                        </div>


                        <Stage_down cardInfo={cardInfo}/>

                    </Link>



                    <div className="flex-between">
                        <div>
                            <i className="mdi mdi-map-marker-outline cursor-pointer mr-2"
                               title={location_titles} data-toggle="tooltip"
                            />
                            {/*<i className="mdi mdi-information-outline cursor-pointer mr-2"/>*/}
                            {/*<i className="mdi mdi-image cursor-pointer mr-2"/>*/}
                        </div>

                        <div>
                            <span className="_price">{moneyMask(cardInfo.price)} {currency_title}</span>
                        </div>

                    </div>

                </div>
            )

        });


        return (
            <div>
                <i className={`mdi ${foundContact.is_realtor ? 'mdi-alpha-p-box-outline color-red' : 'mdi-clipboard-account-outline color-green'} cursor-pointer fs28 mr-1 ml-1`} onClick={this.toggleModal}/>
                {
                    showModal &&
                    (
                        <div className="modal-options">
                            <div className="modal-options-win">

                                <div className="modal-options-title">
                                    <i className="mdi mdi-close circle-hover" onClick={toggleModal}/>
                                    <span title={foundContactName}>{foundContactName}</span>
                                    <i className="mdi mdi-information-outline"/>
                                </div>

                                <div className="modal-options-select-list">
                                    {
                                        list.length > 0 ?
                                            list :
                                            <img src="/images/empty_content.png" alt="Нет данных для отображения"
                                                 className="wmax-100"/>
                                    }
                                </div>

                                <Link to={"/contacts/" + foundContactId} className="clear-a">
                                    <div className="modal-one-btn">
                                        <span className="mr-3">Перейти в контакт</span>
                                        <i className="mdi mdi-arrow-right"/>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}