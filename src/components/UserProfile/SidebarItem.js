import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import './UserProfile.css';

class SidebarItem extends React.PureComponent {
    state = {  }
    render() { 
        var { to, classI, content} =this.props
        return <NavItem>
        <NavLink className="nav-link" to={to}>
         <i className={classI}></i>
        {content}</NavLink>
    </NavItem>;
    }
}
 
export default SidebarItem;