import {
  LOAD_CONTRACTORS
} from '../action';

const initialState = [];

const contractors = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_CONTRACTORS:
      return [...action.contractors];

      default: return state;
  }
};


export default contractors;