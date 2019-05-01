import React from 'react';
import lodash from 'lodash';
import formatMoney from '../../utils/formatMoney'

class FormOrder extends React.PureComponent {
    state = {  }

    onChange = () => {
        
    }

    render() { 
        var { product } = this.props
        var productInfo = product.product;
        const { size, color } = product
        return   <div className="c-order-item">
            <div className="o-item-style">
                <div className="o-item o-name">{productInfo.name}</div>
                {
                    !lodash.isEqual(color, {}) ? <div className="o-item o-color">
                    <span>Màu sắc</span>
                    <img src={color.src_image} />
                    </div> : ''
                }
                
                {
                     !lodash.isEqual(size, {}) ? <div className="o-item o-size">
                     <span>Kích thước</span>
                     <div>{size.name}</div>
                     </div> : ''
                }
                
                <div className="o-item o-quantity">
                    <span>Số lượng</span>
                    <input 
                        className="text-center"
                        disabled
                        value={product.quantity} 
                        onChange={this.onChange}
                        type="number" />
                </div>
            </div>
            <div className="o-item-info">
                <div className="o-img"><img src={productInfo.image} /></div>
                <div className="o-price">{formatMoney(productInfo.price)}</div>
            </div>
    </div>;
    }
}
 
export default FormOrder;