/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadUser } from '../../action';
import InvalidUsername from '../../components/invalidUsername';

class signinForm extends Component{
  constructor(props) {

    super(props);

    this.state = {
      username : "",
      password : "",
      signedIn : false,
      error : ""
    };

  }

  componentWillMount() {
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

  handleSigninSubmit = ( event ) => {
    event.preventDefault();
    this.addUser(this.state)
    //.then(this.clearState())
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
    let usernames =[];
    for(var i=0; i<this.props.user.length; i++){
      usernames.push(this.props.user[i].username)
    }
    console.log(usernames)
    console.log(user.username)
    if(usernames.indexOf(user.username) === -1){
      this.setState({
        signedIn : true
      })
      fetch('/api/User',{
          method: "POST",
          credentials : 'include',
          headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(user)
        }).then(response =>{
          this.clearState()
          this.signedIn = true;
        }).catch(error => {
          this.setState({
            error
          });
        })
    } else {
      this.setState({
        error : 'username is taken',
        username : "",
        password : ""
      })

    }
  }

  clearState(){
    this.setState({
      username : "",
      password : "",
      error : ""
    });
  }

  render() {
    if(this.state.signedIn === true){
      return(
        <Redirect to={{
          pathname : '/loginForm'
        }} />
        )
    }
    return(
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <div id="navBar">
            <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
          </div>
        </div>


        <form onSubmit={this.handleSigninSubmit}>
          <div className="field centerInput">
            <p className="control">
              <label className="label">Username</label>
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
              <label className="label">Password</label>
            </p>
            <p className="control has-icons-left">
              <input className="input" type="password" placeholder="password"  value={this.state.password} onChange={this.handleChangePassword} />
              <span className="icon is-small is-left">
                <i className="fa fa-key"></i>
              </span>
            </p>
          </div>

          <div>
            <button className="button bottomButton is-outlined" name="Signup" type="submit">Sign Up </button>
          </div>
        </form>

        <div>
          <InvalidUsername error={this.state}/>
        </div>

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