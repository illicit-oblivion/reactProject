import React, {Component} from "react"
import ArticleList from "./ArticleList.js"
import "react-day-picker/lib/style.css";
import Filters from "./Filters";
import UserForm from "./UserForm";
import {HashRouter as Router, Route,NavLink} from "react-router-dom";

export default class App extends Component {
    render (){
        return <Router>
                <div>
                    <div>
                        <div><NavLink activeStyle={{color: "red"}} to="/filters"> Filters </NavLink></div>
                        <div><NavLink activeStyle={{color: "red"}}  to="/articles"> Articles </NavLink></div>
                    </div>
                    <UserForm/>
                    <Route path="/filters" component={Filters}/>
                    <Route path="/articles" component={ArticleList}/>
                </div>
            </Router>
    }
 }
