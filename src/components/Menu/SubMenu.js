import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'

import { NavLink } from 'react-router-dom';
import change_alias from '../../utils/convertLink'

class SubMenu extends PureComponent {

    showSubMenu = (subMenu, limit, parentTo) => {
        var resuilt = [];
        let column = Math.ceil(subMenu.length / limit);
        for(let i = 1; i<= column; i++){
            let start = (i-1)*limit;
            let subMenuItem = subMenu.slice(start, start+limit)
            resuilt.push(
                <li className="sub-menu-item">
                    {
                        subMenuItem.map((item) => {
                            return <NavLink key={item.id} to={`/${parentTo}/${change_alias(item.name)}`}>
                    { item.name }
                    </NavLink>
                        })
                    }      
             </li>
            )
        }
        return resuilt;
    }
    
    render() {
        var { subMenu, isShowSubMenu, keyShow, indexParent, parentTo } = this.props;
        return (
            <ul className={classnames('sub-menu', {"is-over" : isShowSubMenu && keyShow === indexParent })}>
                <div>
                    { this.showSubMenu(subMenu, 5, parentTo)}
                </div>
            </ul>
           
        );
    }
}

SubMenu.propTypes = {

};

export default SubMenu;