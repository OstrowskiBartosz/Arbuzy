import React from "react";
import Styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Baner1 from "../images/baner1.png";
import Baner2 from "../images/baner2.png";
import Baner3 from "../images/baner3.png";
import Baner4 from "../images/baner4.png";
import "../css/mainPage.css";

import PageFooter from "./PageFooter.jsx";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container mainpage">
        <div className="row d-flex flex-wrap">
          <CategoryBar />
          <BanerCarousel />
        </div>
      </div>
    );
  }
}

class CategoryBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
