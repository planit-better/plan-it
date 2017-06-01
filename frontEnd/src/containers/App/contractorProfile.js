

import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { loadCurrentGuest, loadCurrentContractor, loadContractors, loadEquipment, loadGuest, loadMenu, loadTask, logOut, clearEvent } from '../../action';
import { Link, Redirect } from 'react-router-dom';



class ContractorProfile extends Component {

  constructor(props){

    super(props);

    this.state={
      company_name : this.props.currentContractor.currentContractor.company_name,

      cost : this.props.currentContractor.currentContractor.cost,

      contact: this.props.currentContractor.currentContractor.contact,

      date_hired : this.props.currentContractor.currentContractor.date_hired,

      deadline : this.props.currentContractor.currentContractor.deadline,

      event_id : this.props.eventStatus.currentEvent.id
    }

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
        return response.json()
      }).catch(err =>{
        throw err;
      })
    }

    deleteContractor




    render() {
    if(this.props.currentUser.userLoggedIn === false){
    return(
      <Redirect to={{
        pathname : '/'
      }} />
      )
    }
     if(this.props.currentContractor.currentContractor.company_name){

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
              <form className="column is-offset-3" onSubmit={this.handleContractorChangeSubmit}>

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
                    <label className="label">
                      Change Deadline
                    </label>
                    <input className="input" type="date" value={this.state.deadline} onChange={this.handleChangeDeadline} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <button className="button is-outlined bottomButton" name="Login" type="submit">Update Contractor </button>
                  </p>
                </div>

              </form>

              <form className="column is-offset-3" onSubmit={this.handleContractorChangeSubmit}>

              </form>

              <div>
                <p>Contractors</p>

                  <p className="control">
                    <label className="label">Company Name</label>
                  <p>{this.props.currentContractor.currentContractor.company_name}</p>

                </p>

                <p className="control">
                  <label className="label">Cost</label>
                  <span>{this.props.currentContractor.currentContractor.cost}</span>
                </p>

                <p className="control">
                  <label className="label">Contact</label>
                  <span>{this.props.currentContractor.currentContractor.contact}</span>
                </p>


                <p className="control">
                  <label className="label">Date Hired</label>
                  <span>{this.props.currentContractor.currentContractor.date_hired}</span>
                </p>

                <p className="control">
                  <label className="label">Dealine</label>
                  <span>{this.props.currentContractor.currentContractor.deadline}</span>
                </p>
              </div>
            </div>


          </div>

        )
   } else {
      return(
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Planit-Better</h2>
              <h3>{this.props.currentUser.username}</h3>
              <h3>{this.props.eventStatus.currentEvent.company_name}</h3>
              <div id="navBar">
                <Link to="/"><button className="button is-outlined is-small">Home</button></Link>
              </div>
            </div>


            <div className="columns">
              <form className="column is-offset-3" onSubmit={this.handleContractorChangeSubmit}>
                <div className="field">
                  <p className="control">
                    <label className="label">Change Company Name</label>
                    <input className="input" type="text" placeholder="Company Name" value={this.state.company_name} onChange={this.handleChangeName} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Cost</label>
                    <input className="input" type="number" value={this.state.number} onChange={this.handleChangeCost} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Contact</label>
                    <input className="input" type="number" placeholder="Contact" value={this.state.contact} onChange={this.handleChangeContact} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">
                      Date Hired
                    </label>
                    <input className="input" type="date" value={this.state.date_hired} onChange={this.handleChangeDateHired}/>
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <label className="label">Change Deadline</label>
                    <input className="input" type="date" value={this.state.deadline} onChange={this.handleChangeDeadline} />
                  </p>
                </div>

                <div className="field">
                  <p className="control">
                    <button className="button is-outlined bottomButton" name="Login" type="submit">Update Contractor </button>
                  </p>
                </div>

              </form>
            </div>

          </div>
          )
   }
  }
}

const mapStateToProps = (state) => {
  return {
    contractors : state.contractors,
    currentUser : state.authenticate,
    eventStatus : state.eventStatus,
    currentContractor : state.currentContractor

  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCurrentContractor : currentContractor => {
      dispatch(loadCurrentContractor(currentContractor))
   }
  }
}




const ConnectedProfileApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ContractorProfile);



export default ConnectedProfileApp;

