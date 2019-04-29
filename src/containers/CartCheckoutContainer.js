import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import apiTransport from '../utils/apitTransport';
import * as actions from '../actions/ActionTypes'

import CartCheckoutPage from '../pages/CartCheckOutPage/CartCheckOutPage'

class CartCheckoutContainer extends PureComponent {

     componentWillMount(){
        this.props.getDistricts()
    }

    componentDidMount(){
        const { match } = this.props;
        if(match.path === "/cart/checkout"){
            document.body.classList.add('selling-cart')
        }
    }

    render() {
        var { districts }= this.props.info
        return <CartCheckoutPage 
            districts={districts}
        />;
    }
}

const mapStateToProps = (state) => {
    return {
        info : state.info
    }
}

const mapDispatchToProps = ( dispatch, props) => {
    return {
        getDistricts : () =>{
             dispatch(actions.getDistricts())
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CartCheckoutContainer);