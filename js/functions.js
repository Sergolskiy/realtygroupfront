// Открытие/закрытие menu-right
function toggle_menu_right() {

    const menu = document.getElementById("menu-right");
    const btn = document.getElementById("btn-menu-right");
    const substr = document.getElementById("substrate");
    if (menu && btn && substr) {

        let all = $([menu, btn, substr]);

        // Открытие/закрытие по клику на гамбургер, другое место и ESC
        $(btn).on('click', function (e) {

            if (!$(btn).hasClass('show')) { // Меню закрыто
                $(document).on({
                    // Закрытие по клику не на кнопку и не на меню
                    'mousedown.menuright': function (e) {
                        if (!$(btn).is(e.target) && $(btn).has(e.target).length === 0 && !$(menu).is(e.target) && $(menu).has(e.target).length === 0) {
                            all.removeClass('show');
                            $(document).unbind('mousedown.menuright keydown.menuright');
                        }
                    },
                    // Закрытие по нажатию ESC
                    'keydown.menuright': function (e) {
                        if (e.which === 27) {
                            all.removeClass('show');
                            $(document).unbind('mousedown.menuright keydown.menuright');
                        }
                    }
                });
            }
            else { // Меню открыто
                $(document).unbind('mousedown.menuright keydown.menuright');
            }
            all.toggleClass('show');
        });

        // Свайп для смартфонов и планшетов
        if (!device.desktop()) {
            let hmr_mr = new Hammer(menu);
            hmr_mr.get('pan').set({threshold: 30});
            hmr_mr.on("panright", function(e) {
                all.removeClass('show');
            });
            let hmr_substr = new Hammer(substr);
            hmr_substr.get('pan').set({threshold: 30});
            hmr_substr.on("panright", function(e) {
                all.removeClass('show');
            });
        }
    }
}




// Применяем пульсацию кнопок
function legitRipple() {
    $(".ripple").ripple({maxDiameter: "120%"});

    // $.ripple({
    //     ".ripple": {maxDiameter: "120%"}
    // });

    // $('body').on('click', '.ripple', function (e) {
    //     $(e.currentTarget).ripple({maxDiameter: "120%"});
    // });
}


// Делегирование событий. Вернет элемент, если на нем или на его потомках было событие, иначе undefined
function delegation(e, selector) {
    let target = e.target;
    while (target !== e.currentTarget){
        if ($(target).is(selector)) {
            return target;
        }
        target = target.parentNode;
    }
}


// Скопировать текст в буфер. Если текст находится например в span, то используем innerHTML
function textToClipboard(text) {

    // Create a "hidden" input
    const aux = document.createElement("input");

    // Assign it the value of the specified element
    aux.setAttribute("value", text);

    // Append it to the body
    document.body.appendChild(aux);

    // Highlight its content
    aux.select();

    // Copy the highlighted text
    const result = document.execCommand("copy");

    // Remove it from the body
    document.body.removeChild(aux);

    return result
}


// Всплывающий tooltip на элементе при вызове функции
function short_tooltip(el, mes) {
    const $el = $(el);
    const original_title = $el.attr("data-original-title");
    $el.attr("data-original-title", mes);
    $el.tooltip({
        // title: title,
        trigger: 'manual'
    });
    $el.tooltip('show');
    setTimeout(function () {
        $el.tooltip('hide')
    }, 2000);
    $el.attr("data-original-title", original_title)
}


// btn - кнопка для всплывающих подсказок, text - текст для копирования в буфер
function toClipboardByButton(btn, text) {
    const title = textToClipboard(text) ? 'Скопировано' : 'Ошибка копирования';
    short_tooltip(btn, title)
}

