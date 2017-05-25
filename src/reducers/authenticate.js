import {
  AUTH_USER
} from '../action';

const initialState = {
  username : "",
  userLoggedIn : false
};

const currentUser = (state = initialState, action) =>{
  switch(action.type){
    case AUTH_USER :
      console.log(action)
      console.log(state)
      return Object.assign({}, state, {

          username : action.currentUser.username,
          userLoggedIn : true

      })

      default: return state;
  }
};


export default currentUser;