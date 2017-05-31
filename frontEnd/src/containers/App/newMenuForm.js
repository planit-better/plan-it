/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadMenu } from '../../action';
import MenuList from '../../components/menuList';

class newMenuForm extends Component {

  constructor(props){

    super(props);

    this.state = {
      type_of_food : "",
      cost_per_person : "",
      restaurant_name : "",
      event_id : this.props.eventStatus.currentEvent.id,
      formOpen : false
    };
  }

    handleMenuSubmit = ( event ) => {
      event.preventDefault();
      this.addMenu(this.state)
      .then(this.clearState())
      .then(this.updateStore())
      .then(this.addMenuBudget())

    }

    handleChangeTypeOfFood = ( event ) => {
      this.setState({
        type_of_food : event.target.value
      });
    }

    handleChangeCostPerPerson = ( event ) => {
      this.setState({
        cost_per_person : event.target.value
      });
    }

    handleChangeRestaurantName = ( event ) => {
      this.setState({
       restaurant_name : event.target.value
      });
    }

    clearState(){
      this.setState({
        type_of_food : "",
        cost_per_person : "",
        restaurant_name : ""
      });
    }

    updateStore(){
     fetch('/api/Menu', {
      method: "GET",
      credentials: 'include'
    }).then((response) =>{
      return response.json()
    }).then((menu) =>{
      this.props.loadMenu(menu)
    }).catch(err =>{
      throw err;
    })
  }

  openForm = () => {
        this.setState({
          formOpen : !this.state.formOpen
        })
      }


  addMenu(menu){
      return fetch('/api/menu',{
        method: "POST",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(menu)
      }).then(response =>{
        return(response)
      }).catch(err => {
        throw err;
      })
    }

    addMenuBudget(){
      return fetch('/api/budget', {
        method: "POST",
        credentials: 'include',
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "type": "Menu",
          "amount": this.state.cost_per_person,
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
          <button className="button formsHome is-outlined is-small" onClick={this.openForm}>Hide Menu Form</button>
        </div>


          <form onSubmit={this.handleMenuSubmit}>
            <div>
             <span>type of food</span>
              <input type="text" placeholder="type of food" value={this.state.type_of_food} onChange={this.handleChangeTypeOfFood} />
            </div>
            <div>
            <span> Price </span>
              <input type="number"  value={this.state.cost_per_person} onChange={this.handleChangeCostPerPerson} />
            </div>
            <div>
              <span>restaurant name Number</span>
              <input type="text" value={this.state.restaurant_name} onChange={this.handleChangeRestaurantName} />
            </div>
            <div>
              <button name="Login" type="submit">Add Menu </button>
            </div>
          </form>
          <MenuList menu={this.props.menu} />

      </div>
    );
  }else {
    return(
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Planit-Better</h2>
          <h3>{this.props.eventStatus.currentEvent.name}</h3>
          <h3>{this.props.currentUser.username}</h3>
        </div>
        <div>
          <Link className=" formsHome is-outlined is-small" to="/"><button>Home</button></Link>
        </div>
        <div>
          <button className=" formsHome is-outlined is-small"  onClick={this.openForm}>Hide Menu Form</button>
        </div>

        <MenuList menu={this.props.menu} />
      </div>
      )
  }
  }

}

const mapStateToProps = (state) => {
  return {
    menu : state.menu,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadMenu: menu =>{
      dispatch(loadMenu(menu))
    }
  }
}

const ConnectedMenuApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(newMenuForm);



export default ConnectedMenuApp;