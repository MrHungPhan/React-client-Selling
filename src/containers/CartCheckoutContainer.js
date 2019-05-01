import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiTransport from '../utils/apitTransport';
import * as actions from '../actions/ActionTypes'

import CartCheckoutPage from '../pages/CartCheckOutPage/CartCheckOutPage'

class CartCheckoutContainer extends PureComponent {

     componentWillMount(){
        this.props.getDistricts();
        this.props.getCart()
    }

    componentDidMount(){
        const { match } = this.props;
        if(match.path === "/cart/checkout"){
            document.body.classList.add('selling-cart')
        }
    }

    getWards = (districtId) => {
        this.props.getWards(districtId)
    }

    getServices = (toDistrictId) => {
        this.props.getServices(toDistrictId)
    }

    onSubmit = (values) => {
        console.log(values)
        this.props.checkoutOrder(values)
    }

    render() {
        var { info, cart } = this.props;
        var { districts, wards, services }= info
        if(cart.length === 0){
            return <Redirect to ='/cart' />
        }else{
              return <CartCheckoutPage 
                districts={districts}
                wards={wards}
                cart = {cart}
                services={services}

                getWards={this.getWards}
                getServices={this.getServices}
                onSubmit={this.onSubmit}
            />;
        }
      
    }   
}

const mapStateToProps = (state) => {
    const { info, cart } = state
    return {
        info,
        cart
    }
}

const mapDispatchToProps = ( dispatch, props) => {
    return {
        getDistricts : () =>{
             dispatch(actions.getDistricts())
        },

        getWards : (districtId) => {
            dispatch(actions.getWards(districtId))
        },

        getServices : (toDistrictId) => {
            dispatch(actions.getServices(toDistrictId))
        },

        getCart : () => {
            dispatch(actions.fetchGetCart())
        },

        checkoutOrder : (values) => {
            dispatch(actions.checkoutOrder(values))
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CartCheckoutContainer);