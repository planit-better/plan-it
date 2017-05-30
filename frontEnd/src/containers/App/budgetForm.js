/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadBudget } from '../../action';

class Budget extends Component {
  constructor(props) {

    super(props);

  }

  componentDidMount() {
    fetch('api/budget', {
      method : "GET",
      credentials: 'include'
    }).then((response)=>{
      return response.json()
    }).then((budget) =>{

      this.props.loadBudget(budget)
    }).catch(err =>{
      throw err;
    })
  }




  render(){
    console.log(this.props.budget)
    return(
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <h3>{this.props.eventStatus.currentEvent.name}</h3>
          <h3>{this.props.currentUser.username}</h3>
        </div>

        <div id="navBar">
          <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
        </div>





      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser : state.authenticate,
    eventStatus : state.eventStatus,
    budget : state.budget
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadBudget: budget =>{
      dispatch(loadBudget(budget))
    }
  }
}

const ConnectedBudgetApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Budget);



export default ConnectedBudgetApp;