// Сколько времени прошло. datetime = '2018-12-25 18:48:03', zone = '+3' - временная зона, в которой указано время
function howMuchTimeHasPassed(datetime, zone) {
    zone = zone || 'Z';
    const sec = (Date.now() - Date.parse(datetime + zone))/1000;
    const min = sec / 60;
    const hour = min / 60;
    const day = hour / 24;
    if (day >= 1) {
        return Math.round(day) + ' дн'
    }
    if (hour >= 1) {
        return Math.round(hour) + ' ч'
    }
    if (min >= 1) {
        return Math.round(min) + ' мин'
    }
    if (sec >= 0) {
        return Math.round(sec) + ' сек'
    }
}

// Возвращает текущую временную зону
function currentZone() {
    return new Date().getTimezoneOffset() / -60;
}

// Преобразование временной зоны (в любом виде) в мс
function zoneToMs(zone) {
    let arr = String(zone).split(':');
    if (arr.length === 1) arr.push('0');
    arr[0] = +arr[0];
    arr[1] = +arr[1];
    if (arr[0] < 0) arr[1] = -arr[1];
    return (arr[0] * 3600 + arr[1] * 60) * 1000;
}

// Функция преобразования миллисекунд в дату любого формата
function dateMsToFormat(ms, mask, zone) {

    if (!ms) return '';

    let date = new Date(+ms + zoneToMs(zone || '+00:00')),
        YYYY = String(date.getUTCFullYear()),
        MM = String(date.getUTCMonth() + 1),
        DD = String(date.getUTCDate()),
        hh = String(date.getUTCHours()),
        mm = String(date.getUTCMinutes()),
        ss = String(date.getUTCSeconds());

    if (MM.length === 1) MM = '0' + MM;
    if (DD.length === 1) DD = '0' + DD;
    if (hh.length === 1) hh = '0' + hh;
    if (mm.length === 1) mm = '0' + mm;
    if (ss.length === 1) ss = '0' + ss;

    mask = mask.split("YYYY").join(YYYY);
    mask = mask.split("MM").join(MM);
    mask = mask.split("DD").join(DD);
    mask = mask.split("hh").join(hh);
    mask = mask.split("mm").join(mm);
    mask = mask.split("ss").join(ss);

    return mask;
}

// Вернет сумму в требуемой валюте
// nbu_arr - массив курсов, value - сумма (23000), input_currency - входящаяя валюта ('uah'), output_currency - исходящая валюта ('usd')
function currency_converter(nbu_arr, value, input_currency, output_currency) {

    let rateInput, rateOutput;
    nbu_arr.concat({cc: "UAH", rate: 1}).forEach(function (nbu_currency) {
        if (nbu_currency.cc === input_currency.toUpperCase()) {
            rateInput = nbu_currency.rate
        }
        if (nbu_currency.cc === output_currency.toUpperCase()) {
            rateOutput = nbu_currency.rate
        }
    });

    return Math.round(value * rateInput / rateOutput);
}


// Вернет массив вида [{"currency":"usd","amount":"2189"},{"currency":"eur","amount":"1955"},{"currency":"rub","amount":"143019"}]
// nbu_arr - массив курсов, value - сумма (23000), input_currency - входящаяя валюта ('uah'), output_currencies - массив исходящих валют ['usd', 'eur']
function currencies_converter(nbu_arr, value, input_currency, output_currencies = []) {
    const nbu_full_arr = nbu_arr.concat({cc: "UAH", rate: 1});
    const inputRate_option = nbu_full_arr.find(nbu => nbu.cc === input_currency.toUpperCase()) || {};
    const inputRate = inputRate_option.rate;
    if (!inputRate) return [];
    return output_currencies.reduce(function (result, output_currency) {
        const outputRate_option = nbu_full_arr.find(nbu => nbu.cc === output_currency.toUpperCase()) || {};
        const outputRate = outputRate_option.rate;
        if (outputRate) result.push({currency: output_currency, amount: (value * inputRate / outputRate).toFixed()});
        return result
    }, [])
}



