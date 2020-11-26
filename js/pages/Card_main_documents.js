import React from 'react'
import {Card_add_files} from "./Card_add_files";

export class Card_main_documents extends React.Component {
    render() {
        const {card_files, cardId, changeCardInfo} = this.props;

        const filtered_card_files = card_files.filter(item => item.type === 'application/*');

        return (
            <>
                {
                    filtered_card_files.length > 0 &&
                    <div className="table-suite">
                        <table className="table">
                            <tbody>
                            {filtered_card_files.map(function (item, i) {
                                const url = url_backend + '/public/uploads/files/' + item.file.hash;
                                return (
                                    <tr key={i}>
                                        <td className="flex-left">
                                            <span title={item.file.extension} data-toggle="tooltip">
                                                <i className="mdi mdi-file-document fs26 mr-2 color-60"/>
                                            </span>
                                            <a href={url} target="_blank" rel="noreferrer noopener">{decodeURI(item.file.name)}</a>
                                        </td>
                                        <td>
                                            {/*Правильно имя файла в download="fileFullName" начнет работать тогда, когда и файл, и сайт находятся на одном домене и поддомене*/}
                                            <a href={"/downloadFile.php?filename=" + decodeURI(item.file.name) + "&url=" + url}>
                                                <i className="mdi mdi-download fs26 color-60"/>
                                            </a>
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