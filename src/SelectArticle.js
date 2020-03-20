import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {connect} from "react-redux"
import {selection} from"./AC"
import {mapToArr} from "./helpers"


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
        this.props.selection(selectedOption.map(selected => selected.value));
   };
}
export default connect((state)=>({
    selectedOption: state.filters.selected,
    articles: mapToArr(state.articles.entities)
    }), { selection })(SelectArticle)
