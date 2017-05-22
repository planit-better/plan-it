/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadContractors } from '../../action';
import { Link } from 'react-router-dom';
class App extends Component {

  constructor(props){

    super(props);
  }

      //MOUNT EVENT
    componentWillMount() {
     fetch('/api/Contractors', {
      method: "GET"
    }).then((response) =>{
      return response.json()
    }).then((contractors) =>{
      this.props.loadContractors(contractors)
    }).catch(err =>{
      throw err;
    })
  }



  render() {
    console.log(this.props.contractors)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <Link to="/newContractorForm">Home</Link>
        <div id="navBar">
          <button>Contractors</button>
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

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);



export default ConnectedApp;


