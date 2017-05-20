import {
  LOAD_CONTRACTORS
} from '../action';

const initialState = {
  contractors : []
};

const contractors = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_CONTRACTORS:
      return Object.assign({}, state, {
        contractors: action.contractors
      });

      default: return state;
  }
};

export default contractors;
