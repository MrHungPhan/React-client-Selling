import React from 'react';
import { Row, Container, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import ConvertLink from '../../utils/convertLink';
import NewMostItem from '../../components/NewsPage/NewMostItem';
import NewsItem from '../../components/NewsPage/NewItem'
import './news.css'

class NewPage extends React.Component {
    state = {}
    render() {
        const { posts } = this.props;
        var newPost = posts.slice(0, 4);
        console.log(posts)
        return <div>
            <Container>
                <div className='new-most'>
                    <div className="n-m-title">
                        Tin mới nhất
                </div>
                    <div className='n-m-content'>
                        <Row>
                            {
                                posts.length !== 0 && newPost.map(item => <NewMostItem
                                    key={item.id}
                                    newItem={item} />
                                )
                            }
                        </Row>
                    </div>

                </div>
                <div className='news-body'>
                    <Row>
                        <Col md="9">
                            <div className="n-m-title">
                                Tin tức
                            </div>
                            <div className="news-content">
                                <Row>
                                    {
                                        posts.length !== 0 && posts.map(item =>
                                            <NewsItem key={item.id} newItem={item} />
                                        )
                                    }

                                </Row>

                            </div>
                        </Col>
                        <Col md='3'>
                            <div className="new-products">

                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>

        </div>;
    }
}

export default NewPage;