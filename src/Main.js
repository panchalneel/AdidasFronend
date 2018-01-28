import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1>Addidas Wishlist</h1>
                <ul className="header">
                    <li><NavLink to="/">Search Article</NavLink></li>
                    <li><NavLink to="/stuff">Wishlist</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/stuff" component={Stuff}/>
                </div>
            </div>
            </HashRouter>
        );
    }
}

export default Main;