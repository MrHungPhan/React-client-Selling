import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/ActionTypes'

import NewsDetailtPage from '../pages/NewsPage/NewDetailtPage'

class NewsDetailtContianer extends React.PureComponent {

     componentDidMount(){
          const { match } = this.props;
          const { id } = match.params;
          const idArr = id.split('-');
          const idNews = idArr[idArr.length - 1];
          this.props.getNewsDetailt(idNews)
     }

     render(){
          const { posts } = this.props
          console.log(posts.postTailt)
          return (
               <NewsDetailtPage 
                    post={posts.postTailt}
               />
          )
     }
}

const mapStateToProps = state => {
     return {
          posts: state.posts
     }
}

const mapDispatchToProps = (dispatch , props) => {
     return {
          getNewsDetailt: (id) => {
               dispatch(actions.getPostDetailt(id))
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetailtContianer);