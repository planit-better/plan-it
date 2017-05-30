

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadUser, authUser } from '../../action';

class loginForm extends Component{
  constructor(props) {

    super(props);

    this.state = {
      username : "",
      password : ""
    };
  }

  handleLoginSubmit = ( event ) => {
    event.preventDefault();
    this.login(this.state)
    .then(this.clearState())
  }

  handleChangeUsername = ( event ) => {
    this.setState({
      username : event.target.value
    });
  }

  handleChangePassword = ( event ) => {
    this.setState({
      password : event.target.value
    });
  }

  clearState(){
    this.setState({
      username : "",
      password : ""
    });
  }

  login(user){
    return fetch('/logIn',{
        method: "POST",
        credentials : 'include',
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(user)
      }).then(response =>{
          return(response.json())


      }).then(data => {
        if(data.message === 'invalid'){
        }
        else {
          this.props.authUser(user)
        }
      })
  }

  render(){
      if(this.props.currentUser.userLoggedIn === true){
        return(
        <Redirect to={{
          pathname: '/eventForm',
        }} />
        )
      }
    return(
      <div className="App">

        <div className="App-header field">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <h2>Planit-Better</h2>
          </p>
          <div id="navBar" className="level-item">
            <h3>{this.props.eventStatus.currentEvent.name}</h3>
            <h3>{this.props.currentUser.username}</h3>
              <Link to="/"><button className="button formsHome is-outlined is-small">Home</button></Link>
          </div>

        </div>


        <form onSubmit={this.handleLoginSubmit}>

          <div className="field">
            <label className="label">Username</label>
            <p className="has-icons-left">
              <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChangeUsername} />
              <span className="icon is-small is-left">
                <i className="fa fa-user"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <p className="has-icons-left">
              <input type="password" placeholder="password"  value={this.state.password} onChange={this.handleChangePassword} />
              <span className="icon is-small is-left">
                <i className="fa fa-key"></i>
              </span>
            </p>
          </div>

          <div>
            <button className="button bottomButton is-outlined" name="Signup" type="submit">Log in </button>
          </div>

        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadUser: user =>{
      dispatch(loadUser(user))
    },
    authUser: currentUser => {
      dispatch(authUser(currentUser))
    }
  }
}

const ConnectedLoginApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(loginForm);

export default ConnectedLoginApp;