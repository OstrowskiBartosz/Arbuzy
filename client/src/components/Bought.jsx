import React from "react";
import {
  Redirect
} from 'react-router-dom';
import "../App.css";

export default class Bought extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      isLoading: false,
      logInInfoReceived: false,
    })
  }

  componentDidMount(){
    console.log(this.props);
    setTimeout(() => {
        console.log(this.props);
        this.props.history.push("/");
      }, 5000);
  }


  render(){
    if (this.props.isLogged === false) {
      return <Redirect to="/zaloguj" />;
    }
    else if (this.state.isLoading) {
      return (<div>Loading...</div>);
    }else{
        return(
          <div className="container-fluid">
            <div className="row navbar-padding">
              <div className='col-3'>
              </div>
              <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                <div className = "row">
                  <div className = "col-12">
                    <div className="pb-5">
                      <h1>Przedmioty zostały kupione! :-) </h1>
                    </div>
                    
                    <h3>Za chwilę nastąpi przekierowanie na stronę główną</h3>
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