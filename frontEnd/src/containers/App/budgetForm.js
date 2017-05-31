/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadBudget } from '../../action';
import PieChart from 'react-simple-pie-chart';

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
    let contractorBudget = 0;
    let menuBudget = 0;
    let taskBudget = 0;
    let equipmentBudget = 0;
    console.log(this.props.eventStatus.currentEvent.id)
    console.log(this.props.budget[0])
    for(var i=0; i<this.props.budget.length; i++){
      if(this.props.budget[i].event_id === this.props.eventStatus.currentEvent.id && this.props.budget[i].type === "Contractor"){
        contractorBudget += Number(this.props.budget[i].amount)
      }
      if(this.props.budget[i].event_id === this.props.eventStatus.currentEvent.id && this.props.budget[i].type === "Menu"){
        menuBudget += Number(this.props.budget[i].amount)
      }
      if(this.props.budget[i].event_id === this.props.eventStatus.currentEvent.id && this.props.budget[i].type === "Equipment"){
        equipmentBudget += Number(this.props.budget[i].amount)
      }
    }

    console.log(contractorBudget)
    console.log(menuBudget)
    console.log(equipmentBudget)
    return(
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <h3>{this.props.eventStatus.currentEvent.name}</h3>
          <h3>{this.props.currentUser.username}</h3>
          <div id="navBar">
            <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
          </div>

        </div>
        <div className="columns">
              <div className="column">
                <table>
                  <tr>
                    <th>Category</th>
                    <th>Total Cost</th>
                  </tr>
                  <tr>
                    <td>Contractor</td>
                    <td>{contractorBudget}</td>
                  </tr>
                  <tr>
                    <td>Menu</td>
                    <td>{menuBudget}</td>
                  </tr>
                  <tr>
                    <td>Equipment</td>
                    <td>{equipmentBudget}</td>
                  </tr>
                </table>
              </div>
          <div className="column">
            <PieChart
              size={50}
              slices={[
                  {
                    color: 'red',
                    value: contractorBudget,
                  },
                  {
                    color: 'blue',
                    value: menuBudget,
                  },
                  {
                    key: 'C',
                    color: 'green',
                    value: equipmentBudget,
                  },
                  {
                    color: "white",
                    value: 0,
                  },
                ]}
                />
              </div>
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


