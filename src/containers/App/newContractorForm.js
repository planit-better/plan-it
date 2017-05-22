/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadContractors } from '../../action';

class newContractorForm extends Component {

  constructor(props){

    super(props);
  }

    render() {
    console.log(this.props.contractors)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <Link to="/">Home</Link>
        <div id="navBar">
          <button>Home</button>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadContractors: contractors =>{
      dispatch(loadContractors(contractors))
    }
  }
}

const ConnectedContractorApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(newContractorForm);



export default ConnectedContractorApp;

