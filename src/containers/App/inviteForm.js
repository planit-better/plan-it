/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadGuest } from '../../action';
import GuestList from '../../components/guestList';
//import { groupText } from './text-reminder/text.js'


class InviteForm extends Component {

  constructor(props) {
    console.log(props)

    super(props);

    this.state = {
      message : ""
    };

  }


  componentWillMount() {
    fetch('/api/Guest', {
      method: "GET"
    }).then((response) =>{
      return response.json()
    }).then((guest) =>{
      this.props.loadGuest(guest)
    }).catch(err =>{
      throw err;
    })
  }

    handleTextSubmit = ( event ) => {
      event.preventDefault();
      this.text()
      .then(this.clearState())


    }

    handleChangeMessage = ( event ) => {
      this.setState({
        message : event.target.value
      });
    }

    clearState(){
      this.setState({
        message : ""
      });
    }

    text(){
      console.log('sending text')
      return fetch('api/text', {
        method : "POST",
        headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify(this.state)
      }).then((response) =>{
        return response.json()
      }).catch(err => {
        throw err;
      })
    }

    render() {
      console.log(this.props.guest)





    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>
        <div id="navBar">
        <Link to="/"><button>Home</button></Link>
        </div>

        <div>
        <form onSubmit={this.handleTextSubmit}>
          <div>
             <span>Text Message</span>
              <input type="text" placeholder="Your text here" value={this.state.message} onChange={this.handleChangeMessage} />
            </div>
            <div>
              <button name="Text" type="submit"> Text All Guests </button>
            </div>

        </form>
      <div>
      </div>

      </div>
        <GuestList guest={this.props.guest}/>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    guest : state.guest
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadGuest: guest =>{
      dispatch(loadGuest(guest))
    }
  }
}


const ConnectedContractorApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(InviteForm);



export default ConnectedContractorApp;

