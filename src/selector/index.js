import { createSelector } from "reselect";
import {mapToArr} from "../helpers";

const filtersGetter = state => state.filters;
const articlesGetter = state => state.articles.entities;
const idGetter = (state,props) => props.id;
const commentsGetter = (state) =>state.comments.entities;

export const filtratedArticlesSelector = createSelector(filtersGetter,articlesGetter,(filters,articles)=> {
        const {selected, dateRange: {from, to}} = filters;
         return mapToArr(articles).filter(article => {
             const published = Date.parse(article.date);
             return (!selected.length || selected.includes(article.id)) &&
                (!from || !to || (published > from && published < to))

         })
});

export const commentSelectorFactory = () => createSelector(commentsGetter, idGetter,(comment,id) => {
    return comment[id]
});


