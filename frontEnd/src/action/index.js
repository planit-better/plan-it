/*jshint esversion: 6*/

export const LOAD_CONTRACTORS = 'LOAD_CONTRACTORS';
export const LOAD_EQUIPMENT = 'LOAD_EQUIPMENT';
export const LOAD_GUEST = 'LOAD_GUEST';
export const LOAD_MENU = 'LOAD_MENU';
export const LOAD_TASK = 'LOAD_TASK';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_EVENT = 'LOAD_EVENT';
export const LOAD_CURRENT_GUEST = 'LOAD_CURRENT_GUEST';
export const LOAD_CURRENT_CONTRACTOR = 'LOAD_CURRENT_CONTRACTOR';
export const LOAD_BUDGET = 'LOAD_BUDGET';
export const LOAD_CURRENT_TASK = 'LOAD_CURRENT_TASK';
export const LOAD_CURRENT_MENU = 'LOAD_CURRENT_MENU';
export const LOAD_CURRENT_EQUIPMENT = 'LOAD_CURRENT_EQUIPMENT';

export const AUTH_USER = 'AUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const LOAD_OWNED_EVENT = 'LOAD_OWNED_EVENT';
export const CLEAR_EVENT = "CLEAR_EVENT";

export const ADD_USER_REDUX = 'ADD_USER_REDUX';




export const loadContractors = contractors =>{
  return {
    type : LOAD_CONTRACTORS,
    contractors
  };
};

export const loadEquipment = equipment =>{
  return {
    type : LOAD_EQUIPMENT,
    equipment
  };
};

export const loadGuest = guest => {
  return {
    type : LOAD_GUEST,
    guest
  };
};

export const loadMenu = menu => {
  return {
    type : LOAD_MENU,
    menu
  };
};

export const loadTask = task => {
  return {
    type : LOAD_TASK,
    task
  };
};

export const loadUser = user => {
  return {
    type : LOAD_USER,
    user
  };
};

export const authUser = currentUser => {
  return {
    type : AUTH_USER,
    currentUser
  };
};

export const logOut = currentUser => {
  return {
    type : LOGOUT_USER,
    currentUser
  };
};

export const loadEvent = currentEvent => {
  return {
    type : LOAD_EVENT,
    currentEvent
  };
};

export const loadOwnedEvent = ownedEvent => {
  return {
    type : LOAD_OWNED_EVENT,
    ownedEvent
  };
};

export const clearEvent = currentEvent => {
  return {
    type : CLEAR_EVENT,
    currentEvent
  };
};

export const loadCurrentGuest = currentGuest => {
  return {
    type : LOAD_CURRENT_GUEST,
    currentGuest
  };
};

export const loadCurrentContractor = currentContractor => {
  return {
    type : LOAD_CURRENT_CONTRACTOR,
    currentContractor
  };
};

export const loadCurrentTask = currentTask => {
  return {
    type : LOAD_CURRENT_TASK,
    currentTask
  };
};

export const loadBudget = budgetTotals => {
  return{
    type : LOAD_BUDGET,
    budgetTotals
  };
};

export const loadCurrentMenu = currentMenu => {
  return{
    type : LOAD_CURRENT_MENU,
    currentMenu
  };
};

export const loadCurrentEquipment = currentEquipment => {
  return{
    type : LOAD_CURRENT_EQUIPMENT,
    currentEquipment
  };
};

