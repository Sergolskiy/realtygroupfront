import {combineReducers, createStore} from 'redux'



const reducerLogin = function (state = {
    login: function () {
        return $.cookie('token')
    }()
}, action) {
    if (action.type === 'LOGIN') {
        return Object.assign({}, state, action);
    }
    return state;
};


const reducerCheckIn = function (state = {
    validateMail: true,
    validatePas: true,
    validateCPas: true,
    validateName: true,
    validateSurname: true,
    validateMiddleName: true,
    loader: false,
    message: []
}, action) {
    if (action.type === 'CHECK_IN') {
        return Object.assign({}, state, action);
    }
    return state;
};


const reducerConfirmCode = function(state = {validateCode: true, loader: false, message: []}, action) {
    if (action.type === 'CONFIRM_CODE') {
        return Object.assign({}, state, action);
    }
    return state;
};

const reducerAuth = function(state = {page: 'login', email: ''}, action) {
    if (action.type === 'AUTH') {
        return Object.assign({}, state, action);
    }
    return state;
};

const reducerCards = function(state = {modalAddIsOpen: false}, action) {
    if (action.type === 'MODAL_ADD_IS_OPEN') {
        return Object.assign({}, state, action);
    }
    return state;
};

// const reducerCardsTable = function(state = {currency_id: ''}, action) {
//     if (action.type === 'CARDS_TABLE_CURRENCY') {
//         return Object.assign({}, state, action);
//     }
//     return state;
// };

// const editCard = function(state = {isEdit: false}, action) {
//     if (action.type === 'START_EDIT_CARD') {
//         return {isEdit: true};
//     }
//     if (action.type === 'END_EDIT_CARD') {
//         return {isEdit: false};
//     }
//     return state;
// };


const reducers = combineReducers({
    reducerLogin,
    reducerCheckIn,
    reducerConfirmCode,
    reducerAuth,
    reducerCards,
    // reducerCardsTable,
    // editCard
});



// Создаем хранилище состояний
const store = createStore(reducers);


export {store};