import React, {PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

class UserProfile extends PureComponent {
   
    render() { 
        var  {logoutUser}  = this.props;
        return  <ul className="user-profile-info">
        <li>
            <i className="fas fa-user-circle"></i><NavLink to='/user-profile'>Thông tin tài khoản</NavLink>
        </li>
        <li onClick={logoutUser}>
            <i className="fas fa-sign-out-alt"></i><span>Thoát</span>
        </li>
    </ul>;
    }
}
 
export default UserProfile;