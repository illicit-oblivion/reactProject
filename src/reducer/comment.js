//import {normalizedComments as defaultComments } from "../fixtures"
import {ADD_COMMENT, LOAD_ARTICLE_COMMENTS, LOAD_LIMIT_COMMENTS, START, SUCCESS} from "../constants";
import { arrToMap} from "../helpers"

const commentsMap = {
    entities: {
        loading:false,
        loaded:false,
    },
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
        case LOAD_LIMIT_COMMENTS + START:
            return {
                ...commentState,
                loading:true,
                entities:{
                    ...commentState.entities,
                }
            }
        case LOAD_LIMIT_COMMENTS + SUCCESS:
            const {response} = action;
            return {
                ...commentState,
                total:response.total,
                loading:false,
                loaded:true,
                entities:{
                    ...arrToMap(response.records),
                }
            }
    }
    return commentState;
}
