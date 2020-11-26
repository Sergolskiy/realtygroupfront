import React from 'react'

export class Card_main_links extends React.PureComponent {
    render() {

        console.log('render Card_main_links');

        const {cardInfo} = this.props;

        const {site_url} = cardInfo;

        if (!site_url || typeof site_url !== 'string') return <div className="p10"><span className="color-gray">Нет ссылок</span></div>;

        return site_url.split(',').map((url, i) =>
            <div key={i} className="p-2">
                <a href={url} target="_blank" rel="noreferrer noopener">{url}</a>
            </div>
        )

    }
}