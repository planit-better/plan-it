import {
  LOAD_MENU
} from '../action';

const initialState = [];

const menu = (state = initialState, action) =>{  switch(action.type){
    case LOAD_MENU:
      return [...action.menu];

      default: return state;
  }
};


export default menu;