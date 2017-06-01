/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
    if(this.props.currentUser.userLoggedIn === false){
      return(
        <Redirect to={{
          pathname : '/'
        }} />
        )
    }
    let contractorBudget = 0;
    let menuBudget = 0;
    let taskBudget = 0;
    let equipmentBudget = 0;
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
       if(this.props.budget[i].event_id === this.props.eventStatus.currentEvent.id && this.props.budget[i].type === "Task"){
         taskBudget += Number(this.props.budget[i].amount)
      }
    }

    console.log(contractorBudget)
    console.log(menuBudget)
    console.log(equipmentBudget)
    return(
      <div className="App">

        <div className="App-header">
          <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
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
                    <th id="categoryBudget">Category</th>
                    <th>Total Cost</th>
                    <th>Percentage</th>
                  </tr>
                  <tr id="contractorBudget">
                    <td >Contractor</td>
                    <td>{contractorBudget}</td>
                    <td>{contractorBudget / (contractorBudget + menuBudget + equipmentBudget + taskBudget)}</td>
                  </tr>
                  <tr id="menuBudget">
                    <td>Menu</td>
                    <td>{menuBudget}</td>
                    <td>{menuBudget / (contractorBudget + menuBudget + equipmentBudget + taskBudget)}</td>
                  </tr>
                  <tr id="equipmentBudget">
                    <td >Equipment</td>
                    <td>{equipmentBudget}</td>
                    <td>{Number(equipmentBudget / (contractorBudget + menuBudget + equipmentBudget + taskBudget).toFixed(2))}</td>
                  </tr>
                  <tr id="taskBudget">
                    <td >Task</td>
                    <td>{taskBudget}</td>
                    <td>{Number(taskBudget / (contractorBudget + menuBudget + equipmentBudget + taskBudget).toFixed(2))}</td>
                  </tr>
                </table>
              </div>
          <div className="column">
            <PieChart
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
                    color: 'green',
                    value: equipmentBudget,
                  },
                  {
                    color: "yellow",
                    value: taskBudget,
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


