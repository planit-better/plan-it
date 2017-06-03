/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux';
import { loadMenu, loadCurrentMenu } from '../action';
import { Link } from 'react-router-dom';




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

  menuRef( menu ){
    this.props.loadCurrentMenu( menu )
  }


   render() {
    let allowedMenu = []
    for(var i=0; i<this.props.menu.length; i++){
      if(this.props.menu[i].event_id === this.props.eventStatus.currentEvent.id){
        allowedMenu.push(this.props.menu[i])
      }
    }
    return(
      <div className="field">

      <label className="label">Hello Menu</label>
      <ul>
        {
          allowedMenu.map((menu) =>
          <Link to="/menuProfile" key={menu.id}>
            <li className="menu" onClick={this.menuRef.bind(this, menu)}><h3>{menu.restaurant_name}</h3>
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
    menu : state.menu,
    eventStatus : state.eventStatus
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadMenu: menu =>{
      dispatch(loadMenu(menu))
    },
    loadCurrentMenu : menu => {
      dispatch(loadCurrentMenu(menu))
    }
  }
}

const ConnectedMenuListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(MenuList);



export default ConnectedMenuListApp;
