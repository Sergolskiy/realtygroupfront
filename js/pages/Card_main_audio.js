import React from 'react'
import {Card_add_files} from "./Card_add_files";

export class Card_main_audio extends React.Component {
    render() {
        console.log('render Card_main_audio');

        const {card_files, cardId, changeCardInfo} = this.props;

        const filtered_card_files = card_files.filter(item => item.type === 'audio/*');

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


                                        {/*<td>*/}
                                        {/*/!*Правильно имя файла в download="fileFullName" начнет работать тогда, когда и файл, и сайт находятся на одном домене и поддомене*!/*/}
                                        {/*<a href={url} download={decodeURI(item.file.name)}>*/}
                                        {/*/!*<a href={url} download>*!/*/}
                                        {/*<i className="mdi mdi-download fs26 color-60"/>*/}
                                        {/*</a>*/}
                                        {/*</td>*/}

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