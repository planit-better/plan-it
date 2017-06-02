/*jshint esversion: 6*/

import {
  LOAD_BUDGET
} from '../action';


const initialState = [];

const budget = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_BUDGET:
      return [...action.budgetTotals];

      default: return state;
  }
};


export default budget;