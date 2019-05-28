import React from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import ConvertLink from '../../utils/convertLink'

class NewMostItem extends React.PureComponent {
    render() { 
        const { newItem } = this.props;
        return <Col md="3">
                <Link to={`/tin-tuc/${ConvertLink(newItem.title)}-${newItem.id}`} >
                <div className='n-m-new'>
                    <div className='n-m-i-img'>
                        <img alt='' src={newItem.image} />
                    </div>
                    <div className='n-m-i-title'>
                        {newItem.title}
                    </div>
                    <div className="n-m-i-time">
                        {new Date(newItem.create_date).toLocaleString()}
                    </div>
                    </div>
                </Link>
             </Col>;
    }
}
 
export default NewMostItem;