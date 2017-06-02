/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadContractors, loadCurrentContractor } from '../action';
import { Link } from 'react-router-dom';




class ContractorList extends Component {
  constructor(props) {

    super(props);

  }

  componentWillMount() {
    fetch('/api/Contractors', {
      method: "GET",
      credentials : 'include'
    }).then((response) =>{
      return response.json()
    }).then((contractors) =>{
      this.props.loadContractors(contractors)
    }).catch(err =>{
      throw err;
    })
  }

  contractorRef( contractors ) {
    this.props.loadCurrentContractor( contractors )
  }

   render() {
    let allowedContractors = []
    for(var i=0; i<this.props.contractors.length; i++){
      if(this.props.contractors[i].event_id === this.props.eventStatus.currentEvent.id){
        allowedContractors.push(this.props.contractors[i])
      }
    }
    return(
      <div className="field">

      <h1 className="label guestList">All Contractors</h1>
      <ul>
        {
          allowedContractors.map((contractorName) =>
            <Link to="/contractorProfile" key={contractorName.id}>
              <li className="contractors"  onClick={this.contractorRef.bind(this, contractorName)}>
                <h3>{contractorName.company_name}</h3>
              </li>
            </Link>
            )
        }

      </ul>

      </div>
      )

   }

}

const mapStateToProps = (state) => {
  return {
    contractors : state.contractors,
    eventStatus : state.eventStatus
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadContractors: contractors =>{
      dispatch(loadContractors(contractors))
    },
    loadCurrentContractor : contractor =>{
      dispatch(loadCurrentContractor(contractor))
    }
  }
}

const ConnectedContractorListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ContractorList);



export default ConnectedContractorListApp;
