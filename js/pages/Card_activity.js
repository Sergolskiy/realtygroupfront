import React from 'react'

export class Card_activity extends React.PureComponent {

    state = {
        changes: {},
        user: null
    };

    changeState = obj => {
        this.setState(obj)
    };

    loadData = () => {
        const {cardInfo, users} = this.props;
        const {changeState} = this;
        const {creator_id, user_id} = cardInfo;

        get_data_change_logs({
            page: 1,
            size: 10,
            object: 'card',
            item_id: cardInfo.id
        }).done(function (changes) {
            changeState({changes})
        });

        if (creator_id !== user_id && !users.find(item => item.id === creator_id)) {
            get_user(creator_id).done((user) => {
                this.setState({user: user.user})
                // changeState({user})
            })
        }

    };

    componentDidMount() {
        this.loadData()
    }

    render() {
        console.log('render Card_activity');

        const {cardInfo, users} = this.props;
        const {user} = this.state;
        const changes = this.state.changes.data || [];
        const {creator_id, user_id} = cardInfo;
        const {fields} = data;

        // console.log('Проверочка ', users, creator_id);

        const creator = creator_id === user_id ?
            cardInfo.card_user :
            (users.find(item => item.id === creator_id) || user);

        // console.log('Проверочка', creator);

        const creatorName = creator ? creator.name + ' ' + creator.surname : 'Неизвестен';

        const created_at = moment.utc(cardInfo.created_at, "YYYY-MM-DD HH:mm:ss").local().format('YYYY-MM-DD HH:mm:ss');


        return (
            <div className="p-2">
                <div>Создатель: {creatorName}</div>
                <div>Время создания: {created_at}</div>
                <div>Процент заполненности: {cardInfo.complete_percent} %</div>

                {
                    changes.length > 0 &&
                    <table className="table table-sm table-hover change_logs_table">
                        <thead>
                        <tr>
                            <th>Дата и время</th>
                            <th>Пользователь</th>
                            <th>Поле</th>
                            <th>Было</th>
                            <th>Стало</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            changes.map(function (change, change_i) {
                                const user = change.data_change_logs_user;
                                const userName = user ? user.name + ' ' + user.surname : 'Неизвестный пользователь';
                                const dateOfChange = moment.utc(change.created_at, "YYYY-MM-DD HH:mm:ss").local().format('YYYY-MM-DD HH:mm:ss');
                                const modified_fields = JSON.parse(change.data) || [];

                                return modified_fields.map(function (modified_field, field_i) {

                                    const {old_value, new_value} = modified_field;
                                    const field_name = (fields[modified_field.field] || {}).label;

                                    // let oldValue, newValue, fieldName;
                                    // if (field_name === 'city') {
                                    //     fieldName = 'Город';
                                    //     oldValue = undefsafe(cities, old_value + '.title');
                                    //     newValue = undefsafe(cities, new_value + '.title')
                                    // }
                                    // else if (field_name === 'area') {
                                    //     fieldName = 'Район';
                                    //     oldValue = undefsafe(cityArr, 'areas.' + old_value);
                                    //     newValue = undefsafe(cityArr, 'areas.' + new_value);
                                    // }
                                    // else if (field_name === 'landmark') {
                                    //     fieldName = 'Ориентир';
                                    //     oldValue = undefsafe(cityArr, 'landmarks.' + old_value);
                                    //     newValue = undefsafe(cityArr, 'landmarks.' + new_value);
                                    // }
                                    // else if (field_name === 'street') {
                                    //     const streets = cityArr.streets;
                                    //     fieldName = 'Улица';
                                    //     oldValue = streets ? undefsafe(cityArr, 'streets.' + old_value) : old_value;
                                    //     newValue = streets ? undefsafe(cityArr, 'streets.' + new_value) : new_value;
                                    // }
                                    // else if (field_name === 'price') {
                                    //     fieldName = 'Цена';
                                    //     oldValue = moneyMask(old_value);
                                    //     newValue = moneyMask(new_value);
                                    // }
                                    // else if (field_name === 'stage_transaction') {
                                    //     const {dealStages} = data;
                                    //     const dealStagesSR = dealStages[dealType] || [];
                                    //     fieldName = 'Этап сделки';
                                    //     oldValue = (dealStagesSR.find(stage => stage.value === old_value) || {}).label;
                                    //     newValue = (dealStagesSR.find(stage => stage.value === new_value) || {}).label;
                                    // }
                                    // else if (field_name === 'contract_expiration_date') {
                                    //     fieldName = 'Дата истечения договора';
                                    //     oldValue = dateMsToFormat(old_value, "YYYY-MM-DD", currentZone());
                                    //     newValue = dateMsToFormat(new_value, "YYYY-MM-DD", currentZone());
                                    // }
                                    // else if (field_name === 'number_contract') {
                                    //     fieldName = 'Номер договора';
                                    //     oldValue = old_value;
                                    //     newValue = new_value;
                                    // }
                                    // else if (field_name === 'building') {
                                    //     fieldName = 'Номер дома';
                                    //     oldValue = old_value;
                                    //     newValue = new_value;
                                    // }
                                    // else if (field_name === 'apartment') {
                                    //     fieldName = 'Номер квартиры';
                                    //     oldValue = old_value;
                                    //     newValue = new_value;
                                    // }
                                    // else if (field_name === 'commission') {
                                    //     fieldName = 'Комиссия';
                                    //     oldValue = old_value;
                                    //     newValue = new_value;
                                    // }
                                    // else if (field_name === 'user_id') {
                                    //     fieldName = 'Риэлтор';
                                    //     const old_user = users.find(item => item.id === +old_value) || {};
                                    //     const new_user = users.find(item => item.id === +new_value) || {};
                                    //     oldValue = old_user.name + ' ' + old_user.surname;
                                    //     newValue = new_user.name + ' ' + new_user.surname;
                                    // }
                                    // else {
                                    //     const field = fields.find(item => item.value === field_name) || {};
                                    //     fieldName = field.label || field_name;
                                    //     oldValue = get_field_title(field, old_value, dealDirection) || old_value;
                                    //     newValue = get_field_title(field, new_value, dealDirection) || new_value;
                                    // }

                                    return (
                                        <tr key={change_i + '_' + field_i}>
                                            {
                                                field_i === 0 && <>
                                                    <td rowSpan={modified_fields.length}>
                                                        {dateOfChange}
                                                    </td>
                                                    <td rowSpan={modified_fields.length}>
                                                        {userName}
                                                    </td>
                                                </>
                                            }
                                            <td>{field_name}</td>
                                            <td>{old_value}</td>
                                            <td>{new_value}</td>
                                        </tr>

                                    )
                                })
                            })
                        }
                        </tbody>
                    </table>
                }
                {/*<img src="/images/card-activity-1.jpg" alt=''/>*/}
                {/*<img src="/images/card-activity-2.jpg" alt=''/>*/}
            </div>
        )
    }
}
