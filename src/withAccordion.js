import React, { Component } from "react"

export default (OriginalComponent) => class extends Component {

    state = {
        openArticleId: null
    }
    render() {
        return <OriginalComponent {...this.props} openArticleId={this.state.openArticleId} toggleOpenArticle={this.toggleOpenArticle}/>
    }
    toggleOpenArticle = (openArticleId) => {
        this.setState({
            openArticleId: this.state.openArticleId === openArticleId ? null : openArticleId
        })
    }
 }
