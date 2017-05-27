/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadGuest } from '../../action';
import GuestList from '../../components/guestList';

class newGuestForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      name : "",
      number : "",
      will_attend : false,
      accompanying_guests : "",
      can_drink : false,
      diet_restriction : ""
    };
  }

    handleGuestSubmit = ( event ) => {
      event.preventDefault();
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

      handleChangeNumber = ( event ) => {
      this.setState({
        number : event.target.value
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
      console.log(response)
      return response.json()
    }).then((guest) =>{
      console.log(guest)
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
      console.log(this.props.guest)
    return (

      <div class="App columns">

        <div class="App-header column">
          <img src={logo} class="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>

        <div id="navBar">
          <Link to="/"><button>Home</button></Link>
        </div>


        <form class="field column" onSubmit={this.handleGuestSubmit}>
          <div class="field">
            <label class="label">Name</label>
            <p class="control">
              <input class="input" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
            </p>
          </div>

          <div class="field">
            <label class="label">Number</label>
            <p class="control">
              <input class="input" type="text" placeholder="(555) 555-5555" value={this.state.number} onChange={this.handleChangeNumber} />
            </p>
          </div>

          <div class="field">
            <p class="control">
              <label class="checkbox">
                Will Attend
                <input type="checkbox" name="attend" value={this.state.will_attend} onChange={this.handleChangeWillAttend}/>
                <label class="label">
                  Yes
                </label>
              </label>
            </p>
          </div>

          <div class="field">
            <label class="label">Number of accompanying guests</label>
            <p class="control">
              <input class="input" type="number" value={this.state.accompanying_guests} onChange={this.handleChangeAccompanyingGuests} />
            </p>
          </div>

          <div class="field">
            <p class="control">
              <label class="checkbox">Can drink

                <input type="checkbox" name="attend" value={this.state.can_drink} onChange={this.handleChangeCanDrink}/>
                <span>
                  Yes
                </span>
              </label>
            </p>
          </div>

          <div class="field">
            <label class="label">Diet Restrictions
            </label>
            <p class="control">
              <input class="input" type="text" value={this.state.diet_restriction} onChange={this.handleChangeDietRestriction} />
            </p>
          </div>

          <div class="field">
            <p class="control">
              <button class="button" name="Login" type="submit">Add Guest </button>
            </p>
          </div>

          <div class="field">
            <p class="control">
              <Link to="/inviteForm">
                <button>
                  Create Invite
                </button>
              </Link>
            </p>
          </div>

        </form>

        <GuestList class="column" guest={this.props.guest} />
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

