/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadContractors, loadEquipment, loadGuest, loadMenu, loadTask, logOut } from '../../action';
import { Link } from 'react-router-dom';

class App extends Component {

  constructor(props){

    super(props);
  }

      //MOUNT EVENT
  componentWillMount() {
    fetch('/api/Equipment', {
      method : "GET"
    }).then((response)=>{
      return response.json()
    }).then((equipment) =>{
      this.props.loadEquipment(equipment)
    }).catch(err =>{
      throw err;
    })

   fetch('/api/Contractors', {
      method: "GET"
    }).then((response) =>{
      return response.json()
    }).then((contractors) =>{
      this.props.loadContractors(contractors)
    }).catch(err =>{
      throw err;
    })

     fetch('/api/Guest', {
      method: "GET"
    }).then((response) =>{
      return response.json()
    }).then((guest) =>{
      this.props.loadGuest(guest)
    }).catch(err =>{
      throw err;
    })

       fetch('/api/Menu', {
      method: "GET"
    }).then((response) =>{
      return response.json()
    }).then((menu) =>{
      this.props.loadMenu(menu)
    }).catch(err =>{
      throw err;
    })

        fetch('/api/Task', {
      method: "GET"
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
      method: "GET"
    }).then(data =>{
      return(data.json())
    }).then(response =>{
      //sign out action
      this.props.logOut(response)
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

    if(this.props.currentUser.userLoggedIn === true){

      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Planit-Better</h2>
            <button id="signout" onClick={this.signOut}>Log Out</button>
          </div>
          <br></br>
          <div id="postNavBar">
            <Link to="/newContractorForm"><button>New Contractor</button></Link>
            <Link to="/newEquipmentForm"><button>New Equipment</button></Link>
            <Link to="/newGuestForm"><button>New Guest</button></Link>
            <Link to="/newMenuForm"><button>New Menu</button></Link>
            <Link to="/newTaskForm"><button>New Task</button></Link>
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
    currentUser : state.authenticate
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
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);



export default ConnectedApp;


