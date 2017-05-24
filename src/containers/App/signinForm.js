/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser } from '../../action';

class signinForm extends Component{
  constructor(props) {

    super(props);

    this.state = {
      username : "",
      password : ""
    };


  }

  componentWillMount() {
    fetch('/api/User', {
      method : "GET"
    }).then((response)=>{
      return response.json()
    }).then((user) =>{
      this.props.loadUser(user)
    }).catch(err =>{
      throw err;
    })
  }

  handleSigninSubmit = ( event ) => {
    event.preventDefault();
    console.log(this.state)
    this.addUser(this.state)
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

  addUser(user){
    return fetch('/api/User',{
        method: "POST",
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(user)
      }).then(response =>{
        return(response)
      }).catch(err => {
        throw err;
      })
  }

  clearState(){
    this.setState({
      username : "",
      password : ""
    });
  }

  render() {
    console.log(this.props.user)
    return(
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <div id="navBar">
        <Link to="/"><button>Home</button></Link>
        </div>
        <form onSubmit={this.handleSigninSubmit}>
            <div>
              <span>Username</span>
                <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChangeUsername} />
            </div>
            <div>
              <span>Password</span>
                <input type="password" placeholder="password"  value={this.state.password} onChange={this.handleChangePassword} />
            </div>
             <div>
              <button name="Signup" type="submit">Sign Up </button>
            </div>
          </form>
      </div>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    user : state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadUser: user =>{
      dispatch(loadUser(user))
    }
  }
}

const ConnectedUserApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(signinForm);

export default ConnectedUserApp;