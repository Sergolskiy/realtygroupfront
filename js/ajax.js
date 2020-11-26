function setHeader(jqXHR) {
    jqXHR.setRequestHeader("Authorization", 'Bearer ' + json_parse($.cookie('token'))['access_token'])
}

// Авторизация
function post_auth(email, password) {
    const form = new FormData();
    form.append("username", email);
    form.append("password", password);
    form.append("grant_type", "password");
    form.append("client_id", "3");
    form.append("scope", "*");
    form.append("client_secret", "lAMSjiEobNtUyOExcvdz1qzvXLZgcN7dD95JzHWv");
    return $.ajax({
        url: url_backend + '/oauth/token',
        type: 'POST',
        dataType: 'json',
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form
    })
}

// Создание юзера. Временное решение. Минимальный набор полей для
// {email, password, name, surname, middle_name, role_id, agency_id, office_id, offices_partition_id, "user_details[profile_image_id]", "user_details[currency]"}
function post_create_user(obj) {
    return $.ajax({
        url: url_backend + '/api/create_user',
        type: 'POST',
        dataType: 'json',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: obj
    })
}


function get_new_roles() {
    return $.ajax({
        url: url_backend + '/api/access-control-list',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    })
}



// Создание агентства. user_id должно быть обязательно и соответствовать реальному юзеру
// {title, user_id}
function post_create_agency(obj) {
    const form = new FormData();
    Object.keys(obj).forEach(key => form.append(key, obj[key]));
    return $.ajax({
        url: url_backend + '/api/agencies',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form
    })
}


// Создание офиса
// {title, user_id, agency_id, city, area, street, building, apartment}
function post_create_offices(obj) {
    const form = new FormData();
    Object.keys(obj).forEach(key => form.append(key, obj[key]));
    return $.ajax({
        url: url_backend + '/api/offices',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form
    })
}


// Создание отдела офиса
// {user_id, office_id, type: 'rent'|'sale', title}
function post_create_offices_partitions(obj) {
    const form = new FormData();
    Object.keys(obj).forEach(key => form.append(key, obj[key]));
    return $.ajax({
        url: url_backend + '/api/offices_partitions',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form
    })
}


// Получение списка валют
function get_currencies(obj, localCache, cacheTTL, isCacheValid) {
    return $.ajax({
        url: url_backend + '/api/currencies',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj,
        localCache: localCache,
        cacheTTL: cacheTTL,
        isCacheValid: function () {
            return isCacheValid
        }
    })
}

// Получение списка социальных сетей
function get_social_networks(obj) {
    return $.ajax({
        url: url_backend + '/api/social_networks',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj
    })
}

function get_card_categories() {
    return $.ajax({
        url: '/data/categories.json',
        type: 'GET',
        dataType: 'json',
        localCache: false
    })
}

// Добавление новой категории недвижимости
function post_card_categories(value, title, fields) {
    return $.ajax({
        url: url_backend + '/api/card_categories',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {value, title, fields}
    })
}

function get_role(id) {
    return $.ajax({
        url: url_backend + '/api/roles/' + id,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader
    })
}

function get_roles(obj, localCache, cacheTTL, isCacheValid) {
    return $.ajax({
        url: url_backend + '/api/roles',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj,
        localCache: localCache,
        cacheTTL: cacheTTL,
        isCacheValid: function () {
            return isCacheValid;
        }
    })
}

function get_offices(obj, localCache, cacheTTL, isCacheValid) {
    return $.ajax({
        url: url_backend + '/api/offices',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj,
        localCache: localCache,
        cacheTTL: cacheTTL,
        isCacheValid: function () {
            return isCacheValid;
        }
    })
}

function get_office(officeId, localCache, cacheTTL, isCacheValid) {
    return $.ajax({
        url: url_backend + '/api/offices/' + officeId,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        localCache: localCache,
        cacheTTL: cacheTTL,
        isCacheValid: function () {
            return isCacheValid;
        }
    })
}

function get_offices_partition(id) {
    return $.ajax({
        url: url_backend + '/api/offices_partitions/' + id,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader
    })
}

function get_offices_partitions(obj, localCache, cacheTTL, isCacheValid) {
    return $.ajax({
        url: url_backend + '/api/offices_partitions',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj,
        localCache: localCache,
        cacheTTL: cacheTTL,
        isCacheValid: function () {
            return isCacheValid;
        }
    })
}

function get_agency(id) {
    return $.ajax({
        url: url_backend + '/api/agencies/' + id,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader
    })
}

