import React, { PureComponent } from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import './OauthModal.css'

import SignInModal from './SignInModal';
import OauthModal from './OauthModal';

var cookie = new Cookies();

class Oauth extends PureComponent {
    constructor(props) {
        super(props);

        this.toggleOauth = this.toggleOauth.bind(this);
        this.toggleSignIn = this.toggleSignIn.bind(this);

        this.state = {
            modalOauth: false,
            modalSignIn : false,
        }
    }

    toggleOauth() {
        if (this.state.modalSignIn) {
            this.setState(prevState => ({
                modalOauth: !prevState.modalOauth,
                modalSignIn: false
            }))
        } else {
            this.setState(prevState => ({
                modalOauth: !prevState.modalOauth
            }));
        }
    }
   
    toggleSignIn() {
        document.body.style.paddingRight = 0;
        this.setState(prevState => ({
            modalOauth: false,
            modalSignIn: !prevState.modalSignIn
        }));
    }

    logoutUser = () => {
        this.props.logoutUser()
    }


    render() {
        const { userProfile, errorMessage, onSignIn, oauthGoogle } = this.props;

        const token = cookie.get('token')

        return (
            <div>     {
                token && <div onClick={this.showLogout} className="user-logout">{userProfile.display_name}
                    
                        <ul className="user-profile-info">
                            <li>
                                <i className="fas fa-user-circle"></i><NavLink to='/'>Thong tin</NavLink>
                            </li>
                            <li onClick={this.logoutUser}>
                                <i className="fas fa-sign-out-alt"></i><span>Dang xuat</span>
                            </li>
                        </ul>
                    
                </div>
            }
            {
                !token && <div className="oauth-modal">
                    <div onClick={this.toggleOauth} className="oauth-menu">
                        <i className="far fa-user-circle"></i> Đăng nhập
                    </div>

                     {/* Oauth Google FaceBook */}
                    <OauthModal
                    toggleSignIn={this.toggleSignIn}
                     modalOauth={this.state.modalOauth}
                     toggleOauth ={this.toggleOauth}

                     oauthGoogle = {oauthGoogle}
                    />    

                    {/* Sign In */}
                    <SignInModal
                    
                     modalSignIn={this.state.modalSignIn}
                     toggleOauth={this.toggleOauth}
                    toggleSignIn={this.toggleSignIn}

                    errorMessage = {errorMessage}
                    onSignIn ={onSignIn}
                    />
                      
                </div>
            }              
                    </div>
        )
    }
}

Oauth.propTypes = {

};

export default Oauth;