import {
  LOAD_OWNED_EVENT
} from '../action';

const initialState = {
  currentEvent: ""
};

const ownedEvent = (state = initialState, action) =>{
  console.log(action)
  switch(action.type){
    case LOAD_OWNED_EVENT:
      return Object.assign({}, state, {
        currentEvent : action.ownedEvent
      });

      default: return state;
  }
};


export default ownedEvent;