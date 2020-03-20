import React,{Component} from "react"
import Article from "./Article.js"
import withAccordion from "./withAccordion";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {filtratedArticlesSelector} from "./selector"
import {loadAllArticles} from "./AC";
import Loader from "./Loader";


class ArticleList extends Component{
    componentDidMount() {
        const {loaded,loading,loadAllArticles}=this.props;
        if(!loading &&!loaded) loadAllArticles();
    }
     /*static propTypes = {
         toggleOpenArticle: PropTypes.func.isRequired,
         articles: PropTypes.arrayOf (PropTypes.exact({
             id: PropTypes.string.isRequired,
             date: PropTypes.string,
             title: PropTypes.string,
             text:PropTypes.string,
             comments: PropTypes.arrayOf(PropTypes.object)
          } )),
         openArticleId: PropTypes.string,
     }*/
     render() {
        const { articles, openArticleId, toggleOpenArticle,loading } = this.props;
        if(loading) return <Loader/>
         console.log(openArticleId);
        const articlesAdd = articles.map((article) => (
             <li key={article.id}>
                 <Article
                     article={article}
                     isOpen={openArticleId === article.id}
                     toggleOpen={() => toggleOpenArticle(article.id)}
                 />
             </li>
        ));

        return <ul>
            {articlesAdd}
        </ul>;
 }

// filter(articles, selectedOption, dateInterval) {
//     let resultArticles = [...articlgit add README.mdes];
//     if (dateInterval.to) {
    //         resultArticles = this.matchDateInterval(resultArticles, dateInterval)
    //     }
    //     if (selectedOption) {
    //         resultArticles = this.matchLabel(resultArticles, selectedOption)
    //     }
    //     return resultArticles;
    // }
    //
    //  matchDateInterval(articles, dateInterval) {
    //      return articles.filter((article)=> {
    //          const date = new Date(article.date);
    //          return date >= dateInterval.from && date <= dateInterval.to
    //      })
    //  }
    //
    //  matchLabel(articles, selectedOption) {
    //     return articles.filter((article) =>
    //         selectedOption.find((selectedItem) => selectedItem.label === article.title)
    //     )
    //  }

}

export default connect((state)=> ({
        articles:filtratedArticlesSelector(state),
        loading:state.articles.loading,
        loaded: state.articles.loaded
    }),{loadAllArticles}
)(withAccordion(ArticleList))




