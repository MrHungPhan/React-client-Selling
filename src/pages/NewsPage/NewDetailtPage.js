import React from 'react';
import { Row, Container, Col} from 'reactstrap';

import './newsDetailt.css'

class NewDetailtPage extends React.PureComponent{

    componentWillReceiveProps(nextProps){
        const { post } = nextProps;
        if(post){
            console.log(post)
            document.getElementById('content-news').innerHTML = post.content
        }
             
    }

    render(){
        const { post } = this.props;
        return <div>
            <Container>
                <Row>
                    <Col md="9">
                        <div className="news-detailt">
                             <h4>
                            {post.title}
                            </h4>
                            <div className="time-news">
                               Time: { new Date(post.create_date).toLocaleString() }
                            </div>
                            <div className="sumary-news">
                                { post.sumary }
                            </div>
                            <div id="content-news">
                            </div>
                            <div className="auth-news"> Theo {post.create_by} </div>
                        </div>
                       
                        
                    </Col>
                    <Col md="3">

                    </Col>
                </Row>
            </Container>
        </div>
    }
}

export default NewDetailtPage;