import React,{Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import { commentSelectorFactory } from './selector'

class Comment extends Component {
render() {
    return (
        <div>
            <div>{this.props.comment.user}</div>
            <div>{this.props.comment.text}</div>
        </div>
    );
    }
}

/*Comment.propTypes = {
    comment: PropTypes.exact({
        id: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
}*/

const mapStateToProps = () => {
    const commentSelector = commentSelectorFactory();
    return (state, ownProps) => {
        return {
            comment: commentSelector(state, ownProps)
        }
    }
}

export default connect(mapStateToProps)(Comment)
