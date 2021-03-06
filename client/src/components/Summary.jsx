import React from "react";
import {
  Redirect,
  Link
} from 'react-router-dom';
import "../App.css";

export default class Summary extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      isLoading: true,
      isLogged: this.props.isLogged,
      isEmpty: true,
      price: 0,
    })
  }

  componentDidMount(){
    this.fetchCartData();
  }

  componentDidUpdate(prevState, prevProps) {
    if( prevState.isLogged !== this.props.isLogged ){
      this.setState({
        isLogged: this.props.isLogged,
        logInInfoReceived: true,
      });
    }
  }

  fetchCartData(){
    let url = "http://localhost:9000/summary";
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
        let cena = 0;
        for(let iter in ResponseWithCartItems.produkty){
          cena = cena + ResponseWithCartItems.produkty[iter].cena*ResponseWithCartItems.produkty[iter].ilosc;
        }

        this.setState({
          isEmpty: false,
          price: cena,
        })
      }
      
      this.setState({
        apiResponse: response,
        isLoading:  false,
      });
    })
    .catch(err => err);
  }

  handleRowClick(event, id){
    event.preventDefault();
    this.props.history.push("/product?id="+id);
  }

  handleBuyClick(){
    let url = "http://localhost:9000/buy";
    fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({'content-type': 'application/json'})
    })
    .then(response=>response.text())
    .then(response=>{
      if(response ==="kupiono"){
        this.props.sendUpdatedCartItems(true);
        this.props.history.push("/kupiono");
      }
    })
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
                  <div className="col-xl-12">
                    <span className="p-2 m-2 font-weight-bold text-center">
                      <h2>PODSUMOWANIE</h2>
                    </span>
                    <span className="p-3 m-3 font-weight-bold text-left">
                      <h4>Zamawiane przedmioty</h4>
                    </span>
                  
                  <table className="table table-hover mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th className="font-weight-bold">Nazwa produktu</th>
                          <th className="font-weight-bold">cena za sztukę</th>
                          <th className="font-weight-bold">ilość</th>
                          <th className="font-weight-bold">łączna cena</th>
                        </tr>
                      </thead>
                      <tbody className="table-striped">
                        {apiResponse.produkty.map(api => (
                          <tr className="cursor-pointer" key={api.id_produktu} onClick={(e) => this.handleRowClick(e, api.id_produktu)}>
                              <td className="font-weight-bold">{api.producent + " " + api.nazwa_produktu}</td>
                              <td className="font-weight-bold">{((api.cena).toFixed(2)).replace(".", ",")}</td>
                              <td className="font-weight-bold">{api.ilosc}</td>
                              <td className="font-weight-bold">{((api.cena*api.ilosc).toFixed(2)).replace(".", ",") + " zł"}</td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
                  <div className="border-bottom border border-primary"></div>
                  <div className="text-right pb-3 pr-4 pt-2">
                    <h4>
                      cena całkowita: {(this.state.price.toFixed(2)).replace(".", ",") + " zł"}
                    </h4>    
                  </div>
                </div>
              </div>
              <div className = "row">
                <div className="col-xl-12">
                  <div className="p-3 m-3 font-weight-bold text-left">
                      <h4>Dane dostawy</h4>
                  </div>
                    <table className="table table-hover">
                      <thead className="thead-light">
                        <tr>
                          <th className="font-weight-bold">Imie i nazwisko</th>
                          <th className="font-weight-bold">miejsce dostawy</th>
                          <th className="font-weight-bold">firma</th>
                        </tr>
                      </thead>
                      <tbody className="table-striped">
                          <tr className="cursor-pointer" key={apiResponse.dane_dostawy.imie}>
                              <td className="font-weight-bold">{`${apiResponse.dane_dostawy.imie} ${apiResponse.dane_dostawy.nazwisko}`}</td>
                              <td className="font-weight-bold">{`${apiResponse.dane_dostawy.miasto} ul. ${apiResponse.dane_dostawy.ulica} ${apiResponse.dane_dostawy.kod}`}</td>
                              <td className="font-weight-bold">{apiResponse.dane_dostawy.nazwa_firmy === null ? " " : apiResponse.dane_dostawy.nazwa_firmy}</td>
                          </tr>
                      </tbody>
                  </table>
                  </div>
                </div>
                <div className="row pt-5">
                  <div className="col-3"></div>
                      <div className="col-6">
                        <button className="btn btn-lg btn-block mt-1 pt-1 btn-primary" onClick={() => this.handleBuyClick()}>
                            Kup produkty <i className="fas fa-sign-out-alt"></i>
                        </button>
                      </div>
                  <div className="col-3"></div>
                </div>
              </div>
              <div className='col-xl-3'>
              </div>
            </div>
            <div className="row pt-4 pb-5 mb-5">
              <div className="col-lg-3"></div>
              <div className="col-lg-5 text-left">
                <Link className="btn btn-outline-secondary" to="/koszyk">
                  <i className="fas fa-chevron-left"></i> Wróć do koszyka
                </Link>
              </div>
              <div className="col-lg-4"></div>
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