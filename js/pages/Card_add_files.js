import React from 'react'
import {toast} from "react-toastify";

// cardId - id карточки
// changeCardInfo - функция изменения состояния cardInfo
// filesType="image/*" - формат файла (сохраняется на сервере)
// filesFormat="image/*,.txt,.pdf,.docx,.xlsx,.zip,.rar,.7z" - допустимые форматы файлов для возможности добавления через браузер
// btnName="ДОБАВИТЬ ФОТО" - название кнопки
// add_file_extension - добавить расширение файла, если оно отсутствует ('.jpg')

export class Card_add_files extends React.Component {

    state = {
        uploadProgress: {}
    };

    onprogress = (filename, percent) => {
        const {uploadProgress} = this.state;
        uploadProgress[filename] = percent;
        this.setState({uploadProgress})
    };

    addFile = e => {

        console.log(e.currentTarget.files);

        const {cardId, changeCardInfo, filesType, add_file_extension} = this.props;
        const {onprogress} = this;

        $(e.currentTarget.files).each(function (i, file) {


            // Если есть запасное расширение файла и нет точки в имени файла, то к имени файла прибавляем запасное расширение
            const fileName = add_file_extension && !file.name.includes('.') ? file.name + add_file_extension : file.name;
            const formData = new FormData();
            formData.append('file', file, encodeURI(fileName));

            post_files(formData, onprogress).done(function (file) { // Загружаем файл на сервер

                const cardInfo = {
                    "cards_file[0][type]": filesType,
                    "cards_file[0][file_id]": file.id
                };
                put_card(cardId, cardInfo).done(function (newCardInfo) { // Добавляем файл в карточку
                    toast.success(' ✔ Фотография загружена');
                    const {card_files} = newCardInfo;
                    changeCardInfo({card_files}, true);
                }).fail(function () {
                    toast.error(' ✖ Ошибка при сохранении карточки');
                    del_files(file.id).done(function () {
                        toast.error(' ✖ Файл не сохранился');
                    })
                })

            }).fail(function () {
                toast.error(' ✖ Ошибка загрузки файла')
            })
        })
    };

    render() {
        console.log('render Card_add_photo');
        const {filesFormat, btnName} = this.props;
        const {uploadProgress} = this.state;
        const {addFile} = this;


        const progress = [];
        let count = 0;
        for (let key in uploadProgress) {
            if (uploadProgress[key] && uploadProgress[key] === 100) continue;
            progress.push(
                <div key={count} className="flex-between mt-1">
                    <div>{key}</div>
                    <div className="progress w-25">
                        <div className="progress-bar bg-green" role="progressbar" style={{width: uploadProgress[key] + "%"}} aria-valuenow={uploadProgress[key]}
                             aria-valuemin="0" aria-valuemax="100">
                            {uploadProgress[key]} %
                        </div>
                    </div>
                </div>
            );
            count++
        }

        return (
            <div className="mt-2">
                <div className="flex-center cursor-pointer w-100" onClick={e => $(e.currentTarget).children("input").click()}>
                    <span><i className="mdi mdi-plus-circle-outline mr-2 fs20"/></span>
                    <span className="fs16">{btnName} </span>
                    <input type="file" accept={filesFormat} multiple className="d-none" onChange={addFile}/>
                </div>
                <div>{progress}</div>
            </div>
        )
    }
}