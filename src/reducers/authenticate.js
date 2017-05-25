import {
  AUTH_USER,
  LOGOUT_USER
} from '../action';

const initialState = {
  username : "",
  userLoggedIn : false
};

const currentUser = (state = initialState, action) =>{
  switch(action.type){
    case AUTH_USER :
      return Object.assign({}, state, {

          username : action.currentUser.username,
          userLoggedIn : true

      })

    case LOGOUT_USER :
      return Object.assign({}, state, {
          username : "",
          userLoggedIn : false
      })

      default: return state;
  }
};


export default currentUser;