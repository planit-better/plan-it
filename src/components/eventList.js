/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadEvent } from '../action';




class EventList extends Component {
  constructor(props) {

    super(props);


  }

  componentWillMount() {
    fetch('/api/Event', {
      method: "GET"
    }).then((response) =>{
      return response.json()
    }).then((currentEvent) =>{
      this.props.loadEvent(currentEvent)
    }).catch(err =>{
      throw err;
    })
  }

  eventRef = () => {
    console.log(this.state)
  }



   render() {
    return(
      <div>
      <h1>Hello Events</h1>
      <ul>
        {
          this.props.event.map((name) =>
            <li className="event" key={name.id}><h3 onClick={this.eventRef}>{name.name}</h3></li>
            )
        }

      </ul>
      </div>
      )

   }

}

const mapStateToProps = (state) => {
  return {
    event : state.event
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadEvent: event =>{
      dispatch(loadEvent(event))
    }
  }
}

const ConnectedEventListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(EventList);



export default ConnectedEventListApp;


