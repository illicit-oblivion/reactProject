import React, {Component} from "react"
import "./style.css"
import {addComment} from "../AC";
import {connect} from "react-redux";

 class CommentAddForm extends Component {
    state= {
        userName:'',
        textValue:'',
    }

    render() {
        return (<form onSubmit={this.handleSubmit}>
            User:<input type="text" value={this.state.userName}  className={this.getValueLength("userName")} name="userName" onChange={this.handleChange}/>
            Text:<input type="text" value={this.state.textValue} className={this.getValueLength("textValue")} name="textValue"  onChange={this.handleChange}/>
            <button>Add Comment</button>
         </form>)
    }
    handleSubmit= ev => {
        ev.preventDefault();
        const {userName,textValue}=this.state;
        this.props.addComment(userName, textValue);

        this.setState({
            userName: '',
            textValue: ''
        })
    }
    getValueLength = (type) => ( this.state[type] && this.state[type].length < this.length[type].min) ? "red":"";

    length = {
        userName: {
            max: 15,
            min: 5,
        },
        textValue:{
            max:50,
            min:20,
        }
    }
    handleChange = (ev) => {
        const {name,value} = ev.target;
        if (ev.target.value.length > this.length[name].max) return;
        this.setState({
            [name]:value
        })
    }
}
export default connect(null, (dispatch,ownProps)=>({
    addComment:(name,text) => dispatch(addComment(name,text,ownProps.articleId))
}))(CommentAddForm)
