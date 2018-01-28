import React, {Component} from "react";
import axios from 'axios';

class Home extends Component {
    render() {
        return (
            <div>
                <h2>HELLO</h2>
                <p>Cras facilisis urna ornare ex volutpat, et
                    convallis erat elementum. Ut aliquam, ipsum vitae
                    gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                    metus nec massa. Maecenas hendrerit laoreet augue
                    nec molestie. Cum sociis natoque penatibus et magnis
                    dis parturient montes, nascetur ridiculus mus.</p>

                <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
            </div>
        );
    }
}

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
                'Articles'
            ),
            React.createElement(
                'form',
                {onSubmit: this.handleSubmit},
                React.createElement('input', {
                    onChange: this.handleChange,
                    value: this.state.text,
                    style: {
                        height: "40px",
                        width: "325px",
                        fontSize: "25px"
                    }
                }),
                React.createElement(
                    'button',
                    {
                        style: {
                            backgroundColor: "#ff8040",
                            position: "absolute",
                            height: "40px",
                            width: "150px",
                            fontSize: "14px",
                            color: "#fff",
                            textAlign: "center",
                            lineHeight: "42px",
                            borderWidth: "0",
                            backgroundColor: "#ff8040",
                            webkitBorderRadius: "0px 5px 5px 0px",
                            borderRadius: "0px 5px 5px 0px",
                            cursor: "pointer"
                        }
                    },
                    'Search Article'
                )
            ),
            <br></br>
            ,
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
            id: Math.floor((Math.random() * 10000) + 1),
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
                obj.id = Math.floor((Math.random() * 100) + 1);
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
        let style = {
            display: "inline-block",
            margin: "15px",
            padding: "10px 20px",
            fontSize: "15px",
            cursor: "pointer",
            textAlign: "center",
            textDecoration: "none",
            outline: "none",
            color: "#fff",
            backgroundColor: "#4CAF50",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 9px #999"
        };
        let row = {
            content: "",
            clear: "both",
            display: "table",
        }
        /*return (
            React.createElement(
                'div',
                null,
                this.props.products.map(item => React.createElement(
                    'div',
                    {key: item.id},
                    React.createElement(
                        'img',
                        {src: item.image, alt: item.suggestion, style: {borderRadius: "50%"}}
                    ),
                    item.suggestion,
                    React.createElement(
                        'button',
                        {
                            onClick: this.addArticle, id: item.id, value: item.suggestion,
                            style: style
                        },
                        'Add'
                    ), React.createElement(
                        'button',
                        {
                            onClick: this.removeArticle, id: item.id, value: item.suggestion,
                            style: style
                        },
                        'Remove'
                    )
                    )
                ))
        )*/
        return (
            <div className="row">
                <div className="column">{
                    this.props.products.map((item) => {
                        return (<div className="card" key={item.id}>
                            <img src={item.image} alt="Jane"/>
                            <div className="container">
                                <h2>{item.suggestion}</h2>
                                <p>
                                    <button className="button"
                                            onClick={(e) => this.addArticle(item.id, item.suggestion, item.image, e)}>Add
                                    </button>
                                </p>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        );
    }

    addArticle(id, value, image, e) {

        console.log("Id : " + id);
        console.log("Value : " + value);
        console.log("Image : " + image);
        console.log("Add Article called");
        axios.post('https://rocky-wave-31345.herokuapp.com/api/v1/wishlist', {
            id: id,
            suggestion: value,
            image: image
        }).then(response => {
            console.log(response, 'Signature added!');
        }).catch(err => {
            console.log(err, 'Signature not added, try again');
        });
    }

    removeArticle(e) {
        console.log(e.target.value);
        axios.delete('https://rocky-wave-31345.herokuapp.com/api/v1/wishlist/' + e.target.id).then(response => {
            console.log(response, 'Article deletd!');
        }).catch(err => {
            console.log(err, 'Signature not added, try again');
        });
        console.log("Remove Article called");
    }
}

export default TodoApp;