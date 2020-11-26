import React from 'react'
import PropTypes from 'prop-types';

export class Card_main_description extends React.PureComponent {

    state = {
        showAll: false
    };

    copyDescription = e => {
        toClipboardByButton(e.currentTarget, this.props.description)
    };

    showHide = () => {
        const {showAll} = this.state;
        this.setState({showAll: !showAll})
    };

    render() {
        console.log('render Card_main_description');

        const {description} = this.props;
        const {showAll} = this.state;
        const {copyDescription} = this;

        return (
            <div className="_description">
                {
                    description ?
                        <>

                            {
                                (description.length <= 130 || showAll) &&
                                <span>{description}</span>
                            }

                            {
                                description.length > 130 && !showAll &&
                                <span>{description.slice(0, 130) + '...'}</span>
                            }

                            {
                                description.length > 130 &&
                                    <div>
                                        <button type="button" className="btn btn-outline-light btn-sm fs16 d-block m-auto color-black" onClick={this.showHide}>
                                            {showAll ? 'Скрыть' : 'Показать все'}
                                        </button>
                                    </div>
                            }

                            <i className="mdi mdi-content-copy" onClick={copyDescription}/>
                        </> :
                        <span className="color-gray">Нет описания</span>
                }
            </div>
        )
    }
}


Card_main_description.propTypes = {
    description: PropTypes.string
};

Card_main_description.defaultProps = {
    description: ''
};