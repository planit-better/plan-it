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
      this.props.logOut(response);
    })
  }

  newEvent = () => {
    this.props.clearEvent();
  }



  render() {

    if(this.props.currentUser.userLoggedIn === true){

      return (
        <div className="App home">
          <div className="nav homeHeader text has-shadow">
            <div className="nav-left">
              <div className="nav-item">
                <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />

                <h2 className="title is-3">Planit-Better</h2>
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
                  <a id="signout" className="nav-item is-tab is-hidden-mobile is-active" onClick={this.signOut}>Log Out</a>
                  <a className="nav-item is-tab is-hidden-mobile"><Link to="/eventForm" onClick={this.newEvent}>New Event</Link></a>
              </div>
            </div>
          </div>

          <br></br><br></br>

          <div id="postNavBar" className="columns">

            <div className="column">
              <p className="has-icons-left">
                <span className="icon is-left is-large">
                  <i className="fa fa-briefcase"></i>
                </span>
              </p>
                <Link to="/newContractorForm">
                  <button className="button columnButton is-large is-info is-outlined">New Contractor
                  </button>
                </Link>
            </div>

            <div className="column">
              <p className="has-icons-left">
                <span className="icon is-left is-large">
                  <i className="fa fa-gavel"></i>
                </span>
              </p>
                <Link to="/newEquipmentForm"><button className="button columnButton is-large is-success is-outlined">New Equipment</button></Link>
            </div>

            <div className="column">
              <p className="has-icons-left">
                <span className="icon is-left is-large">
                  <i className="fa fa-user-plus"></i>
                </span>
              </p>
                <Link to="/newGuestForm"><button className="button columnButton is-large is-warning is-outlined">New Guest</button></Link>
            </div>
          </div>

          <br></br><br></br><br></br><br></br>

          <div className="columns">

            <div className="column">
              <p className="has-icons-left">
                <span className="icon is-left is-large">
                  <i className="fa fa-cutlery"></i>
                </span>
              </p>
                <Link to="/newMenuForm"><button className="button columnButton is-large is-primary is-outlined">New Menu</button></Link>
            </div>

            <div className="column">
              <p className="has-icons-left">
                <span className="icon is-left is-large">
                  <i className="fa fa-pencil-square-o"></i>
                </span>
              </p>
                <Link to="/newTaskForm"><button className="button columnButton is-large is-danger  is-outlined">New Task</button></Link>
            </div>

            <div className="column">
              <p className="has-icons-left">
                <span className="icon is-left is-large">
                  <i className="fa fa-usd"></i>
                </span>
              </p>
              <Link to="/budgetForm"><button className="button columnButton is-large is-black is-outlined">Budget</button></Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App logHome">

          <div className="nav has-shadow logHeader is-active ">
              <div className="nav-left">
                <div className="nav-item">
                  <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
                  <h1 className="title is-3 text">Planit-Better</h1>
                </div>
              </div>

              <div className="nav-center">
                <div className="nav-item">

                </div>
              </div>

              <div className="nav-right">
                <div className="nav-item text">
                  <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/loginForm">Login</Link></a>
                  <a className="nav-item is-tab is-hidden-mobile"><Link to="/signinForm">Sign Up</Link></a>
                </div>
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