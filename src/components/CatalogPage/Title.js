import React from "react";
import { Container } from 'reactstrap';

import Path from './Path';
import Filter from './Filter';
import './Filter.css'

class Title extends React.PureComponent {
    state = {  }
    render() { 
        const { path, filterProducts, pathFirst } = this.props;
        return   <div>
        <Container>
            <div className="catalog-title"> 
                <Path pathFirst={pathFirst} path={path}/>
                <Filter filterProducts={filterProducts}/>
            </div>
        </Container>
        </div>;
    }
}
 
export default Title;