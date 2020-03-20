import React, {Component } from 'react';
import DayPickerAdvanced from "./DayPickerAdvanced";
import SelectArticle from "./SelectArticle";

class Filters extends Component {
    render() {
        return (
            <div>
                <SelectArticle />
                <DayPickerAdvanced />
            </div>
        );
    }
}

export default Filters;
