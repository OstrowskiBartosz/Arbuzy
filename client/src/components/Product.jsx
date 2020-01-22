import React from "react";
import { Redirect } from "react-router-dom";
import "../css/profil.css";

class Product extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    this.state = {
      logged: false,
      errorLogin: false,
      errorMessageLogin: "",
      errorSignup: false,
      errorMessageSignup: "",
      activeTab: 1,
      isLoading: true,
      productID: params.get("id")
    };
    console.log("svadvsadsa");
  }

  componentDidMount() {
    let url = "http://localhost:9000/product";
    fetch(url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "productID=" + this.state.productID
    })
      .then(response => response.text())
      .then(response => {
        var responseObject = JSON.parse(response);
        var splitted_opis = responseObject.productOpis.split("|");
        splitted_opis.forEach((part, index) => {
          if (part.startsWith("http")) {
            splitted_opis[index] = (
              <img className="img-fluid" src={part} alt="Opis produktu" />
            );
          }
        });
        this.setState({
          response: responseObject,
          isLoading: false,
          currentImage: responseObject.zdjecia[0].wartosc,
          opis: splitted_opis
        });
      })
      .catch(err => err);
  }

  imageClick(image) {
    this.setState({ currentImage: image });
  }

  handleToCartClick(event){
    event.preventDefault();
    const data = {
      id_produktu: "p" + event.currentTarget.id,
      ilosc: 1,
    }
    fetch('http://localhost:9000/addtocart', {
        method: 'post',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }     
    })
    .then(response=>response.text())
    .then(response => {
      if(response === "Przedmiot został dodany do koszyka."){
        this.props.sendAlertMessage("primary", "Dodano produkt", "Produkt został dodany do koszyka.");
        this.props.sendUpdatedCartItems(true);
      }else{
        this.props.sendAlertMessage("danger", "Wystąpił błąd.", "Wystąpił nieoczekiwany błąd.");
        this.props.sendUpdatedCartItems(true);
      }
    })
    .catch(err => err);
  }

  render() {
    console.log("path", window.location.pathname);
    if (this.state.isLoading) {
      return <div className="loading"></div>;
    } else {
      if (this.state.response.error) {
        return <Redirect to="/" />;
      } else {
        return (
          <div className="container options shadow-sm bg-white rounded">
            <div className="row">
              <div className="col product-tree">
                {this.state.response.productNazwaKategorii}{" "}
                <i className="fas fa-long-arrow-alt-right"></i>{" "}
                {this.state.response.productNazwaProducenta}{" "}
                <i className="fas fa-long-arrow-alt-right"></i>{" "}
                {this.state.response.productNazwa}
              </div>
            </div>
            <hr className="product-divider"></hr>
            <div className="row m-bot-10">
              <div className="col col-thumbnail">
                {this.state.response.zdjecia.map((zdjecie, index) => (
                  <div className="image-thumbnail" key={index}>
                    <img
                      className="img-thumbnail"
                      src={zdjecie.wartosc}
                      key={index}
                      alt="Zdjęcie produktu"
                      onClick={() => this.imageClick(zdjecie.wartosc)}
                    />
                  </div>
                ))}
              </div>
              <div className="col-md-auto">
                <div className="main-image">
                  <img
                    className="img-thumbnail"
                    src={this.state.currentImage}
                    alt="Zdjęcie produktu"
                  />
                </div>
              </div>
              <div className="col">
                <div className="product-name">
                  <h2>{this.state.response.productNazwa}</h2>
                </div>
                <div className="product-id">
                  <small>Id produktu: {this.state.response.productID}</small>
                </div>
                {this.state.response.atrybutMain.map((atrybut, index) => (
                  <div className="left" key={index}>
                    {atrybut.atrybut}: <strong>{atrybut.wartosc}</strong>
                  </div>
                ))}
                <div className="price-tag">
                  {this.state.response.ceny[0].cena_brutto.toLocaleString(
                    "pl-PL",
                    {
                      minimumFractionDigits: 2
                    }
                  )}{" "}
                  zł
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    id={this.state.response.productID}
                    onClick={(event) => this.handleToCartClick(event)}
                  >
                    Dodaj do koszyka
                  </button>
                </div>
              </div>
            </div>
            <hr className="product-divider"></hr>
            <h1>Opis produktu</h1>
            <div className="row m-bot-10">
              <div className="col">
                {this.state.opis.map((part, index) => (
                  <div className="m-bot-10" key={index}>
                    {part}
                  </div>
                ))}
              </div>
            </div>
            <hr className="product-divider"></hr>
            <h1>Pełna specyfikacja</h1>
            <div className="row m-bot-10">
              <div className="col col-left">
                {this.state.response.atrybutMain.map((atrybut, index) => (
                  <div key={index}>{atrybut.atrybut}</div>
                ))}
                {this.state.response.atrybutSub.map((atrybut, index) => (
                  <div key={index}>{atrybut.atrybut}</div>
                ))}
              </div>
              <div className="col col-right">
                {this.state.response.atrybutMain.map((atrybut, index) => (
                  <div key={index}>
                    <strong>{atrybut.wartosc}</strong>
                  </div>
                ))}
                {this.state.response.atrybutSub.map((atrybut, index) => (
                  <div key={index}>
                    <strong>{atrybut.wartosc}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default Product;
