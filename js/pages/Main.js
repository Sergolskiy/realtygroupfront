import React from 'react'
import {Link} from 'react-router-dom'

export class Main extends React.PureComponent {
    render() {

        const {quotes} = data;
        const i = Math.floor(Math.random() * quotes.length);
        const quote = quotes[i];

        return (
            <div className="flex-center h-100">
                <div>

                    <div>
                        <blockquote>
                            <p>{quote.quote}</p>
                            <footer>— <cite>{quote.author || 'Кто-то известный'}</cite></footer>
                        </blockquote>
                    </div>

                    <div className="flex-center mt-4">
                        <Link to="/cards">
                            <button type="button" className="btn btn-success btn-lg">Начать работу</button>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}