/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadTask } from '../action';




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



   render() {
    let allowedTasks = []
    for(var i=0; i<this.props.task.length; i++){
      if(this.props.task[i].event_id === this.props.eventStatus.currentEvent.id){
        allowedTasks.push(this.props.task[i])
      }
    }
    return(
      <div>

      <h1>Hello Tasks</h1>
      <ul>
        {
          allowedTasks.map((name) =>
            <li className="tasks" key={name.id}><h3>{name.name}</h3></li>
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
    }
  }
}

const ConnectedTaskListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(TaskList);



export default ConnectedTaskListApp;


