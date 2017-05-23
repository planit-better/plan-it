/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadGuest } from '../../action';

class newGuestForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      name : "",
      will_attend : false,
      accompanying_guests : "",
      can_drink : false,
      diet_restriction : ""
    };
  }

    handleGuestSubmit = ( event ) => {
      event.preventDefault();
      console.log(this.state)
      this.addGuest(this.state)
      .then(this.clearState())
      .then(this.updateStore())

    }

    handleChangeName = ( event ) => {
      this.setState({
        name : event.target.value
      });
    }

    handleChangeWillAttend = ( event ) => {
      if(this.state.will_attend === true){
        this.setState({
          will_attend : false
        });
      }
      else if(this.state.will_attend === false){
        this.setState({
          will_attend : true
        })
      }
    }

    handleChangeAccompanyingGuests = ( event ) => {
      this.setState({
        accompanying_guests : event.target.value
      });
    }

    handleChangeCanDrink = ( event ) => {
      if(this.state.can_drink === true){
        this.setState({
          can_drink : false
        });
      }
      else if(this.state.can_drink === false){
        this.setState({
          can_drink : true
        })
      }
    }

    handleChangeDietRestriction = ( event ) => {
      this.setState({
        diet_restriction : event.target.value
      });
    }

    clearState(){
      this.setState({
        name : "",
        accompanying_guests : "",
        diet_restriction : ""
      });
    }

    updateStore(){
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


    addGuest(guest){
      return fetch('/api/guest',{
        method: "POST",
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(guest)
      }).then(response =>{
        return(response)
      }).catch(err => {
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
        <div id="navBar">
        <Link to="/"><button>Home</button></Link>
        </div>
          <form onSubmit={this.handleGuestSubmit}>
            <div>
             <span>Name</span>
              <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
            </div>
            <div>
            <span>Will Attend</span>
              <span>Yes</span><input type="checkbox" name="attend" value={this.state.will_attend} onChange={this.handleChangeWillAttend}/>
            </div>
            <div>
              <span>accompanying guests Number</span>
              <input type="number" value={this.state.accompanying_guests} onChange={this.handleChangeAccompanyingGuests} />
            </div>
            <div>
            <span>Can drink</span>
              <span>Yes</span><input type="checkbox" name="attend" value={this.state.can_drink} onChange={this.handleChangeCanDrink}/>
            </div>
            <div>
            <span>Diet Restrictions</span>
              <input type="text" value={this.state.diet_restriction} onChange={this.handleChangeDietRestriction} />
            </div>
            <div>
              <button name="Login" type="submit">Add Guest </button>
            </div>
          </form>

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

const ConnectedGuestApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(newGuestForm);



export default ConnectedGuestApp;

