/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { loadGuest } from '../../action';
import GuestList from '../../components/guestList';
//import { groupText } from './text-reminder/text.js'


class InviteForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      message : "",
      email : "",
    };

  }


  componentWillMount() {
    fetch('/api/Guest', {
      method: "GET",
      credentials : 'include',
    }).then((response) =>{
      return response.json()
    }).then((guest) =>{
      this.props.loadGuest(guest)
    }).catch(err =>{
      throw err;
    })
  }

    handleTextSubmit = ( event ) => {
      event.preventDefault();
      this.text()
      .then(this.clearTextState())


    }

    handleChangeMessage = ( event ) => {
      this.setState({
        message : event.target.value
      });
    }


    handleEmailSubmit = ( event ) => {
      event.preventDefault();
      this.email()
      .then(this.clearEmailState())


    }

    handleChangeEmail = ( event ) => {
      this.setState({
        email : event.target.value
      });
    }

    clearTextState(){
      this.setState({
        message : ""
      });
    }

    clearEmailState(){
      this.setState({
        email : ""
      });
    }


    text(){
      return fetch('api/text', {
        method : "POST",
        credentials : 'include',
        headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify(this.state)
      }).then((response) =>{
        return response.json()
      }).catch(err => {
        throw err;
      })
    }


    email(){
      return fetch('api/email', {
        method : "POST",
        credentials : 'include',
        headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify(this.state)
      }).then((response) =>{
        return response.json()
      }).catch(err => {
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

    return (
      <div className="App">

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
              <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/">Home</Link></a>
              <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="newGuestForm">Cancel</Link></a>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={this.handleTextSubmit}>
            <div>
               <span>Text Message</span>
                <input type="text" placeholder="Your text here" value={this.state.message} onChange={this.handleChangeMessage} />
              </div>
              <div>
                <button name="Text" type="submit"> Text All Guests </button>
              </div>

          </form>

          <form onSubmit={this.handleEmailSubmit}>

            <div>
              <span>Email Message</span>
              <input type="textarea" placeholder="Your email here" value={this.state.email} onChange={this.handleChangeEmail} />
            </div>

            <div>
              <button name="Email" type="submit"> Email All Guests </button>
            </div>

          </form>

        </div>

        <div>
          <GuestList guest={this.props.guest}/>
        </div>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    guest : state.guest,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadGuest: guest =>{
      dispatch(loadGuest(guest))
    }
  }
}


const ConnectedContractorApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(InviteForm);



export default ConnectedContractorApp;