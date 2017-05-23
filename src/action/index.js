
export const LOAD_CONTRACTORS = 'LOAD_CONTRACTORS';
export const LOAD_EQUIPMENT = 'LOAD_EQUIPMENT';

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