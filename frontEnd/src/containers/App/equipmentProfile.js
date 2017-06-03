

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadCurrentEquipment, loadCurrentContractor, loadContractors, loadBudget, loadEquipment, loadGuest, loadMenu, loadTask, logOut, clearEvent } from '../../action';
import { Link, Redirect } from 'react-router-dom';



class EquipmentProfile extends Component {

  constructor(props){

    super(props);

    this.state={
      name :this.props.currentEquipment.currentEquipment.name,

      type : this.props.currentEquipment.currentEquipment.type,

      cost: this.props.currentEquipment.currentEquipment.cost,

      id: this.props.currentEquipment.currentEquipment.id,

      event_id : this.props.eventStatus.currentEvent.id
    };

  }

    // componentWillMount() {
    //   this.props.loadCurrentEquipment(this.state)
    // }

    handleEquipmentChangeSubmit = ( event ) => {
      event.preventDefault();
      this.updateEquipment(this.state)
      //.then(this.updateBudget(this.state))
      .then(this.props.loadCurrentEquipment(this.state))
    }

    handleChangeName = ( event ) => {
      this.setState({
        name : event.target.value
      });
    }

    handleChangeType = ( event ) => {
      this.setState({
        type : event.target.value
      });
    }

    handleChangeCost = ( event ) => {
      this.setState({
        cost : event.target.value
      });
    }

    updateEquipment = ( equipment ) => {
        return fetch(`/api/equipment/${this.state.id}`, {
        method: "PUT",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify(equipment)
      }).then((response) =>{
        this.updateBudget ( this.state )
      }).catch(err =>{
        throw err;
      })
    }

    removeEquipment = ( event ) => {
      event.preventDefault()
        return fetch(`/api/equipment/${this.props.currentEquipment.currentEquipment.id}`, {
          method: "DELETE",
          credentials: 'include',
           headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }).then((response) =>{
          this.redirectEquipment()
        }).catch(err =>{
          throw err;
        })
    }

    componentDidMount() {
      console.log('mountin')
      fetch('/api/budget', {
      method : "GET",
      credentials: 'include'
    }).then((response)=>{
      return response.json()
    }).then((budget) =>{
      console.log(budget)
      this.props.loadBudget(budget)
    }).catch(err =>{
      throw err;
    })
    }


    redirectEquipment(){
      this.props.history.push("/newEquipmentForm")
    }



    updateBudget = ( equipment ) => {
        for(var i=0; i<this.props.budget.length; i++){
          if(this.props.budget[i].type_id === this.state.id && this.props.budget[i].type === "Equipment"){
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
        body : JSON.stringify({"amount": this.state.cost})
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

          <div className="App">
            <div className="nav has-shadow">
              <div className="nav-left">
                <div className="nav-item">
                  <img src="https://fortunedotcom.files.wordpress.com/2016/08/toc09_a1.png" className="App-logo" alt="logo" />
                  <h1 className="title is-3">Planit-Better</h1>
                </div>

                  <h3 className="menuEvent">{this.props.eventStatus.currentEvent.company_name}</h3>
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

            <br></br><br></br>

            <div className="columns">
              <form className="column is-offset-3" >

                <div className="field">
                  <p className="control">
                    <label className="label">Change Equipment Name</label>
                    <input className="input" type="text" placeholder="Company Name" value={this.state.name} onChange={this.handleChangeName} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Cost</label>
                    <input className="input" type="number" value={this.state.cost} onChange={this.handleChangeCost} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Type</label>
                    <input className="input" type="text" placeholder="contact" value={this.state.type} onChange={this.handleChangeType} />
                  </p>
                </div>


                <div className="field">
                  <p className="control">
                    <button className="button is-outlined bottomButton" name="Login" onClick={this.handleEquipmentChangeSubmit}>Update Contractor
                    </button>
                    <button className="button is-info" name="Remove" onClick={this.removeEquipment}> Remove Equipment
                    </button>
                  </p>
                </div>

              </form>

              <br></br><br></br>

              <div className="column">
                <p>Equipment</p>

                  <div className="control">
                    <label className="label">Equipment Name</label>
                  <p>{this.props.currentEquipment.currentEquipment.name}</p>
                </div>

                <div className="control">
                  <label className="label">Cost</label>
                  <p>{this.props.currentEquipment.currentEquipment.cost} </p>
                </div>

                <div className="control">
                  <label className="label">Contact</label>
                  <p>{this.props.currentEquipment.currentEquipment.type} </p>
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
    currentEquipment : state.currentEquipment,
    budget : state.budget

  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCurrentEquipment : currentEquipment => {
      dispatch(loadCurrentEquipment(currentEquipment))
   },
    loadBudget : budget => {
      dispatch(loadBudget(budget))
    }
  }
}




const ConnectedEquipmentApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(EquipmentProfile);



export default ConnectedEquipmentApp;

