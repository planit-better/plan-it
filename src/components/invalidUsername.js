import React,{Component} from 'react';
import { connect } from 'react-redux';



class InvalidUsername extends Component {

  render(){
    return(
      <h1>{this.props.error.error}</h1>
    )
  }
}

export default InvalidUsername;