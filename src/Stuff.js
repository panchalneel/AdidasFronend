import React, {Component} from "react";
import axios from 'axios';

class Stuff extends Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: '', wishlist: []};
        let wishlist = [];
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('https://dfce89de.ngrok.io/api/v1/wishlist').then(results => {
            return results.json()
        }).then(results => {
            console.log(results, 'Signature added!');
            this.setState(prevState => ({
                wishlist: results.data
            }));
        }).catch(err => {
            console.log(err, 'Signature not added, try again');
        });
    }

    render() {

        console.log("Mywishlist");
        console.log(this.state.wishlist);
        /*return React.createElement(
            'div',
            null,
            this.state.wishlist.map(item => React.createElement(
                'li',
                {
                    key: item.id,
                    style: {
                        color: "red",
                        backgroundColor: "rgba(255,255,255,.5)",
                        padding: "15px",
                        marginBottom: "15px",
                        borderRadius: "5px"
                    }
                },
                item.suggestion,
                React.createElement(
                    'button',
                    {onClick: this.removeArticle, id: item.id, value: item.suggestion, wishlist: this.state.wishlist},
                    'Remove Article'
                )
                )
            ))*/

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
        /*
        <div className='container'>
            <div className='well'>
                {
                    this.state.wishlist.map((room) => {
                        return (
                            <li key={room.id}>{room.suggestion}</li>
                        )
                    }),


                }
            </div>
        </div>*/

        /*return (


            <div>
                <h2>STUFF</h2>
                <p>Mauris sem velit, vehicula eget sodales vitae,
                    rhoncus eget sapien:</p>
                <ol>
                    <li>Nulla pulvinar diam</li>
                    <li>Facilisis bibendum</li>
                    <li>Vestibulum vulputate</li>
                    <li>Eget erat</li>
                    <li>Id porttitor</li>
                </ol>
            </div>
        );*/
        /*console.log("Wishlist");
        console.log(this.state.wishlist);
*/

        /*return React.createElement(
            'div',
            null,
            this.props.wishlist.map(item => React.createElement(
                'li',
                {key: item.id},
                item.suggestion
                )
            )
        )*/

        /*return React.createElement(
    'div',
    null,
    React.createElement(TodoList, {items: this.state.items, products: this.state.products})
);*/
    }

    handleChange(e) {

        this.setState({text: e.target.value});
    }

    removeArticle(id, e) {
        console.log("id : " + id);

        axios.delete('https://dfce89de.ngrok.io/api/v1/wishlist/' + id).then(response => {
            console.log(response, 'Article deletd!');
            /*let result = this.state.wishlist.filter(function(el) {
                return el.suggestion !== e.target.value;
            });*/

            window.location.reload();
        }).catch(err => {
            console.log(err, 'Signature not added, try again');
        });
        console.log("Remove Article called");
    }
}


export default Stuff;