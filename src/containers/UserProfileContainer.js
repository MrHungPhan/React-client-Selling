import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/ActionTypes'
import { Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'

import UserProfilePage from '../pages/UserProflePage/UserProfilePage';

const cookie = new Cookies()

class UserProfileContainer extends PureComponent {
    
    componentDidMount(){
        document.body.classList.remove('selling-cart');
        this.props.fetchUserProfile()
    }

    render() { 
        const token = cookie.get('token');
        var { userProfile } = this.props;   
        return  <div>
            {
                token && <UserProfilePage userProfile={userProfile}/>
            }
            {
                !token && <Redirect to='/' />
            }
            </div>
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