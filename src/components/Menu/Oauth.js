import React, { PureComponent } from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import './OauthModal.css'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

import SignInModal from './SignInModal';
import ThirtOauthModal from './ThirtOauthModal';
import SignUpModal from './SignUpModal'
import UserProfile from './UserProfile';

var cookie = new Cookies();

class Oauth extends PureComponent {
    constructor(props) {
        super(props);

        this.toggleOauth = this.toggleOauth.bind(this);
        this.toggleSignIn = this.toggleSignIn.bind(this);
        this.toggleSignUp = this.toggleSignUp.bind(this);

        this.state = {
            modalOauth: false,
            modalSignIn : false,
            modalSignUp : false,
            messageVerify : '',
            isShowProfile : false
        }
    }

    toggleOauth() {
        if (this.state.modalSignIn) {
            this.setState(prevState => ({
                messageVerify: '',
                modalOauth: !prevState.modalOauth,
                modalSignIn: false,
                toggleSignUp: false
            }))
        } else {
            this.setState(prevState => ({
                modalOauth: !prevState.modalOauth
            }));
        }

        this.props.resetErrorSign()
    }
   
    toggleSignIn() {
        document.body.style.paddingRight = 0;
        this.setState(prevState => ({
            messageVerify: '',
            modalOauth: false,
            modalSignUp: false,
            modalSignIn: !prevState.modalSignIn
        }));
        console.log(this.state)
        this.props.resetErrorSign()
    }

    toggleSignUp() {
        document.body.style.paddingRight = 0;

        this.setState( {
            messageVerify: '',
            modalOauth: false,
            modalSignIn: false,
            modalSignUp: !this.state.modalSignUp
       });
       this.props.resetMessage();
       this.props.resetErrorSign()
    }

    messageToSignin= (message) => {
        this.setState({
            messageVerify : message
        })
    }

    showUserProfile = () => {
        this.setState({
            ...this.state, isShowProfile : !this.state.isShowProfile
        })
    }
    
    logoutUser = () => {
        this.props.logoutUser()
    }

    // componentDidUpdate(){
    //     document.body.addEventListener('click', (e) => {
    //         var userElement = document.getElementsByClassName('user-profile-info');
    //         var nameUser = document.getElementsByClassName('user-profile-menu');
    //         console.log(e.target.parentElement.parentElement);
    //         console.log(userElement[0]);
    //         if((e.target.parentElement !== userElement[0] && e.target !== nameUser[0])){
    //             this.setState({
    //                 ...this.state,
    //                 isShowProfile : false
    //             })
    //         }
    //     })
    // }

    render() {
        const { userProfile, 
                onSignIn,
                onSignUp,
                oauthGoogle,
                oauthFacebook,
                oauth } = this.props;
        const { isShowProfile } =this.state
        const token = cookie.get('token')
       
        return (
            <div>     {
                token && <div>
                     <div id="PopoverLegacy"  className="user-profile-menu">
                        <img className='user-image-menu' src={userProfile.image} />
                        {userProfile.display_name}
                     
                </div>
                  <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                  <PopoverBody>
                       <UserProfile logoutUser={this.logoutUser} /> 
                </PopoverBody>
                </UncontrolledPopover>
                </div>
            }
            {
                !token && <div className="oauth-modal">
                    <div onClick={this.toggleOauth} className="oauth-menu">
                        <i className="far fa-user-circle"></i> Đăng nhập
                    </div>

                     {/* Oauth Google FaceBook */}
                    <ThirtOauthModal
                    toggleSignIn={this.toggleSignIn}
                     modalOauth={this.state.modalOauth}
                     toggleOauth ={this.toggleOauth}
                    toggleSignUp={this.toggleSignUp}

                     oauthGoogle = {oauthGoogle}
                     oauthFacebook={oauthFacebook}
                    />    

                    {/* Sign In */}
                    <SignInModal
                    
                     modalSignIn={this.state.modalSignIn}
                     toggleOauth={this.toggleOauth}
                    toggleSignIn={this.toggleSignIn}
                    toggleSignUp={this.toggleSignUp}

                    errorSignin = {oauth.errorSignin}
                    onSignIn ={onSignIn}
                    messageVerify={this.state.messageVerify}
                    />

                    <SignUpModal 
                        modalSignUp={this.state.modalSignUp}
                        toggleSignIn={this.toggleSignIn}
                        toggleSignUp={this.toggleSignUp}
                        messageToSignin={this.messageToSignin}

                        errorSignup = {oauth.errorSignup}
                        onSignUp={onSignUp}
                        message={oauth.message}
                        
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