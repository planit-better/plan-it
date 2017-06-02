

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadCurrentMenu, loadCurrentContractor, loadContractors, loadEquipment, loadGuest, loadMenu, loadTask, logOut, clearEvent } from '../../action';
import { Link, Redirect } from 'react-router-dom';



class MenuProfile extends Component {

  constructor(props){

    super(props);

    this.state={
      restaurant_name :this.props.currentMenu.currentMenu.restaurant_name,

      type_of_food : this.props.currentMenu.currentMenu.type_of_food,

      cost_per_person: this.props.currentMenu.currentMenu.cost_per_person,

    };

  }

    handleMenuChangeSubmit = ( event ) => {
      event.preventDefault();
      this.updateMenu(this.state)
      //.then(this.updateBudget(this.state))
      .then(this.props.loadCurrentMenu(this.state))
    }

    handleChangeRestaurantName = ( event ) => {
      this.setState({
        restaurant_name : event.target.value
      });
    }

    handleChangeCost = ( event ) => {
      this.setState({
        cost_per_person : event.target.value
      });
    }

    handleChangeType = ( event ) => {
      this.setState({
        type_of_food : event.target.value
      });
    }


    updateMenu = ( menu ) => {
        return fetch(`/api/menu/${this.props.currentMenu.currentMenu.id}`, {
        method: "PUT",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify(menu)
      }).then((response) =>{
        return response.json()
      }).catch(err =>{
        throw err;
      })
    }

   // updateBudget = ( contractor ) => {
   //      console.log('hit update budget')
   //      return fetch(`/api/budget/${this.props.currentContractor.currentContractor.id}`, {
   //      method: "PUT",
   //      credentials: 'include',
   //       headers:
   //      {
   //        "Content-Type": "application/json",
   //        "Accept": "application/json"
   //      },
   //      body : JSON.stringify({"amount": this.state.cost})
   //    }).then((response) =>{
   //      return response.json()
   //    }).catch(err =>{
   //      throw err;
   //    })
   // }




    render() {
      console.log(this.props.currentMenu)
    if(this.props.currentUser.userLoggedIn === false){
    return(
      <Redirect to={{
        pathname : '/'
      }} />
      )
    }

     return(

          <div className="App">
            <div className="App-header">
              <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
              <h2>Planit-Better</h2>
              <h3>{this.props.currentUser.username}</h3>
              <h3>{this.props.eventStatus.currentEvent.company_name}</h3>
            </div>
            <div id="navBar">
              <Link to="/"><button>Home</button></Link>
            </div>


            <div className="columns">
              <form className="column is-offset-3" onSubmit={this.handleMenuChangeSubmit}>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Restaurant Name</label>
                    <input className="input" type="text" placeholder="Company Name" value={this.state.restaurant_name} onChange={this.handleChangeRestaurantName} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Cost</label>
                    <input className="input" type="decimal" value={this.state.cost_per_person} onChange={this.handleChangeCost} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Type </label>
                    <input className="input" type="text" placeholder="contact" value={this.state.type_of_food} onChange={this.handleChangeType} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <button className="button is-outlined bottomButton" name="Login" type="submit">Update Menu </button>
                  </p>
                </div>

              </form>

              <form className="column is-offset-3" onSubmit={this.handleMenuChangeSubmit}>

              </form>

              <div className="column">
                <p>Menu</p>

                  <div className="control">
                    <label className="label">Restaurant Name</label>
                  <p>{this.props.currentMenu.currentMenu.restaurant_name}</p>
                </div>

                <div className="control">
                  <label className="label">Cost</label>
                  <p>{this.props.currentMenu.currentMenu.cost_per_person} </p>
                </div>

                <div className="control">
                  <label className="label">Type of Food</label>
                  <p>{this.props.currentMenu.currentMenu.type_of_food} </p>
                </div>
              </div>
            </div>


          </div>

        );
   }

}

const mapStateToProps = (state) => {
  return {
    contractors : state.contractors,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus,
    currentContractor : state.currentContractor,
    currentMenu : state.currentMenu

  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCurrentContractor : currentContractor => {
      dispatch(loadCurrentContractor(currentContractor))
   },
    loadCurrentMenu : currentMenu => {
      dispatch(loadCurrentMenu(currentMenu))
   }
 }
}




const ConnectedMenuProfileApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(MenuProfile);



export default ConnectedMenuProfileApp;