// NBUarr - массив курсов, получаемый по API с банка НБУ. currency1 - базовая валюта, currency2 - валюта котировки
function NBU_convert(NBUarr, base_currency_id, quoted_currency_id) {

    NBUarr = NBUarr || [];

    let rate1, rate2;

    for (let i = 0; i < NBUarr.length; i++) {
        if (NBUarr[i].id == base_currency_id) {
            rate1 = NBUarr[i].rate;
        }
        if (NBUarr[i].id == quoted_currency_id) {
            rate2 = NBUarr[i].rate;
        }
        if (rate1 && rate2) break;
    }

    return rate1/rate2;
}

// Город преобразуем obj -> arr
function rewriteCity() {
    let newObj = {};
    get_city().done(function (obj) {
        for (const key in obj) {
            Object.assign(newObj,
                {
                    value: key,
                    label: obj[key].title,
                    areas: function(){
                        const arr = [];
                        const areas = obj[key].areas;
                        for (const key in areas) {
                            arr.push({
                                "value": key,
                                "label": areas[key]
                            })
                        }
                        return arr
                    }(),
                    landmarks: function(){
                        const arr = [];
                        const landmarks = obj[key].landmarks;
                        for (const key in landmarks) {
                            arr.push({
                                "value": key,
                                "label": landmarks[key]
                            })
                        }
                        return arr
                    }(),
                    streets: function(){
                        const arr = [];
                        const streets = obj[key].streets;
                        for (const key in streets) {
                            arr.push({
                                "value": key,
                                "label": streets[key]
                            })
                        }
                        return arr
                    }(),
                    suburb: function(){
                        const arr = [];
                        const suburb = obj[key].suburb;
                        for (const key in suburb) {
                            arr.push({
                                "value": key,
                                "label": suburb[key]
                            })
                        }
                        return arr
                    }()
                }
            )
        }
        console.log(JSON.stringify(newObj))
    })

}


function stealVkvadrate() {
    var district = [];
    $("[data-field='street'] .ui-ms-item-label").each(function (indx, el) {
        district.push($(el).text());
    });
    console.log(JSON.stringify(district));

    var district = [];
    $(".ui-ms-results .ui-ms-item-label").each(function (indx, el) {
        district.push($(el).text());
    });
    console.log(JSON.stringify(district));
}


// Трансформация данных
function transform_typedeal(dealtype, dealdirection) {
    if (dealtype === 'sale') {
        if (dealdirection === 'object') {
            return 'Продам'
        }
        if (dealdirection === 'request') {
            return 'Куплю'
        }
    }
    if (dealtype === 'rent') {
        if (dealdirection === 'object') {
            return 'Сдам'
        }
        if (dealdirection === 'request') {
            return 'Сниму'
        }
    }
}

// value = "apartments houses_cottages", card_categories = [{value: 'apartments', title: 'Квартиры'}]. Вернет "Квартиры, Коттеджи"
function transform_categories(value, card_categories) {
    const arr = card_categories || [];
    const arrValue = (value || '').split(' ');
    let newArr = [];
    for (let j = 0; j < arrValue.length; j++) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value === arrValue[j]) {
                newArr.push(arr[i].title);
                break
            }
        }
    }
    return newArr.join(', ');
}


// Вернет названия подкатегорий карточки через запятую 2-к, 3-к
function get_subcategory_title(cardInfo) {
    const all_categories = data.categories;
    const categories = all_categories[cardInfo.type] || [];
    const category = categories.find(item => item.value === cardInfo.category) || {};
    const subcategories = category.subcategories || [];
    return subcategories
        .filter(item => (cardInfo.subcategory || '').split(',').includes(item.value))
        .map(item => item.title)
        .join(', ')
}

function get_location_titles(cardInfo) {
    const {city, area, landmark, street} = cardInfo;

}



function moneyMask(price) {
    return price ? price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') : ''
}

function test_speed_function(func, repeat) {
    let time = performance.now();
    for (let i = 0; i < repeat; i++) {
        func()
    }
    time = performance.now() - time;
    console.log('Время выполнения = ', time, ' мс');
}

