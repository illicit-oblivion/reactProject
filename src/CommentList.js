import React, {Component} from "react"
import Comment from "./Comment.js"
import PropTypes from 'prop-types';
import CommentAddForm from "./CommentAddForm/index"
import {connect} from "react-redux";
import {filtratedArticlesSelector} from "./selector";
import {loadArticleComments} from "./AC";
import withAccordion from "./withAccordion";
import Loader from "./Loader";

 class CommentList extends Component {
     componentWillUpdate(nextProps, nextState) {
         const { article, loadArticleComments,articleId } = this.props;
         if(this.state.isOpen===false && nextState.isOpen === true && !article.commentsLoading && !article.commentsLoaded) {
            loadArticleComments(articleId);
         }
     }
    state= {
            isOpen:false
        }
    static propTypes = {
        comments: PropTypes.arrayOf (PropTypes.exact({
            id: PropTypes.string.isRequired,
            user: PropTypes.string,
            text:PropTypes.string
        } )).isRequired,
    }
    render()
    {

        const {isOpen}=this.state;

        return (
            <ul>
                <button onClick={this.toggleOpen}>{isOpen ? "close" : "open"} </button>
                {this.getCommentList()}
            </ul>
        )
    }
    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    getCommentList() {
        const {isOpen} = this.state;
        if (!isOpen) return null;
        const {comments,articleId, article} = this.props;
        if(!comments||!comments.length) return <p>No comments yet</p>;
        if(article.commentsLoading) return <Loader/>;
        if(!article.commentsLoaded) { return null;}
            const CommentsAdd = comments.map((id) => (
                <li key={id}>
                    <Comment id={id}/>
                </li>
            ));
            return <div>
                <ul>{CommentsAdd}</ul>
                <CommentAddForm articleId={articleId}/>
            </div>;

    }

}

export default connect (null,{loadArticleComments})(CommentList)
