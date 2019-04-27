import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/ActionTypes'

import UserProfilePage from '../pages/UserProflePage/UserProfilePage';

class UserProfileContainer extends PureComponent {
    
    componentDidMount(){
        this.props.fetchUserProfile()
    }

    render() { 
        var { userProfile } = this.props;   
        return  <UserProfilePage userProfile={userProfile}/>;
    }
}

const mapStateToProps = state => {
    var { userProfile } = state
    return {
        userProfile
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchUserProfile : () => {
            dispatch(actions.getUserProfile())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);