
export const LOAD_CONTRACTORS = 'LOAD_CONTRACTORS';
export const LOAD_EQUIPMENT = 'LOAD_EQUIPMENT';
export const LOAD_GUEST = 'LOAD_GUEST';

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