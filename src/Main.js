/***
 * @author Nil Panchal
 * @licence MIT
 * @description Adidas WishList Demo
 */
import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import WishList from "./Wishlist";

/**
 * @author Nil Panchal
 * @description Entry class to start reactjs application
 * @extends Component
 */
class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1>Addidas Wishlist Demo</h1>
                <ul className="header">
                    <li><NavLink to="/">Search Article</NavLink></li>
                    <li><NavLink to="/wishlist">Wishlist</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/wishlist" component={WishList}/>
                </div>
            </div>
            </HashRouter>
        );
    }
}

export default Main;