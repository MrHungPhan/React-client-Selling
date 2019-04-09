import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {  NavLink } from "react-router-dom";
import { NavItem } from 'reactstrap'
import SubMenu from './SubMenu';

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowSubMenu : false,
      keyShow : null
    }
  }

  isOverMenu = (index) => {
    this.setState({
      ...this.state, isShowSubMenu : true, keyShow : index
    })
  }

  isLeaveMenu = () => { 
    this.setState({
      ...this.state, isShowSubMenu : false, keyShow : null
    })
  }

  render() {
    var { name, to, index, exact, subMenu } = this.props;
    var { keyShow, isShowSubMenu } = this.state;
    return (
      <NavItem
          onMouseLeave = {this.isLeaveMenu}
          onMouseOver={() => this.isOverMenu(index)}
      >
        <NavLink  
           className="nav-link" 
           exact={exact} 
           to={`/${to}`}>{name}</NavLink>     
            {/* Sub Menu */}  
            {
              subMenu !== undefined  && <SubMenu 
                                            subMenu = {subMenu}
                                            parentTo = {to}
                                            keyShow = {keyShow}
                                            indexParent =  {index}
                                            isShowSubMenu = {isShowSubMenu}
                                            />
            }
      </NavItem>
    );
  }
}



MenuItem.propTypes = {

};

export default MenuItem;