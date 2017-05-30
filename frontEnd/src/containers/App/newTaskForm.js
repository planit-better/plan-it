/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadTask } from '../../action';
import TaskList from '../../components/taskList';

class newTaskForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      name : "",
      type : "",
      assigned_to : "",
      deadline : "",
      event_id : this.props.eventStatus.currentEvent.id,
      formOpen : false
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


    addTask(task){
      return fetch('/api/task',{
        method: "POST",
        credentials: 'include',
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

    openForm = () => {
        this.setState({
          formOpen : !this.state.formOpen
        })
      }

    render() {
      if(this.state.formOpen === true){

    return (
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

         <div>
            <button onClick={this.openForm}>Hide Task Form</button>
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
          <TaskList task={this.props.task} />



        <form onSubmit={this.handleTaskSubmit}>

          <div className="field centerInput">
            <p className="control">
              <label className="label">Name</label>
            </p>
            <p className="control has-icons-left">
              <input className="input" type="text" placeholder="task name" value={this.state.name} onChange={this.handleChangeName} />
              <span className="icon is-left is-small">
                <i className="fa fa-dashboard"></i>
              </span>
            </p>
          </div>

          <div className="field centerInput">
            <p className="control">
              <label className="label">Type of task</label>
            </p>
            <p className="control has-icons-left">
              <input className="input" type="text"  value={this.state.type} onChange={this.handleChangeType} />
              <span className="icon is-left is-small">
                <i className="fa fa-eye"></i>
              </span>
            </p>
          </div>

          <div className="field centerInput">
            <p className="control">
              <label className="label">Assigned to Number</label>
            </p>
            <p className="control has-icons-left">
              <input className="input" type="text" value={this.state.assigned_to} onChange={this.handleChangeAssignedTo} />
              <span className="icon is-left is-small">
                <i className="fa fa-user"></i>
              </span>
            </p>
          </div>

          <div className="field centerInput">
            <p className="control">
              <label className="label">Deadline Number</label>
            </p>
            <p className="control has-icons-left">
              <input className="input" type="date" value={this.state.deadline} onChange={this.handleChangeDeadline} />
              <span className="icon is-left is-small">
                <i className="fa fa-calendar"></i>
              </span>
            </p>
          </div>

          <div>
            <button className="button is-outlined bottomButton" name="Login" type="submit">Add Task </button>
          </div>

        </form>

        <TaskList task={this.props.task} />
      </div>
    );
      }else {
        return(
            <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <h3>{this.props.eventStatus.currentEvent.name}</h3>
          <h3>{this.props.currentUser.username}</h3>
        </div>
        <div id="navBar">
        <Link to="/"><button>Home</button></Link>
        </div>

         <div>
            <button onClick={this.openForm}>New Task Form</button>
        </div>

        <TaskList task={this.props.task} />

      </div>

          )
      }
  }

}

const mapStateToProps = (state) => {
  return {
    task : state.task,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus
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