import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash'
import { Cookies } from 'react-cookie';

import * as actions from '../actions/ActionTypes';
import change_alias from '../utils/convertLink'
import Menu from '../components/Menu/Menu';
import MenuItem from '../components/Menu/MenuItem';
import OauthModal from '../components/Menu/Oauth'

var cookie = new Cookies();

class MenuContainer extends Component {

    componentWillMount(){
        // const token = localStorage.getItem('token');
        const token = cookie.get('token');
        if(token && this.props.isAuthencated){
            this.props.getUserProfile();
             this.props.fetchGetCart();
        }
        this.props.fetchMenu();
    }                                                                                                                                                                                                                                                                                                                                             


    shouldComponentUpdate(nextProps){
        if(lodash.isEqual(nextProps, this.props)){
            return false
        }
        return true
    }

    componentWillReceiveProps(nextProps){
        const token = cookie.get('token');
        if(token){
            if(lodash.isEqual(nextProps.userProfile, {})){
                this.props.getUserProfile();
            }     
        }
    }

    onSignIn = (dataForm) => {
        this.props.onSignIn(dataForm)
    }


    oauthGoogle = (accessToken) => {
        this.props.oauthGoogle(accessToken)
    }

    logoutUser = () => {
        this.props.logoutUser()
    }

    render() {
        var { menus, userProfile, errorMessage, cart } = this.props;
        return (
            <Menu userProfile={userProfile}
             onSignIn = {this.onSignIn}
             oauthGoogle = {this.oauthGoogle}
             errorMessage = {errorMessage}
             logoutUser = {this.logoutUser}
             cart = {cart}
             >
                { this.showMenu(menus) }
            </Menu>
            
        );
    }

    showMenu = (menus) => { // menu la 1 arr
        var resuilt = [];
        resuilt = menus.map((menu, index) => {
            for(let keyName in menu){
                var to = change_alias(keyName);
                return <MenuItem
                             key = {index} 
                             index = {index}
                             name = {keyName} 
                             to={to}
                             subMenu = {menu[keyName]}
                             />
            }
            
        })
        resuilt.unshift(<MenuItem name = 'Trang chủ' key={11} exact={true}  to='' />) // Them vao dau mang
        resuilt.push(<MenuItem name = 'Tin tức' key={12} to ='tin-tuc'/>, <MenuItem name = 'Liên hệ' key={13} to='lien-he'/>)
        return resuilt;
        
    }
}



const mapStateToProps = (state) => {
    return {
        menus : state.menus,
        isAuthencation : state.oauth.isAuthencated,
        errorMessage : state.oauth.error,
        userProfile : state.userProfile,
        cart : state.cart
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchMenu : () => {

            dispatch(actions.fetchMenu())
        },

        onSignIn : (dataForm) => {
            dispatch(actions.signIn(dataForm))
        },

        oauthGoogle : (accessToken) => {
            dispatch(actions.oauthGoogle(accessToken))
        },

        getUserProfile : () => {
            dispatch(actions.getUserProfile())
        },

        logoutUser : () => {
            dispatch(actions.logOutUser())
        },

        fetchGetCart : () => {
            dispatch(actions.fetchGetCart())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps, null, {
    pure : false
})(MenuContainer);
