import React from 'react'
import {toast} from "react-toastify";
import {Card_add_files} from "./Card_add_files";

export class Card_main_audio_edit_mode extends React.Component {

    componentDidMount() {
        // Сортировка аудиозаписей. Никогда не добавлять, т.к. Женя сказал не пригодится

        // const {mixAudio} = this;
        // Sortable.create(document.getElementById("sortable-audios"), {
        //     handle: '.handle',
        //     animation: 150,
        //     ghostClass: 'bg-info',
        //     onSort: function (evt) {
        //         mixAudio()
        //     }
        // })
    }

    delFile = (cardFileId) => {
        if (confirm('Удалить аудио файл?')) {
            const {cardId, changeCardInfo, card_files} = this.props;
            del_card_file(cardId, cardFileId).done(function () {
                toast.success(' ✔ Файл удалён');
                changeCardInfo({
                    card_files: card_files.filter(item => item.id !== cardFileId) // отфильтровали файлы от удаленного
                }, true);
            })
        }
    };

    // Сортировка аудиозаписей. Никогда не добавлять, т.к. Женя сказал не пригодится
    mixAudio = () => {
        const {filtered_card_files, changeCardInfo} = this.props;
        const sortableElements = document.querySelectorAll(".sortable-audio");
        let cardInfo = {};

        filtered_card_files.forEach(function (item, i) {
            const cardFileId = item.id;
            const fileId = sortableElements[i].dataset.fileId;
            cardInfo[`cards_file[${cardFileId}][type]`] = "audio/*";
            cardInfo[`cards_file[${cardFileId}][file_id]`] = fileId;
        });

        changeCardInfo(cardInfo)
    };

    render() {

        const {filtered_card_files, cardId, changeCardInfo} = this.props;
        const {delFile} = this;

        return (
            <>
                {
                    filtered_card_files.length > 0 &&
                    <div className="table-suite">
                        <table className="table">
                            <tbody /*id="sortable-audios"*/>
                            {filtered_card_files.map(function (item, i) {
                                const url = url_backend + '/public/uploads/files/' + item.file.hash,
                                    cardFileId = item.id,
                                    fileId = item.file_id;
                                return (
                                    <tr key={i} data-file-id={fileId} /*className="sortable-audio"*/>
                                        <td className="flex-left">

                                            {/*Сортировка аудиозаписей. Никогда не добавлять, т.к. Женя сказал не пригодится*/}
                                            {/*<span className="handle">*/}
                                            {/*<i className="mdi mdi-menu-swap-outline fs26 mr-2 color-60"/>*/}
                                            {/*</span>*/}

                                            <span title={item.file.extension}>
                                            <i className="mdi mdi-file-document fs26 mr-2 color-60"/>
                                        </span>

                                            <span /*title={decodeURI(item.file.name)}*/ title="Аудиозапись">
                                                {/*{item.file.created_at}*/}
                                                {moment.utc(item.file.created_at, "YYYY-MM-DD HH:mm:ss").local().format('YYYY-MM-DD HH:mm:ss')}
                                            </span>
                                            {/*<span>{decodeURI(item.file.name)}</span>*/}
                                        </td>
                                        <td>
                                            <audio controls preload="none">
                                                <source src={url}/>
                                            </audio>
                                        </td>
                                        <td>
                                            <i className="mdi mdi-delete fs26 color-60 cursor-pointer"
                                               onClick={() => delFile(cardFileId, fileId)}/>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                }
                <Card_add_files
                    cardId={cardId}
                    changeCardInfo={changeCardInfo}
                    filesType="audio/*"
                    filesFormat="audio/*,.3gpp"
                    btnName="ДОБАВИТЬ АУДИО"
                />
            </>
        )
    }
}