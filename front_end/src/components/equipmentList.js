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

    return(
      <div>
      <h1>Hello Equipment</h1>
      <ul>
        {
          this.props.equipment.map((name) =>
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
    equipment : state.equipment
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


