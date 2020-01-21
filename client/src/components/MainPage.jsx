import React from "react";
import Styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Baner1 from "../images/baner1.png";
import Baner2 from "../images/baner2.png";
import Baner3 from "../images/baner3.png";
import Baner4 from "../images/baner4.png";
import "../css/mainPage.css";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
    return (
      <div className="container mainpage">
        <div className="container categoryGallery">
          <div className="row d-flex flex-wrap">
            <CategoryBar />
            <BanerCarousel />
          </div>
        </div>
        <Recomendations />
        <OftenBought />
      </div>
    );
  }
}

class OftenBought extends React.Component {
  render() {
    return (
      <div className="container shadow-sm bg-white rounded">
        {this.state.response.produkty.polecane.map((produkt, index) => (
          <div></div>
        ))};
        <div className="row">
          <div className="col categoryHeader">
            Najczęściej kupowane produkty
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/1042371_4_i1064.jpg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">161.87 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                Barracuda 1 TB 3.5\" SATA III (ST1000DM010)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/353686_0_i1064.jpg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">120.47 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                Caviar Blue 500 GB 3.5\" SATA III (WD5000AAKX)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/1052354_0_i1064.jpg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">259.00 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                SU800 512GB SATA3 (ASU800SS-512GT-C)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/1727818_2_i1064.jpg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">846.60 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                Barracuda 8 TB 3.5\" SATA III (ST8000DM004)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/1497912_0_i1064.jpg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">554.91 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                545 Series 512GB SATA3 (SSDSC2KW512G8X1)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/5803172_3_i1064.jpg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">225.76 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                480GB SATA3 (GP-GSTFS31480GNTD)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Recomendations extends React.Component {
  render() {
    return (
      <div className="container shadow-sm bg-white rounded">
        <div className="row">
          <div className="col categoryHeader">
            Polecane produkty
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/860922_0_i1064.jpeg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">257.99 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                P300 2 TB 3.5\" SATA III (HDWD120UZSVA)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/769736_0_i1064.jpeg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">174.84 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                Blue 500 GB 2.5\" SATA III (WD5000LPCX)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/1137287_0_i1064.jpg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">109.88 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                MTS420 120 GB SATA3 (TS120GMTS420)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/930692_0_i1064.jpeg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">513.10 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                4 TB 3.5\" SATA III X300 (HDWE140UZSVA)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/958503_0_i1064.jpeg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">302.10 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                FireCuda 1 TB 3.5\" SATA III (ST1000DX002)
              </span>
            </div>
          </div>
          <div className="col imageCol">
            <div className="row imageRow">
              <img
                className="imageSmall"
                src="https://images.morele.net/i1064/883195_1_i1064.jpeg"
                alt="produkt"
              />
            </div>
            <div className="row">
              <span className="imagePrice">369.59 zł</span>
            </div>
            <div className="row">
              <span className="imageDescription">
                Digital Black 1 TB 2.5\" SATA III (WD10JPLX)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CategoryBar extends React.Component {
  render() {
    return (
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
    );
  }
}

class BanerCarousel extends React.Component {
  render() {
    return (
      <div className="col corouselCol shadow-sm bg-white rounded">
        <Carousel
          autoPlay
          showIndicators={false}
          showStatus={false}
          emulateTouch
          infiniteLoop
        >
          <div>
            <img src={Baner1} />
          </div>
          <div>
            <img src={Baner2} />
          </div>
          <div>
            <img src={Baner3} />
          </div>
          <div>
            <img src={Baner4} />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default MainPage;
