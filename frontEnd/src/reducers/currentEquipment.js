/*jshint esversion: 6*/

import {
  LOAD_CURRENT_EQUIPMENT
} from '../action';

const initialState = {
  currentEquipment: {
    id: "",
    name : "",
    cost : "",
    type : "",
  }
};

const equipment = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_CURRENT_EQUIPMENT:
      return Object.assign({}, state, {
        currentEquipment : action.currentEquipment
      });

      default: return state;
  }
};


export default equipment;


