import React, {Component} from "react"
import Articles from "./routes/Articles.js"
import "react-day-picker/lib/style.css";
import Filters from "./Filters";
import UserForm from "./UserForm";
import NotFound from "./NotFound";
import { Router, Route,NavLink, Switch, Redirect} from "react-router-dom";
import NewArticle from "./NewArticle"
import Comments from "./routes/Comments";
import history from "./store/history";
import PropTypes from 'prop-types';

export default class App extends Component {
    static childContextTypes = {
        user:PropTypes.string,
        language: PropTypes.string,
    }
    getChildContext() {
        return {
            user:this.state.username,
            language: this.state.language,
        }
    }
    state={
        username :'' ,
        language:'ru',
    }
    render (){
        return <Router history={history}>
                <div>

                    <UserForm value={this.state.username} onChange={this.handleUserChange}/>
                    <button onClick={this.handleLanguageChange}>RU-EN</button>
                    <div>
                        <div><NavLink activeStyle={{color: "red"}} to="/filters"> Filters </NavLink></div>
                        <div><NavLink activeStyle={{color: "red"}}  to="/articles"> Articles </NavLink></div>
                        <div><NavLink activeStyle={{color: "red"}}  to="/comments/1">Comments </NavLink></div>
                    </div>
                    <Switch>
                    <Route path="/filters" component={Filters}/>
                    <Route path="/articles/new" component={NewArticle}/>
                    <Route path="/articles" component={Articles}/>
                    <Route path="/comments/:page" component={Comments}/>
                    <Redirect from ="/comments" to ="/comments/1"/>
                    <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
    }
    handleUserChange= (username) => {
        this.setState({
            username
        })
    }
    handleLanguageChange=()=>{
        this.setState({
            language:this.state.language==='ru'?'en':'ru',
        })
    }
 }
