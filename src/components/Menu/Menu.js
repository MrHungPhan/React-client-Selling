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
import OauthModal from './OauthModal';


export default class Example extends React.Component {
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
            if (window.scrollY > 0) {
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
    
                        <OauthModal 
                            userProfile ={this.props.userProfile}
                             onSignIn = {this.props.onSignIn}
                             oauthGoogle = {this.props.oauthGoogle}
                             errorMessage={this.props.errorMessage}
                             logoutUser = {this.props.logoutUser}
                             />    
                        <MenuCart />
                    </Container>

                </Navbar>
            </div>
        );
    }
}