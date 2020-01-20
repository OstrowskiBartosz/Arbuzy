import React from "react";
import {
  Redirect,
} from 'react-router-dom';
import "../App.css";

export default class Purchase extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      isLoading: true,
      isLogged: this.props.isLogged,
      isEmpty: true,
    })
  }

  componentDidMount(){
    this.fetchCartData();
  }

  fetchCartData(){
    let url = "http://localhost:9000/cart";
    fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: new Headers({'content-type': 'application/json'})
    })
    .then(response=>response.text())
    .then(response=>{ 
      var ResponseWithCartItems = JSON.parse(response);
      console.log(response);
      if(ResponseWithCartItems.produkty.length !== 0){
        this.setState({
          isEmpty: false,
        })
      }
      
      this.setState({
        apiResponse: response,
        isLoading:  false,
      });
    })
    .catch(err => err);
  }

  render(){
    if (this.props.isLogged === false && this.state.logInInfoReceived === true) {
      return <Redirect to="/zaloguj" />;
    }else if (this.state.isLoading) {
      return (<div>Loading...</div>);
    }else{
      if (this.state.isEmpty === false){
        let apiResponse = JSON.parse(this.state.apiResponse);
        return(
          <div className="container-fluid">
            <div className="row navbar-padding">
              <div className='col-xl-3'>
              </div>
              <div className="col-xl-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                <div className = "row">
                  <div>
                    <span className="p-2 m-2 font-weight-bold d-block clear">
                      <h2>PODSUMOWANIE</h2>
                    </span>
                    <span className="p-3 m-3 font-weight-bold d-block clear">
                      <h4>Zamwawiane przedmioty</h4>
                    </span>
                  </div>
                  <table className="table table-hover ml-5 mr-5">
                      <thead className="thead-light">
                        <tr>
                          <th>Nazwa produktu</th>
                          <th>ilość</th>
                          <th>łączna cena</th>
                        </tr>
                      </thead>
                      <tbody className="table-striped">
                        {apiResponse.produkty.map(api => (
                          <tr key={api.id_produktu}>
                            <td>{api.nazwa_produktu}</td>
                            <td>{api.ilosc}</td>
                            <td>{api.cena*api.ilosc}</td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
                  <div className="center-Element-horizontal p-3 m-3 font-weight-bold">
                      <h4>Dane przesyłkowe</h4>
                  </div>
                </div>
              </div>
              <div className='col-xl-3'>
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