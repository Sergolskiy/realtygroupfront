import React from 'react'

export class Share_cards_slider extends React.PureComponent {

    constructor(props) {
        super(props);
        this.slider = React.createRef()
    }

    componentDidMount() {
        this.activateSlider()
    }

    // componentDidUpdate() {
    //     this.activateSlider()
    // }

    activateSlider = () => {
        $(this.slider.current)
            .sliderPro({
                // height: 0, // Высота слайда
                // width: '100%',
                // thumbnailWidth: 120,
                // thumbnailHeight: 80,
                imageScaleMode: 'contain',
                fullScreen: true, // Кнопка "На весь экран"
                arrows: true, // Стрелки главного изображения
                thumbnailArrows: true, // Стрелки эскизов
                buttons: false, // Кнопки навигации
                autoplay: false, // Автопрокрутка
                loop: false // Прокрутка слайдов по кругу
            })
    };

    render() {
        console.log('render Share_cards_slider');

        const {files} = this.props;

        const filtered_files = files.filter(item => item.type.includes('image/'));


        return (
            filtered_files.length > 0 &&
                <div className="_share_cards_slider">
                    <div className="slider-pro" ref={this.slider}>
                        <div className="sp-slides">
                            {
                                filtered_files.map(function (file) {
                                    const url = url_backend + '/public/uploads/files/' + file.hash;
                                    return (
                                        <div className="sp-slide" key={file.id}>
                                            <img className="sp-image" alt="" data-src={url}/>
                                            <img className="sp-thumbnail" alt="" data-src={url}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
        )
    }
}