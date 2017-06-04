/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadGuest, loadCurrentGuest } from '../action';
import { Link } from 'react-router-dom';




class GuestList extends Component {
  constructor(props) {

    super(props);

  }

  componentWillMount() {
    fetch('/api/Guest', {
      method: "GET",
      credentials : 'include'
    }).then((response) =>{
      return response.json()
    }).then((guest) =>{
      this.props.loadGuest(guest)
    }).catch(err =>{
      throw err;
    })
  }

  guestRef( guest ) {
    this.props.loadCurrentGuest( guest )
  }


   render() {
    let allowedGuest = []
     for(var i=0; i<this.props.guest.length; i++){
      if(this.props.guest[i].event_id === this.props.eventStatus.currentEvent.id){
        allowedGuest.push(this.props.guest[i])
      }
     }
    return(


      <div className="field">

        <label className="label">Hello Guests</label>
        <ul>
          {
            allowedGuest.map((guest) =>
              <Link to="/guestProfile" key={guest.id} >
                <li onClick={this.guestRef.bind(this, guest)}>
                  <h3>{guest.name}</h3>
                </li>
              </Link>
              )
          }

        </ul>

      </div>
      )

   }

}

const mapStateToProps = (state) => {
  return {
    guest : state.guest,
    eventStatus : state.eventStatus,
    currentGuest : state.authenticate
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadGuest: guest =>{
      dispatch(loadGuest(guest))
    },
    loadCurrentGuest : guest => {
      dispatch(loadCurrentGuest(guest))
    }
  }
}

const ConnectedGuestListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(GuestList);



export default ConnectedGuestListApp;