function get_agencies(localCache, cacheTTL, isCacheValid) {
    return $.ajax({
        url: url_backend + '/api/agencies',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        localCache: localCache,
        cacheTTL: cacheTTL,
        isCacheValid: function () {
            return isCacheValid;
        }
    })
}

// Созадание карточки объекта
function post_cards(obj) {
    const form = new FormData();
    Object.keys(obj).forEach(key => form.append(key, obj[key]));
    return $.ajax({
        url: url_backend + '/api/cards',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form
    })
}

// Получение карточки объекта
function get_card(id) {
    return $.ajax({
        url: url_backend + '/api/cards/' + id,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader
    })
}

// Изменение карточки объекта
function put_card(id, data) {
    return $.ajax({
        url: url_backend + '/api/cards/' + id,
        type: 'PUT',
        dataType: 'json',
        beforeSend: setHeader,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data
    })
}


// Удаление карточки объекта
function del_card(id) {
    return $.ajax({
        url: url_backend + '/api/cards/' + id,
        type: 'DELETE',
        dataType: 'json',
        beforeSend: setHeader
    })
}


// Удаление файла из карточки. cardFileId - это id файла в таблице cards_files
function del_card_file(cardId, cardFileId) {
    return $.ajax({
        url: url_backend + '/api/cards_delete/' + cardId + '/file/' + cardFileId,
        type: 'DELETE',
        dataType: 'json',
        beforeSend: setHeader
    })
}


// Все сделки. {page: 1, size: 10} - пагинация
function get_cards(obj) {
    return $.ajax({
        url: url_backend + '/api/cards',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj
    })
}

// Карточки с фильтрацией

// {page: 1, size: 10} - пагинация
// {sort: 'user_id,asc'} - сортировка

// (LIKE), точное совпадение
// {type: 'sale', sale_type: 'object'} - аренда, продажа, объект, заявка
// {category: 'houses'} - категория
// {user_id: 15} - ID риэлтора
// {contacts_id: 186} - ID контакта

// (select/multiselect), отправляем одиночное значение
// {stage_transaction: '3,4,successfully'} - этапы сделки

// (multiselect/multiselect), можно так же запрашивать пустые значения null
// SELECT * FROM `cards` WHERE `subcategory` REGEXP '\\bone_room|two_rooms\\b' OR `subcategory` IS NULL
// {subcategory: 'one_room,two_rooms,null'} - подкатегория
// {city: '1,1_2,null'} - город
// {area: '1,2,null'} - район
// {street: '1,2,3,null'} - улица
// {floor_location: 'middle,null'} - расположение этажа
// {building: '28,29в,null'} - номер дома


// (select/диапазон), диапазон для поля price задается с помощью price_from и price_to
// {price_from: 10000, price_to: 20000} - цена от и до
// total_area_from, total_area_to,
// total_area_end_from, total_area_end_to
// floors_house_from, floors_house_to
// floors_house_end_from, floors_house_end_to
// nubmer_of_floors_from, nubmer_of_floors_to
// number_of_floors_end_from, number_of_floors_end_to

// (boolean), 0 или 1
// is_archived - 0 или 1

function get_cards_filtered(obj) {

    // const form = new FormData();
    // Object.keys(obj).forEach(key => form.append(key, obj[key]));

    return $.ajax({
        url: url_backend + '/api/cards_filtered',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: obj

        // processData: false,
        // contentType: false,
        // mimeType: "multipart/form-data",
        // data: form
    })
}

function del_files(id) {
    return $.ajax({
        url: url_backend + '/api/files/' + id,
        type: 'DELETE',
        dataType: 'json',
        beforeSend: setHeader
    })
}


// Добавление файла
// onprogress(fileName, percent) (опция) - функция для выполнения при событии onprogress (каждый байт загрузки, но не чаще 50 мс)
// fileName - тоже опция
function post_files(form, onprogress) {
    return $.ajax({
        url: url_backend + '/api/files',
        type: 'POST',
        dataType: 'json',
        cache: false,
        beforeSend: setHeader,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
        xhr: function () {
            const xhr = $.ajaxSettings.xhr();
            if (onprogress){
                xhr.upload.onprogress = function (evt) {
                    const percent = Math.round(evt.loaded / evt.total * 100);
                    onprogress(decodeURI(form.get('file').name), percent)
                };
                // xhr.upload.onload = function () {
                //     console.log('DONE!')
                // };
            }
            return xhr
        }
    })
}

// Конвертер валют
function get_nbu_quotes_only() {
    return $.ajax({
        url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
        type: 'GET',
        dataType: 'json',
        localCache: true,
        cacheTTL: 24,
        isResponseValid: function (data) {
            // console.log('isResponseValid', data);
            return data.length > 50
        }
    })
}


