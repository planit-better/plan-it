/*jshint esversion: 6*/

import {
  LOAD_BUDGET
} from '../action';

const initialState = {
  budgetTotal: {
    menu: 0,
    task : 0,
    contractor : 0,
    equipment : 0,
  }
};

const budget = (state = initialState, action) =>{
  console.log(action.budgetTotals);
  switch(action.type){
    case LOAD_BUDGET:
    let budgetHolder = {
        menu: 0,
        task : 0,
        contractor : 0,
        equipment : 0
    };
      for(var i=0; i<action.budgetTotals.length; i++){
        if(action.budgetTotals[i].type === 'Menu'){
          budgetHolder.menu += action.budgetTotals[i].amount;
        }
        else if(action.budgetTotals[i].type === 'Task'){
          budgetHolder.task += action.budgetTotals[i].amount;
        }
        else if(action.budgetTotals[i].type === 'Contractor'){
          budgetHolder.contractor += action.budgetTotals[i].amount;
        }
        else if(action.budgetTotals[i].type === 'Equipment'){
          budgetHolder.equipment += action.budgetTotals[i].amount;
        }
      }
      return Object.assign({}, state, {
        budgetTotal : budgetHolder
      });

      default: return state;
  }
};


export default budget;

