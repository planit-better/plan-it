/*jshint esversion: 6*/
import { loadContractors } from '../../../../action';


export const getAllContractors = () => {
  console.log('hit get all contractors');

     fetch('/api/Contractors', {
      method: "GET"
    }).then((response) =>{
      return response.json();
    });
};