// Краткая была, стала средняя информация о всех пользователях, is_archived: 0 (не архивные) || 1 (архивные)
function get_users(obj = {page: 1, size: 99999, is_archived: 0}) {
    return $.ajax({
        url: url_backend + '/api/user',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj,
        localCache: false
    })
}

// Средняя информация о пользователе по ID
function get_user(id, localCache, cacheTTL, isCacheValid) {
    return $.ajax({
        url: url_backend + '/api/user/' + id,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        localCache: localCache,
        cacheTTL: cacheTTL,
        isCacheValid: function () {
            return isCacheValid;
        }
    })
}

// Удаление юзера. Отправляет юзера в архив. Уже не работает. Вместо него 2 архивных метода
function del_user(id) {
    return $.ajax({
        url: url_backend + '/api/user/' + id,
        type: 'DELETE',
        dataType: 'json',
        beforeSend: setHeader
    })
}

// Архивирование юзера
function user_archived(id) {
    return $.ajax({
        url: url_backend + '/api/user_archived/' + id,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader
    })
}

// Архивирование юзера с транспортом данных
function user_archived_transport(id, idTransportUser) {
    return $.ajax({
        url: url_backend + '/api/user_archived/' + id + '/' + idTransportUser,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader
    })
}

// Ввостановление юзера
function user_unarchived(id) {
    return $.ajax({
        url: url_backend + '/api/user_unarchived/' + id,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader
    })
}

// Получить права пользователя
function get_user_access_control() {
    return $.ajax({
        url: url_backend + '/api/detect-access',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
    })
}


// Средняя информация о текущем пользователе
function get_user_profile(localCache, cacheTTL, isCacheValid) {
    return $.ajax({
        url: url_backend + '/api/user_profile',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        localCache: localCache,
        cacheTTL: cacheTTL,
        isCacheValid: function () {
            return isCacheValid;
        }
    })
}


// Полная информация о текущем пользователе
function get_user_full() {

    return $.Deferred(function (d) {

        let user_profile = {},
            agencies = [],
            offices = [],
            offices_partitions = [],
            roles = [];

        $.when(

            get_user_profile(false).done(function (data) {
                localStorage.setItem('user_profile', JSON.stringify(user_profile.user));
                user_profile = data.user;
            }),

            get_agencies(true, 5, true).done(function (data) {
                agencies = data
            }),

            get_offices(true, 5, true).done(function (data) {
                offices = data.data
            }),

            get_offices_partitions({}, true, 5, true).done(function (data) {
                offices_partitions = data.data
            }),

            get_roles({}, true, 5, true).done(function (data) {
                roles = data.data
            })

        ).done(function () {

            user_profile.agency = agencies.find(function (item) {
                return item.id === user_profile.agency_id
            });

            user_profile.office = offices.find(function (item) {
                return item.id === user_profile.office_id
            });

            user_profile.office_partition = offices_partitions.find(function (item) {
                return item.id === user_profile.offices_partition_id
            });

            user_profile.role = roles.find(function (item) {
                return item.id === user_profile.role_id
            });

            // user_profile.test = 'test';

            const hash = undefsafe(user_profile, 'user_details.profile_image.hash');

            undefsafe(
                user_profile,
                'user_details.profile_image.url',
                hash ? url_backend + '/public/uploads/files/' + hash : '/images/no_ava.jpg'
            );


            // Запоминаем в локальное хранилище валюту пользователя и другие данные
            localStorage.setItem('office_id', user_profile.office_id);
            localStorage.setItem('user_currency_id', +undefsafe(user_profile, 'user_details.currency') || '');

            d.resolve(user_profile);

        })
    });
}

// Кэширует ответ в свой профиль
function put_user_profile(id, data, localCache, cacheTTL, isCacheValid) {
    return $.ajax({
        url: url_backend + '/api/user/' + id,
        type: 'PUT',
        dataType: 'json',
        beforeSend: setHeader,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data,
        localCache: localCache,
        cacheTTL: cacheTTL,
        cacheKey: url_backend + '/api/user_profileGET',
        isCacheValid: function () {
            return isCacheValid;
        }
    })
}

// Кэширует ответ в чужой профиль
function put_user(id, data, localCache, cacheTTL, isCacheValid) {
    const url = url_backend + '/api/user/' + id;
    return $.ajax({
        url: url,
        type: 'PUT',
        dataType: 'json',
        beforeSend: setHeader,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data,
        localCache: localCache,
        cacheTTL: cacheTTL,
        cacheKey: url + 'GET',
        isCacheValid: function () {
            return isCacheValid;
        }
    })
}

