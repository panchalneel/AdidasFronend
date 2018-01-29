import React, {Component} from "react";
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
const ADIDAS_URL = "https://www.adidas.co.uk";

/**
 * @author Nil Panchal
 * @description Default entry level
 * @desc This class will handel search operation of article
 * @extends Component
 *
 */
class AdidasHome extends Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: '', products: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        let buttonStyle = {
            backgroundColor: "#ff8040",
            position: "absolute",
            height: "40px",
            width: "150px",
            fontSize: "14px",
            color: "#fff",
            textAlign: "center",
            lineHeight: "42px",
            borderWidth: "0",
            webkitBorderRadius: "0px 5px 5px 0px",
            borderRadius: "0px 5px 5px 0px",
            cursor: "pointer"
        };

        let searchTextBoxStyle = {
            height: "40px",
            width: "325px",
            fontSize: "25px"
        };
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
                    style: searchTextBoxStyle
                }),
                React.createElement(
                    'button',
                    {
                        style: buttonStyle
                    },
                    'Search Article'
                )
            ),
            <br/>
            ,
            React.createElement(ArticleList, {items: this.state.items, products: this.state.products})
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
        const newItem = {
            text: this.state.text,
            id: Math.floor((Math.random() * 10000) + 1),
            displayDetails: ''
        };
        fetch(ADIDAS_URL + '/api/suggestions/' + this.state.text).then(results => {
            return results.json();
        }).then(result => {
            console.log("Result : ");
            console.log(result);
            displayDetails = result.products.map((obj) => {
                console.log("Products");
                console.log(obj);
                obj.id = Math.floor((Math.random() * 10000) + 1);
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

/**
 * @author Nil Panchal
 * @description ArticleList will search article using adidas sear API
 * @extends Component
 */
class ArticleList extends Component {
    render() {
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

    /**
     * @description To add article in wish list
     * @param id
     * @param value
     * @param image
     * @param e
     */
    addArticle(id, value, image, e) {
        axios.post(BASE_URL + '/api/v1/wishlist', {
            id: id,
            suggestion: value,
            image: image
        }).then(response => {
            console.log(response);
            alert("Article added successfully");
        }).catch(err => {
            console.log(err, 'Error occur while adding article');
            alert('Something went wrong. Please try again');
        });
    }
}

export default AdidasHome;