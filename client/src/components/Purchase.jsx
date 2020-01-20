import React from "react";
import {
  Redirect,
} from 'react-router-dom';

export default class Purchase extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      isLoading: false,
      isLogged: this.props.isLogged,
    })
  }
  render(){
    if (this.props.isLogged === false && this.state.logInInfoReceived === true) {
      return <Redirect to="/zaloguj" />;
    }else if (this.state.isLoading) {
      return (<div>Loading...</div>);
    }else{
      if (this.state.isEmpty === false){
        return(
          <div className="container-fluid">
            <div className="row navbar-padding">
              <div className='col-3'>
              </div>
              <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                <div className = "row">
                  <div className = "col-12">
                    <h1>Koszyk jest pusty, dodaj coś do niego :-) </h1>
                  </div>
                </div>
              </div>
              <div className='col-3'>
              </div>
            </div>
          </div>
        );
      }else{
        return(
          <div className="container-fluid">
            <div className="row navbar-padding">
              <div className='col-3'>
              </div>
              <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                <div className = "row">
                  <div className = "col-12">
                    <h1>Koszyk jest pusty, dodaj coś do niego :-) </h1>
                  </div>
                </div>
              </div>
              <div className='col-3'>
              </div>
            </div>
          </div>
        )
      }
    }
  }
}