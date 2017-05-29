/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadContractors, loadEquipment, loadGuest, loadMenu, loadTask, logOut, clearEvent } from '../../action';
import { Link } from 'react-router-dom';



class GuestProfile extends Component {

  constructor(props){

    super(props);

  }


    render() {
     console.log(this.props.currentGuest)
     // console.log(this.props.user)
     // console.log(this.state)
     if(this.props.currentGuest.currentGuest.will_attend === true){

     return(

          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Planit-Better</h2>
              <h3>{this.props.currentUser.username}</h3>
              <h3>{this.props.eventStatus.currentEvent.name}</h3>
            </div>
            <div id="navBar">
              <Link to="/"><button>Home</button></Link>
            </div>

            <div id="GuestInfo">
              <h1>Attending</h1>
              <h1>{this.props.currentGuest.currentGuest.name}</h1>
              <p>{this.props.currentGuest.currentGuest.number}</p>
              <p>{this.props.currentGuest.currentGuest.email}</p>
              <p>{this.props.currentGuest.currentGuest.accompanying_guests}</p>
              <p>{this.props.currentGuest.currentGuest.diet_restriction}</p>
            </div>


          </div>

        )
   } else {
      return(
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Planit-Better</h2>
              <h3>{this.props.currentUser.username}</h3>
              <h3>{this.props.eventStatus.currentEvent.name}</h3>
            </div>
            <div id="navBar">
              <Link to="/"><button>Home</button></Link>
            </div>

            <div id="GuestInfo">
            <h1>Not Attending</h1>
              <h1>{this.props.currentGuest.currentGuest.name}</h1>
              <p>{this.props.currentGuest.currentGuest.number}</p>
              <p>{this.props.currentGuest.currentGuest.email}</p>
              <p>{this.props.currentGuest.currentGuest.accompanying_guests}</p>
              <p>{this.props.currentGuest.currentGuest.diet_restriction}</p>
            </div>


          </div>
          )
   }
  }
}

const mapStateToProps = (state) => {
  return {
    guest : state.guest,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus,
    currentGuest : state.currentGuest

  };
}


// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     logOut : currentUser => {
//       dispatch(logOut(currentUser))
//     },
//     loadEvent : currentEvent => {
//       dispatch(loadEvent(currentEvent))
//     },
//     loadOwnedEvent : ownedEvent => {
//       dispatch(loadOwnedEvent(ownedEvent))
//     },
//     clearEvent: ownedEvent => {
//       dispatch(clearEvent(ownedEvent))
//     },
//     loadUser : user =>{
//       dispatch(loadUser(user))
//     }
//   }
// }




const ConnectedProfileApp = connect(
  mapStateToProps,
  //mapDispatchToProps
  )(GuestProfile);



export default ConnectedProfileApp;

