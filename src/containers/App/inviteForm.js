/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadGuest } from '../../action';

class InviteForm extends Component {


    render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <div id="navBar">
        <Link to="/"><button>Home</button></Link>
        </div>



      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    contractors : state.contractors
  };
}



const ConnectedContractorApp = connect(
  mapStateToProps,
  )(InviteForm);



export default ConnectedContractorApp;

