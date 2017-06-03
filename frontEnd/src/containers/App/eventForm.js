/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { logOut, loadEvent, loadOwnedEvent, clearEvent, loadUser } from '../../action';
import EventList from '../../components/eventList';



class EventForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      name : "",
      location_name : "",
      location_address : "",
      event_date : "",
      event_time : "",
      openForm : false,
      user_id : 0,
      formOpen : false
    };


  }


  handleEventSubmit = ( event ) => {
    event.preventDefault();
    this.addEvent(this.state)
    .then(this.updateStore())
    .then(this.clearState())

  }

  handleChangeName = ( event ) => {
    this.setState({
      name : event.target.value
    });
  }

  handleChangelocationName = ( event ) => {
    this.findUserId(this.props.currentUser.username)
    this.setState({
      location_name : event.target.value
    });
  }

  handleChangelocationAddress = ( event ) => {
    this.setState({
      location_address : event.target.value
    });
  }

  handleChangeEventDate = ( event ) => {
    this.setState({
      event_date : event.target.value
    });
  }

  handleChangeEventTime = ( event ) => {
    this.setState({
      event_time : event.target.value
    });
  }



  addEvent(newEvent){
      return fetch('/api/event',{
        method: "POST",
        credentials: 'include',
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newEvent)
      }).then(response =>{
        return(response)
      }).catch(err => {
        throw err;
      })
    }


  updateStore(){
      fetch('/api/event', {
      method: "GET",
      credentials:'include'
    }).then((response) =>{
      return response.json()
    }).then((newEvent) =>{
      this.props.loadEvent(newEvent)
    }).catch(err =>{
      throw err;
    })
  }


  clearState(){
    this.setState({
      name : "",
      location_name : "",
      location_address : "",
      event_date : "",
      event_time : ""
    })
  }

  displayForm = () => {
    this.setState({
      openForm : !this.state.openForm
    })
  }

  componentWillMount() {
    //this.findUserId(this.props.currentUser.username)
    fetch('/api/User', {
      method : "GET",
      credentials: 'include'
    }).then((response)=>{
      return response.json()
    }).then((user) =>{
      this.props.loadUser(user)
    }).catch(err =>{
      throw err;
    })
  }

  findUserId(username){
    for(var i=0; i<this.props.user.length; i++){
      if(this.props.user[i].username === username){
        this.setId(this.props.user[i].id)
      }
    }
  }

  setId(id){
    this.setState({
      user_id : id
    })
  }

  signOut=()=>{
    fetch('/logout', {
      method: "GET",
      credentials:'include'
    }).then(data =>{
      return(data.json())
    }).then(response =>{
      this.props.logOut(response);
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
    if(this.props.eventStatus.currentEvent){
      return(
        <Redirect to={{
          pathname: '/'
        }} />
        )
      }
      if(this.props.currentUser.userLoggedIn === true && this.state.openForm === true){
        return (
          <div className="App eventBackground">

            <div className="nav has-shadow">
              <div className="nav-left">
                <div className="nav-item">
                  <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
                  <h1 className="title is-3">Plan-Better</h1>
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
                  <a className="nav-item is-tab is-hidden-mobile is-active" onClick={this.signOut}>Change User</a>
                  <a className="nav-item is-tab is-hidden-mobile" onClick={this.displayForm}> Hide Event Form</a>
                </div>
              </div>
            </div>

            <br></br>

              <div className="columns">
                <div className="column"></div>

                <div className="guestHome formsHome column list is-4">
                  <form className="centerForm" onSubmit={this.handleEventSubmit}>

                    <div className="field">
                      <p className="control">
                        <label className="label">Event Name</label>
                      </p>
                      <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Event Name" value={this.state.name} onChange={this.handleChangeName} />
                        <span className="icon is-left is-small">
                          <i className="fa fa-calendar"></i>
                        </span>
                      </p>
                    </div>

                    <div className="field">
                      <p className="control">
                        <label className="label">Location Name</label>
                      </p>
                      <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Location name" value={this.state.location_name} onChange={this.handleChangelocationName} />
                        <span className="icon is-left is-small">
                          <i className="fa fa-compass"></i>
                        </span>
                      </p>
                    </div>

                    <div className="field">
                      <p className="control">
                        <label className="label">location Address Number</label>
                      </p>
                      <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Address" value={this.state.location_address} onChange={this.handleChangelocationAddress} />
                        <span className="icon is-left is-small">
                          <i className="fa fa-home"></i>
                        </span>
                      </p>
                    </div>

                    <div className="field">
                      <p className="control">
                        <label className="label">Event Date</label>
                      </p>
                      <p className="control has-icons-left">
                        <input className="input" type="date" placeholder="Event Date" value={this.state.event_date} onChange={this.handleChangeEventDate} />
                        <span className="icon is-left is-small">
                          <i className="fa fa-calendar-plus-o"></i>
                        </span>
                      </p>
                    </div>

                    <div className="field">
                      <p className="control">
                        <label className="label">Event Time</label>
                      </p>
                      <p className="control has-icons-left">
                        <input className="input" type="time" value={this.state.event_time} onChange={this.handleChangeEventTime} />
                        <span className="icon is-left is-small">
                          <i className="fa fa-clock-o"></i>
                        </span>
                      </p>
                    </div>

                    <div className="field control">
                      <button className="button bottomButton is-outlined" name="Login" type="submit">Add Event </button>
                    </div>

                  </form>
                </div>

                <div className="column"></div>
                <div className="guestHome formsHome column list is-4">
                  <EventList event={this.props.currentEvent} />
                </div>

                <div className="column"></div>
              </div>
          </div>
        );
      } else if(this.props.currentUser.userLoggedIn === true && this.state.openForm === false){
        return(
          <div className="App eventBackground">
            <div className="nav has-shadow">
              <div className="nav-left">
                <div className="nav-item">
                  <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
                  <h1 className="title is-3">Plan-Better</h1>
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
                  <a className="nav-item is-tab is-hidden-mobile is-active" onClick={this.signOut}>Change User</a>
                  <a className="nav-item is-tab is-hidden-mobile " onClick={this.displayForm}> New Event Form</a>
                </div>
              </div>
            </div>

            <div className="columns">

              <div className="column"></div>

              <div className="guestHome formsHome column list is-4">
                <EventList event={this.props.currentEvent} />
              </div>

              <div className="column"></div>

            </div>
          </div>

            );

      } else {
        return (
          <div className="App eventBackground">

            <div className="nav has-shadow">

              <div className="nav-left">
                <div className="nav-item">
                  <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
                  <h1 className="title is-3">Plan-Better</h1>
                </div>
              </div>

              <div className="nav-center">
                <div className="nav-item">

                </div>
              </div>

              <div className="nav-right">
                <div className="nav-item">
                  <a className="nav-item is-tab is-hidden-mobile"><Link to="/signinForm">Sign Up</Link></a>
                  <a className="nav-item is-tab is-hidden-mobile"><Link to="/loginForm">Login</Link></a>
                </div>
              </div>
            </div>

          </div>
       );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user,
    currentEvent : state.event,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus

  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut : currentUser => {
      dispatch(logOut(currentUser))
    },
    loadEvent : currentEvent => {
      dispatch(loadEvent(currentEvent))
    },
    loadOwnedEvent : ownedEvent => {
      dispatch(loadOwnedEvent(ownedEvent))
    },
    clearEvent: ownedEvent => {
      dispatch(clearEvent(ownedEvent))
    },
    loadUser : user =>{
      dispatch(loadUser(user))
    }
  }
}




const ConnectedEventApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(EventForm);



export default ConnectedEventApp;