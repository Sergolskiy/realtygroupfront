// Редюсер



const initialState = {
    user: 'Unknown User',
};

let reduced = function(state = initialState, action) {
    if (action.type === 'ADD_USER') {
        return Object.assign({}, state, action);
    }
    return state;
};

let action = {
    type: 'ADD_USER',
    user: 'Dan'
};

let store = createStore(reduced);

class App extends React.Component {
    click = () => {
        store.dispatch(action);
    };
    render() {
        return (
            <div>
                <h1>{this.props.user}</h1>
                <button onClick={this.click}>Кнопка</button>
            </div>
        )
    }
}



// В props users ложим значение из хранилища
function mapStateToProps(store) {
    return {user: store.user};
}
// Объединяем хранилище и приложение (состояние хранилища в свойства приложения)
App = connect(mapStateToProps)(App);



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);