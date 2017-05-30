/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadEquipment } from '../action';




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



   render() {
    let allowedEquipment = []
    for(var i=0; i<this.props.equipment.length; i++){
      if(this.props.equipment[i].event_id === this.props.eventStatus.currentEvent.id){
        allowedEquipment.push(this.props.equipment[i])
      }
    }
    return(
      <div>
      <h1>Hello Equipment</h1>
      <ul>
        {
          allowedEquipment.map((name) =>
            <li className="equipment" key={name.id}><h3>{name.name}</h3></li>
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
    }
  }
}

const ConnectedEquipmentListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(EquipmentList);



export default ConnectedEquipmentListApp;