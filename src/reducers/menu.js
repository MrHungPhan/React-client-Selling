import * as types from '../const/index';

var menus = [];

const myReducer = (state = menus, action) => {
    switch(action.type){
        case types.FECTCH_MENU: 
            return [...action.menus]
        default : return [...state]
    }
}

export default myReducer;