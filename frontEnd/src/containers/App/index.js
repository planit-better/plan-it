/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadContractors, loadEquipment, loadGuest, loadMenu, loadTask, logOut, clearEvent } from '../../action';
import { Link } from 'react-router-dom';

class App extends Component {

  constructor(props){

    super(props);
  }

      //MOUNT EVENT
  componentWillMount() {
    fetch('/api/Equipment', {
      method : "GET",
      credentials: 'include'
    }).then((response)=>{
      return response.json()
    }).then((equipment) =>{
      this.props.loadEquipment(equipment)
    }).catch(err =>{
      throw err;
    })

   fetch('/api/Contractors', {
      method: "GET",
      credentials: 'include'
    }).then((response) =>{
      return response.json()
    }).then((contractors) =>{
      this.props.loadContractors(contractors)
    }).catch(err =>{
      throw err;
    })

     fetch('/api/Guest', {
      method: "GET",
      credentials: 'include'
    }).then((response) =>{
      return response.json()
    }).then((guest) =>{
      this.props.loadGuest(guest)
    }).catch(err =>{
      throw err;
    })

       fetch('/api/Menu', {
      method: "GET",
      credentials: 'include'
    }).then((response) =>{
      return response.json()
    }).then((menu) =>{
      this.props.loadMenu(menu)
    }).catch(err =>{
      throw err;
    })

      fetch('/api/Task', {
      method: "GET",
      credentials: 'include'
    }).then((response) =>{
      return response.json()
    }).then((task) =>{
      this.props.loadTask(task)
    }).catch(err =>{
      throw err;
    })
  }

  signOut=()=>{
    fetch('/logout', {
      method: "GET",
      credentials: 'include'
    }).then(data =>{
      return(data.json())
    }).then(response =>{
      this.props.clearEvent();
      //sign out action
      this.props.logOut(response);
      console.log(response)
    })
  }



  render() {
    // console.log(this.props.equipment);
    // console.log(this.props.contractors);
    // console.log(this.props.guest);
    // console.log(this.props.menu);
    // console.log(this.props.task);
    // console.log(this.props.currentUser)
    console.log(this.props.currentUser)
    console.log(this.props.eventStatus)

    if(this.props.currentUser.userLoggedIn === true){

      return (
        <div className="App">

          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Planit-Better</h2>
            <h3>{this.props.eventStatus.currentEvent.name}</h3>
            <h3>{this.props.currentUser.username}</h3>
            <button id="signout" className="button is-outlined" onClick={this.signOut}>Log Out</button>
          </div>

          <br></br><br></br>

          <div id="postNavBar">
            <div>
              <Link to="/newContractorForm"><button className="button bottomButton is-outlined">New Contractor</button></Link>
            </div>
            <div>
              <Link to="/newEquipmentForm"><button className="button bottomButton is-outlined">New Equipment</button></Link>
            </div>
            <div>
              <Link to="/newGuestForm"><button className="button bottomButton is-outlined">New Guest</button></Link>
            </div>
            <div>
              <Link to="/newMenuForm"><button className="button bottomButton is-outlined">New Menu</button></Link>
            </div>
            <div>
              <Link to="/newTaskForm"><button className="button bottomButton is-outlined">New Task</button></Link>
            </div>
            <div>
              <Link to="/budgetForm"><button classname="button bottomButton is-outlined">Budget</button></Link>
            </div>

          </div>
        </div>
      );
    } else {
      return (
        <div className="App">

          <div className="App-header level">

            <div className="field level-item has-text-centered">
              <Link to="/signinForm">
                <button className="button is-outlined is-small">Sign Up</button>
              </Link>
            </div>

            <div className="field has-text-centered">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                <h2>Planit-Better</h2>
              </p>
            </div>

            <div className="field level-item has-text-centered">
              <Link to="/loginForm">
              <button className="button is-outlined is-small">Login</button>
              </Link>
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
    equipment : state.equipment,
    guest : state.guest,
    menu : state.menu,
    task : state.task,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadContractors: contractors =>{
      dispatch(loadContractors(contractors))
    },
    loadEquipment : equipment => {
      dispatch(loadEquipment(equipment))
    },
    loadGuest : guest => {
      dispatch(loadGuest(guest))
    },
    loadMenu : menu => {
      dispatch(loadMenu(menu))
    },
    loadTask : task => {
      dispatch(loadTask(task))
    },
    logOut : currentUser => {
      dispatch(logOut(currentUser))
    },
    clearEvent: ownedEvent =>{
      dispatch(clearEvent(ownedEvent))
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);



export default ConnectedApp;