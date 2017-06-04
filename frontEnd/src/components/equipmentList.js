/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadEquipment, loadCurrentEquipment } from '../action';
import { Link } from 'react-router-dom';




class EquipmentList extends Component {
  constructor(props) {

    super(props);

  }

  componentWillMount() {
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


  equipmentRef( equpiment ){
    this.props.loadCurrentEquipment( equpiment )
  }


   render() {
    let allowedEquipment = []
    for(var i=0; i<this.props.equipment.length; i++){
      if(this.props.equipment[i].event_id === this.props.eventStatus.currentEvent.id){
        allowedEquipment.push(this.props.equipment[i])
      }
    }
    return(
      <div className="field">

      <label className="label">All Equipment</label>
      <ul>
        {
          allowedEquipment.map((equipment) =>
            <Link to="/equipmentProfile" key={equipment.id}>
              <li className="equipment" onClick={this.equipmentRef.bind(this, equipment)}>
                <h3>{equipment.name}</h3>
              </li>
            </Link>
            )
        }

      </ul>

      </div>
      )

   }

}

const mapStateToProps = (state) => {
  return {
    equipment : state.equipment,
    eventStatus : state.eventStatus
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadEquipment: equipment =>{
      dispatch(loadEquipment(equipment))
    },
    loadCurrentEquipment : equipment => {
      dispatch(loadCurrentEquipment(equipment))
    }
  }
}

const ConnectedEquipmentListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(EquipmentList);



export default ConnectedEquipmentListApp;