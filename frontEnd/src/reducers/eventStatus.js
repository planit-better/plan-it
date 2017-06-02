import {
  LOAD_OWNED_EVENT,
  CLEAR_EVENT

} from '../action';

const initialState = {
  currentEvent: ""
};

const ownedEvent = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_OWNED_EVENT:
      return Object.assign({}, state, {
        currentEvent : action.ownedEvent
      });

    case CLEAR_EVENT :
      return Object.assign({}, state, {
        currentEvent : ""
      });

      default: return state;
  }
};


export default ownedEvent;









