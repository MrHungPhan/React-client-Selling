import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/ActionTypes'

import NewsPage from '../pages/NewsPage/NewPage';

class NewsContainer extends PureComponent {
    
    componentDidMount(){
        this.props.getPosts()
    }

    render() { 
        var { posts } = this.props;   
        return  <div>
                <NewsPage 
                    posts={posts.postsArr}
                />
            </div>
    }
}

const mapStateToProps = state => {
    var { posts } = state
    return {
        posts
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
       getPosts : () => {
           dispatch(actions.getPosts())
       }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);