/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadContractors } from '../../action';
import ContractorList from '../../components/contractorList';

class newContractorForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      company_name : "",
      cost : "",
      contact : "",
      date_hired : "",
      deadline : "",
      event_id : this.props.eventStatus.currentEvent.id
    };
  }

    handleContractorSubmit = ( event ) => {
      event.preventDefault();
      this.addContractor(this.state)
      .then(this.clearState())
      .then(this.updateStore())

    }

    handleChangeComanyName = ( event ) => {
      this.setState({
        company_name : event.target.value
      });
    }

    handleChangeCost = ( event ) => {
      this.setState({
        cost : event.target.value
      });
    }

    handleChangeContact = ( event ) => {
      this.setState({
        contact : event.target.value
      });
    }

    handleChangeDateHired = ( event ) => {
      this.setState({
        date_hired : event.target.value
      });
    }

    handleChangeDeadline = ( event ) => {
      this.setState({
        deadline : event.target.value
      });
    }

    clearState(){
      this.setState({
      company_name : "",
      cost : "",
      contact : "",
      date_hired : "",
      deadline : ""


      });
    }

    updateStore(){
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


    addContractor(contractor){
      return fetch('/api/contractors',{
        method: "POST",
         credentials : 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(contractor)
      }).then(response =>{
        return(response)
      }).catch(err => {
        throw err;
      })
    }

    render() {
      console.log(this.props.eventStatus)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <h3>{this.props.eventStatus.currentEvent.name}</h3>
          <h3>{this.props.currentUser.username}</h3>
        </div>
        <div id="navBar">
        <Link to="/"><button>Home</button></Link>
        </div>
          <form onSubmit={this.handleContractorSubmit}>
            <div>
             <span>Company Name</span>
              <input type="text" placeholder="Company Name" value={this.state.company_name} onChange={this.handleChangeComanyName} />
            </div>
            <div>
            <span>Cost</span>
              <input type="integer" placeholder="cost" value={this.state.cost} onChange={this.handleChangeCost} />
            </div>
            <div>
              <span>Contact Number</span>
              <input type="integer" placeholder="contact number" value={this.state.contact} onChange={this.handleChangeContact} />
            </div>
            <div>
            <span>Hire Date</span>
              <input type="date" placeholder="Hire Date" value={this.state.date_hired} onChange={this.handleChangeDateHired} />
            </div>
            <div>
            <span>Deadline</span>
              <input type="date" value={this.state.deadline} onChange={this.handleChangeDeadline} />
            </div>
            <div>
              <button name="Login" type="submit">Add Contractor </button>
            </div>
          </form>
          <ContractorList contractor={this.props.contractors}/>


      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    contractors : state.contractors,
    currentUser : state.authenticate,
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

const ConnectedContractorApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(newContractorForm);



export default ConnectedContractorApp;

