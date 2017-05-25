import React,{Component} from 'react';
import { connect } from 'react-redux';



class InvalidUsername extends Component {





  render(){
    return(
      <h1>{this.props.user.error}</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user
  };
}

const ConnectedInvalidUsernameApp = connect(
  mapStateToProps,
  )(InvalidUsername);

export default ConnectedInvalidUsernameApp;