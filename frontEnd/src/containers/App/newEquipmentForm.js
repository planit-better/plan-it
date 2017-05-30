/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
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
      if(this.state.formOpen === true){

    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <h3>{this.props.eventStatus.currentEvent.name}</h3>
          <h3>{this.props.currentUser.username}</h3>
        </div>
          <div>
            <Link to="/"><button className="button formsHome is-outlined is-small">Home</button></Link>
          </div>

        <div>
          <button className="button is-outlined is-small" onClick={this.openForm}>Hide Equipment Form</button>
        </div>

          <form onSubmit={this.handleEquipmentSubmit}>
            <div>
             <span>Name</span>
              <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
            </div>
            <div>
            <span>Cost</span>
              <input type="integer" placeholder="cost" value={this.state.cost} onChange={this.handleChangeCost} />
            </div>
            <div>
              <span>Type of equipment</span>
              <input type="text" placeholder="type" value={this.state.type} onChange={this.handleChangeType} />
            </div>
            <div>
              <button name="Login" type="submit">Add Equipment </button>
            </div>
          </form>
          <EquipmentList equipment={this.props.equipment} />

      </div>
    );
  }else{
    return(
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Planit-Better</h2>
        <h3>{this.props.eventStatus.currentEvent.name}</h3>
        <h3>{this.props.currentUser.username}</h3>
      </div>
        <div>
          <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
        </div>
        <div>
          <button className="button is-outlined is-small" onClick={this.openForm}>New Equipment Form</button>
        </div>
      <EquipmentList equipment={this.props.equipment} />
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