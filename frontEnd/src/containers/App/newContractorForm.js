/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadContractors } from '../../action';
import ContractorList from '../../components/contractorList';

class newContractorForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      company_name : "",
      cost : 0,
      contact : "",
      date_hired : "",
      deadline : "",
      event_id : this.props.eventStatus.currentEvent.id,
      formOpen : false,
    };
  }

    handleContractorSubmit = ( event ) => {
      event.preventDefault();
      this.addContractor(this.state)
      .then(this.updateStore())
    }

    handleChangeComanyName = ( event ) => {
      this.setState({
        company_name : event.target.value
      });
    }

    handleChangeCost = ( event ) => {
      this.setState({
        cost : Number(event.target.value)
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
        return(response.json())
      }).then(data => {
        this.addContractorBudget(data.id)
      }).catch(err => {
        throw err;
      })
    }

   openForm = () => {
      this.setState({
        formOpen : !this.state.formOpen
      })
    }

    addContractorBudget = (id) => {
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
          "event_id": this.props.eventStatus.currentEvent.id,
          "type_id": id
        })
      }).then(response =>{
        this.clearState()
      }).catch(err =>{
        throw err;
      })
    }

    render() {
       if(this.props.currentUser.userLoggedIn === false){
          return(
            <Redirect to={{
              pathname : '/'
            }} />
            )
        }

      if(this.state.formOpen === true){

    return (
      <div className="App contractor">
        <div className="nav has-shadow contractorHome">
          <div className="nav-left">
            <div className="nav-item">
              <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
              <h1 className="title is-3">Planit-Better</h1>
            </div>

            <h3 className="menuEvent">{this.props.eventStatus.currentEvent.name}</h3>
          </div>

          <div className="nav-center">
            <div className="nav-item">
              <h3>{this.props.currentUser.username}</h3>
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-item">
              <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/">Home</Link></a>
              <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>Hide Contractor Form</a>
            </div>
          </div>
        </div>

        <br></br><br></br>

        <div className="columns">

          <div className="column">
          </div>
          <div className="list guestHome column is-4">
            <form className="column is-offset-4" onSubmit={this.handleContractorSubmit}>

              <label><h1>Enter your new contractor</h1></label>

              <div className="field">
                <p className="control">
                  <label className="label">Company Name</label>
                </p>
                <p className="control has-icons-left">
                  <input className="input" type="text" placeholder="Company Name" value={this.state.company_name} onChange={this.handleChangeComanyName} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-building"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Cost</label>
                </p>
                <p className="control has-icons-left">
                  <input className="input" type="integer" placeholder="cost" value={this.state.cost} onChange={this.handleChangeCost} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-usd"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Contact Number</label>
                </p>
                <p className="control has-icons-left">
                  <input className="input" type="integer" placeholder="contact number" value={this.state.contact} onChange={this.handleChangeContact} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-phone"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Hire Date</label>
                </p>
                <p className="control has-icons-left">
                  <input className="input" type="date" placeholder="Hire Date" value={this.state.date_hired} onChange={this.handleChangeDateHired} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-calendar-plus-o"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Deadline</label>
                </p>
                <p className="control has-icons-left">
                  <input className="input" type="date" value={this.state.deadline} onChange={this.handleChangeDeadline} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-calendar-times-o"></i>
                  </span>
                </p>
              </div>

              <div className="field control">
                <button className="button bottomButton is-outlined" name="Login" type="submit">Add Contractor </button>
              </div>

            </form>
          </div>

          <div className="column is-3">
          </div>

          <br></br><br></br>

            <div className="list column is-4">
              <ContractorList contractor={this.props.contractors}/>

            </div>

            <div className="column">
            </div>

          </div>
        </div>

    );
  } else {
    return(
      <div className="App contractor">
        <div className=" contractorHome nav has-shadow">
          <div className="nav-left">
            <div className="nav-item">
              <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
              <h1 className="title is-3">Planit-Better</h1>
            </div>

            <h3 className="menuEvent">{this.props.eventStatus.currentEvent.name}</h3>
          </div>

          <div className="nav-center">
            <div className="nav-item">
              <h3>{this.props.currentUser.username}</h3>
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-item">
              <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/">Home</Link></a>
              <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>New Contractor Form</a>
            </div>
          </div>
        </div>

        <br></br>
        <div className="columns">
          <div className="column">
          </div>

          <br></br><br></br>

          <div className="list column guestHome is-4">
            <ContractorList contractor={this.props.contractors}/>
          </div>
          <div className="column">
          </div>
        </div>
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
