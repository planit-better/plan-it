import React,{Component} from 'react';
import { connect } from 'react-redux';



class InvalidUsername extends Component {

  render(){
    console.log(this.props.error.error)
    return(
      <h1>{this.props.error.error}</h1>
    )
  }
}

export default InvalidUsername;