import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import Baner1 from "../images/baner1.png";
import Baner2 from "../images/baner2.png";
import Baner3 from "../images/baner3.png";
import Baner4 from "../images/baner4.png";
import "../css/mainPage.css";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    let url = "http://localhost:9000/";
    fetch(url, {
      method: "post",
      credentials: "include"
    })
      .then(response => response.text())
      .then(response => {
        var responseObject = JSON.parse(response);
        this.setState({
          response: responseObject,
          isLoading: false
        });
      })
      .catch(err => err);
  }

  render() {
    console.log(this.state.response);
    if (this.state.isLoading) {
      return <div className="loading"></div>;
    } else {
      return (
        <div className="container mainpage">
          <div className="container categoryGallery">
            <div className="row d-flex flex-wrap">
              <div className="col categoryCol shadow-sm bg-white rounded">
                <div className="categoryHeader">Kategorie</div>
                <hr />
                <ul className="categoryBar">
                  <li id="3" className="categoryLink">
                    Karty graficzne
                  </li>
                  <li id="8" className="categoryLink">
                    Procesory
                  </li>
                  <li id="7" className="categoryLink">
                    Płyty główne
                  </li>
                  <li id="6" className="categoryLink">
                    Pamięci RAM
                  </li>
                  <li id="1" className="categoryLink">
                    Dyski HDD
                  </li>
                  <li id="2" className="categoryLink">
                    Dyski SSD
                  </li>
                  <li id="5" className="categoryLink">
                    Obudowy
                  </li>
                  <li id="9" className="categoryLink">
                    Zasilacze
                  </li>
                  <li id="4" className="categoryLink">
                    Napędy optyczne
                  </li>
                </ul>
              </div>
              <div className="col corouselCol shadow-sm bg-white rounded">
                <Carousel
                  autoPlay
                  showIndicators={false}
                  showStatus={false}
                  emulateTouch
                  infiniteLoop
                >
                  <div>
                    <img src={Baner1} alt="Baner reklamowy" />
                  </div>
                  <div>
                    <img src={Baner2} alt="Baner reklamowy" />
                  </div>
                  <div>
                    <img src={Baner3} alt="Baner reklamowy" />
                  </div>
                  <div>
                    <img src={Baner4} alt="Baner reklamowy" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="container shadow-sm bg-white rounded">
            <div className="row">
              <div className="col categoryHeader">
                Polecane produkty
                <hr />
              </div>
            </div>
            <div className="row">
              {this.state.response.polecane.map((produkt, index) => (
                <div key={index} className="col imageCol">
                  <div className="row imageRow">
                    <img
                      className="imageSmall"
                      src={produkt.wartosc}
                      alt="Zdjęcie produktu"
                    />
                  </div>
                  <div className="row">
                    <span className="imagePrice">
                      {produkt.cena_brutto.toLocaleString("pl-PL", {
                        minimumFractionDigits: 2
                      })}{" "}
                      zł
                    </span>
                  </div>
                  <div className="row imageLink">
                    <span className="imageDescription pointer">
                      <Link
                        className="clear-link"
                        to={"/product?id=" + produkt.id_produktu}
                      >
                        {produkt.nazwa_produktu}
                      </Link>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container shadow-sm bg-white rounded">
            <div className="row">
              <div className="col categoryHeader">
                Najczęściej kupowane produkty
                <hr />
              </div>
            </div>
            <div className="row">
              {this.state.response.kupowane.map((produkt, index) => (
                <div key={index} className="col imageCol">
                  <div className="row imageRow">
                    <img
                      className="imageSmall"
                      src={produkt.wartosc}
                      alt="Zdjęcie produktu"
                    />
                  </div>
                  <div className="row">
                    <span className="imagePrice">
                      {produkt.cena_brutto.toLocaleString("pl-PL", {
                        minimumFractionDigits: 2
                      })}{" "}
                      zł
                    </span>
                  </div>
                  <div className="row imageLink">
                    <span className="imageDescription pointer">
                      <Link
                        className="clear-link"
                        to={"/product?id=" + produkt.id_produktu}
                      >
                        {produkt.nazwa_produktu}
                      </Link>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default MainPage;
