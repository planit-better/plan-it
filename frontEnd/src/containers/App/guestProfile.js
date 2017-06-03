

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadCurrentGuest, updateCurrentGuest, loadContractors, loadEquipment, loadGuest, loadMenu, loadTask, logOut, clearEvent } from '../../action';
import { Link, Redirect } from 'react-router-dom';



class GuestProfile extends Component {

  constructor(props){

    super(props);

    this.state={
      name : this.props.currentGuest.currentGuest.name,

      number : this.props.currentGuest.currentGuest.number,

      email: this.props.currentGuest.currentGuest.email,

      will_attend : false,

      accompanying_guests : this.props.currentGuest.currentGuest.accompanying_guests,

      can_drink : false,

      diet_restriction : this.props.currentGuest.currentGuest.diet_restriction,

      id: this.props.currentGuest.currentGuest.id,

      event_id : this.props.eventStatus.currentEvent.id
    }

  }

    handleGuestChangeSubmit = ( event ) => {
      event.preventDefault();
      this.updateGuest(this.state)
      .then(this.props.loadCurrentGuest(this.state))
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

    updateGuest = ( guest ) => {
        return fetch(`/api/guest/${this.props.currentGuest.currentGuest.id}`, {
        method: "PUT",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify(guest)
      }).then((response) =>{
        return response.json()
      }).catch(err =>{
        throw err;
      })
    }

    removeGuest = ( event ) => {
      event.preventDefault()
        return fetch(`/api/guest/${this.props.currentGuest.currentGuest.id}`, {
          method: "DELETE",
          credentials : "include",
          headers:
          {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
          }
        }).then((response) =>{
          this.redirectGuestList()
        }).catch(err =>{
          throw err;
        })

    }

    redirectGuestList(){
       this.props.history.push("/newGuestForm")
      }







    render() {
      console.log(this.props.currentGuest.currentGuest.id)
      console.log(this.state.id)
    if(this.props.currentUser.userLoggedIn === false){
    return(
      <Redirect to={{
        pathname : '/'
      }} />
      )
    }
    if(this.props.currentGuest.currentGuest.will_attend === true){

    return(

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
            </div>
          </div>
        </div>


        <div className="columns">
          <div className="column"></div>

          <div className="formsHome column list is-4">
            <form className="centerForm">

              <div className="field">
                <p className="control">
                  <label className="label">Change Name</label>
                  <input className="input is-small" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Change Number</label>
                  <input className="input is-small" type="text" placeholder="(555) 555-5555" value={this.state.number} onChange={this.handleChangeNumber} />
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Change Email</label>
                  <input className="input emailInput is-small" type="text" placeholder="email" value={this.state.email} onChange={this.handleChangeEmail} />
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
                  <label className="label">Change Number of accompanying guests</label>
                  <input className="input smallInput is-small" type="number" value={this.state.accompanying_guests} onChange={this.handleChangeAccompanyingGuests} />
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
                    Change Diet Restrictions
                  </label>
                  <input className="input is-small" type="text" value={this.state.diet_restriction} onChange={this.handleChangeDietRestriction} />
                </p>
              </div>

              <div className="field">
                <p className="control">
                    <button className="button guest" name="Login" onClick={this.handleGuestChangeSubmit}> Update Guest
                    </button>
                    <button className="button is-outlined guest" name="Remove" onClick={this.removeGuest}> Remove Guest
                    </button>
                </p>
              </div>

            </form>
          </div>

          <div className="column"></div>

          <div className="formsHome column list is-4">
            <label className="label">Attending</label>

            <p className="field">
              <label className="label">Name</label>
              <p>{this.props.currentGuest.currentGuest.name}</p>
            </p>

            <p className="field">
              <label className="label">Number</label>
              <span>{this.props.currentGuest.currentGuest.number}</span>
            </p>

            <p className="field">
              <label className="label">Email</label>
              <span>{this.props.currentGuest.currentGuest.email}</span>
            </p>

            <p className="field">
              <label className="label">accompanying guests</label>
              <span>{this.props.currentGuest.currentGuest.accompanying_guests}</span>
            </p>

            <p className="field">
              <label className="label">Diet Restrictions</label>
              <span>{this.props.currentGuest.currentGuest.diet_restriction}</span>
            </p>
          </div>

          <div className="column"></div>
        </div>


      </div>

        )
   } else {
      return(
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
              </div>
            </div>
          </div>


          <div className="columns">
            <div className="column"></div>

            <div className="formsHome column list is-4">

              <form className="centerForm" onSubmit={this.handleGuestChangeSubmit}>
                <div className="field">
                  <p className="control">
                    <label className="label">Change Name</label>
                    <input className="input is-small" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Number</label>
                    <input className="input is-small" type="text" placeholder="(555) 555-5555" value={this.state.number} onChange={this.handleChangeNumber} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Email</label>
                    <input className="input emailInput is-small" type="text" placeholder="email" value={this.state.email} onChange={this.handleChangeEmail} />
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
                    <label className="label">Change Number of accompanying guests</label>
                    <input className="input smallInput is-small" type="number" value={this.state.accompanying_guests} onChange={this.handleChangeAccompanyingGuests} />
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
                      Change Diet Restrictions
                    </label>
                    <input className="input is-small" type="text" value={this.state.diet_restriction} onChange={this.handleChangeDietRestriction} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <button className="button guest is-outlined" name="Login" type="submit">Update Guest </button>
                  </p>
                </div>

              </form>
            </div>

            <div className="column"></div>

            <div className="formsHome column list is-4">
              <label className="label">Not Attending</label>

              <p className="field">
                <label className="label">Name</label>
                <p>{this.props.currentGuest.currentGuest.name}</p>
              </p>

              <p className="field">
                <label className="label">Number</label>
                <span>{this.props.currentGuest.currentGuest.number}</span>
              </p>

              <p className="field">
                <label className="label">Email</label>
                <span>{this.props.currentGuest.currentGuest.email}</span>
              </p>

              <p className="field">
                <label className="label">accompanying guests</label>
                <span>{this.props.currentGuest.currentGuest.accompanying_guests}</span>
              </p>

              <p className="field">
                <label className="label">Diet Restrictions</label>
                <span>{this.props.currentGuest.currentGuest.diet_restriction}</span>
              </p>
            </div>

            <div className="column"></div>
          </div>


        </div>
          )
   }
  }
}

const mapStateToProps = (state) => {
  return {
    guest : state.guest,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus,
    currentGuest : state.currentGuest

  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCurrentGuest : currentGuest => {
      dispatch(loadCurrentGuest(currentGuest))
   },
    updateCurrentGuest : currentGuest => {
      dispatch(updateCurrentGuest(currentGuest))
    }
  }
}




const ConnectedProfileApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(GuestProfile);



export default ConnectedProfileApp;

