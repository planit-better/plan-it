/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadContractors, loadEquipment, loadGuest } from '../../action';
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
  }



  render() {
    //console.log(this.props.equipment)
    // console.log(this.props.contractors)
    //console.log(this.props.guest);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <div id="postNavBar">
          <Link to="/newContractorForm"><button>New Contractor</button></Link>
          <Link to="/newEquipmentForm"><button>New Equipment</button></Link>
          <Link to="/newGuestForm"><button>New Guest</button></Link>
          <Link to="/newMenuForm"><button>New Menu</button></Link>
          <Link to="/newTaskForm"><button>New Task</button></Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contractors : state.contractors,
    equipment : state.equipment,
    guest : state.guest
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
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);



export default ConnectedApp;


