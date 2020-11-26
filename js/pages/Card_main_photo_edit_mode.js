import React from 'react'
import {toast} from "react-toastify";
import {Card_add_files} from "./Card_add_files";

export class Card_main_photo_edit_mode extends React.Component {

    constructor(props) {
        super(props);
        this.photoContainer = React.createRef();
    }

    componentDidMount() {
        const {mixPhoto} = this;
        const photoContainer = this.photoContainer.current;

        photoContainer && Sortable.create(photoContainer, {
            animation: 150,
            onSort: function (evt) {
                mixPhoto()
            }
        });

        this.initLazyLoad()
    }

    componentDidUpdate() {
        this.initLazyLoad()
    }

    initLazyLoad = () => {
        $(this.photoContainer.current).find('img[data-src]').lazyLoadXT({scrollContainer: '.tab-content'}); // Прокрутка выше в tab-content
    };

    mixPhoto = () => {
        const {filtered_card_files, changeCardInfo} = this.props;
        const cardGallery = document.querySelectorAll(".card-gallery");
        let cardInfo = {};

        filtered_card_files.forEach(function (item, i) {
            const cardFileId = item.id;
            const fileId = cardGallery[i].dataset.fileId;
            cardInfo[`cards_file[${cardFileId}][type]`] = "image/*";
            cardInfo[`cards_file[${cardFileId}][file_id]`] = fileId;
        });

        changeCardInfo(cardInfo)
    };

    delFile = (cardFileId) => {
        if (confirm('Удалить изображение?')) {
            const {cardId, changeCardInfo, card_files} = this.props;
            del_card_file(cardId, cardFileId).done(function () {
                toast.success(' ✔ Файл удалён');
                changeCardInfo({
                    card_files: card_files.filter(item => item.id !== cardFileId) // отфильтровали файлы от удаленного
                }, true);
            })
        }
    };

    render() {
        console.log('render Card_main_photo');

        const {filtered_card_files, cardId, changeCardInfo} = this.props;
        const {delFile} = this;

        return (
            <>
                {
                    filtered_card_files.length > 0 &&
                    <div className="Card_main_foto" ref={this.photoContainer}>
                        {filtered_card_files.map(function (item, i) {
                            const url = url_backend + '/public/uploads/files/' + item.file.hash,
                                cardFileId = item.id,
                                fileId = item.file_id;
                            return (
                                <div className="card-gallery" key={i} data-file-id={fileId}>
                                    <img alt="" data-src={url}/>
                                    <i className="mdi mdi-close" onClick={() => delFile(cardFileId)}/>
                                </div>
                            )
                        })}
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