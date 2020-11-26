import React from 'react'

export class Card_main_links_edit_mode extends React.PureComponent {

    constructor(props) {
        super(props);

        const site_url = this.props.cardInfo.site_url || '';

        const urls = site_url.split(',');
        urls.push('');
        this.state = {
            urls
        }
    }

    changeState = obj => {
        this.setState(obj)
    };

    render() {

        console.log('render Card_main_links_edit_mode');

        const {changeCardInfo} = this.props;
        const {urls} = this.state;
        const {changeState} = this;

        return urls.map(function (url, i) {

            if (!url && i < urls.length - 1) return;

            return <div key={i} className="p-10-0">

                <input
                    type="text"
                    className="w-100 border p-1 rounded"
                    placeholder="URL"
                    defaultValue={url}
                    onChange={function (e) {
                        if (i === urls.length - 1) { // Если последнее поле
                            const {value} = e.target;
                            const urls_copy = [...urls];
                            if (value) { // Если появился символ (хотя по-другому и быть не может)
                                urls_copy[i] = value;
                                urls_copy.push('');
                                changeState({urls: urls_copy});
                                changeCardInfo({site_url: urls_copy.filter(el => el).join(',')}); // Записываем в cardInfo
                            }
                        }
                    }}
                    onBlur={function (e) {
                        const {value} = e.target;
                        if (url === value) return; // Не рендерим этот компонент, если ничего не поменялось

                        if (i < urls.length - 1) { // Если не последнее поле

                            const urls_copy = [...urls];

                            if (value) {
                                urls_copy[i] = value
                            } else {
                                delete urls_copy[i]
                            }

                            changeState({urls: urls_copy});
                            changeCardInfo({site_url: urls_copy.filter(el => el).join(',')}); // Записываем в cardInfo
                        }
                    }}
                />
            </div>
        })
    }
}