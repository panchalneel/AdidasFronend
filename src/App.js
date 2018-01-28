import React, {Component} from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import './App.css';

/*class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}*/

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: '', products: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'TODO'
            ),
            React.createElement(
                'form',
                {onSubmit: this.handleSubmit},
                React.createElement('input', {
                    onChange: this.handleChange,
                    value: this.state.text
                }),
                React.createElement(
                    'button',
                    null,
                    'Search Article'
                )
            ),
            React.createElement(TodoList, {items: this.state.items, products: this.state.products})
        );
    }

    handleChange(e) {

        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }

        let displayDetails;
        console.log("Search Text : ");
        console.log(this.state.text);
        const newItem = {
            text: this.state.text,
            id: Date.now(),
            displayDetails: ''
        };
        let allResult = [];

        fetch('https://www.adidas.co.uk/api/suggestions/' + this.state.text).then(results => {
            return results.json();
        }).then(result => {
            console.log("Result : ");
            console.log(result);
            allResult = result.products;
            newItem.displayDetails = result;
            displayDetails = result.products.map((obj) => {
                console.log("Products");
                console.log(obj);
                obj.id = Date.now();
                return obj;
            });

            this.setState(prevState => ({
                items: prevState.items.concat(newItem),
                text: '',
                products: displayDetails
            }));
        });


    }
}

class TodoList extends Component {
    render() {
        console.log("products : " + JSON.stringify(this.props.products));

        return (
            React.createElement(
                'div',
                null,
                this.props.products.map(item => React.createElement(
                    'li',
                    {key: item.id},
                    item.suggestion,
                    React.createElement(
                        'button',
                        {onClick: this.addArticle, id: item.id, value: item.suggestion},

                        'Add Article'
                    ), React.createElement(
                        'button',
                        {onClick: this.removeArticle, id: item.id, value: item.suggestion},
                        'Remove Article'
                    )
                    )
                ))
            /*React.createElement(
                'ul',
                null,
                this.props.items.map(item => React.createElement(
                    'li',
                    {key: item.id},
                    item.text
                )), React.createElement(
                    'ul',
                    null,
                    this.props.products.map(item => React.createElement(
                        'li',
                        {key: item.id},
                        item.suggestion
                        )
                    )
                )
            )*/
        )
    }

    addArticle(e) {

        console.log(e.target.value);
        console.log(e.target.id + " " + e.target.value);
        console.log("Add Article called");
        axios.post('http://localhost:8080/api/v1/wishlist', {
            id: e.target.id,
            value: e.target.value
        }).then(response => {
            console.log(response, 'Signature added!');
        }).catch(err => {
            console.log(err, 'Signature not added, try again');
        });


    }

    removeArticle(e) {
        console.log(e.target.value);
        axios.delete('http://localhost:8080/api/v1/wishlist/' + e.target.id).then(response => {
            console.log(response, 'Article deletd!');
        }).catch(err => {
            console.log(err, 'Signature not added, try again');
        });
        console.log("Remove Article called");
    }
}

const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
        </div>
    </Router>
)

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)



//ReactDOM.render(React.createElement(TodoApp, null), mountNode);

//export default TodoApp;

export default BasicExample;