import React from 'react'
import {toast} from "react-toastify";
import {Card_add_files} from "./Card_add_files";

export class Card_main_documents_edit_mode extends React.Component {

    componentDidMount() {

        // Сортировка документов. Никогда не добавлять, т.к. Женя сказал не пригодится

        // const {mixDocuments} = this;
        // Sortable.create(document.getElementById("sortable-documents"), {
        //     handle: '.handle',
        //     animation: 150,
        //     ghostClass: 'bg-info',
        //     onSort: function (evt) {
        //         mixDocuments()
        //     }
        // })
    }

    delFile = (cardFileId) => {
        if (confirm('Удалить документ?')) {
            const {cardId, changeCardInfo, card_files} = this.props;
            del_card_file(cardId, cardFileId).done(function () {
                toast.success(' ✔ Файл удалён');
                changeCardInfo({
                    card_files: card_files.filter(item => item.id !== cardFileId) // отфильтровали файлы от удаленного
                }, true);
            })
        }
    };

    // Сортировка документов. Никогда не добавлять, т.к. Женя сказал не пригодится
    mixDocuments = () => {
        const {filtered_card_files, changeCardInfo} = this.props;
        const sortableDocument = document.querySelectorAll(".sortable-document");
        let cardInfo = {};

        filtered_card_files.forEach(function (item, i) {
            const cardFileId = item.id;
            const fileId = sortableDocument[i].dataset.fileId;
            cardInfo[`cards_file[${cardFileId}][type]`] = "application/*";
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
                            <tbody /*id="sortable-documents"*/>
                            {filtered_card_files.map(function (item, i) {
                                const url = url_backend + '/public/uploads/files/' + item.file.hash,
                                    cardFileId = item.id,
                                    fileId = item.file_id;
                                return (
                                    <tr key={i} data-file-id={fileId} /*className="sortable-document"*/>
                                        <td className="flex-left">

                                            {/*Сортировка документов. Никогда не добавлять, т.к. Женя сказал не пригодится*/}
                                            {/*<span className="handle">*/}
                                            {/*<i className="mdi mdi-menu-swap-outline fs26 mr-2 color-60"/>*/}
                                            {/*</span>*/}

                                            <span title={item.file.extension} data-toggle="tooltip">
                                            <i className="mdi mdi-file-document fs26 mr-2 color-60"/>
                                        </span>
                                            <a href={url} target="_blank"
                                               rel="noreferrer noopener">{decodeURI(item.file.name)}</a>
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
                    filesType="application/*"
                    filesFormat=".txt,.pdf,.docx,.xlsx,.zip,.rar,.7z,image/*"
                    btnName="ДОБАВИТЬ ДОКУМЕНТ"
                />

            </>
        )
    }
}