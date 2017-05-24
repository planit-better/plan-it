/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadContractors } from '../../action';




class ContractorList extends Component {
  constructor(props) {

    super(props);

  }

   render() {

    return(

      <h1>Hello World</h1>
      )

   }

}

const mapStateToProps = (state) => {
  return {
    contractors : state.contractors
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadContractors: contractors =>{
      dispatch(loadContractors(contractors))
    }
  }
}

const ConnectedContractorListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ContractorList);



export default ConnectedContractorListApp;


