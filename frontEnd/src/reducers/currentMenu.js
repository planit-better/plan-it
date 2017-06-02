/*jshint esversion: 6*/

import {
  LOAD_CURRENT_MENU
} from '../action';

const initialState = {
  currentMenu: {
    id: "",
    type_of_food : "",
    cost_per_person : "",
    restaurant_name : ""
  }
};

const menu = (state = initialState, action) =>{
  console.log(action.currentMenu);
  switch(action.type){
    case LOAD_CURRENT_MENU:
      return Object.assign({}, state, {
        currentMenu : action.currentMenu
      });

      default: return state;
  }
};


export default menu;


