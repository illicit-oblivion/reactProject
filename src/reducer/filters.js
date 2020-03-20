import {articles as defaultArticles} from "../fixtures"
import {SET_FROM_DATE} from "../constants";
import {SET_TO_DATE} from "../constants";
import {CHANGE_SELECTION} from "../constants";

const defaultFilters = {
    selected : [],
    dateRange: {
        from:null,
        to:null
    }
}

export default (filters = defaultFilters, action)=> {
    const {type, payload} = action;
    switch (type) {
        case SET_FROM_DATE:
            return {
                ...filters,
                dateRange: {
                 ...filters.dateRange,
                from:payload.day
                }
            };

        case SET_TO_DATE:
            return {
                ...filters,
                dateRange: {
                    ...filters.dateRange,
                    to: payload.day
                }
            };
        case CHANGE_SELECTION:
            return {
                ...filters,
                selected: payload.selectedOption
            }
    }
    return filters
}
