import React, { PureComponent } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Element} from 'react-scroll';

export default class SessionProducts extends PureComponent {

    render() {
        var { id } = this.props;
        return (
            <Element name ={id}>
                 <section className="main-col" id={id}>
                <div className="b-style">
                
                    <Container>
                        <Row className="r-product">          
                                {/* Product Item */}
                                {
                                    this.props.children
                                }                  
                        </Row>
                    </Container>
                </div>
            </section>
            </Element>
           

        )
    }
}
