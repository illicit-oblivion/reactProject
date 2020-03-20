import {
    CHANGE_SELECTION, SET_FROM_DATE, SET_TO_DATE,
    ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE, START, SUCCESS, FAIL,
     LOAD_ARTICLE_COMMENTS
} from "../constants";

export function selection(selectedOption) {
    return  {
        type: CHANGE_SELECTION,
        payload: { selectedOption }
    }
}


export function changeDateFrom(day) {
    return  {
        type: SET_FROM_DATE,
        payload: { day }
    }
}
export function changeDateTo(day) {
    return  {
        type: SET_TO_DATE,
        payload: { day }
    }
}

export function addComment (name, text,articleId) {
    return  {
        type: ADD_COMMENT,
        payload: { name,text, articleId},
        generateId: true,
    }
}

export function loadAllArticles() {
    return  {
        type: LOAD_ALL_ARTICLES,
        callApi: "/api/article",
    }
}

export function loadArticle(id) {
    return (dispatch) =>{
        dispatch({
            type: LOAD_ARTICLE + START,
            payload: {id},
        })
        setTimeout(()=> {
            fetch(`/api/article/${id}`)
                .then(res => res.json())
                .then (response => dispatch({type:LOAD_ARTICLE + SUCCESS, payload: { id,response }}))
                .catch (error => dispatch({type:LOAD_ARTICLE + FAIL,id, error}))
        },1000);
    }
}
export function loadArticleComments(articleId) {
    return (dispatch) =>{
        dispatch({
            type: LOAD_ARTICLE_COMMENTS + START,
            payload: {articleId},
        })
        setTimeout(()=> {
            fetch(`/api/comment?article=${articleId}`)
                .then(res => res.json())
                .then (response => dispatch({type:LOAD_ARTICLE_COMMENTS + SUCCESS, payload: { articleId,response }}))
                .catch (error => {
                    console.log(error);
                    dispatch({type:LOAD_ARTICLE_COMMENTS + FAIL,articleId, error});
                })
        },1000);
    }
}
