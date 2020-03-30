import {normalizedArticles } from "../fixtures"
import {ADD_COMMENT, LOAD_ALL_ARTICLES, START, SUCCESS, LOAD_ARTICLE, LOAD_ARTICLE_COMMENTS} from "../constants";
import { arrToMap} from "../helpers"


const defaultArticles = {
    loading: false,
    loader: false,
    entities: {},
}
export default (articleState=defaultArticles, action)=>{
    const {type, payload,randomId,response} = action;
    switch (type) {
        case ADD_COMMENT:
            console.log(articleState);
            const article = articleState[payload.articleId];
           return {
                ...articleState,
               entities: {
                   ...articleState.entities,
                   [payload.articleId]: {
                       ...articleState.entities[payload.articleId],
                       comments: (articleState.entities[payload.articleId].comments || []).concat(randomId),
                   }
               }
            };
        case LOAD_ALL_ARTICLES + START:
            return {
                ...articleState,
                loading: true,
            }
        case LOAD_ALL_ARTICLES + SUCCESS:
            return {
                ...articleState,
                loading:false,
                loaded: true,
                entities: {
                    ...arrToMap(response),
                }
            }
        case LOAD_ARTICLE + START:
            return {
                ...articleState,
                entities:{
                    ...articleState.entities,
                    [payload.id]:{
                        ...articleState.entities[payload.id],
                        loading:true,
                    }

                }
            }
        case LOAD_ARTICLE + SUCCESS:
            return {
                ...articleState,
                entities:{
                    ...articleState.entities,
                    [payload.id]: {
                        ...payload.response,
                        commentsLoading: false,
                        commentsLoaded: false,
                        loading:false,
                        loaded:true,
                }

            }
        }
        case LOAD_ARTICLE_COMMENTS + START:
            return {
                ...articleState,
                entities:{
                    ...articleState.entities,
                    [payload.articleId]:{
                        ...articleState.entities[payload.articleId],
                        commentsLoading:true,
                        commentsLoaded:false,
                    }

                }
            }
        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return {
                ...articleState,
                entities:{
                    ...articleState.entities,
                    [payload.articleId]:{
                        ...articleState.entities[payload.articleId],
                        commentsLoading:false,
                        commentsLoaded:true,
                    }

                }
            }

    }
    return articleState;
}
