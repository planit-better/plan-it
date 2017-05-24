/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class signinForm extends Component{
  constructor(props) {

    super(props);

    this.state = {
      username : "",
      password : ""
    };

  }

  render() {
    return(
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <div id="navBar">
        <Link to="/"><button>Home</button></Link>
        </div>
        <form onSubmit={this.handleTaskSubmit}>
            <div>
             <span>Username</span>
              <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChangeUsername} />
            </div>
            <div>
            <span>Password</span>
              <input type="password" placeholder="password"  value={this.state.password} onChange={this.handleChangePassword} />
            </div>
          </form>
      </div>
    )
  }


}
export default signinForm;