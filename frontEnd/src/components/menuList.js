/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadMenu } from '../action';




class MenuList extends Component {
  constructor(props) {

    super(props);

  }

  componentWillMount() {
    fetch('/api/Menu', {
      method: "GET",
      credentials : 'include'
    }).then((response) =>{
      return response.json()
    }).then((menu) =>{
      this.props.loadMenu(menu)
    }).catch(err =>{
      throw err;
    })
  }



   render() {
    let allowedMenu = []
    for(var i=0; i<this.props.menu.length; i++){
      if(this.props.menu[i].event_id === this.props.eventStatus.currentEvent.id){
        allowedMenu.push(this.props.menu[i])
      }
    }
    return(
      <div>

      <h1>Hello Menu</h1>
      <ul>
        {
          allowedMenu.map((name) =>
            <li className="menu" key={name.id}><h3>{name.restaurant_name}</h3></li>
            )
        }

      </ul>

      </div>
      )

   }

}

const mapStateToProps = (state) => {
  return {
    menu : state.menu,
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

const ConnectedMenuListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(MenuList);



export default ConnectedMenuListApp;
