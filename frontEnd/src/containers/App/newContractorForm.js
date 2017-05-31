/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      event_id : this.props.eventStatus.currentEvent.id,
      formOpen : false
    };
  }

    handleContractorSubmit = ( event ) => {
      event.preventDefault();
      this.addContractor(this.state)
      .then(this.clearState())
      .then(this.updateStore())
      .then(this.addContractorBudget())

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

   openForm = () => {
      this.setState({
        formOpen : !this.state.formOpen
      })
    }

    addContractorBudget(){
      return fetch('/api/budget', {
        method: "POST",
        credentials: 'include',
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "type": "Contractor",
          "amount": this.state.cost,
          "event_id": this.props.eventStatus.currentEvent.id
        })
      }).then(response =>{
        return response
      }).catch(err =>{
        throw err;
      })
    }

    render() {
      if(this.state.formOpen === true){

    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <h3>{this.props.eventStatus.currentEvent.name}</h3>
          <h3>{this.props.currentUser.username}</h3>
          <div id="navBar">
            <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
            <button className="button is-outlined is-small" onClick={this.openForm}>Hide Contractor Form</button>
          </div>
        </div>

          <form onSubmit={this.handleContractorSubmit}>
            <div className="field">
            <label className="label">Company Name</label>
            <p className="has-icons-left">

              <input type="text" placeholder="Company Name" value={this.state.company_name} onChange={this.handleChangeComanyName} />
              <span className="icon is-small is-left">
                <i className="fa fa-building"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <label className="label">Cost</label>
            <p className="has-icons-left">
              <input type="integer" placeholder="cost" value={this.state.cost} onChange={this.handleChangeCost} />
              <span className="icon is-small is-left">
                <i className="fa fa-usd"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <label className="label">Contact Number</label>
            <p className="has-icons-left">
              <input type="integer" placeholder="contact number" value={this.state.contact} onChange={this.handleChangeContact} />
              <span className="icon is-small is-left">
                <i className="fa fa-phone"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <label className="label">Hire Date</label>
            <p className="has-icons-left">
              <input type="date" placeholder="Hire Date" value={this.state.date_hired} onChange={this.handleChangeDateHired} />
              <span className="icon is-small is-left">
                <i className="fa fa-calendar-plus-o"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <label className="label">Deadline</label>
            <p className="has-icons-left">
              <input type="date" value={this.state.deadline} onChange={this.handleChangeDeadline} />
              <span className="icon is-small is-left">
                <i className="fa fa-calendar-times-o"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <button className="button bottomButton is-outlined" name="Login" type="submit">Add Contractor </button>
          </div>

        </form>

        <ContractorList contractor={this.props.contractors}/>
      </div>
    );
  } else {
    return(
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <h3>{this.props.eventStatus.currentEvent.name}</h3>
          <h3>{this.props.currentUser.username}</h3>
          <div id="navBar">
            <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
            <button className="button is-outlined is-small" onClick={this.openForm}>New Contractor Form</button>
          </div>
        </div>

        <ContractorList contractor={this.props.contractors}/>

      </div>

        )
    }
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
