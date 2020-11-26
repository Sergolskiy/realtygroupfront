import React from 'react'
import {Card_add_files} from "./Card_add_files";

export class Card_main_photo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.slider = React.createRef();
    }

    componentDidMount() {
        this.activateSlider();

        // Активация и левивая загрузка фотографий при переключении на вкладку Фото
        // $('#nav-tabs-addition a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //     if (e.target.getAttribute('aria-controls') === 'nav-photo') {
        //         activateSlider()
        //     }
        // })
    }

    componentDidUpdate() {
        this.activateSlider()
    }

    activateSlider = () => {
        $(this.slider.current)
            .sliderPro({
                height: 0, // Высота слайда
                width: '100%',
                // breakpoints: {
                //     425: {
                //         thumbnailWidth: 120,
                //         thumbnailHeight: 80
                //     },
                //     1440: {
                //         thumbnailWidth: 150,
                //         thumbnailHeight: 100
                //     }
                // },
                // thumbnailWidth: 180,
                // thumbnailHeight: 120,
                thumbnailWidth: 120,
                thumbnailHeight: 80,
                imageScaleMode: 'contain',
                fullScreen: true, // Кнопка "На весь экран"
                arrows: true, // Стрелки главного изображения
                thumbnailArrows: true, // Стрелки эскизов
                buttons: false, // Кнопки навигации
                autoplay: false, // Автопрокрутка
                loop: false // Прокрутка слайдов по кругу
            })
            // Режим FullScreen при нажатии на миниатюру
            .on('click', '.sp-thumbnail', function (e) {
                if (!$(e.delegateTarget).hasClass("sp-full-screen")) { // Не на весь экран
                    $(".sp-full-screen-button").click()
                }
            })
        ;
    };

    render() {
        console.log('render Card_main_photo');

        const {card_files, cardId, changeCardInfo} = this.props;
        const filtered_card_files = card_files.filter(item => item.type === 'image/*');
        return (
            <>
                {
                    filtered_card_files.length > 0 &&
                    <div className="_card_main_photo">
                        <div className="slider-pro " ref={this.slider}>
                            <div className="sp-slides">
                                {filtered_card_files.map(function (item, i) {
                                    const url = url_backend + '/public/uploads/files/' + item.file.hash;
                                    return (
                                        <div className="sp-slide" key={i}>
                                            <img className="sp-image" alt="" data-src={url}/>
                                            <img className="sp-thumbnail" alt="" data-src={url}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
                <Card_add_files
                    cardId={cardId}
                    changeCardInfo={changeCardInfo}
                    filesType="image/*"
                    filesFormat="image/*"
                    add_file_extension=".jpg"
                    btnName="ДОБАВИТЬ ФОТО"
                />
            </>
        )
    }
}