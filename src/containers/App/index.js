import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';


class App extends Component {

  constructor(props){

    super(props);
  }

    componentWillMount() {
     fetch('/api/Contractors', {
      method: "GET"
    }).then((response) =>{
      return response.json()
    }).then((contractors) =>{
      console.log(contractors)
    }).catch(err =>{
      throw err;
    })
  }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <p className="App-intro">
          <button>Load Users</button>
        </p>
      </div>
    );
  }
}

export default App;