// Работа с локальным хранилищем через JSON
const stor = {
    session: {
        set: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
        get: key => {
            try {
                return JSON.parse(sessionStorage.getItem(key))
            } catch (e) {
                return undefined
            }
        },
        is: key => !!sessionStorage.getItem(key)
    },
    local: {
        set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
        get: key => {
            try {
                return JSON.parse(localStorage.getItem(key))
            } catch (e) {
                return undefined
            }
        },
        is: key => !!localStorage.getItem(key)
    }
};

// Значения через запятую преобразует в значения от, до
function fieldsInterval(fieldValue) {
    if (!fieldValue) return false;
    const arr = fieldValue.split(',');
    if (arr.length === 1) return fieldValue;
    let value;
    if (!arr[0])
        value = 'до ' + arr[1];
    else if (!arr[1] || arr[1] === '99999999')
        value = 'от ' + arr[0];
    else value = 'от ' + arr[0] + ' до ' + arr[1];
    return value
}

function fieldsInterval_new(value_from, value_to) {
    return ((value_from || value_from === 0) ? 'от ' + value_from : '') + ((value_to || value_to === 0) ? ' до ' + value_to : '')
}

// Обработка номера при вставке из буфера
function onBeforePasteInputMaskPhone(pastedValue, opts) {
    return pastedValue
        .replace(/[^\d+]/g, '') // Убираем все символы, кроме цифр и "+"
        .replace(/^818/, '') || false // Обрезаем виртуальный украинский номер, начинающийся на 818
}

// Неглубокое сравнение объектов. Возвращает массив изменений. exceptions - массив исключений в виде ключей объекта. Исключает объекты. Применяю для логирования
function compareObj(obj_old, obj_new, exceptions = []) {
    return Object.keys(obj_old)
        .filter(key =>
            obj_old[key] !== obj_new[key] &&
            !exceptions.includes(key)
        )
        .map(key => ({
            field: key,
            old_value: obj_old[key],
            new_value: obj_new[key]
        }))
}

// Включает ли obj1 свойства и их значения obj2
function includeObj(obj1, obj2) {
    return Object.keys(obj2).every(key => obj1[key] === obj2[key])
}

function getDisplayContact(con) {

}


// Для логирования. Переводит cardInfo с value значений в title
function getDisplayCardInfo(cardInfo, cities, users) {

    const {city, area, landmark, street, price, stage_transaction, contract_expiration_date, number_contract, building, apartment, commission, user_id, description, comment, category, subcategory} = cardInfo;
    const dealType = cardInfo.type;
    const dealDirection = cardInfo.sale_type;
    const cityArr = cities[city] || {};
    const {areas, landmarks, streets} = cityArr;
    const {dealStages, fields} = data;
    const categories = data.categories[dealType] || [];
    const category_obj = categories.find(item => item.value === category) || {};
    const subcategories = category_obj.subcategories || [];
    const subcategory_title = subcategories
        .filter(item => (subcategory || '').split(',').includes(item.value))
        .map(item => item.title)
        .join(', ');


    const displayCardInfo = {
        city: city && city.split(',').map(item => undefsafe(cities, item + '.title')).join(', '),
        area: area && areas && area.split(',').map(item => areas[item]).join(', '),
        landmark: landmark && landmarks && landmark.split(',').map(item => landmarks[item]).join(', '),
        street: street && (streets ? street.split(',').map(item => streets[item]).join(', ') : street),
        price, number_contract, building, apartment, commission, description, comment,
        stage_transaction: ((dealStages[dealType] || []).find(stage => stage.value === stage_transaction) || {}).label,
        contract_expiration_date: contract_expiration_date && dateMsToFormat(contract_expiration_date, "YYYY-MM-DD", currentZone()),
        user_id: function () {
            const user = users.find(item => item.id === +user_id) || {};
            return user.name + ' ' + user.surname
        }(),
        category: category_obj.title,
        subcategory: subcategory_title
    };

    Object.entries(fields).forEach(function ([field_value, field]) {
        if (!(field[dealDirection] || {}).type) return; // Если не указан тип, значит это не доп. поле. Пропускаем
        Object.assign(displayCardInfo, {[field_value]: get_field_title(cardInfo, field_value)})
    });

    return displayCardInfo

}


