/*jshint esversion: 6*/

import {
  LOAD_CURRENT_TASK
} from '../action';

const initialState = {
  currentTask: {
    id: null,
    name : "",
    type : "",
    cost : null,
    deadline : null,
    complete : false
  }
};

const tasks = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_CURRENT_TASK:
      return Object.assign({}, state, {
        currentTask : action.currentTask
      });

      default: return state;
  }
};


export default tasks;


