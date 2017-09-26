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
      currentEvent : this.props.eventStatus.currentEvent.name,
      currentEventId: this.props.eventStatus.currentEvent.id,
      currentUser : this.props.authenticate.username
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

/*
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
    }*/

    render() {
      console.log(this.state)
      if(this.props.currentUser.userLoggedIn === false){
      return(
        <Redirect to={{
          pathname : '/'
        }} />
        )
    }

    return (
      <div className="App postMan">

        <div className="nav inviteNav has-shadow">
          <div className="nav-left text">
            <div className="nav-item">
              <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
              <h1 className="title is-3 text">Planit-Better</h1>
            </div>

            <h3 className="menuEvent text">{this.props.eventStatus.currentEvent.name}</h3>
          </div>

          <div className="nav-center">
            <div className="nav-item text">
              <h3>{this.props.currentUser.username}</h3>
            </div>
          </div>

          <div className="nav-right text">
            <div className="nav-item">
              <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/"><p className="text">Home</p></Link></a>
              <a className="nav-item is-tab is-hidden-mobile"><Link to="newGuestForm"><p className="text">Cancel</p></Link></a>
            </div>
          </div>
        </div>

        <div>
          <div className="columns">

          <div className="column is-1"></div>

          <div className="iphone">
            <form className="iphoneMessage column" onSubmit={this.handleTextSubmit}>
              <div className="field">
                  <label className="label">Text Message</label>
                <p className="control has-icons-left has-text-centered">
                    <input className="input iphoneText" type="textarea" placeholder="your text here" value={this.state.message} onChange={this.handleChangeMessage}/>
                  <span className="icon iphoneIcon is-left is-large">
                    <i className="fa fa-mobile-phone"></i>
                  </span>
                </p>
              </div>
            <div>
              <button className="textButton button is-success" name="Text" type="submit"> Text All Guests </button>
            </div>

            </form>
          </div>
            <div className="column is-3">
            </div>


        </div>
      </div>

      <div className="columns">
        <div className="column is-4"></div>
          <div className="list invite column is-5">
          <GuestList guest={this.props.guest}/>
          </div>
        <div className="column is-1"></div>
      </div>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    guest : state.guest,
    authenticate : state.authenticate,
    eventStatus : state.eventStatus,
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
            /*<div className="email">
              <form className="emailMessage column" onSubmit={this.handleEmailSubmit}>

                  <div className="field">
                    <label className="label emailLabel text">Email Message</label>
                    <p className="control has-icons-left has-text-centered">
                      <input className="input emailText" type="textarea" placeholder="Your email here" value={this.state.email} onChange={this.handleChangeEmail} />
                      <span className="icon emailIcon is-left is-medium">
                        <i className="fa fa-mail-forward"></i>
                      </span>
                    </p>
                  </div>

                <div>
                  <button className="emailButton button is-primary" name="Email" type="submit"> Email All Guests </button>
                </div>
              </form>

              <div className="column is-1"></div>
            </div>*/