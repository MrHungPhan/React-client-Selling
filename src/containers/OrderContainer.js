import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/ActionTypes'

import Order from '../pages/UserProflePage/Order'

class OrderHistory extends React.PureComponent {
    state = {  }

    componentDidMount(){
        this.props.getOrderHistory()
    }

    render() { 
        return <Order 
            orders = {this.props.orders}
        />;
    }
}

const mapStateToProps = state => {
    return {
        orders : state.orders
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        getOrderHistory : () => {
            dispatch(actions.getOrderHistory())
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);