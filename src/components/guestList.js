/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadGuest } from '../action';




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



   render() {
    let allowedGuest = []
     for(var i=0; i<this.props.guest.length; i++){
      console.log(this.props.guest[i])
      console.log(allowedGuest)
     }
    return(
      <div className="field">
        <h1 className="label">Hello Guests</h1>
        <ul>
          {
            this.props.guest.map((name) =>
              <li className="guests" key={name.id}><h3>{name.name}</h3></li>
              )
          }

        </ul>
      </div>
      )

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

const ConnectedGuestListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(GuestList);



export default ConnectedGuestListApp;


