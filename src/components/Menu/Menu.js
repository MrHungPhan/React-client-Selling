import React from 'react';
import './Menu.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Container,

} from 'reactstrap';
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import MenuCart from './MenuCart';
import Oauth from './Oauth';


export default class Example extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);

        this.state = {
            isOpen: false,
            isFixedMenu: false,
        };
    }



    toggleMenu() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    }


    componentDidMount() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 70) {
                this.setState({
                    ...this.state, isFixedMenu: true
                })
            } else {
                this.setState({
                    ...this.state, isFixedMenu: false
                })
            }
        })
    }

    responseGoogle = (response) => {
        console.log(response.accessToken)
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    render() {
        var { isFixedMenu } = this.state
        var { cart,
            userProfile,
            oauthGoogle,
            oauthFacebook,
            onSignIn,
            onSignUp,
            logoutUser,
            resetMessage,
            resetErrorSign,
            oauth } = this.props;
        return (
            <div>
                <Navbar color="light" className={classnames({ 'fixed-top': isFixedMenu })} light expand="md">
                    <Container>
                        <NavbarToggler onClick={this.toggleMenu} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {/* Menu Item */}
                                {this.props.children}
                            </Nav>
                        </Collapse>

                        <Oauth
                            onSignIn={onSignIn}
                            onSignUp={onSignUp}
                            oauthGoogle={oauthGoogle}
                            oauthFacebook={oauthFacebook}

                            userProfile={userProfile}   
                            logoutUser={logoutUser}
                             oauth={oauth}

                             resetMessage={resetMessage}
                             resetErrorSign={resetErrorSign}
                        />
                        <MenuCart cart={cart} />
                    </Container>

                </Navbar>
            </div>
        );
    }
}