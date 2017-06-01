/*jshint esversion: 6*/

import {
  LOAD_CURRENT_CONTRACTOR
} from '../action';

const initialState = {
  currentContractor: {
    id: null,
    company_name : "",
    cost : null,
    contact : null,
    date_hired : null,
    deadline : null
  }
};

const contractors = (state = initialState, action) =>{
  console.log(action.currentContractor);
  switch(action.type){
    case LOAD_CURRENT_CONTRACTOR:
      return Object.assign({}, state, {
        currentContractor : action.currentContractor
      });

      default: return state;
  }
};


export default contractors;


