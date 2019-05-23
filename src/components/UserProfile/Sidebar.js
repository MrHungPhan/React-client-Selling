import React, { PureComponent } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'

import SidebarItem from './SidebarItem'

class SidebarUser extends PureComponent {
    state = {}
    render() {
        var { userProfile } = this.props;
        console.log(userProfile)
        return <div>
            <Nav vertical>
                 <NavItem className="sidebar-user">               
                    <img className="s-user-img" src={userProfile.image} />
                    <p className="s-user-name">{userProfile.display_name}</p>
                </NavItem>
            </Nav>
            <div>
                 <p className="sidebar-title">Quản lí giao dịch</p>
            <Nav vertical>
                <SidebarItem to='/order' 
                    classI='far fa-folder-open'
                    content='Đơn hàng'
                />
                 <SidebarItem to='/address-order' 
                    classI='fas fa-map-marker-alt'
                    content='Địa chỉ nhận hàng'
                />
                <SidebarItem to='/favorate' 
                    classI='far fa-heart'
                    content='Sản phẩm yêu thích'
                />
            </Nav>
            <p className="sidebar-title">Quản lí tài khoản</p>
            <Nav vertical>
                <SidebarItem to='/user-profile' 
                        classI='far fa-edit'
                        content='Thông tin tài khoản'
                    />
                <SidebarItem to='/user-message' 
                        classI='far fa-envelope'
                        content='Hộp thư đến'
                    />
               <SidebarItem to='/user-comment' 
                        classI='fa-comments'
                        content='Hỏi đáp'
                    />
            </Nav>
            </div>
           
        </div>;
    }
}

export default SidebarUser