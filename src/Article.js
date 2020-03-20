import React, { Component } from "react"
import CommentList from "./CommentList"
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadArticle} from "./AC";
import Loader from "./Loader";

class Article extends Component {
    static propTypes= {
        article:PropTypes.exact({
            id: PropTypes.string.isRequired,
            date: PropTypes.string,
            title: PropTypes.string,
            text:PropTypes.string,
            comments: PropTypes.arrayOf(PropTypes.object)
        } ),
        isOpen: PropTypes.bool.isRequired,
        toggleOpen: PropTypes.func.isRequired,
    }
    componentWillReceiveProps({isOpen,article,loadArticle}) {
        console.log(isOpen, article);
        if(isOpen && !article.text && !article.loading) {
            loadArticle(article.id);
            console.log(1)
        }
    }

    render() {
        const { article, isOpen, toggleOpen } = this.props;
        if(article.loading) return  <Loader/>;
        return (
            <div>
                <h1>{article.title}</h1>
                <button onClick={toggleOpen}>{isOpen ? "close" : "open"}</button>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { isOpen } = this.props;
        if (!isOpen) return null;
        const {article}=this.props;
        const { article: { comments } } = this.props;
        return <div>
            <section>{article.text}</section>
            <CommentList comments={comments} article = {article} articleId = {article.id}/>
        </div>


    }
}
export default connect (null,{loadArticle})( Article)


