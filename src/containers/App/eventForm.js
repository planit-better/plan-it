/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { logOut, loadEvent, loadOwnedEvent, clearEvent } from '../../action';



class EventForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      name : "",
      location_name : "",
      location_address : "",
      event_date : "",
      event_time : "",
      openForm : false
    }


  }


    handleEventSubmit = ( event ) => {
      event.preventDefault();
      console.log(this.state)
      this.addEvent(this.state)
      .then(this.props.loadOwnedEvent(this.state.name))
      .then(this.updateStore())
      .then(this.clearState())

    }

    handleChangeName = ( event ) => {
      this.setState({
        name : event.target.value
      });
    }

    handleChangelocationName = ( event ) => {
      this.setState({
        location_name : event.target.value
      });
    }

    handleChangelocationAddress = ( event ) => {
      this.setState({
        location_address : event.target.value
      });
    }

    handleChangeEventDate = ( event ) => {
      this.setState({
        event_date : event.target.value
      });
    }

    handleChangeEventTime = ( event ) => {
      this.setState({
        event_time : event.target.value
      });
    }




  addEvent(newEvent){
      return fetch('/api/event',{
        method: "POST",
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newEvent)
      }).then(response =>{
        return(response)
      }).catch(err => {
        throw err;
      })
    }


  updateStore(){
      fetch('/api/event', {
      method: "GET"
    }).then((response) =>{
      return response.json()
    }).then((newEvent) =>{
      this.props.loadEvent(newEvent)
    }).catch(err =>{
      throw err;
    })
  }


  clearState(){
    this.setState({
      name : "",
      location_name : "",
      location_address : "",
      event_date : "",
      event_time : ""
    })
  }

  displayForm = () => {
    this.setState({
      openForm : !this.state.openForm
    })
  }


  signOut=()=>{
    fetch('/logout', {
      method: "GET"
    }).then(data =>{
      return(data.json())
    }).then(response =>{
      //sign out action
      this.props.logOut(response);
      console.log(response)
    })
  }

    render() {
      console.log(this.state)
      if(this.props.eventStatus.currentEvent){
        return(
          <Redirect to={{
            pathname: '/'
          }} />
          )
      }
      if(this.props.currentUser.userLoggedIn === true && this.state.openForm === true){
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Planit-Better</h2>
            </div>
            <div id="navBar">
            <button onClick={this.signOut}>Change User</button>
            <button onClick={this.displayForm}> New Event Form</button>
            </div>
            <div>
              <form onSubmit={this.handleEventSubmit}>
                <div>
                 <span>Event Name</span>
                  <input type="text" placeholder="Event Name" value={this.state.name} onChange={this.handleChangeName} />
                </div>
                <div>
                <span>Location Name</span>
                  <input type="text" placeholder="Location name" value={this.state.location_name} onChange={this.handleChangelocationName} />
                </div>
                <div>
                  <span>location Adress Number</span>
                  <input type="text" placeholder="Adress" value={this.state.location_address} onChange={this.handleChangelocationAddress} />
                </div>
                <div>
                <span>Event Date</span>
                  <input type="date" placeholder="Event Date" value={this.state.event_date} onChange={this.handleChangeEventDate} />
                </div>
                <div>
                <span>Event Time</span>
                  <input type="time" value={this.state.event_time} onChange={this.handleChangeEventTime} />
                </div>
                <div>
                  <button name="Login" type="submit">Add Event </button>
                </div>
              </form>
            </div>
          </div>
        );
      } else if(this.props.currentUser.userLoggedIn === true && this.state.openForm === false){
        return(
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Planit-Better</h2>
            </div>
            <div id="navBar">
            <button onClick={this.signOut}>Change User</button>
            <button onClick={this.displayForm}> New Event Form</button>
            </div>
          </div>
            );

      } else {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Planit-Better</h2>
              <Link to="/signinForm">
                <button>Sign Up</button>
              </Link>
                <Link to="/loginForm">
                  <button>Login</button>
              </Link>
            </div>
            </div>
       );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentEvent : state.event,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus

  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut : currentUser => {
      dispatch(logOut(currentUser))
    },
    loadEvent : currentEvent => {
      dispatch(loadEvent(currentEvent))
    },
    loadOwnedEvent : ownedEvent => {
      dispatch(loadOwnedEvent(ownedEvent))
    },
    clearEvent: ownedEvent => {
      dispatch(clearEvent(ownedEvent))
    }
  }
}




const ConnectedEventApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(EventForm);



export default ConnectedEventApp;

