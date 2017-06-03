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


      <div className="App guestBackground">

        <div className="guest nav has-shadow">
          <div className="nav-left">
            <div className="nav-item">
              <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
              <h1 className="title is-3">Planit-Better</h1>
            </div>

              <h3 className="menuEvent">{this.props.eventStatus.currentEvent.name}</h3>
          </div>

          <div className="nav-center">
            <div className="nav-item">
              <h3>{this.props.currentUser.username}</h3>
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-item">
              <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/">Home</Link></a>
              <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>Hide Guest Form</a>
            </div>
          </div>
        </div>

            <br></br>

        <div className="columns">

          <div className="column"></div>

          <div className="column list control is-4">
            <form className="centerGuestForm" onSubmit={this.handleGuestSubmit}>

              <label className="label">Enter your new guest</label>

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
                  <input className="input emailInput is-small" type="text" placeholder="email" value={this.state.email} onChange={this.handleChangeEmail} />
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
                  <input id="numberGuests" className="input smallInput is-small" type="number" value={this.state.accompanying_guests} onChange={this.handleChangeAccompanyingGuests} />
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
                <button className="button is-outlined guest" name="Login" type="submit">Add Guest </button>
              </div>

            </form>
          </div>

          <div className="column"></div>

          <br></br>


          <div className="guestHome column list is-4">
            <GuestList guest={this.props.guest} />
          </div>

          <div className="column"></div>


        </div>
      </div>
    );

      } else {
      return (
        <div className="App guestBackground">
          <div className="nav has-shadow guest">
            <div className="nav-left">
              <div className="nav-item">
                <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />

                <h2 className="title is-3">Planit-Better</h2>
              </div>
              <h3 className="menuEvent">{this.props.eventStatus.currentEvent.name}</h3>
            </div>

            <div className="nav-center">
              <div className="nav-item">
               <h3>{this.props.currentUser.username}</h3>
              </div>
            </div>

            <div className="nav-right">
              <div className="nav-item">
                <a className="nav-item is-tab is-hidden-mobile is-active"><Link to="/">Home</Link></a>
                <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>New Guest Form</a>
              </div>
            </div>
          </div>

        <br></br>
        <div className="columns">

          <div className="column"></div>

            <div className="list guestHome column is-4">
              <div className="control">
                <Link to="/inviteForm"><button className="button is-outlined is-small is-pulled-right guest">Create Message</button></Link>
                <div className="notePad centerGuestForm">
                  <GuestList guest={this.props.guest} />
                </div>
              </div>

            </div>

            <div className="column"></div>
          </div>
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
