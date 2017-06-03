

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadCurrentGuest, loadCurrentContractor, loadContractors, loadEquipment, loadGuest, loadMenu, loadTask, logOut, clearEvent, loadBudget } from '../../action';
import { Link, Redirect } from 'react-router-dom';



class ContractorProfile extends Component {

  constructor(props){

    super(props);

    this.state={
      company_name :this.props.currentContractor.currentContractor.company_name,

      cost : this.props.currentContractor.currentContractor.cost,

      contact: this.props.currentContractor.currentContractor.contact,

      date_hired : this.props.currentContractor.currentContractor.date_hired,

      deadline : this.props.currentContractor.currentContractor.deadline,

      id : this.props.currentContractor.currentContractor.id,

      event_id : this.props.eventStatus.currentEvent.id
    };

  }

    handleContractorChangeSubmit = ( event ) => {
      event.preventDefault();
      this.updateContractor(this.state)
      .then(this.props.loadCurrentContractor(this.state))
    }

    handleChangeName = ( event ) => {
      this.setState({
        company_name : event.target.value
      });
    }

    handleChangeCost = ( event ) => {
      this.setState({
        cost : event.target.value
      });
    }

    handleChangeContact = ( event ) => {
      this.setState({
        contact : event.target.value
      });
    }

    handleChangeDateHired = ( event ) => {
      this.setState({
        date_hired : event.target.value
      });
    }

    handleChangeDeadline = ( event ) => {
      this.setState({
        deadline : event.target.value
      });
    }

    updateContractor = ( company_name ) => {
        return fetch(`/api/contractors/${this.props.currentContractor.currentContractor.id}`, {
        method: "PUT",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify(company_name)
      }).then((response) =>{
        this.updateBudget( this.state )
      }).catch(err =>{
        throw err;
      })
    }

    removeContractor = ( event ) => {
      event.preventDefault()
        return fetch(`/api/contractors/${this.props.currentContractor.currentContractor.id}`, {
          method: "DELETE",
          credentials: 'include',
           headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }).then((response) =>{
          this.redirectContractor()
        }).catch(err =>{
          throw err;
        })
      }

    redirectContractor(){
      this.props.history.push("/newContractorForm")
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


    updateBudget = ( contractor ) => {
        console.log('hit update budget')
        console.log( contractor )
        console.log( this.props.budget )
        for(var i=0; i<this.props.budget.length; i++){
          if(this.props.budget[i].type_id === this.state.id && this.props.budget[i].type === "Contractor"){
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

          <div className="App contractor">
            <div className="nav contractorHome has-shadow">
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
              <div className="column">
              </div>

              <form className="column list taskList is-4" >

                <div className="field">
                  <p className="control">
                    <label className="label">Change Company Name</label>
                    <input className="input" type="text" placeholder="Company Name" value={this.state.company_name} onChange={this.handleChangeName} />
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
                    <label className="label">Change Contact</label>
                    <input className="input" type="number" placeholder="contact" value={this.state.contact} onChange={this.handleChangeContact} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Date Hired</label>
                    <input className="input" type="date" value={this.state.date_hired} onChange={this.handleChangeDateHired} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Deadline</label>
                    <input className="input" type="date" value={this.state.deadline} onChange={this.handleChangeDeadline} />
                  </p>
                </div>

                <br></br>
                <div className="field">
                  <p className="control">
                    <button className="button is-info" name="Login" onClick={this.handleContractorChangeSubmit}>Update Contractor
                    </button>
                    <br></br><br></br>
                    <button className="button is-info" name="Remove" onClick={this.removeContractor}> Remove Contractor
                    </button>
                  </p>
                </div>

              </form>

              <div className="column is-1">
              </div>

              <div className=" list column is-4 has-text-centered">
                <p>Contractors</p>

                  <div>
                    <label className="label">Company Name</label>
                  <p>{this.props.currentContractor.currentContractor.company_name}</p>
                </div>

                <div>
                  <label className="label">Cost</label>
                  <p>{this.props.currentContractor.currentContractor.cost} </p>
                </div>

                <div>
                  <label className="label">Contact</label>
                  <p>{this.props.currentContractor.currentContractor.contact} </p>
                </div>


                <div>
                  <label className="label">Date Hired</label>
                  <p>{this.props.currentContractor.currentContractor.date_hired} </p>
                </div>

                <div>
                  <label className="label">Dealine</label>
                  <p>{this.props.currentContractor.currentContractor.deadline} </p>
                </div>
              </div>

              <div className="column">
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
    budget : state.budget

  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCurrentContractor : currentContractor => {
      dispatch(loadCurrentContractor(currentContractor))
   },
    loadBudget : budget => {
      dispatch(loadBudget(budget))
    }
  }
}




const ConnectedContractorProfileApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ContractorProfile);



export default ConnectedContractorProfileApp;

