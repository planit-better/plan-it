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
            <div className="nav">
              <div className="nav-left">
                <a className="nav-item">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1>Planit-Better</h1>
                </a>
              </div>
                  <h3>{this.props.eventStatus.currentEvent.name}</h3>
                  <h3>{this.props.currentUser.username}</h3>

                  <div id="nav">
                    <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
                    <button className="button is-outlined is-small" onClick={this.openForm}>Hide Menu Form</button>
                  </div>

            </div>

            <div className="columns">
              <div className="column">
                <form onSubmit={this.handleMenuSubmit}>

                  <div className="field centerInput">
                    <p className="control">
                      <label className="label">type of food</label>
                    </p>
                    <p className="control has-icons-left">
                      <input className="input" type="text" placeholder="type of food" value={this.state.type_of_food} onChange={this.handleChangeTypeOfFood} />
                      <span className="icon is-left is-small">
                        <i className="fa fa-cutlery"></i>
                      </span>
                    </p>
                  </div>

                  <div className="field centerInput">
                    <p className="control">
                      <label className="label"> Price </label>
                    </p>
                    <p className="control has-icons-left">
                        <input className="input" type="number"  value={this.state.cost_per_person} onChange={this.handleChangeCostPerPerson} />
                      <span className="icon is-left is-small">
                        <i className="fa fa-usd"></i>
                      </span>
                    </p>
                  </div>

                  <div className="field centerInput">
                    <p className="control">
                        <label className="label">restaurant name Number</label>
                    </p>
                    <p className="control has-icons-left">
                        <input className="input" type="text" value={this.state.restaurant_name} onChange={this.handleChangeRestaurantName} />
                      <span className="icon is-left is-small">
                        <i className="fa fa-sort-numeric-asc"></i>
                      </span>
                    </p>
                  </div>

                  <div>
                    <button className=" addTask button is-large is-success" name="Login" type="submit">Add Menu </button>
                  </div>
                </form>
              </div>

              <div className="column is-three-quarters">
                <MenuList menu={this.props.menu} />
              </div>
            </div>
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
          <div>
            <Link to="/"><button className=" button is-outlined is-small">Home</button></Link>
            <button className=" button is-outlined is-small"  onClick={this.openForm}>New Menu Form</button>
          </div>
        </div>

        <br></br>
        <div>
          <MenuList menu={this.props.menu} />
        </div>
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