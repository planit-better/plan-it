import {
  LOAD_EVENT
} from '../action';

const initialState = [];

const currentEvent = (state = initialState, action) =>{  switch(action.type){
    case LOAD_EVENT:
      return [...action.currentEvent];

      default: return state;
  }
};


export default currentEvent;