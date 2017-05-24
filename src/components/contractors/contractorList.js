/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadContractors } from '../../action';




class ContractorList extends Component {
  constructor(props) {

    super(props);

  }



   render() {
    console.log(this.props.contractors[0])

    return(
      <div>
      <h1>Hello Contractors</h1>
      <h2>{this.props.contractors[0].company_name}</h2>

      </div>
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


