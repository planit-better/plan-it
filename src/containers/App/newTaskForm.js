/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadTask } from '../../action';

class newTaskForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      name : "",
      type : "",
      assigned_to : "",
      deadline : ""
    };
  }

    handleTaskSubmit = ( event ) => {
      event.preventDefault();
      this.addTask(this.state)
      .then(this.clearState())
      .then(this.updateStore())

    }

    handleChangeName = ( event ) => {
      this.setState({
        name : event.target.value
      });
    }

    handleChangeType = ( event ) => {
      this.setState({
        type : event.target.value
      });
    }

    handleChangeAssignedTo = ( event ) => {
      this.setState({
       assigned_to : event.target.value
      });
    }

    handleChangeDeadline = ( event ) => {
      this.setState({
       deadline : event.target.value
      });
    }

    clearState(){
      this.setState({
        name : "",
        type : "",
        assigned_to : "",
        deadline : ""
      });
    }

    updateStore(){
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


    addTask(task){
      return fetch('/api/task',{
        method: "POST",
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(task)
      }).then(response =>{
        return(response)
      }).catch(err => {
        throw err;
      })
    }

    render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <div id="navBar">
        <Link to="/"><button>Home</button></Link>
        </div>
          <form onSubmit={this.handleTaskSubmit}>
            <div>
             <span>Name</span>
              <input type="text" placeholder="task name" value={this.state.name} onChange={this.handleChangeName} />
            </div>
            <div>
            <span>Type of task</span>
              <input type="text"  value={this.state.type} onChange={this.handleChangeType} />
            </div>
            <div>
              <span>Assigned to Number</span>
              <input type="text" value={this.state.assigned_to} onChange={this.handleChangeAssignedTo} />
            </div>
            <div>
              <span>Deadline Number</span>
              <input type="date" value={this.state.deadline} onChange={this.handleChangeDeadline} />
            </div>
            <div>
              <button name="Login" type="submit">Add Task </button>
            </div>
          </form>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    task : state.task
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadTask: task =>{
      dispatch(loadTask(task))
    }
  }
}

const ConnectedTaskApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(newTaskForm);



export default ConnectedTaskApp;

