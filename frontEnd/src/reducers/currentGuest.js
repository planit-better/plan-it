/*jshint esversion: 6*/

import {
  LOAD_CURRENT_GUEST,
  UPDATE_CURRENT_GUEST
} from '../action';

const initialState = {
  currentGuest: {
    id: "",
    name : "",
    number : "",
    email : "",
    will_attend : false,
    can_drink : false,
    accompanying_guests : "",
    diet_restriction : ""
  }
};

const guest = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_CURRENT_GUEST:
      return Object.assign({}, state, {
        currentGuest : action.currentGuest
      });
    case UPDATE_CURRENT_GUEST:
      return Object.assign({}, state, {
        currentGuest : action.currentGUest
      });

      default: return state;
  }
};


export default guest;


