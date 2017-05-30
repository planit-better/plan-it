/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadEvent, loadOwnedEvent } from '../action';




class EventList extends Component {
  constructor(props) {

    super(props);

    this.state = {
      selectedEvent : ''
    }
  }

  componentWillMount() {
    fetch('/api/Event', {
      method: "GET",
      credentials : 'include'
    }).then((response) =>{
      return response.json()
    }).then((currentEvent) =>{
      this.props.loadEvent(currentEvent)
    }).catch(err =>{
      throw err;
    })
  }

  eventRef ( event, e ) {
    console.log(event)
    this.props.loadOwnedEvent(event)
  }





   render() {
    return(
      <div>
      <h1>Hello Events</h1>
      <ul>
        {
          this.props.event.map((evt) =>
            <li className="event" key={evt.id}>
            <a onClick={this.eventRef.bind(this, evt)}>{evt.name}</a>
            </li>
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
    },
    loadOwnedEvent : ownedEvent => {
      dispatch(loadOwnedEvent(ownedEvent))
    }
  }
}

const ConnectedEventListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(EventList);



export default ConnectedEventListApp;