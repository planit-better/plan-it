/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadTask } from '../../action';
import TaskList from '../../components/taskList';

class newTaskForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      name : "",
      type : "",
      cost : "",
      complete : false,
      deadline : "",
      event_id : this.props.eventStatus.currentEvent.id,
      formOpen : false
    };
  }

    handleTaskSubmit = ( event ) => {
      event.preventDefault();
      this.addTask(this.state)
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

    handleChangeCost = ( event ) => {
      this.setState({
       cost : event.target.value
      });
    }

    handleChageComplete = ( event ) => {
      this.setState({
        complete : event.target.value
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
        cost : "",
        deadline : "",
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


  addTaskBudget(id){
    console.log(id)
      return fetch('/api/budget', {
        method: "POST",
        credentials: 'include',
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "type": "Task",
          "amount": this.state.cost,
          "event_id": this.props.eventStatus.currentEvent.id,
          "type_id" : id
        })
      }).then(response =>{
        return response
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
        return(response.json())
      }).then(task =>{
        console.log(task)
        this.addTaskBudget(task.id)
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

       if(this.props.currentUser.userLoggedIn === false){
          return(
            <Redirect to={{
              pathname : '/'
            }} />
            )
        }

      if(this.state.formOpen === true){

    return (
      <div className="App tasksBackground">
       <div className="nav task has-shadow">
        <div className="nav-left">
          <div className="nav-item">
            <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
            <h1 className="title is-3">Planit-Better</h1>
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
            <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/">Home</Link></a>
            <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>Hide Task Form</a>
          </div>
        </div>
      </div>

        <br></br>

      <div className="columns">
        <div className="column">
        </div>

          <form className=" taskList list column is-4" onSubmit={this.handleTaskSubmit}>

            <label className="label">Enter your new Task</label>

            <div className="field ">
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

            <div className="field">
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

            <div className="field">
              <p className="control">
                <label className="label"> Cost </label>
              </p>
              <p className="control has-icons-left">
                <input className="input" type="number" value={this.state.cost} onChange={this.handleChangeCost} />
                <span className="icon is-left is-small">
                  <i className="fa fa-user"></i>
                </span>
              </p>
            </div>

            <div className="field">
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
              <button className="addTask button bottomButton is-outlined" name="Login" type="submit">Add Task </button>
            </div>
          </form>

        <br></br><br></br>

        <div className="column">
        </div>

        <div className="column list is-4 allTask">
          <TaskList task={this.props.task} />
        </div>

        <div className="column"></div>

      </div>
    </div>
    );
      }else {
        return(
          <div className="App tasksBackground">
            <div className="nav task has-shadow">
              <div className="nav-left">
                <div className="nav-item">
                  <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
                  <h1 className="title is-3">Planit-Better</h1>
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
                  <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/">Home</Link></a>
                  <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>New Task Form</a>
                </div>
              </div>

            </div>

            <br></br>

            <div className="columns">
              <div className="column">
              </div>

              <div className="notePad has-text-centered list column guestHome is-4">
                <TaskList task={this.props.task} />
              </div>

              <div className="column">
              </div>
            </div>

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