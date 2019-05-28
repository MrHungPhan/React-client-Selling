import React from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import ConvertLink from '../../utils/convertLink'

class NewsItem extends React.PureComponent {
    render() {
        const { newItem } = this.props;
        return <Col md='6' key={newItem.id}>
            <Link to={`/tin-tuc/${ConvertLink(newItem.title)}-${newItem.id}`}>
                <div className='n-c-item'>
                    <div className='n-c-title'>
                        {newItem.title}
                    </div>
                    <div className='n-c-body'>
                        <div className='n-c-b-img'>
                            <img alt=''
                                src={newItem.image} />
                        </div>
                        <div className='n-c-b-sumary'>
                            {newItem.sumary}
                            <div className='n-c-b-time'>{new Date(newItem.create_date).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </Col>
    }
}

export default NewsItem;