// Возвращает title поля по его значению. field - поле со всеми параметрами; value - значение поля в БД; dealdirection - object/request
function get_field_title(cardInfo, categoryField) {
    const dealDirection = cardInfo.sale_type;
    const value = cardInfo[categoryField];
    const {fields} = data;
    const field = fields[categoryField] || {};
    const field_direction = field[dealDirection] || {};

    // isMulti, hide, type


    if (field_direction.hide) return null;

    if (field_direction.type === 'range_double_text') {
        return fieldsInterval(value)
    }

    else if (field_direction.type === 'select') {

        if (field_direction.isMulti) {
            return field.options
                .filter(item => (value || '').split(',').includes(item.value))
                .map(item => item.label)
                .join(', ')
        }
        else {
            const option = field.options.find(option => option.value === value) || {};
            return option.label
        }

    }

    else if (field_direction.type === 'range_int' || field_direction.type === 'range_double') {
        return fieldsInterval_new(
            cardInfo[categoryField],
            cardInfo[categoryField + '_end']
        )
    }

    else if (field_direction.type === 'int' || field_direction.type === 'double') {
        return value;
    }

    else return value
}

// Расчитываем поле floor_location на основании number_of_floors - этаж, floors_house - этажность
// Нужно учесть как-то text и int
// Определение floor_location через sql запросы



function floor_location(number_of_floors, floors_house) {
    // Последовательность условий имеет значение
    const floor = +number_of_floors;
    const floors = +floors_house;

    // select number_of_floors, floors_house, floor_location from cards where (number_of_floors = 1 OR floors_house = 1) AND sale_type = 'object' AND floor_location is null
    // UPDATE cards SET floor_location = 'first' where (number_of_floors = 1 OR floors_house = 1) AND sale_type = 'object' AND floor_location is null
    // 401
    if (floor === 1 || floors === 1) return 'first';

    if (!floor || !floors) return null;

    // select number_of_floors, floors_house, floor_location from cards where (number_of_floors > 1 AND number_of_floors < floors_house) AND sale_type = 'object' AND floor_location is null
    // UPDATE cards SET floor_location = 'middle' where (number_of_floors > 1 AND number_of_floors < floors_house) AND sale_type = 'object' AND floor_location is null
    // 1321
    if (floor > 1 && floor < floors) return 'middle';

    // select number_of_floors, floors_house, floor_location from cards where (number_of_floors = floors_house) AND sale_type = 'object' AND floor_location is null
    // UPDATE cards SET floor_location = 'last' where (number_of_floors = floors_house) AND sale_type = 'object' AND floor_location is null
    // 353
    if (floor === floors) return 'last';

    return null;
}