function get_cities() {
    return $.ajax({
        url: '/data/cities.json?v=8',
        type: 'GET',
        dataType: 'json',
        localCache: false
    })
}

// Если файла не существует, то получим ошибку, нужно учитывать
function get_city(id) {
    return $.ajax({
        url: '/data/cities/' + id + '.json?v=3',
        type: 'GET',
        dataType: 'json',
        localCache: false
    })
}


// Контакт по id
function get_contact(id) {
    return $.ajax({
        url: url_backend + '/api/card_contacts/' + id,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader
    })
}


// Удалить контакт по id
function del_contact(id) {
    return $.ajax({
        url: url_backend + '/api/cards_contact_delete/' + id,
        type: 'DELETE',
        dataType: 'json',
        beforeSend: setHeader
    })
}


// Изменить контакт по id
function put_contact(id, data) {
    return $.ajax({
        url: url_backend + '/api/card_contacts/' + id,
        type: 'PUT',
        dataType: 'json',
        beforeSend: setHeader,
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: data
    })
}

// Создать контакт, {name: 'Вася', agency_id: 1, ['cards_contacts_phones['+ i +'][phone]']: phone}
function post_contact_obj(obj) {
    return $.ajax({
        url: url_backend + '/api/card_contacts',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: obj
    })
}

// Создать контакт. Через форму
function post_contact_form(form) {
    return $.ajax({
        url: url_backend + '/api/card_contacts',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form
    })
}

// Все контакты. {page: 1, size: 10} - пагинация
function get_contacts(obj) {
    return $.ajax({
        url: url_backend + '/api/card_contacts',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj
    })
}

// Получение информации о контакте по телефону
function post_cards_contact_phone(phone, agency_id) {
    const form = new FormData();
    form.append("phone", phone);
    form.append("agency_id", agency_id);
    return $.ajax({
        url: url_backend + '/api/cards_contact_phone',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form
    })
}

// Получение контактов и юзеров по телефону
function contact_user_by_phones(phone) {
    return $.ajax({
        url: url_backend + '/api/contact_user_by_phones',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {phone}
    })
}


// Получение подходящих (sale_type === 0) и похожих (sale_type === 1)
function post_near_cards(id, suitable_or_similar) {
    return $.ajax({
        url: url_backend + '/api/near_cards/' + id,
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            sale_type: suitable_or_similar
        }
    })
}

// Получить логи. {page: 1, size: 10, object: 'card', user_id: 10, item_id: 15}
function get_data_change_logs(obj) {
    return $.ajax({
        url: url_backend + '/api/data_change_logs',
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj
    })
}

// Создание статуса между двумя карточками. obj = {card_request_id: 100, card_object_id: 300, status: 'show', show_time: 1573981508774}
// Нельзя не слать status. Если хочешь стереть, отправляй 'null' (string). Если не отправить show_time, он будет 0
function post_cards_request_status(obj) {
    // const form = new FormData();
    // Object.keys(obj).forEach(key => form.append(key, obj[key]));
    return $.ajax({
        url: url_backend + '/api/cards_request_status',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,

        // headers: {"Content-Type": "application/json"},
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: obj,

        // processData: false,
        // contentType: false,
        // mimeType: "multipart/form-data",
        // data: form
    })
}

// Получение статуса между двумя карточками. obj = {card_request_id: 174, card_object_id: 172}
function get_cards_request_status(obj) {
    // const form = new FormData();
    // Object.keys(obj).forEach(key => form.append(key, obj[key]));
    return $.ajax({
        url: url_backend + '/api/cards_request_get_statuses',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,

        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: obj,

        // processData: false,
        // contentType: false,
        // mimeType: "multipart/form-data",
        // data: form
    })
}



// Создание комментария между двумя карточками. obj = {card_request_id: 100, card_object_id: 300, post: 'hello', initial_card: 'request'}
function post_cards_request_post(obj) {
    // const form = new FormData();
    // Object.keys(obj).forEach(key => form.append(key, obj[key]));
    return $.ajax({
        url: url_backend + '/api/cards_request_post',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,

        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: obj,

        // processData: false,
        // contentType: false,
        // mimeType: "multipart/form-data",
        // data: form
    })
}


// Получение комментариев между двумя карточками. obj = {card_request_id: 174, card_object_id: 172, initial_card: 'request'}
function get_cards_request_posts(obj) {
    // const form = new FormData();
    // Object.keys(obj).forEach(key => form.append(key, obj[key]));
    return $.ajax({
        url: url_backend + '/api/cards_request_get_posts',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,

        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        data: obj,

        // processData: false,
        // contentType: false,
        // mimeType: "multipart/form-data",
        // data: form
    })
}

