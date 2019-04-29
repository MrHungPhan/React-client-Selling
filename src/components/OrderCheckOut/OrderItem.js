import React from 'react'

class FormOrder extends React.PureComponent {
    state = {  }
    render() { 
        return   <div className="c-order-item">
            <div className="o-item-style">
                <div className="o-item o-name">áo thun tay dài cổ tròn nam facioshop w01-6xl</div>
                <div className="o-item o-color"><span>Màu sắc</span><img src="https://h2tshop.com/media/product/2543_7e93ae981c4efe10a75f.jpg" /></div>
                <div className="o-item o-size"><span>Kích thước</span><div>XL</div></div>
                <div className="o-item o-quantity"><span>Số lượng</span><input value="1" type="number" /></div>
            </div>
            <div className="o-item-info">
                <div className="o-img"><img src="https://h2tshop.com/media/product/2543_7e93ae981c4efe10a75f.jpg" /></div>
                <div className="o-price">123.0000đ</div>
            </div>
    </div>;
    }
}
 
export default FormOrder;