import {
  LOAD_EQUIPMENT
} from '../action';

const initialState = [];

const equipment = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_EQUIPMENT:
      return [...action.equipment];

      default: return state;
  }
};


export default equipment;