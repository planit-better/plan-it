/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadTask, loadCurrentTask } from '../action';
import { Link } from 'react-router-dom';





class TaskList extends Component {
  constructor(props) {

    super(props);

  }

  componentWillMount() {
    fetch('/api/Task', {
      method: "GET",
      credentials : 'include'
    }).then((response) =>{
      return response.json()
    }).then((task) =>{
      this.props.loadTask(task)
    }).catch(err =>{
      throw err;
    })
  }

  taskRef( task ) {
    this.props.loadCurrentTask(task)
  }

   render() {
    let allowedTasks = []
    for(var i=0; i<this.props.task.length; i++){
      if(this.props.task[i].event_id === this.props.eventStatus.currentEvent.id){
        allowedTasks.push(this.props.task[i])
      }
    }
    return(
      <div className="field">

      <h1 className="label">All Tasks</h1>
      <ul>
        {
          allowedTasks.map((task) =>
            <Link to="/taskProfile" key={task.id}>
              <li className="tasks" onClick={this.taskRef.bind(this, task)}><h3>{task.name}</h3>
              </li>
            </Link>
            )
        }

      </ul>

      </div>
      )

   }

}

const mapStateToProps = (state) => {
  return {
    task : state.task,
    eventStatus : state.eventStatus
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadTask: task =>{
      dispatch(loadTask(task))
    },
    loadCurrentTask: task =>{
      dispatch(loadCurrentTask(task))
    }
  }
}

const ConnectedTaskListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(TaskList);



export default ConnectedTaskListApp;