/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadGuest } from '../../action';
import GuestList from '../../components/guestList';

class newGuestForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      name : "",
      number : "",
      email: "",
      will_attend : false,
      accompanying_guests : 0,
      can_drink : false,
      diet_restriction : "",
      event_id : this.props.eventStatus.currentEvent.id,
      formOpen : false
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

    handleChangeEmail = ( event ) => {
      this.setState({
        email : event.target.value
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
        number : "",
        email : "",
        accompanying_guests : 0,
        diet_restriction : ""
      });
    }

    updateStore(){
     fetch('/api/Guest', {
      method: "GET",
      credentials: 'include'
    }).then((response) =>{
      return response.json()
    }).then((guest) =>{
      this.props.loadGuest(guest)
    }).catch(err =>{
      throw err;
    })
  }

  openForm = () => {
    this.setState({
      formOpen : !this.state.formOpen
    })
  }


  addGuest(guest){
    return fetch('/api/guest',{
      method: "POST",
      credentials: 'include',
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

       if(this.props.currentUser.userLoggedIn === false){
      return(
        <Redirect to={{
          pathname : '/'
        }} />
        )
    }


      if(this.state.formOpen === true){

    return (


      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <h3>{this.props.eventStatus.currentEvent.name}</h3>
          <h3>{this.props.currentUser.username}</h3>
          <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
          <button className="button is-outlined is-small" onClick={this.openForm}>New Guest Form</button>
        </div>



        <div className="columns">

          <form className="column is-offset-2" onSubmit={this.handleGuestSubmit}>

            <div className="field">
              <p className="control">
                <label className="label">Name</label>
              </p>
              <p className="control has-icons-left">
                <input className="input is-small" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
                <span className="icon is-small is-left">
                  <i className="fa fa-user"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <label className="label">Number</label>
              </p>
              <p className="control has-icons-left">
                <input className="input is-small" type="text" placeholder="(555) 555-5555" value={this.state.number} onChange={this.handleChangeNumber} />
                <span className="icon is-small is-left">
                  <i className="fa fa-phone"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <label className="label">Email</label>
              </p>
              <p className="control has-icons-left">
                <input className="input" type="text" placeholder="email" value={this.state.email} onChange={this.handleChangeEmail} />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <label className="checkbox label">
                  Will Attend
                </label>
                <label className="checkbox">
                  Yes
                  <input type="checkbox" className="checkbox" name="attend" value={this.state.will_attend} onChange={this.handleChangeWillAttend}/>
                </label>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <label className="label">Number of accompanying guests</label>
                <input id="numberGuests" className="input is-small" type="number" value={this.state.accompanying_guests} onChange={this.handleChangeAccompanyingGuests} />
              </p>
            </div>

            <div className="field">
              <p className="control">
                <label className="checkbox label">
                  Can drink
                </label>
                <label className="checkbox">
                  Yes
                  <input type="checkbox" className="checkbox" name="attend" value={this.state.can_drink} onChange={this.handleChangeCanDrink}/>
                </label>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <label className="label">
                  Diet Restrictions
                </label>
              </p>
              <p className="control has-icons-left">
                <input className="input is-small" type="text" value={this.state.diet_restriction} onChange={this.handleChangeDietRestriction} />
                <span className="icon is-small is-left">
                  <i className="fa fa-spoon"></i>
                </span>
              </p>
            </div>

            <div className="field control">
              <button className="button bottomButton is-outlined" name="Login" type="submit">Add Guest </button>
            </div>

          </form>

          <GuestList guest={this.props.guest} />


          <div className="column is-1"></div>
        </div>
      </div>
    );

      } else {
      return (
        <div className="App">

          <div className="App-header field">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Planit-Better</h2>
            <h3>{this.props.eventStatus.currentEvent.name}</h3>
            <h3>{this.props.currentUser.username}</h3>
            <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
            <button className="button is-outlined is-small" onClick={this.openForm}>New Guest Form</button>
             <Link to="/inviteForm"><button className="button is-outlined is-small">Create Message</button></Link>
          </div>
          <GuestList guest={this.props.guest} />
        </div>
        );
      }
  }
}



const mapStateToProps = (state) => {
  return {
    guest : state.guest,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus
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
