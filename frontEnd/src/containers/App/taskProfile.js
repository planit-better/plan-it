

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadCurrentGuest, loadCurrentTask, loadCurrentContractor, loadContractors, loadEquipment, loadGuest, loadMenu, loadBudget, loadTask, logOut, clearEvent } from '../../action';
import { Link, Redirect } from 'react-router-dom';



class TaskProfile extends Component {

  constructor(props){

    super(props);

    this.state={

      name :this.props.currentTask.currentTask.name,

      type : this.props.currentTask.currentTask.type,

      cost: this.props.currentTask.currentTask.cost,

      deadline : this.props.currentTask.currentTask.deadline,

      complete : this.props.currentTask.currentTask.complete,

      event_id : this.props.eventStatus.currentEvent.id,

      id: this.props.currentTask.currentTask.id

    };

  }

    handleTaskChangeSubmit = ( event ) => {
      event.preventDefault();
      this.updateTask(this.state)
      .then(this.props.loadCurrentTask(this.state))
    }

    handleChangeName = ( event ) => {
      this.setState({
        name : event.target.value
      });
    }

    handleChangeCost = ( event ) => {
      this.setState({
        cost : event.target.value
      });
    }

    handleChangeType = ( event ) => {
      this.setState({
        type : event.target.value
      });
    }

    handleChangeDeadline = ( event ) => {
      this.setState({
        deadline : event.target.value
      });
    }

    handleChangeComplete = ( event ) => {
      this.setState({
        complete : event.target.value
      });
    }

    updateTask = ( task ) => {

        return fetch(`/api/task/${this.props.currentTask.currentTask.id}`, {
        method: "PUT",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify(task)
      }).then((response) =>{
        this.updateBudget( this.state )
      }).catch(err =>{
        throw err;
      })
    }

    removeTask = ( event ) => {
      event.preventDefault()
        return fetch(`/api/task/${this.props.currentTask.currentTask.id}`, {
          method: "DELETE",
          credentials: 'include',
           headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }).then((response) =>{
          this.redirectTask()
        }).catch(err =>{
          throw err;
        })
      }


    componentDidMount() {
      fetch('/api/budget', {
      method : "GET",
      credentials: 'include'
    }).then((response)=>{
      return response.json()
    }).then((task) =>{
      this.props.loadBudget(task)
    }).catch(err =>{
      throw err;
    })
    }

     updateBudget = ( task ) => {
        for(var i=0; i<this.props.budget.length; i++){
          if(this.props.budget[i].type_id === this.state.id && this.props.budget[i].type === "Task"){
            this.putBudget(this.props.budget[i])
          }
        }
    }

     putBudget( budget ){
       return fetch(`/api/budget/${budget.id}`, {
        method: "PUT",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify({"amount": this.state.cost})
      }).then((response) =>{
        return;
      }).catch(err =>{
        throw err;
      })
    }



    redirectTask(){
      this.removeContractorBudget()
      this.props.history.push("/newTaskForm")
    }

    removeContractorBudget(){
      for(var i=0; i<this.props.budget.length; i++){
          if(this.props.budget[i].type_id === this.state.id && this.props.budget[i].type === "Task"){
            this.removeBudget(this.props.budget[i])
          }
        }
    }

    removeBudget(budget){
      return fetch(`/api/budget/${budget.id}`, {
          method: "DELETE",
          credentials: 'include',
           headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }).then((response) =>{
          return;
        }).catch(err =>{
          throw err;
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

    return(

      <div className="App tasksBackground">
        <div className="nav task has-shadow text">
          <div className="nav-left">
            <div className="nav-item">
              <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
              <h1 className="title is-3 text">Plan-Better</h1>
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
              <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/"><p className="text">Home</p></Link></a>
            </div>
          </div>
        </div>


        <div className="columns">
          <div className="column"></div>

          <div className="guestHome formsHome column list is-4">
            <form className="centerForm">

              <div className="field">
                <p className="control">
                  <label className="label">Change Name</label>
                  <input className="input" type="text" value={this.state.name} onChange={this.handleChangeName} />
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Change Cost</label>
                  <input className="input" type="number" value={this.state.cost} onChange={this.handleChangeCost} />
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Change Type</label>
                  <input className="input" type="text" value={this.state.type} onChange={this.handleChangeType} />
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Change Deadline</label>
                  <input className="input dateInput" type="date" value={this.state.deadline} onChange={this.handleChangeDeadline} />
                </p>
              </div>



              <div className="field">
                <p className="control">
                  <button className="button is-outlined guest" name="Login" onClick={this.handleTaskChangeSubmit}>Update Task
                  </button>
                  <button className="button is-outlined guest" name="Remove" onClick={this.removeTask}> Remove Task
                  </button>
                </p>
              </div>

            </form>
          </div>

          <div className="column"></div>

          <div className="guestHome formsHome column list is-4">
            <p className="label">Tasks</p>

              <div className="field">
                <label className="label"> Name</label>
              <p>{this.props.currentTask.currentTask.name}</p>
            </div>

            <div className="field">
              <label className="label">Cost</label>
              <p>{this.props.currentTask.currentTask.cost} </p>
            </div>

            <div className="field">
              <label className="label">Type</label>
              <p>{this.props.currentTask.currentTask.type} </p>
            </div>


            <div className="field">
              <label className="label">Deadline</label>
              <p>{this.props.currentTask.currentTask.deadline} </p>
            </div>


          </div>

          <div className="column"></div>
        </div>


      </div>

        );
   }

}

const mapStateToProps = (state) => {
  return {
    contractors : state.contractors,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus,
    currentTask : state.currentTask,
    currentContractor : state.currentContractor,
    budget : state.budget

  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCurrentTask : currentTask => {
      dispatch(loadCurrentTask(currentTask))
   },
    loadCurrentContractor : currentContractor => {
      dispatch(loadCurrentContractor(currentContractor))
   },
    loadBudget : budget => {
      dispatch(loadBudget(budget))
    }

  }
}




const ConnectedTaskProfileApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(TaskProfile);



export default ConnectedTaskProfileApp;

