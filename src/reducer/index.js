import {combineReducers} from "redux";
import articles from "./article"
import filters from "./filters"
import comments from "./comment"

export default combineReducers({
    filters,
    articles,
    comments,
})
