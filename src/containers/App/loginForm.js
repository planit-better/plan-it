
import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser } from '../../action';

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
    console.log(this.state)
    this.login(this.state)
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

  login(user){
    return fetch('/logIn',{
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

  render(){
    return(
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <div id="navBar">
        <Link to="/"><button>Home</button></Link>
        </div>
        <form onSubmit={this.handleLoginSubmit}>
            <div>
              <span>Username</span>
                <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChangeUsername} />
            </div>
            <div>
              <span>Password</span>
                <input type="password" placeholder="password"  value={this.state.password} onChange={this.handleChangePassword} />
            </div>
             <div>
              <button name="Signup" type="submit">Log in </button>
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

const ConnectedLoginApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(loginForm);

export default ConnectedLoginApp;