import {
  LOAD_GUEST
} from '../action';

const initialState = [];

const guest = (state = initialState, action) =>{  switch(action.type){
    case LOAD_GUEST:
      return [...action.guest];

      default: return state;
  }
};


export default guest;