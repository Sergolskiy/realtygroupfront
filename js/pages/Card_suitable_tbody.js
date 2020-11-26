import React from 'react'
import {Card_suitable_tr} from "./Card_suitable_tr";

export class Card_suitable_tbody extends React.PureComponent {

    render() {
        console.log('render Card_suitable_tbody');

        const {cardInfoInitial, cards, card_statuses, card_posts, office, cities, users, user_profile, addShareCard, share_cards} = this.props;

        // Стиль Select Status
        const dot = (color = '#ccc', icon) => ({
            alignItems: 'center',
            display: 'flex',

            ':before': {
                color: color,
                content: icon,
                font: 'normal normal normal 24px/1 "Material Design Icons"',
                marginRight: 8,
                // backgroundColor: color,
                // borderRadius: 10,
                // display: 'block',
                // height: 10,
                // width: 10,
            },
        });

        const selectStyleStatus = {
            singleValue: (styles, {data}) => ({...styles, ...dot(data.color, data.icon)})
        };

        return cards.map(function (cardInfo) {
            return <Card_suitable_tr
                key={cardInfo.id}
                cardInfoInitial={cardInfoInitial}
                cardInfo={cardInfo}
                // card_statuses={card_statuses}
                card_status_initial={card_statuses.find(item => item[`card_${cardInfo.sale_type}_id`] === cardInfo.id) || {}}
                // card_posts={card_posts}
                card_post_arr={(card_posts.filter(item => item[`card_${cardInfo.sale_type}_id`] === cardInfo.id) || []).reverse()}
                selectStyleStatus={selectStyleStatus}
                cities={cities}
                office={office}
                users={users}
                user_profile={user_profile}
                addShareCard={addShareCard}
                share_cards={share_cards}
            />
        })
    }
}