// Формирование фильтра для подходящих карточек. price_percent - отклонение цены, % (20)
function suitable_cards(cardInfo, price_percent = 0, stage) {

    // Мне:
    // Поработать со стилями card_main_field_edit_mode и избавиться от card_main_field для edit_mode


    const {category, city, sale_type, subcategory, type, agency_id, area, price, street, total_area, total_area_end, number_of_floors, number_of_floors_end, floors_house, floors_house_end, floor_location, heating, apartment_type, layout, household_appliances, will_live, balcony, building} = cardInfo;
    const filter = {};

    filter.page = 1;
    filter.size = 100000;
    filter.sort = 'id,asc';

    filter.is_archived = 0;
    filter.category = category;
    filter.type = type;

    // if (stage) {
        filter.stage_transaction = stage;
    // }

    if (subcategory) {
        filter.subcategory = subcategory + ',null'
    }

    // Если в объекте или заявке отсутствует значение, то включаем в выборку
    if (city) {
        filter.city = city + ',null'
    }

    if (floor_location) {
        filter.floor_location = floor_location + ',null'
    }

    if (building) {
        filter.building = building + ',null'
    }

    if (sale_type === 'object') {

        filter.sale_type = 'request';
        filter.price_from = price * (1 - price_percent / 100);

        if (street) {
            filter.street = street + ',null';
        }
        if (area) {
            filter.area = area + ',null';
        }

        if (total_area) filter.total_area_to = total_area;
        if (total_area) filter.total_area_end_from = total_area;

        if (number_of_floors) filter.number_of_floors_to = number_of_floors; // старт 1 до = 3
        if (number_of_floors) filter.number_of_floors_end_from = number_of_floors; // финиш null от = 3

        if (floors_house) filter.floors_house_to = floors_house;
        if (floors_house) filter.floors_house_end_from = floors_house;

    }

    if (sale_type === 'request') {

        filter.sale_type = 'object';
        filter.price_to = price * (1 + price_percent / 100);

        if (street) {
            filter.street = street + ',null';
        } else if (area) {
            filter.area = area + ',null';
        }

        if (total_area) filter.total_area_from = total_area;
        if (total_area_end) filter.total_area_to = total_area_end;

        if (number_of_floors) filter.number_of_floors_from = number_of_floors;
        if (number_of_floors_end) filter.number_of_floors_to = number_of_floors_end;

        if (floors_house) filter.floors_house_from = floors_house;
        if (floors_house_end) filter.floors_house_to = floors_house_end;
    }


    if (category === 'apartments') {

        if (heating) {
            filter.heating = heating + ',null';
        }

        if (type === 'sale') {

            if (apartment_type) {
                filter.apartment_type = apartment_type + ',null';
            }

            if (layout) {
                filter.layout = layout + ',null';
            }
        }

        if (type === 'rent') {

            if (household_appliances) {
                filter.household_appliances = household_appliances + ',null';
            }

            if (will_live) {
                filter.will_live = will_live + ',null';
            }

            if (balcony) {
                filter.balcony = balcony + ',null';
            }
        }
    }


    return filter
}

// Какие состояния привели к рендеру. Вставлять в componentDidUpdate
function whatStateChanged(prevState, state) {
    Object.keys(state).forEach(function (keys) {
        if (prevState[keys] !== state[keys]) {
            console.log("Изменилось состояние ", keys);
        }
    })
}


// Преобразует текст "42.6 кв" в число типа string с плавающей точкой "42.6"
function toFloat(arg) {
    return (arg || '').replace(/,/g, '.') // Заменяем запятые на точки
        .replace(/[^\d.]/g, '') // Удаляем все символы, кроме цифр и точки

        // .replace(/(?<=\..*)\./, '') // Удаляем все точки, кроме первой. ?<= не работает во многих браузерах

        .replace('.', ',') // Заменяем первую точку на запятую
        .replace(/\./g, '') // Удаляем все точки
        .replace(/,/g, '.') // Заменяем оставшуюся запятую на точку


        .replace(/^\./, '0.'); // Точку вначале заменяем на "0."
}

// Безопасный парсинг json строки. Возвращает false в случае ошибки
function json_parse(json) {
    try {
        return JSON.parse(json)
    }
    catch (e) {
        return false
    }
}


const math = {
    round: function (arg, r) {
        const pow = Math.pow(10, r || 0);
        return Math.round(arg * pow) / pow;
    },
    floor: function (arg, r) {
        const pow = Math.pow(10, r || 0);
        return Math.floor(arg * pow) / pow;
    },
    ceil: function (arg, r) {
        const pow = Math.pow(10, r || 0);
        return Math.ceil(arg * pow) / pow;
    }
};