//import {normalizedComments as defaultComments } from "../fixtures"
import {ADD_COMMENT,LOAD_ARTICLE_COMMENTS,  SUCCESS} from "../constants";
import { arrToMap} from "../helpers"

const commentsMap = {
    entities: {},
}
export default (commentState= commentsMap, action)=>{
    const {type,payload,randomId} = action;
    switch (type) {
        case ADD_COMMENT:
            return {
                ...commentState,
                entities:{
                    ...commentState.entities,
                    [randomId]: {
                        id:randomId,
                        user:payload.name,
                        text:payload.text
                    }
                }

            };

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return {
                ...commentState,
                entities:{
                ...commentState.entities,
                ...arrToMap(payload.response),
                }
            }

    }
    return commentState;
}
