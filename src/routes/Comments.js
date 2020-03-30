import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import { loadLimitComments } from "../AC";
import {connect} from "react-redux";
import {NUMBER_OF_COMMENTS} from "../constants";
import {mapToArr} from "../helpers";
import CommentPagination from "./CommentPagination";
import Loader from "../Loader";


class Comments extends Component {
    componentDidMount() {
        this.props.loadLimitComments(NUMBER_OF_COMMENTS, (this.props.match.params.page - 1) * NUMBER_OF_COMMENTS);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.match.params.page !==nextProps.match.params.page){
            nextProps.loadLimitComments(NUMBER_OF_COMMENTS, (nextProps.match.params.page - 1) * NUMBER_OF_COMMENTS);
        }
    }

    render() {
        return (
            <div>
                {this.getIndex()}
                {this.getComments(this.props.match)}
            </div>
        );
    }

    getIndex = () => {
        const commentsPagesNumber= Math.ceil(this.props.total/ NUMBER_OF_COMMENTS);
        let i=1;
        const commentsPagesList=[];
        while( i<=commentsPagesNumber) {
            commentsPagesList.push( <li key={i}>
                <NavLink activeStyle={{color: "red"}} to={`/comments/${i}`}>{i++}</NavLink>
            </li>) ;
        }
        return <ul>{commentsPagesList}</ul>
    }

    getComments= (match) => {
        const {page} =match.params;
        if(this.props.loading) return  <Loader/>;
        return <CommentPagination comments = {this.props.comments} page={page}/>
    }
}

export default connect((state)=> ({
         loading:state.comments.loading,
         loaded: state.comments.loaded,
         total:state.comments.total,
        comments:mapToArr(state.comments.entities),
    }),{loadLimitComments}
)(Comments)

