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
      method: "GET"
    }).then((response) =>{
      return response.json()
    }).then((task) =>{
      this.props.loadTask(task)
    }).catch(err =>{
      throw err;
    })
  }



   render() {

    return(
      <div>
      <h1>Hello Tasks</h1>
      <ul>
        {
          this.props.task.map((name) =>
            <li><h3>{name.name}</h3></li>
            )
        }

      </ul>
      </div>
      )

   }

}

const mapStateToProps = (state) => {
  return {
    tast : state.tast
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


