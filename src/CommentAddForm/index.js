import React, {Component} from "react"

export default class CommentAddForm extends Component {
    state= {
        userName:'',
        textValue:'',
    }

    render() {
        return (<div>
            User:<input type="text" value={this.state.userName}   name="userName" onChange={this.handleChange}/>
            Text:<input type="text" value={this.state.textValue} name="textValue"  onChange={this.handleChange}/>
            <button>Add Comment</button>
         </div>)
    }
    handleChange = ev => {
        const {name,value}=ev.target;
        if(name=="userName" && (value.length<5||value.length>15)) ev.target.style.borderColor="red";
        else ev.target.style.borderColor="";
        if(name=="textValue" && (value.length<20||value.length>50)) ev.target.style.borderColor="red";
        else ev.target.style.borderColor="";
                this.setState({
            [name]:value
        })
    }

}
