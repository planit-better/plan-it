/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadContractors } from '../action';




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



   render() {
    let allowedContractors = []
    for(var i=0; i<this.props.contractors.length; i++){
      if(this.props.contractors[i].event_id === this.props.eventStatus.currentEvent.id){
        allowedContractors.push(this.props.contractors[i])
      }
    }
    return(
      <div>

      <h1>Hello Contractors</h1>
      <ul>
        {
          allowedContractors.map((name) =>
            <li className="contractors" key={name.id}><h3>{name.company_name}</h3></li>
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
    }
  }
}

const ConnectedContractorListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ContractorList);



export default ConnectedContractorListApp;
