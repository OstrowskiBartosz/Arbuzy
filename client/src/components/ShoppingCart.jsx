import React from 'react';
import {
  Link,
} from 'react-router-dom';

class ShoppingCart extends React.Component{
  constructor(props){
    super(props)
    this.state = ({
      isLoading: true,
      fullPrice: 0,
      isEmpty: false,
    });
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
      var cena = 0;
      var apiOBject = JSON.parse(response);
      if(apiOBject.produkty.length === 0){
        this.setState({
          isEmpty: true,
        })
      }
      var produktyWKoszykach = new Array(apiOBject.produkty.length);
      for (var i = 0; i < produktyWKoszykach.length; i++) { 
        produktyWKoszykach[i] = new Array(2);
        produktyWKoszykach[i][0] = apiOBject.produkty[i].id_w_koszyku;
        produktyWKoszykach[i][1] = apiOBject.produkty[i].ilosc;

        produktyWKoszykach[i][2] = apiOBject.produkty[i].cena;

        var cenastr = produktyWKoszykach[i][2].toString();
        cenastr = cenastr.replace(".", ",");
        produktyWKoszykach[i][2] = parseFloat(cenastr); 

        produktyWKoszykach[i][3] = apiOBject.produkty[i].nazwa_produktu;
        produktyWKoszykach[i][4] = apiOBject.produkty[i].zdjecie;
        produktyWKoszykach[i][5] = apiOBject.produkty[i].id_produktu;
        cena = cena + produktyWKoszykach[i][1]*produktyWKoszykach[i][2];
      }

      cenastr = cena.toString();
      cenastr = cenastr.replace(".", ",")
      
      this.setState({
        ApiResponse: response,
        isLoading:  false,
        cartNumberElements: apiOBject.produkty.length,
        cartArray: produktyWKoszykach,
        fullPrice: parseFloat(cenastr),
        disableEverything: false,
      });
    })
    .catch(err => err);
  }

  handleTrashClick(id_produktu_w_koszyku, id_produktu){
    let url = "http://localhost:9000/cart";
    var object = {};
    object.id_produktu_w_koszyku = id_produktu_w_koszyku;
    object.id_produktu = id_produktu;
    fetch(url, {
        method: 'delete',
        credentials: 'include',
        body: JSON.stringify(object),
        headers: new Headers({'content-type': 'application/json'})
    })
    .then(response=>response.text())
    .then(response=>{
      if(response === "Produkt został usunięty."){
        this.props.sendAlertMessage("danger", "Usunięto produkt", "Produkt został usunięty z koszyka.");
        var produktyWKoszykach = this.state.cartArray;
        var index = produktyWKoszykach.findIndex(e => e[0] === id_produktu_w_koszyku);
        var cena = this.state.fullPrice-(produktyWKoszykach[index][2]*produktyWKoszykach[index][1]);

        produktyWKoszykach.splice(index, 1);
        this.setState({
          cartArray: produktyWKoszykach,
          fullPrice: cena,
        });
        if(produktyWKoszykach.length === 0){
          this.setState({
            isEmpty: true,
          })
        }
        this.props.sendUpdatedCartItems(true);
      }else{

      }
    })
    .catch(err => err);
  }

  handleQuantityClick(event, id, sign){
    var produktyWKoszykach = this.state.cartArray;
    var index = produktyWKoszykach.findIndex(e => e[0] === id);
    
    if(produktyWKoszykach[index][1] > 1 || (produktyWKoszykach[index][1] === 1 && sign !== "-")){
      this.setState({
        disableEverything: true,
      })
      var object = {};
      object.id_produktu_w_koszyku = id;
      object.znak = sign;
      let url = "http://localhost:9000/cartQuantity";
      fetch(url, {
          method: 'post',
          credentials: 'include',
          body: JSON.stringify(object),
          headers: new Headers({'content-type': 'application/json'})
      })
      .then(response=>response.text())
      .then(response=>{
        if(response === "zmieniono"){
          var cena = 0;
          var produktyWKoszykach = this.state.cartArray;
          var index = produktyWKoszykach.findIndex(e => e[0] === id);
          if(sign === "+"){
            this.props.sendAlertMessage("primary", "Zwiększono ilość", "Ilość danego produktu została zwiększona.");
            produktyWKoszykach[index][1] = produktyWKoszykach[index][1] + 1;
            cena = produktyWKoszykach[index][2];
          }
          else{
            this.props.sendAlertMessage("primary", "Zmniejszono ilość", "Ilość danego produktu została zmniejszona.");
            produktyWKoszykach[index][1] = produktyWKoszykach[index][1] - 1;
            cena = -produktyWKoszykach[index][2];
          }
          this.setState({
            cartArray: produktyWKoszykach,
            fullPrice: this.state.fullPrice + cena,
          });
        }
      })
      .catch(err => err);
    }else{
      this.props.sendAlertMessage("danger", "Usunięcie produktu", "Aby usunąć produkt nacisnij znak usunięcia produktu.");
    }
    this.setState({
      disableEverything: false,
    })
  }

  render(){
    if (this.state.isLoading) {
      return (<div>Loading...</div>);
    }else{
      console.log(this.state.cartArray);
      if(this.state.isEmpty === false){
        return(
          <div>
          <div className='row navbar-padding'>
            <div className='col-sm-3'>
            </div>
            <div className= "col-sm-6">
              <div className="row">
                <div className="col-12 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                  <div className = "row">
                    <div className="col-11">
                      <div className="font-weight-bold text-left">
                        <h3>Twój Koszyk</h3>
                      </div>
                    </div>
                    <div className="col-1 align-text-center">
                    </div>
                  </div>
                </div>
              </div>
              <div className="row hide-l">
                <div className="col-12 componentBackgroundColor shadow-sm p-3 bg-white rounded">
                  <div className="row CartBorder pb-2">
                      <div className ="col-2 p-0">
                      </div>
                      <div className ="col-5 align-text-center">
                        <div className="text-left">
                          Nazwa
                        </div>
                      </div>
                      <div className ="col-2 align-text-center">
                        <div className="text-left">
                          Cena
                        </div>
                      </div>
                      <div className ="col-2 align-text-center">
                        <div className=" align-left" >
                          Ilość
                        </div>
                      </div>
                      <div className ="col-1 align-text-center">
                        
                      </div>
                    </div>
                </div>
              </div>
              {this.state.cartArray.map(produkt => (
                <div className="row" key={produkt[0]}>
                  <div className="col-12 componentBackgroundColor shadow-sm p-3 bg-white rounded">
                    <div className="row">
                      <div className ="col-xl-2 p-0 mb-3">
                        <div className="image-container2">
                          <img alt="obraz produktu" className=" center-Element-vertical feature_image2" src={produkt[4]}></img>
                        </div>                       
                      </div>
                      <div className ="col-xl-5 align-text-center font-size-bigger mb-5">
                        <div className="text-left">
                          {produkt[3]}
                        </div>
                      </div>
                        <div className ="col-xl-2 align-text-center font-size-bigger mb-5">
                          <div className="text-left">
                            {produkt[2] + " zł"}
                          </div>
                          <div className="placement-bottomAddToCart"></div>
                        </div>
                        <div className ="col-xl-2 align-text-center mb-5">
                          <i className={"fas fa-minus cursor-pointer " + (this.state.disableEverything ? "disabled" : "")} onClick={(event) => this.handleQuantityClick(event, produkt[0], "-")} 
                                  disabled={ this.state.disableEverything ? "disabled" : false}></i>
                          <div className="text-left pl-2 pr-2">
                            <input className="text-center" size="1" value={produkt[1]} readOnly></input>
                          </div>
                          <i className={"fas fa-plus cursor-pointer " + (this.state.disableEverything ? "disabled" : "")} onClick={(event) => this.handleQuantityClick(event, produkt[0], "+")} 
                                  disabled={ this.state.disableEverything ? "disabled" : false}></i>
                        </div>
                        <div className ="col-xl-1 align-text-center mb-5">
                          <span><i className="fas fa-trash-alt cursor-pointer" onClick={() => this.handleTrashClick(produkt[0], produkt[5])} disabled={ this.state.disableEverything ? false : "disabled"}></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="row">
                <div className="col-xl-6">
                </div>
                <div className="col-xl-6 mt-2 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                  <div className="row pb-2">
                    <div className="col-md-12">
                      <span className="d-inline float-left">łącznie do zapłaty</span>
                      <span className="float-right font-weight-bold font-size-bigger">{this.state.fullPrice} zł</span>
                      </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button type="button" className="btn btn-lg btn-block mt-1 pt-1 btn-primary">Przejdz do płatności <i className="fas fa-sign-out-alt"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-3'>
            </div>
          </div>
          <div className ="row pt-4">
            <div className ="col-lg-3"></div>
            <div className ="col-lg-5 text-left"><Link className="btn btn-outline-danger" to="/"> <i className ="fas fa-chevron-left"></i> Cofnij do strony głównej</Link></div>
            <div className ="col-lg-4"></div>
          </div>
        </div>
        );
      }else{
        return(
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
        )
      }
    }
  }
}

export default ShoppingCart;