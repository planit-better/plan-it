/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { loadEquipment } from '../../action';
import EquipmentList from '../../components/equipmentList'

class newEquipmentForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      name : "",
      cost : "",
      type : "",
      event_id : this.props.eventStatus.currentEvent.id,
      formOpen : false
    };
  }

    handleEquipmentSubmit = ( event ) => {
      event.preventDefault();
      this.addEquipment(this.state)
      .then(this.clearState())
      .then(this.updateStore())
      .then(this.addEquipBudget())

    }

    handleChangeName = ( event ) => {
      this.setState({
        name : event.target.value
      });
    }

    handleChangeCost = ( event ) => {
      this.setState({
        cost : event.target.value
      });
    }

    handleChangeType = ( event ) => {
      this.setState({
        type : event.target.value
      });
    }


    clearState(){
      this.setState({
      name : "",
      cost : "",
      type : ""
      });
    }

    updateStore(){
     fetch('/api/Equipment', {
      method: "GET",
      credentials : 'include'
    }).then((response) =>{
      return response.json()
    }).then((equipment) =>{
      this.props.loadEquipment(equipment)
    }).catch(err =>{
      throw err;
    })
  }


    addEquipment(equipment){
      return fetch('/api/equipment',{
        method: "POST",
         credentials : 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(equipment)
      }).then(response =>{
        return(response)
      }).catch(err => {
        throw err;
      })
    }


    openForm = () => {
      this.setState({
        formOpen : !this.state.formOpen
      })
    }

    addEquipBudget(){
      return fetch('/api/budget', {
        method: "POST",
        credentials: 'include',
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "type": "Equipment",
          "amount": this.state.cost,
          "event_id": this.props.eventStatus.currentEvent.id
        })
      }).then(response =>{
        return response
      }).catch(err =>{
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
      <div className="App equipmentBackground">

        <div className="nav has-shadow equipmentNavColor">
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
              <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>Hide Equipment Form</a>
            </div>
          </div>
        </div>

        <br></br>

        <div className="columns">
          <div className="column is-offset-2 is-4 list guestHome">

            <form onSubmit={this.handleEquipmentSubmit}>
              <div className="field">
                <p className="control">
                  <label className="label">Name</label>
                </p>
                <p className="control has-icons-left">
                  <input className="input" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
                  <span className="icon is-left is-small">
                    <i className="fa fa-address-card-o"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Cost</label>
                </p>
                <p className="control has-icons-left">
                  <input className="input" type="text" placeholder="Cost" value={this.state.cost} onChange={this.handleChangeCost} />
                  <span className="icon is-left is-small">
                    <i className="fa fa-usd"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <label className="label">Type</label>
                </p>
                <p className="control has-icons-left">
                  <input className="input" type="text" placeholder="Name" value={this.state.type} onChange={this.handleChangeType} />
                  <span className="icon is-left is-small">
                    <i className="fa fa-wrench"></i>
                  </span>
                </p>
              </div>

              <div className="control">
                <button className="button bottomButton is-outlined equipmentNavColor" name="Login" type="submit">Add Equipment </button>
              </div>

            </form>
          </div>


          <br></br><br></br>



          <div className="column is-3"></div>


          <div className="column is-2 list guestHome">

            <EquipmentList equipment={this.props.equipment} />
          </div>

          <div className="column is-3 is-offset-4"></div>

        </div>

      </div>

    );
  }else{
    return(
      <div className="App equipmentBackground">
        <div className="nav has-shadow equipmentNavColor">
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
              <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>New Equipment Form</a>
            </div>
          </div>

        </div>

        <br></br>

        <div className="columns">

          <div className="column"></div>

          <div className="list column is-4 guestHome">
            <EquipmentList equipment={this.props.equipment} />
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
    equipment : state.equipment,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadEquipment: equipment =>{
      dispatch(loadEquipment(equipment))
    }
  }
}

const ConnectedEquipmentApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(newEquipmentForm);



export default ConnectedEquipmentApp;