import React, {Component} from "react";
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

/**
 * @author Nil Panchal
 * @description AdidasWishList class to show wish list
 * @extends Component
 */
class AdidasWishList extends Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: '', wishlist: []};
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * @description To get wish list
     */
    componentDidMount() {
        fetch(BASE_URL + '/api/v1/wishlist').then(results => {
            return results.json();
        }).then(results => {
            this.setState(prevState => ({
                wishlist: results.data
            }));
        }).catch(err => {
            console.log(err, 'Errror occur while getting wishlist');
        });
    }

    /**
     * @description To render elements
     * @returns {*}
     */
    render() {
        console.log("Mywishlist");
        console.log(this.state.wishlist);
        return (
            <div className="row">
                <div className="column">{
                    this.state.wishlist.map((item) => {
                        return (<div className="card" key={item.id}>
                            <img src={item.image} alt="Jane"/>
                            <div className="container">
                                <h2>{item.suggestion}</h2>
                                <p>
                                    <button className="button"
                                            onClick={(e) => this.removeArticle(item.id, e)}>Remove
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
     * @description To handle change event
     * @param e
     */
    handleChange(e) {
        this.setState({text: e.target.value});
    }

    /**
     * @description Call remove article api to remove article
     * @param id
     * @param e
     */
    removeArticle(id, e) {
        console.log("id : " + id);
        axios.delete(BASE_URL + '/api/v1/wishlist/' + id).then(response => {
            console.log(response, 'Article removed');
            window.location.reload();
        }).catch(err => {
            console.log(err, 'Error occur while removing article');
        });
    }
}


export default AdidasWishList;