// Создание парсера карточек
//   obj = [
//     {
//     "street": "Каткова ул.",
//     "area": "Ингулецкий",
//     "number_of_floors": "3",
//     "floors_house": "5",
//     "number_rooms": "3",
//     "price": "11500$",
//     "total_area": "64",
//     "description": "Продается 3х ком.квартира Продается 3-комн.кв. 3/5 дома,находится по ул.Каткова 51, сзади китайской стены.Рядом садик ,ДП,ДС,школа,АТБ. Квартира в хорошем состоянии, окна пластиковые,очень теплая и светлая. Сантехника поменяна,есть счетчик",
//     "phones": [
//       "+380985340762"
//     ]
//   },
//   {
//     "street": "Зеленая ул.",
//     "area": "Саксаганский",
//     "number_of_floors": "9",
//     "floors_house": "9",
//     "number_rooms": "3",
//     "price": "24500$",
//     "total_area": "66",
//     "description": "Продам Отличную квартиру на Вечернем Достойная квартива с ремонтом 2015 года. Балкон и Лоджия. Все окна и трyбы заменены. Абсолютно новая проводка. Натяжные потолки во всех комнатах и коридоре. Снаружи утеплена. Встроенная кухня с техникой",
//     "phones": [
//       "+380973128138",
//       "+380972547786"
//     ]
//   }
//   ]
function post_parser_cards(arr) {
    const form = new FormData();
    arr.forEach(function (obj, obj_i) {
        Object.keys(obj).forEach(key => key === 'phones' ?
            obj[key].forEach((phone, phone_i) => form.append(`content[${obj_i}][${key}][${phone_i}]`, phone)) :
            form.append(`content[${obj_i}][${key}]`, obj[key])
        )
    });

    return $.ajax({
        url: url_backend + '/api/parser_cards',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,

        // headers: {"Content-Type": "application/x-www-form-urlencoded"},
        // data: obj,

        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form
    })
}

// Получение данных карточек парсера. {page: 1, size: 10, area: '', price_to: '', price_from: ''}
function get_parser_cards(obj) {
    return $.ajax({
        url: url_backend + '/api/parser_cards_filtered',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        data: obj
    })
}

// Удаление карточки парсера вместе с телефонами
function del_parser_cards(id) {
    return $.ajax({
        url: url_backend + '/api/parser_cards/' + id,
        type: 'DELETE',
        dataType: 'json',
        beforeSend: setHeader
    })
}

// Правка для Лёши: метод не хочет принимать пустой массив в параметре cards
// Сгенерировать уникальую ссылку для просмотра любым неавторизованым клиентом выбранных объектов. {card_id: 333, user_id: 25, cards: ['15', '22', '33']}
function post_share_cards(obj) {
    return $.ajax({
        url: url_backend + '/api/share_cards',
        type: 'POST',
        dataType: 'json',
        beforeSend: setHeader,
        // data: obj
        data: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        },
    })
}

// Получить id карточек по хешу, расшареных определенным юзером и под определенную карточку
function get_share_cards_id(hash) {
    return $.ajax({
        url: url_backend + '/api/share_cards_only_cards/' + hash,
        type: 'GET',
        dataType: 'json',
        beforeSend: setHeader
    })
}

// Получить карточки по хешу
function get_share_cards(hash) {
    return $.ajax({
        url: url_backend + '/api/share_cards/' + hash,
        type: 'GET',
        dataType: 'json',
        // beforeSend: setHeader
    })
}

// Получить статистику количества карточек и среднему проценту заполненности по юзеру по этапам, users_id = [24, 47], stages = ['1', 'poorly']
function get_analytics_users(users_id, stages) {
    return $.ajax({
        url: '/api/analytics_users.php',
        type: 'POST',
        dataType: 'json',
        data: {
            users_id: JSON.stringify(users_id),
            stages: JSON.stringify(stages)
        }
    })
}

// Возвращает таблицу с кол-вом карточек по типу, подтипу и категории
function get_analytics_categories() {
    return $.ajax({
        url: '/api/analytics_categories.php',
        type: 'POST',
        dataType: 'json'
    })
}

// Возвращает таблицу с кол-вом карточек по типу, подтипу и районам, areas = ['1', '2', ...]
function get_analytics_areas(areas) {
    return $.ajax({
        url: '/api/analytics_areas.php',
        type: 'POST',
        dataType: 'json',
        data: {
            areas: JSON.stringify(areas)
        }
    })
}

