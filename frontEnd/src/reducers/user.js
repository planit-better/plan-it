import {
  LOAD_USER
} from '../action';

const initialState = [];

const user = (state = initialState, action) =>{  switch(action.type){
    case LOAD_USER:
      return [...action.user];

      default: return state;
  }
};


export default user;