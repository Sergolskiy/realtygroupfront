const initialState = {
    value: 0,
};

function addReducer(state = initialState, action) {
    switch(action.type) {
        case 'INCREMENT':
            return { ...state, value: state.value + 1 };
        case 'DECREASE':
            return { ...state, value: state.value - 1 };
        default:
            return state;
    }
}


const store = createStore(addReducer);


const INCREMENT = 'INCREMENT';
const DECREASE = 'DECREASE';

function incrementAction() {
    return {
        type: INCREMENT,
    };
}
function decreaseAction() {
    return{
        type: DECREASE,
    };
}



class Page extends React.PureComponent {
    render() {
        const { value, incrementAction, decreaseAction } = this.props;
        return (
            <div>
                <h1>{value}</h1>
                <button onClick={incrementAction}>increment</button>
                <button onClick={decreaseAction}>decrease</button>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    value: state.value
});

const mapDispatchToProps = (dispatch) => ({
    incrementAction: () => dispatch(incrementAction()),
    decreaseAction: () => dispatch(decreaseAction()),
});

Page = connect(mapStateToProps, mapDispatchToProps)(Page);

const App = () => (
    <Provider store={store}>
        <Page />
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));