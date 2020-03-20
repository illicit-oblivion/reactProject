import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {connect} from "react-redux"
import {selection} from"./AC"


 class SelectArticle extends React.Component {
    /*state = {
        selectedOption: null,
    };*/

    render() {
        const options= this.props.articles.map(article=>({
            label:article.title,
            value:article.id
        }));
        return (
            <Select
                value={this.props.selectedOption}
                onChange={this.handleChange}
                options={options}
                multi
            />
        );
    }
    handleChange = selectedOption => {
        this.props.selection(selectedOption);
   };
}
export default connect((state)=>({
    selectedOption: state.selectedOption
    }), { selection })(SelectArticle)
