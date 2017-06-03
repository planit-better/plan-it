

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
      password : "",
      error: ""
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
          this.setState({
            error: "invalid username password"
          })
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
      <div className="App logHome">

        <div className="nav logHeader has-shadow">
          <div className="nav-left ">
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
              <a className="nav-item is-tab is-hidden-mobile is-active text"><Link to="/"><h1 className="text">Home</h1></Link></a>
            </div>
          </div>
        </div>


        <form onSubmit={this.handleLoginSubmit}>
          <div className="field centerInput">
            <p className="control">
              <label className="label text">Username</label>
            </p>
            <p className="control has-icons-left">
              <input className="input" type="text" placeholder="username" value={this.state.username} onChange={this.handleChangeUsername} />
              <span className="icon is-small is-left">
                <i className="fa fa-user"></i>
              </span>
            </p>
          </div>

          <div className="field centerInput">
            <p className="control">
              <label className="label text">Password</label>
            </p>
            <p className="control has-icons-left">
              <input className="input" type="password" placeholder="password"  value={this.state.password} onChange={this.handleChangePassword} />
              <span className="icon is-small is-left">
                <i className="fa fa-key"></i>
              </span>
            </p>
          </div>

          <div>
            <button className="button bottomButton is-outlined" name="Signup" type="submit"> Login </button>
          </div>
        </form>
          <div>
            <p>{this.state.error}</p>
          </div>


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