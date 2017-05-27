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
      email: "",
      will_attend : false,
      accompanying_guests : "",
      can_drink : false,
      diet_restriction : "",
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

  openForm = () => {
    this.setState({
      formOpen : !this.state.formOpen
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
      if(this.state.formOpen === true){

    return (


      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
        </div>

        <div id="navBar">
          <Link to="/"><button>Home</button></Link>
        </div>

        <div className="columns">

          <form className="column is-offset-3" onSubmit={this.handleGuestSubmit}>

            <div className="field">
              <p className="control">
                <label className="label">Name</label>
                <input className="input" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
              </p>
            </div>

            <div className="field">
              <p className="control">
                <label className="label">Number</label>
                <input className="input" type="text" placeholder="(555) 555-5555" value={this.state.number} onChange={this.handleChangeNumber} />
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
                <input className="input" type="number" value={this.state.accompanying_guests} onChange={this.handleChangeAccompanyingGuests} />
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
                <input className="input" type="text" value={this.state.diet_restriction} onChange={this.handleChangeDietRestriction} />
              </p>
            </div>

            <div className="field">
              <p className="control">
                <button className="button is-info" name="Login" type="submit">Add Guest </button>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <Link to="/inviteForm">
                  <button>
                    Create Invite
                  </button>
                </Link>
              </p>
            </div>

          </form>

          <GuestList class="column" guest={this.props.guest} />
          <div className="column is-1"></div>
        </div>
      </div>
    );

        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Planit-Better</h2>
            <h3>{this.props.eventStatus.currentEvent.name}</h3>
            <h3>{this.props.currentUser.username}</h3>
          </div>
          <div id="navBar">
            <Link to="/"><button>Home</button></Link>
          </div>
          <div>
            <button onClick={this.openForm}>New Guest Form</button>
          </div>
            <form onSubmit={this.handleGuestSubmit}>
              <div>
               <span>Name</span>
                <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
              </div>
              <div>
               <span>Phone Number</span>
                <input type="text" placeholder="Number" value={this.state.number} onChange={this.handleChangeNumber} />
              </div>
              <div>
               <span>Email</span>
                <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} />
              </div>
              <div>
              <span>Will Attend</span>
                <span>Yes</span><input type="checkbox" name="attend" value={this.state.will_attend} onChange={this.handleChangeWillAttend}/>
              </div>
              <div>
                <span>Accompanying Guests Number</span>
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
              <div>
                <Link to="/inviteForm"><button>Create Invite</button></Link>
              </div>
            </form>
            <GuestList guest={this.props.guest} />
        </div>
        );
      } else {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Planit-Better</h2>
            <h3>{this.props.eventStatus.currentEvent.name}</h3>
            <h3>{this.props.currentUser.username}</h3>
          </div>
          <div id="navBar">
            <Link to="/"><button>Home</button></Link>
          </div>
          <div>
            <button onClick={this.openForm}>New Guest Form</button>
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

