import React, {Component} from 'react';
import ArticleList from "../ArticleList";
import Article from "../Article";
import { Route } from "react-router-dom";
import Filters from "../Filters";

class Articles extends Component {
    render() {
        return (
            <div>
                <ArticleList/>
                <Route path="/articles" children={this.getIndex} exact/>
                <Route path="/articles/:id" render={this.getArticle}/>
            </div>
        );
    }
    getArticle = ({match}) => {
        const {id} = match.params;
        return <Article id ={id} key = {id} isOpen />
    }
    getIndex= ({match}) => {
        if (!match) return <h2>Article:</h2>
        return <h2> Please, select article </h2>
    }
}


export default Articles;
