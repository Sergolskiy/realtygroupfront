const production = location.hostname === 'crm.realtygroup.biz';
const url_backend = production ? 'https://crm-backend.realtygroup.biz' : 'http://crm.prokachu.com';
// const url_backend = production ? 'https://crm-backend.realtygroup.biz' : 'https://realty-back';

const data = {

    // Чтобы скрыть поле в object или request: hide: {object: true}
    // Типы полей:
    // select - select и multiselect
    // double - число с плавающей точкой
    // int - целое число
    // range_double - диапазон с плавающей точкой
    // range_int - диапазон с целыми числами
    // range_double_text - диапазон через текстовое поле 25,99999999
    fields: {
        // Select
        payments: {
            label: "Доп. платежи",
            object: {
                type: "select",
                isMulti: true
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "water",
                    label: "Вода"
                },
                {
                    value: "electricity",
                    label: "Свет"
                },
                {
                    value: "gas",
                    label: "Газ"
                },
                {
                    value: "heating",
                    label: "Отопление"
                },
                {
                    value: "half_heating",
                    label: "Отопление 50/50"
                },
                {
                    value: "public_service",
                    label: "Коммунальные услуги"
                }
            ]
        },
        household_appliances: {
            label: "Бытовая техника",
            object: {
                type: "select",
                isMulti: true
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "electric_kettle",
                    label: "Электрочайник"
                },
                {
                    value: "сoffee_machine",
                    label: "Кофемашина"
                },
                {
                    value: "hair_dryer",
                    label: "Фен"
                },
                {
                    value: "stove",
                    label: "Плита"
                },
                {
                    value: "cooktop",
                    label: "Варочная панель"
                },
                {
                    value: "oven",
                    label: "Духовой шкаф"
                },
                {
                    value: "microwave_oven",
                    label: "Микроволновая печь"
                },
                {
                    value: "multicooker",
                    label: "Мультиварка"
                },
                {
                    value: "tv",
                    label: "Телевизор"
                },
                {
                    value: "refrigerator",
                    label: "Холодильник"
                },
                {
                    value: "dishwasher",
                    label: "Посудомоечная машина"
                },
                {
                    value: "washing_machine",
                    label: "Стиральная машина"
                },
                {
                    value: "drying_machine",
                    label: "Сушильная машина"
                },
                {
                    value: "iron",
                    label: "Утюг"
                },
                {
                    value: "vacuum_cleaner",
                    label: "Пылесос"
                },
                {
                    value: "air_conditioning",
                    label: "Кондиционер"
                },
                {
                    value: "boiler",
                    label: "Бойлер"
                },
                {
                    value: "gas_column",
                    label: "Газовая колонка"
                }
            ]
        },
        will_live: {
            label: "Проживать будут",
            object: {
                type: "select",
                isMulti: true
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "girl",
                    label: "Девушка"
                },
                {
                    value: "guy",
                    label: "Парень"
                },
                {
                    value: "family",
                    label: "Семья"
                },
                {
                    value: "students",
                    label: "Студенты"
                }
            ]
        },
        elevator: {
            label: "Лифт",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "yes",
                    label: "Есть"
                },
                {
                    value: "no",
                    label: "Нет"
                }
            ]
        },
        floor_location: {
            label: "Расположение этажа",
            object: {
                type: "select",
                isMulti: false,
                hide: true
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "first",
                    label: "Первый"
                },
                {
                    value: "middle",
                    label: "Средний"
                },
                {
                    value: "last",
                    label: "Последний"
                }
            ]
        },
        type_building: {
            label: "Тип строения",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "monolithic",
                    label: "Монолитный"
                },
                {
                    value: "brick",
                    label: "Кирпичный"
                },
                {
                    value: "panel",
                    label: "Панельный"
                },
                {
                    value: "wooden",
                    label: "Деревянный"
                },
                {
                    value: "foam_block",
                    label: "Пеноблочный"
                },
                {
                    value: "slag_block",
                    label: "Шлакоблочный"
                },
                {
                    value: "gas_silicate",
                    label: "Газосиликатный"
                },
                {
                    value: "pise",
                    label: "Глинобитный"
                },
                {
                    value: "adobe",
                    label: "Саманный"
                },
                {
                    value: "molten_slag",
                    label: "Шлаколитой"
                },
                {
                    value: "sandwich_panels",
                    label: "Сендвич-панели"
                },
                {
                    value: "other",
                    label: "Иное"
                }
            ]
        },
        apartment_type: {
            label: "Тип квартиры",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "brezhnevka",
                    label: "Брежневка"
                },
                {
                    value: "gostinka",
                    label: "Малосемейка"
                },
                {
                    value: "stalinka",
                    label: "Сталинка"
                },
                {
                    value: "old_foundation",
                    label: "Старый фонд"
                },
                {
                    value: "panel_house",
                    label: "Типовая панель"
                },
                {
                    value: "khrushchevka",
                    label: "Хрущевка"
                },
                {
                    value: "сzekh",
                    label: "Чешка"
                },
                {
                    value: "improved",
                    label: "Улучшенка"
                }
            ]
        },
        roof: {
            label: "Кровля",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "flexible_shingles",
                    label: "Гибкая черепица"
                },
                {
                    value: "metal_tile",
                    label: "Металлочерепица"
                },
                {
                    value: "decking",
                    label: "Профнастил"
                },
                {
                    value: "ondulin",
                    label: "Ондулин"
                },
                {
                    value: "slate",
                    label: "Шифер"
                },
                {
                    value: "faltsevaya",
                    label: "Фальцевая"
                },
                {
                    value: "roll_overlay",
                    label: "Рулонная наплавляемая"
                },
                {
                    value: "membranous",
                    label: "Мембранная"
                },
                {
                    value: "ceramic_tiles",
                    label: "Керамическая черепица"
                },
                {
                    value: "sand_cement_tiles",
                    label: "Песчано-цементная черепица"
                },
                {
                    value: "shale_coating",
                    label: "Сланцевое покрытие"
                }
            ]
        },
        condition: {
            label: "Состояние",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "eurorepair",
                    label: "Евроремонт"
                },
                {
                    value: "redecorating",
                    label: "Косметический ремонт"
                },
                {
                    value: "living",
                    label: "Жилое"
                },
                {
                    value: "needs_redecoration",
                    label: "Требует косметического ремонта"
                },
                {
                    value: "for_finishing",
                    label: "Под чистовую отделку"
                },
                {
                    value: "needs_major_repair",
                    label: "Требует капитального ремонта"
                }
            ]
        },
        heating: {
            label: "Отопление",
            object: {
                type: "select",
                isMulti: true
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "solid_fuel",
                    label: "На твердом топливе"
                },
                {
                    value: "central",
                    label: "Центральное"
                },
                {
                    value: "gas",
                    label: "Газовое автономное"
                },
                {
                    value: "electric",
                    label: "Электрическое автономное"
                },
                {
                    value: "liquid_fuel",
                    label: "На жидком топливе"
                },
                {
                    value: "without_heating",
                    label: "Без отопления"
                }
            ]
        },
        electricity: {
            label: "Электричество",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "yes",
                    label: "Есть"
                },
                {
                    value: "no",
                    label: "Нет"
                },
                {
                    value: "possibility",
                    label: "Есть возможность подключить"
                }
            ]
        },
        water_pipes: {
            label: "Водопровод",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "central",
                    label: "Центральный"
                },
                {
                    value: "possibility",
                    label: "Есть возможность подключения"
                },
                {
                    value: "well",
                    label: "Скважина"
                },
                {
                    value: "no",
                    label: "Нет"
                }
            ]
        },
        bathroom: {
            label: "Санузел",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "combined",
                    label: "Совмещенный"
                },
                {
                    value: "separated",
                    label: "Раздельный"
                },
                {
                    value: "two_or_more",
                    label: "2 с/у и более"
                },
                {
                    value: "in_the_yard",
                    label: "Во дворе"
                }
            ]
        },
        sewage: {
            label: "Канализация",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "central",
                    label: "Центральная"
                },
                {
                    value: "possibility",
                    label: "Есть возможность подведения"
                },
                {
                    value: "septic",
                    label: "Септик"
                },
                {
                    value: "no",
                    label: "Нет"
                }
            ]
        },
        internet: {
            label: "Интернет",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "yes",
                    label: "Есть"
                },
                {
                    value: "possibility",
                    label: "Есть возможность подключить"
                },
                {
                    value: "no",
                    label: "Нет"
                }
            ]
        },
        gas: {
            label: "Газ",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "trunk",
                    label: "Магистральный"
                },
                {
                    value: "autonomous",
                    label: "Автономный"
                },
                {
                    value: "possibility",
                    label: "Есть возможность подключить"
                },
                {
                    value: "no",
                    label: "Нет"
                }
            ]
        },
        how_plot_fenced: {
            label: "Ограждение участка",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "wooden_fence",
                    label: "Деревянный"
                },
                {
                    value: "brick_fence",
                    label: "Кирпичный"
                },
                {
                    value: "eurofence",
                    label: "Еврозабор"
                },
                {
                    value: "metal_fence",
                    label: "Металлический"
                },
                {
                    value: "profnastil",
                    label: "Профнастил"
                },
                {
                    value: "grid",
                    label: "Сетка"
                }
            ]
        },
        entrance_door: {
            label: "Входная дверь",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "metal",
                    label: "Металлическая"
                },
                {
                    value: "wooden",
                    label: "Деревянная"
                },
                {
                    value: "armored",
                    label: "Бронированная"
                }
            ]
        },
        furniture: {
            label: "Мебель",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "fully_furnished",
                    label: "Полностью меблирована"
                },
                {
                    value: "partly_furnished",
                    label: "Частично меблирована"
                },
                {
                    value: "empty",
                    label: "Пустая"
                }
            ]
        },
        window: {
            label: "Окна",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "metal_plastic",
                    label: "Металлопластиковые"
                },
                {
                    value: "partially_metal_plastic",
                    label: "Частично металлопластиковые"
                },
                {
                    value: "wooden",
                    label: "Деревянные"
                },
                {
                    value: "without_windows",
                    label: "Без окон"
                }
            ]
        },
        view_from_windows: {
            label: "Вид из окна",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "yard_and_street",
                    label: "Во двор и на улицу"
                },
                {
                    value: "yard",
                    label: "Во двор"
                },
                {
                    value: "street",
                    label: "На улицу"
                }
            ]
        },
        garbage_chute: {
            label: "Мусоропровод",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "yes",
                    label: "Есть"
                },
                {
                    value: "no",
                    label: "Нет"
                }
            ]
        },
        layout: {
            label: "Планировка",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "passing",
                    label: "Проходная"
                },
                {
                    value: "separate",
                    label: "Раздельная"
                },
                {
                    value: "non_standard",
                    label: "Нестандартная"
                },
                {
                    value: "free",
                    label: "Свободная"
                },
                {
                    value: "adjacently_separated",
                    label: "Смежно-раздельная"
                },
                {
                    value: "studio",
                    label: "Студия"
                }
            ]
        },
        reason_for_sale: {
            label: "Причина продажи",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "alternative_deal",
                    label: "Альтернативная сделка"
                },
                {
                    value: "moving_to_another_city",
                    label: "Переезд в другой город"
                },
                {
                    value: "business_investment",
                    label: "Инвестиция в бизнес"
                },
                {
                    value: "need_money",
                    label: "Нужны деньги"
                },
                {
                    value: "no_more_need",
                    label: "За ненадобностью"
                }
            ]
        },
        corner: {
            label: "Угловая",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "yes",
                    label: "Да"
                },
                {
                    value: "no",
                    label: "Нет"
                }
            ]
        },
        balcony: {
            label: "Балкон, лоджия",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "one",
                    label: "1 шт."
                },
                {
                    value: "two",
                    label: "2 шт."
                },
                {
                    value: "three",
                    label: "3 шт."
                },
                {
                    value: "none",
                    label: "Без балкона"
                }
            ]
        },
        basement: {
            label: "Подвал",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "yes",
                    label: "Есть"
                },
                {
                    value: "no",
                    label: "Нет"
                }
            ]
        },
        ceiling: {
            label: "Перекрытие",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "slabs",
                    label: "Плиты"
                },
                {
                    value: "wood",
                    label: "Дерево"
                },
                {
                    value: "metal",
                    label: "Металл"
                }
            ]
        },
        limes: {
            label: "Рампа",
            object: {
                type: "select",
                isMulti: false
            },
            request: {
                type: "select",
                isMulti: true
            },
            options: [
                {
                    value: "yes",
                    label: "Есть"
                },
                {
                    value: "no",
                    label: "Нет"
                }
            ]
        },


        // Double
        total_area: {
            label: "Площадь общая",
            object: {
                type: "double"
            },
            request: {
                type: "range_double"
            }
        },


        // Int
        floors_house: {
            label: "Этажность",
            object: {
                type: "int"
            },
            request: {
                type: "range_int"
            }
        },
        number_of_floors: {
            label: "Этаж",
            object: {
                type: "int"
            },
            request: {
                type: "range_int"
            }
        },


        // range_double_text
        year_built: {
            label: "Год постройки",
            object: {
                type: "int"
            },
            request: {
                type: "range_double_text"
            }
        },
        number_rooms: {
            label: "Количество комнат",
            object: {
                type: "int"
            },
            request: {
                type: "range_double_text"
            }
        },
        living_area: {
            label: "Площадь жилая",
            object: {
                type: "double"
            },
            request: {
                type: "range_double_text"
            }
        },
        kitchen_area: {
            label: "Площадь кухни",
            object: {
                type: "double"
            },
            request: {
                type: "range_double_text"
            }
        },
        ceiling_height: {
            label: "Высота потолков",
            object: {
                type: "double"
            },
            request: {
                type: "range_double_text"
            }
        },
        land_area: {
            label: "Площадь участка, соток",
            object: {
                type: "double"
            },
            request: {
                type: "range_double_text"
            }
        },
        garage_width: {
            label: "Ширина гаража",
            object: {
                type: "double"
            },
            request: {
                type: "range_double_text"
            }
        },
        garage_length: {
            label: "Длина гаража",
            object: {
                type: "double"
            },
            request: {
                type: "range_double_text"
            }
        },
        garage_height: {
            label: "Высота гаража",
            object: {
                type: "double"
            },
            request: {
                type: "range_double_text"
            }
        },
        gate_width: {
            label: "Ширина ворот",
            object: {
                type: "double"
            },
            request: {
                type: "range_double_text"
            }
        },
        gate_height: {
            label: "Высота ворот",
            object: {
                type: "double"
            },
            request: {
                type: "range_double_text"
            }
        },

        // Only Title
        user_id: {
            label: 'Риэлтор'
        },
        cards_contacts_id: {
            label: 'Контакт'
        },
        city: {
            label: 'Город'
        },
        area: {
            label: 'Район'
        },
        street: {
            label: 'Улица'
        },
        building: {
            label: 'Дом'
        },
        apartment: {
            label: 'Квартира'
        },
        price: {
            label: 'Цена'
        },
        landmark: {
            label: 'Ориентир'
        },
        category: {
            label: 'Тип'
        },
        subcategory: {
            label: 'Подтип'
        },
        description: {
            label: 'Описание'
        },
        comment: {
            label: 'Комментарий'
        },
        commission: {
            label: 'Комиссия'
        },
        contract_expiration_date: {
            label: 'Дата истечения договора'
        },
        number_contract: {
            label: 'Номер договора'
        },
        stage_transaction: {
            label: 'Этап сделки'
        }
    },
    categories: {
        sale: [
            {
                value: "apartments",
                title: "Квартиры",
                fields: [
                    "number_of_floors",
                    "floors_house",
                    "floor_location",
                    "total_area",
                    "living_area",
                    "kitchen_area",
                    "ceiling_height",
                    "condition",
                    "layout",
                    "bathroom",
                    "heating",
                    "corner",
                    "balcony",
                    // "elevator",
                    "type_building",
                    "apartment_type",
                    // "entrance_door",
                    // "furniture",
                    // "window",
                    // "view_from_windows",
                    // "year_built"
                ],
                subcategories: [
                    {
                        value: "one_room",
                        title: "1-к"
                    },
                    {
                        value: "two_rooms",
                        title: "2-к"
                    },
                    {
                        value: "three_rooms",
                        title: "3-к"
                    },
                    {
                        value: "four_rooms",
                        title: "4-к"
                    },
                    {
                        value: "five_rooms",
                        title: "5-к"
                    },
                    {
                        value: "six_rooms",
                        title: "6-к"
                    },
                    {
                        value: "seven_rooms",
                        title: "7-к"
                    },
                    {
                        value: "eight_rooms",
                        title: "8-к"
                    },
                    {
                        value: "nine_rooms",
                        title: "9-к"
                    },
                    {
                        value: "ten_rooms",
                        title: "10-к и более"
                    }
                ]
            },
            {
                value: "houses_cottages",
                title: "Дома и дачи",
                fields: [
                    "number_rooms",
                    "floors_house",
                    "type_building",
                    "roof",
                    "total_area",
                    "living_area",
                    "kitchen_area",
                    "ceiling_height",
                    "condition",
                    "heating",
                    "electricity",
                    "water_pipes",
                    "bathroom",
                    "sewage",
                    "gas",
                    "land_area",
                    "how_plot_fenced",
                    // "entrance_door",
                    // "furniture",
                    // "window",
                    // "view_from_windows",
                    // "layout",
                    "year_built"
                ],
                subcategories: [
                    {
                        value: "house",
                        title: "Дом"
                    },
                    {
                        value: "part_house",
                        title: "Часть дома"
                    },
                    {
                        value: "unfinished",
                        title: "Недострой"
                    }
                ]
            },
            {
                value: "garages",
                title: "Гаражи",
                fields: [
                    "floors_house",
                    "basement",
                    "ceiling",
                    "garage_width",
                    "garage_length",
                    "garage_height",
                    "total_area",
                    "gate_width",
                    "gate_height",
                    "electricity",
                    "limes",
                    "year_built"
                ],
                subcategories: [
                    {
                        value: "garage",
                        title: "Гараж"
                    },
                    {
                        value: "parking",
                        title: "Паркинг"
                    }
                ]
            },
            {
                value: "area",
                title: "Участки",
                fields: [
                    "electricity",
                    "water_pipes",
                    "sewage",
                    "gas",
                    "land_area",
                    "how_plot_fenced"
                ],
                subcategories: [
                    {
                        value: "for_housing",
                        title: "Под жильё"
                    },
                    {
                        value: "cottage",
                        title: "Дачный"
                    },
                    {
                        value: "commercial",
                        title: "Коммерческий"
                    },
                    {
                        value: "agricultural",
                        title: "Сельскохозяйственный"
                    }
                ]
            },
            {
                value: "commercial",
                title: "Коммерческая",
                fields: [
                    "number_of_floors",
                    "floors_house",
                    "number_rooms",
                    "type_building",
                    "total_area",
                    "living_area",
                    "kitchen_area",
                    "ceiling_height",
                    "condition",
                    "electricity",
                    "water_pipes",
                    "sewage",
                    "gas",
                    // "entrance_door",
                    // "furniture",
                    // "window",
                    "heating",
                    "year_built"
                ],
                subcategories: [
                    {
                        value: "box",
                        title: "Бокс"
                    },
                    {
                        value: "working_business",
                        title: "Готовый бизнес"
                    },
                    {
                        value: "cafe",
                        title: "Кафе"
                    },
                    {
                        value: "shop",
                        title: "Магазин"
                    },
                    {
                        value: "separate_building",
                        title: "Отдельное здание"
                    },
                    {
                        value: "office",
                        title: "Офис"
                    },
                    {
                        value: "basement",
                        title: "Подвальное помещение"
                    },
                    {
                        value: "any_destiny",
                        title: "Помещение свободного назначения"
                    },
                    {
                        value: "production",
                        title: "Производство"
                    },
                    {
                        value: "storage",
                        title: "Склад"
                    },
                    {
                        value: "service_station",
                        title: "СТО"
                    },
                    {
                        value: "marketplace",
                        title: "Торговая площадь"
                    }
                ]
            },
            {
                value: "rooms",
                title: "Комнаты",
                fields: [
                    "number_of_floors",
                    "floors_house",
                    "total_area",
                    "kitchen_area",
                    "ceiling_height",
                    "household_appliances",
                    "will_live",
                    // "elevator",
                    "type_building",
                    "condition",
                    "heating",
                    "bathroom",
                    // "entrance_door",
                    // "furniture",
                    // "window",
                    // "view_from_windows",
                    "layout",
                    "corner",
                    "balcony",
                    "year_built"
                ],
                subcategories: [
                    {
                        value: "room",
                        title: "Комната"
                    }
                ]
            }
        ],
        rent: [
            {
                value: "apartments",
                title: "Квартиры",
                fields: [
                    "payments",
                    "number_of_floors",
                    "floors_house",
                    "floor_location",
                    "total_area",
                    "living_area",
                    "kitchen_area",
                    "ceiling_height",
                    "household_appliances",
                    "will_live",
                    "elevator",
                    "type_building",
                    "condition",
                    "heating",
                    "bathroom",
                    "entrance_door",
                    "furniture",
                    "window",
                    "view_from_windows",
                    "layout",
                    "corner",
                    "balcony",
                    // "year_built"
                ],
                subcategories: [
                    {
                        value: "one_room",
                        title: "1-к"
                    },
                    {
                        value: "two_rooms",
                        title: "2-к"
                    },
                    {
                        value: "three_rooms",
                        title: "3-к"
                    },
                    {
                        value: "four_rooms",
                        title: "4-к"
                    },
                    {
                        value: "five_rooms",
                        title: "5-к"
                    },
                    {
                        value: "six_rooms",
                        title: "6-к"
                    },
                    {
                        value: "seven_rooms",
                        title: "7-к"
                    },
                    {
                        value: "eight_rooms",
                        title: "8-к"
                    },
                    {
                        value: "nine_rooms",
                        title: "9-к"
                    },
                    {
                        value: "ten_rooms",
                        title: "10-к и более"
                    }
                ]
            },
            {
                value: "houses_cottages",
                title: "Дома и дачи",
                fields: [
                    "payments",
                    "number_rooms",
                    "floors_house",
                    "total_area",
                    "living_area",
                    "kitchen_area",
                    "ceiling_height",
                    "household_appliances",
                    "will_live",
                    "type_building",
                    "roof",
                    "condition",
                    "heating",
                    "electricity",
                    "water_pipes",
                    "bathroom",
                    "sewage",
                    "gas",
                    "land_area",
                    "how_plot_fenced",
                    "entrance_door",
                    "furniture",
                    "window",
                    "view_from_windows",
                    "layout",
                    "year_built"
                ],
                subcategories: [
                    {
                        value: "house",
                        title: "Дом"
                    },
                    {
                        value: "part_house",
                        title: "Часть дома"
                    },
                    {
                        value: "unfinished",
                        title: "Недострой"
                    }
                ]
            },
            {
                value: "garages",
                title: "Гаражи",
                fields: [
                    "payments",
                    "floors_house",
                    "basement",
                    "ceiling",
                    "garage_width",
                    "garage_length",
                    "garage_height",
                    "total_area",
                    "gate_width",
                    "gate_height",
                    "electricity",
                    "limes"
                ],
                subcategories: [
                    {
                        value: "garage",
                        title: "Гараж"
                    },
                    {
                        value: "parking",
                        title: "Паркинг"
                    }
                ]
            },
            {
                value: "area",
                title: "Участки",
                fields: [
                    "payments",
                    "electricity",
                    "water_pipes",
                    "sewage",
                    "gas",
                    "land_area",
                    "how_plot_fenced"
                ],
                subcategories: [
                    {
                        value: "for_housing",
                        title: "Под жильё"
                    },
                    {
                        value: "cottage",
                        title: "Дачный"
                    },
                    {
                        value: "commercial",
                        title: "Коммерческий"
                    },
                    {
                        value: "agricultural",
                        title: "Сельскохозяйственный"
                    }
                ]
            },
            {
                value: "commercial",
                title: "Коммерческая",
                fields: [
                    "payments",
                    "number_of_floors",
                    "floors_house",
                    "number_rooms",
                    "type_building",
                    "total_area",
                    "living_area",
                    "kitchen_area",
                    "ceiling_height",
                    "condition",
                    "electricity",
                    "water_pipes",
                    "sewage",
                    "gas",
                    "entrance_door",
                    "furniture",
                    "window",
                    "heating",
                    "year_built"
                ],
                subcategories: [
                    {
                        value: "box",
                        title: "Бокс"
                    },
                    {
                        value: "working_business",
                        title: "Готовый бизнес"
                    },
                    {
                        value: "cafe",
                        title: "Кафе"
                    },
                    {
                        value: "shop",
                        title: "Магазин"
                    },
                    {
                        value: "separate_building",
                        title: "Отдельное здание"
                    },
                    {
                        value: "office",
                        title: "Офис"
                    },
                    {
                        value: "basement",
                        title: "Подвальное помещение"
                    },
                    {
                        value: "any_destiny",
                        title: "Помещение свободного назначения"
                    },
                    {
                        value: "production",
                        title: "Производство"
                    },
                    {
                        value: "storage",
                        title: "Склад"
                    },
                    {
                        value: "service_station",
                        title: "СТО"
                    },
                    {
                        value: "marketplace",
                        title: "Торговая площадь"
                    }
                ]
            },
            {
                value: "rooms",
                title: "Комнаты",
                fields: [
                    "payments",
                    "number_of_floors",
                    "floors_house",
                    "total_area",
                    "kitchen_area",
                    "ceiling_height",
                    "household_appliances",
                    "will_live",
                    "elevator",
                    "type_building",
                    "condition",
                    "heating",
                    "bathroom",
                    "entrance_door",
                    "furniture",
                    "window",
                    "view_from_windows",
                    "layout",
                    "corner",
                    "balcony",
                    "year_built"
                ],
                subcategories: [
                    {
                        value: "room",
                        title: "Комната"
                    }
                ]
            }
        ]
    },
    currencies: [
        {
            id: 1,
            value: "rub",
            title: "RUB"
        },
        {
            id: 2,
            value: "eur",
            title: "EUR"
        },
        {
            id: 3,
            value: "usd",
            title: "USD"
        },
        {
            id: 4,
            value: "uah",
            title: "ГРН"
        }
    ],
    dealStages: {
        sale: [
            {
                value: "1",
                label: "Работа с контактом",
                percent: 20,
                color: "#6197B7"
            },
            {
                value: "3",
                label: "Переговоры",
                percent: 60,
                color: "#FFC107"
            },
            {
                value: "2",
                label: "Приняли в работу",
                percent: 40,
                color: "#28A745"
            },
            {
                value: "4",
                label: "Задаток",
                percent: 80,
                color: "#E05432"
            },
            {
                value: "successfully",
                label: "Успешно",
                percent: 100,
                color: "#28A745"
            },
            {
                value: "poorly",
                label: "Неуспешно",
                percent: 100,
                color: "#6C757D"
            },
            {
                value: "statistics",
                label: "Для статистики",
                percent: 100,
                color: "#6C757D"
            }
        ],
        rent: [
            {
                value: "1",
                label: "Работа с контактом",
                percent: 20,
                color: "#6197B7"
            },
            {
                value: "2",
                label: "Приняли в работу",
                percent: 40,
                color: "#28A745"
            },
            {
                value: "3",
                label: "Переговоры",
                percent: 60,
                color: "#FFC107"
            },
            {
                value: "4",
                label: "Задаток",
                percent: 80,
                color: "#E05432"
            },
            {
                value: "successfully",
                label: "Успешно",
                percent: 100,
                color: "#28A745"
            },
            {
                value: "poorly",
                label: "Архив",
                percent: 100,
                color: "#6C757D"
            }
        ]
    },
    statuses: [
        {
            value: "thinks",
            label: "Думает",
            color: "#28A745",
            icon: '"\\F1F5"'
        },
        {
            value: "show",
            label: "Показ",
            color: "#FFC107",
            icon: '"\\F1F2"'
        },
        {
            value: "not_suitable",
            label: "Не подходит",
            color: "gray",
            icon: '"\\F1F8"'
        }
    ],
    rights: production ?
        {
            editCards: {
                rent: [6,8,16,22,5],
                sale: [6,8,9,10,11,12,13,15,16,17,18,19,23,5,29,32,35,36,37,39,41,42,45,46,47,50,53,57,58,64,65,66]
            },
            delCards: {
                rent: [6,8,16,5],
                sale: [6,8,16,5]
            },
            seeCardContact: {
                rent: [6,8,16,17,18,19,28,22,5,34,43,56,58,66,67],
                sale: [6,8,9,10,11,12,13,15,16,17,18,19,23,5,29,32,35,36,37,39,41,42,45,46,47,50,53,57,58,64,65,66]
            },
            seeCardAddress: {
                rent: [6,8,16,17,18,19,28,22,5,34,43,56,58,66,67],
                sale: [6,8,9,10,11,12,13,15,16,17,18,19,23,5,29,32,35,36,37,39,41,42,45,46,47,50,53,57,58,64,65,66]
            },
            changeCardContact: [5,16], // Право менять контакта у объекта в режиме редактирования
            delUser: [8,5], // Право удалять и восстанавливать юзеров, а также просматривать удаленных юзеров
            showAnalytics: [5,6,8], // Право смотреть аналитику
            banEditDelCards: [28,22,34], // Запрет редактирования и удаления любой карточки. Приоритет над delCards
            banEditDelContacts: [28,22,34], // Запрет редактирования и удаления любого контакта
            addFromExternalSources: [8,5], // Право добавлять объекты из внешних источников
            print: [5,16] // Право печатать главную страницу (продакшн)
        } :
        {
            editCards: {
                rent: [24,47],
                sale: [24,47]
            },
            delCards: {
                rent: [24,47],
                sale: [24,47]
            },
            seeCardContact: {
                rent: [24,47],
                sale: [24,47]
            },
            seeCardAddress: {
                rent: [24,47],
                sale: [24,47]
            },
            changeCardContact: [24,47], // Право менять контакта у объекта в режиме редактирования
            delUser: [24,47],
            showAnalytics: [24],
            banEditDelCards: [], // приоритет над delCards
            banEditDelContacts: [],
            addFromExternalSources: [1,24,43,45,47], // Право добавлять объекты из внешних источников
            print: [24,47] // Право печатать главную страницу (development)
        },
    quotes: [
        {
            quote: 'Успех — это способность терпеть поражение за поражением без потери энтузиазма.',
            author: 'Уинстон Черчилль'
        },
        {
            quote: 'Если вы думаете, что способны выполнить что-то, или думаете, что не способны на это, вы правы в обоих случаях.',
            author: 'Генри Форд'
        },
		{
            quote: 'Великие умы обсуждают идеи. Средние умы обсуждают события. Маленькие умы обсуждают людей.',
            author: 'Элеонора Рузвельт'
        },
		{
            quote: 'Если вы действительно хотите чего-то, не ждите — научите себя быть нетерпеливым.',
            author: 'Гурбакш Чахал'
        },
		{
            quote: 'Всякий раз, когда вы видите успешного человека, вы замечаете лишь славу, окружающую его, но не то, чем он пожертвовал ради этого.',
            author: 'Вайбхав Шах'
        },
		{
            quote: 'Важно не то, сбили ли тебя с ног, — важно то, поднялся ли ты снова.',
            author: 'Винс Ломбарди'
        },
		{
            quote: 'Успех — это сумма маленьких усилий, повторяемых день за днём.',
            author: 'Роберт Кольер'
        },
		{
            quote: 'Для того, чтобы добиться успеха, вашего желания для успеха необходимо больше, чем вашего страха неудачи.',
            author: 'Билл Косби'
        },
		{
            quote: 'Из тех бросков, которые ты не сделал, 100% — мимо ворот.',
            author: 'Уэйн Гретцки'
        },
		{
            quote: 'Если вы делаете то, что делали всегда, вы получаете то, что получали всегда.',
            author: 'Тони Роббинс'
        },
		{
            quote: 'Если вы хотите быть более удачливым, делайте больше попыток.',
            author: 'Брайан Трейси'
        },
		{
            quote: 'За свою карьеру я промахнулся свыше 9000 раз. Я проиграл почти 300 матчей. 26 раз мне было доверено сделать решающий бросок и я промазал. Я очень часто терпел неудачи в своей жизни. Именно поэтому я стал звездой.',
            author: 'Майкл Джордан'
        },
		{
            quote: 'Успешные люди вырываются вперед, используя то время, которое остальные используют впустую.',
            author: 'Генри форд'
        },
		{
            quote: 'Глуп тот человек, который никогда не меняет своего мнения.',
            author: 'Уинстон Черчилль'
        },
		{
            quote: 'На протяжении своей жизни каждому человеку доводится споткнуться о свой «великий шанс». К несчастью, большинство из нас просто подымается, отряхивается и идет дальше, как будто ничего и не произошло.',
            author: 'Уинстон Черчилль'
        },
		{
            quote: 'Большое преимущество получает тот, кто достаточно рано сделал ошибки, на которых можно учиться.',
            author: 'Уинстон Черчилль'
        },
		{
            quote: 'Успешный успех - это состояние к которому вы прийдете, если перестанете искать секретные секреты и начнете работать работу.',
            author: 'Евгений Бойко'
        },
		{
            quote: 'Никто не хочет вставать в 4 утра и идти бегать, когда еще совершенно темно, но это необходимо. Единственная причина, почему я это делаю так рано – это потому, что я верю в то, что никто другой не делает это. И это дает мне маленькое преимущество.',
            author: 'Майк Тайсон'
        },
		{
            quote: 'Когда мне тяжело, я всегда напоминаю себе о том, что если я сдамся — лучше не станет.',
            author: 'Майк Тайсон'
        },
		{
            quote: 'Если человек встает после падения — это не физика. Это характер.',
            author: 'Майк Тайсон'
        },
		{
            quote: 'Я этого хочу. Значит, это будет.',
            author: 'Генри Форд'
        },
		{
            quote: 'Одна победа не ведет к успеху, в отличие от постоянного желания побеждать.',
            author: 'Винс Ломбарди'
        },
		{
            quote: 'Поверьте, что сможете, и пол пути уже пройдено.',
            author: 'Теодор Рузвельт'
        },
		{
            quote: '80% успеха — это умение всегда быть на виду и на слуху',
            author: 'Вуди Аллен'
        },
		{
            quote: 'Препятствия – это те страшные вещи, которые вы видите, когда отводите глаза от цели.',
            author: 'Генри Форд'
        },
		{
            quote: 'Никогда, никогда не позволяйте другим убедить вас, что что-то сложно или невозможно.',
            author: 'Дуглас Бадлер'
        },
		{
            quote: 'Кто хочет – ищет возможности. Кто не хочет – ищет причины.',
            author: 'Сократ'
        },
		{
            quote: 'Пока у тебя есть попытка - ты не проиграл!',
            author: 'Сергей Бубка'
        },
		{
            quote: 'Раньше я говорил: "Я надеюсь, что все изменится". Затем я понял, что существует единственный способ, чтобы все изменилось— измениться мне самому.',
            author: 'Джим Рон'
        },
		{
            quote: 'Урок, который я извлек и которому следую всю жизнь, состоял в том, что надо пытаться, и пытаться, и опять пытаться - но никогда не сдаваться!',
            author: 'Ричард Бренсон'
        },
		{
            quote: 'Делай сегодня то, что другие не хотят, завтра будешь жить так, как другие не могут!',
            author: 'Джаред Лето'
        },
		{
            quote: 'Жизнь — как вождение велосипеда. Чтобы сохранить равновесие, ты должен двигаться.',
            author: 'Альберт Эйнштейн'
        }
    ]
};
