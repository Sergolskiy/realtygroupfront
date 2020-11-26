import React from 'react'

export class Training_structure_old extends React.Component {
    state = {
        location: [],
        data: {},
        isDataLoad: false
    };
    nextStep = (i, isNextQuestion) => {
        if (isNextQuestion) {
            let location = this.state.location;
            location.push(i);
            this.setState({
                location: location
            });
        }
        else {
            // alert('После этого ответа вопросы закончились');
        }
    };
    previousStep = () => {
        let location = this.state.location;
        if (location.length > 0) {
            location.pop();
            this.setState({
                location: location
            });
        }
        else {
            // alert('Это самое начало вопросов');
        }
    };
    loadData = () => {
        $.getJSON("/data/training_tree.json", function (data) {
            this.setState({data: data, isDataLoad: true});
        }.bind(this));
    };
    componentDidMount() {
        this.loadData();
    };
    render() {
        console.log('render Training_structure');
        const
            location = this.state.location,
            data = this.state.data,
            nextStep = this.nextStep,
            previousStep = this.previousStep,
            isDataLoad = this.state.isDataLoad;

        let question, answer;

        if (!isDataLoad) return (<div>Loading...</div>);

        question = data;

        location.forEach(function (item) {
            question = question.items[item]
        });
        answer = question.items.map(function (item, i) {
            return <li className="list-group-item list-group-item-action" onClick={() => {nextStep(i, !!item.items)} }>{item.title}</li>
        });

        return (
            <div className="training_old">
                <div className="alert alert-primary" role="alert">
                    <button type="button" className="btn btn-primary mr-2" onClick={() => {previousStep()} }>Назад</button>
                    {question.title}
                    <div/>
                </div>
                <ul className="list-group">
                    {answer}
                </ul>
            </div>
        )
    }
}