import React,{Component} from "react"
import Article from "./Article.js"
import withAccordion from "./withAccordion";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {filtratedArticlesSelector} from "./selector"
import {loadAllArticles} from "./AC";
import Loader from "./Loader";
import {NavLink} from "react-router-dom";


class ArticleList extends Component{
    componentDidMount() {
        const {loaded,loading,loadAllArticles}=this.props;
        if(!loading &&!loaded) loadAllArticles();
    }
    b
     render() {
        const { articles, loading } = this.props;
        if(loading) return <Loader/>

        const articlesAdd = articles.map((article) => (
             <li key={article.id}>
             <NavLink to={`/articles/${article.id}`}>{article.title}</NavLink>
             </li>
        ));

        return <ul>
            {articlesAdd}
        </ul>;
 }



}

export default connect((state)=> ({
        articles:filtratedArticlesSelector(state),
        loading:state.articles.loading,
        loaded: state.articles.loaded
    }),{loadAllArticles}
)(withAccordion(ArticleList))




