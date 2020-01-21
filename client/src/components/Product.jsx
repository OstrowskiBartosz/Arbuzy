import React from "react";
import { Link, Redirect } from "react-router-dom";
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

  render() {
    console.log(this.state.response);
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
                <i class="fas fa-long-arrow-alt-right"></i>{" "}
                {this.state.response.productNazwaProducenta}{" "}
                <i class="fas fa-long-arrow-alt-right"></i>{" "}
                {this.state.response.productNazwa}
              </div>
            </div>
            <hr className="product-divider"></hr>
            <div className="row">
              <div className="col">
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
              <div className="col">
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
                  {this.state.response.productNazwa}
                </div>
                <div className="product-id">
                  Id produktu: {this.state.response.productID}
                </div>
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
                    className="btn btn-primary"
                    id={this.state.response.productID}
                  >
                    Dodaj do koszyka
                  </button>
                </div>
              </div>
            </div>
            <hr className="product-divider"></hr>
            <div className="row">
              <div className="col">
                {this.state.opis.map((part, index) => (
                  <div key={index}>{part}</div>
                ))}
              </div>
            </div>
            <hr className="product-divider"></hr>
            <div className="row">
              <div className="col">
                {this.state.response.atrybutMain.map((atrybut, index) => (
                  <div key={index}>
                    {atrybut.atrybut}: <strong>{atrybut.wartosc}</strong>
                  </div>
                ))}
                {this.state.response.atrybutSub.map((atrybut, index) => (
                  <div key={index}>
                    {atrybut.atrybut}: <strong>{atrybut.wartosc}</strong>
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
