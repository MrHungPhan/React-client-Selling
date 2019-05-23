import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';

import Sidebar from '../../components/UserProfile/Sidebar';
import UserProfile from '../../containers/UserProfileContainer';
import OrderContainer from '../../containers/OrderContainer'

const cookie = new Cookies();

const routes = [
    {
        path : '/user-profile',
        exact : true,
        main : () => <UserProfile />
    },
    {
        path : '/order',
        exact : true,
        main: () => <OrderContainer />
    }
]

class Index extends React.PureComponent{
    render() {
        const token = cookie.get('token');
        if(token && this.props.user) 
                return   <Container id="userprofile-page">
                            <Row>
                                <Col md="2" className="profile-left">
                                    <Sidebar userProfile={this.props.user} />
                                </Col>
                                <Col md="10" className="profile-right" >
                                    {
                                        routes.map((route, index) => {
                                            return <Route 
                                                key={index}
                                                path={route.path}
                                                exact={route.exact}
                                                component={route.main}
                                            />
                                        })
                                    }
                                </Col>
                            </Row>
                        </Container>
            else 
                return <Redirect to="/" />
        }
}

const mapStateToProps = state => {
    return {
        user : state.userProfile
    }
}

export default connect(mapStateToProps, null)(Index);