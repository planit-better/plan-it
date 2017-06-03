

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadCurrentMenu, loadCurrentContractor, loadContractors, loadEquipment, loadGuest, loadBudget, loadMenu, loadTask, logOut, clearEvent } from '../../action';
import { Link, Redirect } from 'react-router-dom';



class MenuProfile extends Component {

  constructor(props){

    super(props);

    this.state={
      restaurant_name :this.props.currentMenu.currentMenu.restaurant_name,

      type_of_food : this.props.currentMenu.currentMenu.type_of_food,

      cost_per_person: this.props.currentMenu.currentMenu.cost_per_person,

      id : this.props.currentMenu.currentMenu.id

    };

  }

    handleMenuChangeSubmit = ( event ) => {
      event.preventDefault();
      this.updateMenu(this.state)
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

    componentDidMount() {
      fetch('/api/budget', {
      method : "GET",
      credentials: 'include'
    }).then((response)=>{
      return response.json()
    }).then((budget) =>{
      this.props.loadBudget(budget)
    }).catch(err =>{
      throw err;
    })
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
        this.updateBudget( this.state )
      }).catch(err =>{
        throw err;
      })
    }

    removeMenu = ( event ) => {
      event.preventDefault()
        return fetch(`/api/menu/${this.props.currentMenu.currentMenu.id}`, {
          method: "DELETE",
          credentials: 'include',
           headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }).then((response) =>{
          this.redirectMenu()
        }).catch(err =>{
          throw err;
        })
      }

    redirectMenu(){
       this.props.history.push("/newMenuForm")
    }


    updateBudget = ( menu ) => {
        for(var i=0; i<this.props.budget.length; i++){
          if(this.props.budget[i].type_id === this.state.id && this.props.budget[i].type === "Menu"){
            this.putBudget(this.props.budget[i])
          }
        }
    }

    putBudget( budget ){
       return fetch(`/api/budget/${budget.id}`, {
        method: "PUT",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify({"amount": this.state.cost_per_person})
      }).then((response) =>{
        return;
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

     return(

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
                </div>
              </div>
            </div>


            <div className="columns">
              <div className="column"></div>

              <div className="formsHome guestHome column list is-4">
                <form className="centerForm">

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
                      <button className="button is-outlined" name="Login" onClick={this.handleMenuChangeSubmit}>Update Menu
                      </button>
                      <button className="button  is-outlined" name="Remove" onClick={this.removeMenu}> Remove Menu
                      </button>
                    </p>
                  </div>

                </form>
              </div>

              <div className="column"></div>

              <div className="formsHome guestHome column list is-4">
                <label className="label">Menu</label>

                <div className="field">
                  <label className="label">Restaurant Name</label>
                  <p>{this.props.currentMenu.currentMenu.restaurant_name}</p>
                </div>

                <div fieldclassName="field">
                  <label className="label">Cost</label>
                  <p>{this.props.currentMenu.currentMenu.cost_per_person} </p>
                </div>

                <div className="field">
                  <label className="label">Type of Food</label>
                  <p>{this.props.currentMenu.currentMenu.type_of_food} </p>
                </div>

              </div>

              <div className="column"></div>
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
    currentMenu : state.currentMenu,
    budget : state.budget

  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCurrentContractor : currentContractor => {
      dispatch(loadCurrentContractor(currentContractor))
   },
    loadCurrentMenu : currentMenu => {
      dispatch(loadCurrentMenu(currentMenu))
   },
    loadBudget : budget => {
      dispatch(loadBudget(budget))
    }
 }
}




const ConnectedMenuProfileApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(MenuProfile);



export default ConnectedMenuProfileApp;

