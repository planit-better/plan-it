/*jshint esversion: 6*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
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
       if(this.props.currentUser.userLoggedIn === false){
          return(
            <Redirect to={{
              pathname : '/'
            }} />
            )
        }

      if(this.state.formOpen === true){

    return (
          <div className="App menuBackground">
            <div className="nav has-shadow menuNavColor">
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
                  <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>Hide Menu Form</a>
                </div>
              </div>
            </div>

            <br></br>

            <div className="columns">
              <form className="list guestHome column is-4 is-offset-2" onSubmit={this.handleMenuSubmit}>

                <div className="field">
                  <p className="control">
                    <label className="label">type of food</label>
                  </p>
                  <p className="control has-icons-left">
                    <input className="input is-small" type="text" placeholder="type of food" value={this.state.type_of_food} onChange={this.handleChangeTypeOfFood} />
                    <span className="icon is-left is-small">
                      <i className="fa fa-cutlery"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label"> Price </label>
                  </p>
                  <p className="control has-icons-left">
                      <input className="input is-small" type="number"  value={this.state.cost_per_person} onChange={this.handleChangeCostPerPerson} />
                    <span className="icon is-left is-small">
                      <i className="fa fa-usd"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                      <label className="label">restaurant name Number</label>
                  </p>
                  <p className="control has-icons-left">
                      <input className="input is-small" type="text" value={this.state.restaurant_name} onChange={this.handleChangeRestaurantName} />
                    <span className="icon is-left is-small">
                      <i className="fa fa-sort-numeric-asc"></i>
                    </span>
                  </p>
                </div>

                <div>
                  <button className="button bottomButton is-small is-outlined menuNavColor" name="Login" type="submit">Add Menu </button>
                </div>
              </form>

              <div className="column is-3"></div>

              <div className="guestHome column list is-2">
                <MenuList menu={this.props.menu} />
              </div>

              <div className="column is-3 is-offset-4"></div>

            </div>
          </div>
    );
  }else {
    return(
      <div className="App menuBackground">
        <div className="nav has-shadow menuNavColor">
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
              <a className="nav-item is-tab is-hidden-mobile" onClick={this.openForm}>New Menu Form</a>
            </div>
          </div>
        </div>

        <br></br>
        <div className="columns">
          <div className="column"></div>

          <div className="list guestHome column is-4">
            <MenuList menu={this.props.menu} />
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