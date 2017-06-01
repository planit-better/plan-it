import {
  LOAD_USER
} from '../action';

const initialState = [];

const user = (state = initialState, action) =>{  switch(action.type){
    case LOAD_USER:
    console.log(action)
      return [...action.user];

      default: return state;
  }
};


export default user;