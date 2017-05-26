/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logOut } from '../../action';



class EventForm extends Component {

  constructor(props){

    super(props);


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
      if(this.props.currentUser.userLoggedIn === true){
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Planit-Better</h2>
            </div>
            <div id="navBar">
            <button onClick={this.signOut}>Change User</button>
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
    logOut : currentUser => {
      dispatch(logOut(currentUser))
    }
  }
}




const ConnectedEventApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(EventForm);



export default ConnectedEventApp;

