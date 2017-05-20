
export const LOAD_CONTRACTORS = 'LOAD_CONTRACTORS';

export const loadContractors = contractors =>{

  return {
    type : LOAD_CONTRACTORS,
    contractors
  };
};