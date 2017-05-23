import {
  LOAD_TASK
} from '../action';

const initialState = [];

const task = (state = initialState, action) =>{  switch(action.type){
    case LOAD_TASK:
      return [...action.task];

      default: return state;
  }
};


export default task;