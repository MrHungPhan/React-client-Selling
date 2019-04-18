import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'

import { NavLink } from 'react-router-dom';
import change_alias from '../../utils/convertLink'

class SubMenu extends PureComponent {
    
    render() {
        var { subMenu, isShowSubMenu, keyShow, indexParent, parentTo } = this.props;
        return (
            <ul className={classnames('sub-menu', {"is-over" : isShowSubMenu && keyShow === indexParent })}>
                <li className="sub-menu-item">
                                {
                                    subMenu.map((item) => {
                                        return <NavLink key={item.id} to={`/${parentTo}/${change_alias(item.name)}`}>
                                { item.name }
                                </NavLink>
                                    })
                                }      
                </li>
            </ul>
           
        );
    }
}

SubMenu.propTypes = {

};

export default SubMenu;