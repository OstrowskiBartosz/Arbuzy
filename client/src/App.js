import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Cookies from "js-cookie";

import ShoppingCart from "./components/ShoppingCart.jsx";
import SearchResults from "./components/SearchResults.jsx";
import Logout from "./components/Logout.jsx";
import LoginSignupComp from "./components/LoginSignupComp.jsx";
import PageFooter from "./components/PageFooter.jsx";
import MainPage from "./components/MainPage.jsx";
import Profile from "./components/Profile.jsx";
import Invoice from "./components/Invoice.jsx";
import Product from "./components/Product.jsx";


import history from "./components/history";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      hasExpired: false
    };
  }

  componentDidMount() {
    this.fetchLoggedUser();
  }

  fetchLoggedUser() {
    if (undefined !== Cookies.get("user_sid")) {
      let url = "http://localhost:9000/session";
      fetch(url, {
        method: "get",
        credentials: "include",
        headers: new Headers({ "content-type": "application/json" })
      })
        .then(response => response.text())
        .then(response => {
          if (response === "logged") {
            this.setState({
              isLogged: true
            });
          } else {
            this.setState({
              hasExpired: true
            });
          }
        })
        .catch(err => err);
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar
          isLogged={this.state.isLogged}
          hasExpired={this.state.hasExpired}
        />
      </div>
    );
  }
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.getLoggedUser = this.getLoggedUser.bind(this);
    this.getUpdatedCartItems = this.getUpdatedCartItems.bind(this);

    this.getAlertMessage = this.getAlertMessage.bind(this);

    const params = new URLSearchParams(window.location.search);
    let q = "";
    let w = "Wszędzie";
    if (params.has("q")) {
      q = params.get("q");
    }
    if (params.has("w")) {
      w = params.get("w");
    }

    this.state = {
      isLogged: false,
      searchValue: q,
      searchValueToSend: q,
      searchCategory: w,
      searchCategoryToSend: w,
      CartItems: 0,

      alertColor: "",
      alertHeading: "",
      alertText: "",
      showAlert: false
    };
  }

  componentDidUpdate(prevState) {
    if (this.props.isLogged !== prevState.isLogged) {
      this.setState({
        isLogged: this.props.isLogged
      });
      if (this.props.isLogged === true) {
        this.fetchCartData();
      }
    }
  }

  fetchCartData() {
    let url = "http://localhost:9000/users";
    fetch(url, {
      method: "get",
      credentials: "include",
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(response => response.text())
      .then(response => {
        this.setState({
          CartItems: response
        });
      })
      .catch(err => err);
  }

  getUpdatedCartItems(updateCartData) {
    if (updateCartData === true) {
      this.fetchCartData();
    }
  }

  getLoggedUser(loggedData) {
    if (loggedData === true) {
      this.fetchCartData();
    } else if (loggedData === false) {
      this.setState({
        CartItems: 0
      });
    }
    this.setState({
      isLogged: loggedData
    });
  }

  handleCategoryChange(event) {
    this.setState({
      searchCategory: event.currentTarget.id
    });
  }

  handleSearchChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  handleSearchSubmit(event) {
    if (this.state.searchValue.length === 0) {
      event.preventDefault();
      this.getAlertMessage(
        "danger",
        "Wpisz coś!",
        "Wpisz przynajmniej jeden znak."
      );
    } else {
      this.setState({
        searchValueToSend: this.state.searchValue,
        searchCategoryToSend: this.state.searchCategory
      });
    }
  }

  getAlertMessage(alertColor, alertHeading, alertText) {
    this.setState({
      showAlert: false
    });
    setTimeout(
      function() {
        this.setState({
          alertColor: alertColor,
          alertHeading: alertHeading,
          alertText: alertText,
          showAlert: true
        });
      }.bind(this),
      1
    );
  }

  render() {
    return (
      <Router>
        <div id="all">
          <nav className="navbar navbar-expand-lg navbar-light bg-light Navbar-border fixed-top">
            <Link className="navbar-brand" to="/">
              <div className="NavbarLogoPart3 mr-4 ml-2">
                <svg
                  height="35px"
                  viewBox="0 0 512 512"
                  transform="translate(0,-8)"
                  width="35px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m430.640625 7.296875-6.820313-7.296875-242.65625 242.652344 14.585938 48.59375c.625 5.875-3.578125 11.945312-9.800781 13.976562l-15.503907 5.0625-4.617187 14.296875c-3.230469 10.011719-10.160156 17.132813-18.984375 19.957031h-.007812c-3.160157 0-12.535157-6.125-17.5625-9.421874-9.984376-6.535157-18.644532-12.167969-26.75-11.058594l-3.21875.4375-99.304688 99.324218 7.285156 6.832032c58.007813 54.316406 131.394532 81.347656 204.691406 81.347656 76.582032 0 153.070313-29.507812 211.792969-88.230469 114.925781-114.933593 117.949219-297.867187 6.871094-416.472656zm-311.9375 343.996094c11.839844 7.734375 23.050781 15.03125 33.371094 11.800781 15.300781-4.773438 27.023437-16.652344 32.164062-32.578125l1.574219-4.917969 6.136719-2c15.464843-5.054687 25.265625-20.5 22.808593-35.925781l-11.761718-39.519531 169.511718-169.5c35.59375 35.539062 54.886719 79.695312 55.917969 128.234375 1.191407 55.503906-22.933593 112.140625-66.175781 155.378906-43.238281 43.238281-99.808594 67.449219-155.378906 66.175781-48.535156-1.035156-92.695313-20.335937-128.230469-55.921875l28.328125-28.328125c3.335938 1.613282 8.390625 4.917969 11.734375 7.101563zm291.402344 58.800781c-105.152344 105.144531-271.144531 110.152344-382.195313 13.144531l37.257813-37.257812c38.757812 38.652343 88.464843 60.648437 141.300781 61.769531 1.441406.027344 2.878906.046875 4.320312.046875 59.351563 0 119.308594-26.046875 165.140626-71.886719 46.941406-46.941406 73.125-108.71875 71.839843-169.460937-1.132812-52.828125-23.121093-102.542969-61.777343-141.300781l37.257812-37.253907c97.003906 111.066407 91.996094 277.058594-13.144531 382.199219zm0 0" />
                  <path d="m71.886719 178.042969c0 8.007812-6.492188 14.496093-14.496094 14.496093-8.007813 0-14.496094-6.488281-14.496094-14.496093 0-8.003907 6.488281-14.496094 14.496094-14.496094 8.003906 0 14.496094 6.492187 14.496094 14.496094zm0 0" />
                  <path d="m187.863281 390.667969c0 8.007812-6.492187 14.5-14.496093 14.5-8.007813 0-14.496094-6.492188-14.496094-14.5 0-8.003907 6.488281-14.496094 14.496094-14.496094 8.003906 0 14.496093 6.492187 14.496093 14.496094zm0 0" />
                  <path d="m279.367188 261.460938c0 8.003906-6.488282 14.496093-14.496094 14.496093-8.003906 0-14.496094-6.492187-14.496094-14.496093 0-8.007813 6.492188-14.496094 14.496094-14.496094 8.007812 0 14.496094 6.488281 14.496094 14.496094zm0 0" />
                  <path d="m327.210938 213.621094c0 8.003906-6.492188 14.496094-14.496094 14.496094-8.007813 0-14.5-6.492188-14.5-14.496094 0-8.007813 6.492187-14.5 14.5-14.5 8.003906 0 14.496094 6.492187 14.496094 14.5zm0 0" />
                  <path d="m299.867188 377.640625c0 8.007813-6.492188 14.496094-14.496094 14.496094-8.007813 0-14.496094-6.488281-14.496094-14.496094s6.488281-14.496094 14.496094-14.496094c8.003906 0 14.496094 6.488281 14.496094 14.496094zm0 0" />
                  <path d="m347.707031 329.800781c0 8.003907-6.488281 14.496094-14.496093 14.496094-8.003907 0-14.496094-6.492187-14.496094-14.496094 0-8.007812 6.492187-14.496093 14.496094-14.496093 8.007812 0 14.496093 6.488281 14.496093 14.496093zm0 0" />
                  <path d="m395.550781 281.960938c0 8.003906-6.492187 14.496093-14.5 14.496093-8.003906 0-14.496093-6.492187-14.496093-14.496093 0-8.007813 6.492187-14.5 14.496093-14.5 8.007813 0 14.5 6.492187 14.5 14.5zm0 0" />
                  <path d="m375.050781 165.78125c0 8.003906-6.492187 14.496094-14.496093 14.496094-8.007813 0-14.496094-6.492188-14.496094-14.496094 0-8.007812 6.488281-14.496094 14.496094-14.496094 8.003906 0 14.496093 6.488282 14.496093 14.496094zm0 0" />
                  <path d="m245.203125 363.964844c0 8.007812-6.492187 14.496094-14.496094 14.496094-8.007812 0-14.496093-6.488282-14.496093-14.496094 0-8.003906 6.488281-14.496094 14.496093-14.496094 8.003907 0 14.496094 6.492188 14.496094 14.496094zm0 0" />
                  <path d="m294.175781 313.351562c0 8.003907-6.492187 14.496094-14.496093 14.496094-8.007813 0-14.496094-6.492187-14.496094-14.496094 0-8.007812 6.488281-14.496093 14.496094-14.496093 8.003906 0 14.496093 6.488281 14.496093 14.496093zm0 0" />
                  <path d="m342.5 265.027344c0 8.007812-6.492188 14.496094-14.5 14.496094-8.003906 0-14.496094-6.488282-14.496094-14.496094 0-8.007813 6.492188-14.496094 14.496094-14.496094 8.007812 0 14.5 6.488281 14.5 14.496094zm0 0" />
                  <path d="m100.878906 274.691406c0 8.007813-6.488281 14.496094-14.496094 14.496094-8.007812 0-14.496093-6.488281-14.496093-14.496094 0-8.007812 6.488281-14.496094 14.496093-14.496094 8.007813 0 14.496094 6.488282 14.496094 14.496094zm0 0" />
                  <path d="m158.867188 197.375c0 8.003906-6.488282 14.496094-14.496094 14.496094-8.007813 0-14.496094-6.492188-14.496094-14.496094 0-8.007812 6.488281-14.496094 14.496094-14.496094 8.007812 0 14.496094 6.488282 14.496094 14.496094zm0 0" />
                  <path d="m388.714844 220.453125c0 8.007813-6.488282 14.496094-14.496094 14.496094s-14.496094-6.488281-14.496094-14.496094 6.488282-14.496094 14.496094-14.496094 14.496094 6.488281 14.496094 14.496094zm0 0" />
                </svg>
              </div>
              <div className="NavbarLogoPart1 pr-1">A</div>
              <div className="NavbarLogoPart2">r b u z y . c o</div>
              <div className="NavbarLogoPart1 pl-1">m</div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between ml-5"
              id="navbarSupportedContent"
            >
              <div className="center-Element-horizontal">
                <form className="form-inline" id="searchBar">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nazwa produktu..."
                    aria-label="Search"
                    id="NavbarLeftBar"
                    value={this.state.searchValue}
                    onChange={event => this.handleSearchChange(event)}
                    required
                  ></input>
                  <li className="nav-item dropdown" id="searchBarDropdown">
                    <a
                      className="nav-link"
                      id="navbarCategory"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {this.state.searchCategory}{" "}
                      <i className="fas fa-chevron-down"></i>
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarCategory"
                    >
                      <a
                        className="dropdown-item"
                        id="Wszędzie"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Wszędzie
                      </a>
                      <div className="dropdown-divider"></div>
                      <a
                        className="dropdown-item"
                        id="Dyski HDD"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Dyski HDD
                      </a>
                      <a
                        className="dropdown-item"
                        id="Dyski SSD"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Dyski SSD
                      </a>
                      <a
                        className="dropdown-item"
                        id="Karty graficzne"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Karty graficzne
                      </a>
                      <a
                        className="dropdown-item"
                        id="Napędy optyczne"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Napędy optyczne
                      </a>
                      <a
                        className="dropdown-item"
                        id="Obudowy"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Obudowy
                      </a>
                      <a
                        className="dropdown-item"
                        id="Pamięci RAM"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Pamięci RAM
                      </a>
                      <a
                        className="dropdown-item"
                        id="Płyty główne"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Płyty główne
                      </a>
                      <a
                        className="dropdown-item"
                        id="Procesory"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Procesory
                      </a>
                      <a
                        className="dropdown-item"
                        id="Zasilacze"
                        onClick={event => this.handleCategoryChange(event)}
                      >
                        Zasilacze
                      </a>
                    </div>
                  </li>
                  <Link
                    to={`/wyszukaj?q=${this.state.searchValue}&w=${this.state.searchCategory}`}
                    onClick={event => this.handleSearchSubmit(event)}
                  >
                    <button type="submit">
                      Wyszukaj <i className="fa fa-search"></i>
                    </button>
                  </Link>
                </form>
              </div>
              <div className="float-right">
                <ul className="navbar-nav mr-auto">
                  <li
                    className={
                      "nav-item pr-3 " + (this.state.isLogged ? "hidden" : "")
                    }
                  >
                    <Link
                      className="font-weight-bold navbar-Font-Size nav-link cursor-pointer"
                      to="/zaloguj"
                    >
                      <span className="pr-2">Profil</span>
                      <i className="bigicon fas fa-user"></i>
                    </Link>
                  </li>
                  <li
                    className={
                      "nav-item pr-3 " + (this.state.isLogged ? "" : "hidden")
                    }
                  >
                    <Link
                      className="font-weight-bold navbar-Font-Size nav-link cursor-pointer"
                      to="/profil"
                    >
                      <span className="pr-2">Profil</span>
                      <i className="bigicon fas fa-user"></i>
                    </Link>
                  </li>
                  <li
                    className={
                      "nav-item pr-3 " + (this.state.isLogged ? "hidden" : "")
                    }
                  >
                    <Link
                      className="font-weight-bold navbar-Font-Size nav-link cursor-pointer position-relative"
                      to="/zaloguj"
                    >
                      <span className="pr-1">Koszyk</span>
                      <i className="bigicon fas fa-shopping-cart"></i>
                      <span className="badge badge-primary navbarCartStyle position-absolute">
                        {this.state.CartItems}
                      </span>
                    </Link>
                  </li>
                  <li
                    className={
                      "nav-item pr-3 " + (this.state.isLogged ? "" : "hidden")
                    }
                  >
                    <Link
                      className="font-weight-bold navbar-Font-Size nav-link cursor-pointer position-relative"
                      to="/koszyk"
                    >
                      <span className="pr-2">Koszyk</span>
                      <i className="bigicon fas fa-shopping-cart"></i>
                      <span className="badge badge-primary navbarCartStyle position-absolute">
                        {this.state.CartItems}
                      </span>
                    </Link>
                  </li>
                  <li
                    className={
                      "nav-item " + (this.state.isLogged ? "hidden" : "")
                    }
                  >
                    <Link
                      className="font-weight-bold navbar-Font-Size nav-link cursor-pointer"
                      to="/zaloguj"
                    >
                      <span className="pr-2">Zaloguj</span>
                      <i className="bigicon fas fa-sign-in-alt"></i>
                    </Link>
                  </li>
                  <li
                    className={
                      "nav-item small-left " +
                      (this.state.isLogged ? "" : "hidden")
                    }
                  >
                    <Link
                      className="font-weight-bold navbar-Font-Size nav-link cursor-pointer"
                      to="/wyloguj"
                    >
                      <span className="pr-2">Wyloguj</span>
                      <i className="bigicon fas fa-sign-out-alt"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div
              id="alertBox"
              className={
                "alert alert-" +
                this.state.alertColor +
                " position-absolute main-alert " +
                (this.state.showAlert ? "fade-out-alert" : "hide-alert")
              }
            >
              <button>
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="alert-heading text-left ">
                {this.state.alertHeading}
              </h4>
              <hr className="mb-3 mt-3" />
              {this.state.alertText}
            </div>
          </nav>
          <Switch>
            <Route exact path="/">
              {<MainPage />}
            </Route>
            <Route path="/zaloguj">
              <LoginSignupComp
                isLogged={this.state.isLogged}
                redirect={window.location.pathname + window.location.search}
                hasExpired={this.props.hasExpired}
                sendLoggedUser={this.getLoggedUser}
                sendAlertMessage={this.getAlertMessage}
              />
            </Route>
            <Route path="/wyloguj">
              <Logout
                isLogged={this.state.isLogged}
                sendLoggedUser={this.getLoggedUser}
                sendAlertMessage={this.getAlertMessage}
              />
            </Route>
            <Route path="/profil">
              <Profile
                isLogged={this.state.isLogged}
                sendLoggedUser={this.getLoggedUser}
                sendAlertMessage={this.getAlertMessage}
              />
            </Route>
            <Route path="/invoice:id?">
              <Invoice
                isLogged={this.state.isLogged}
                sendLoggedUser={this.getLoggedUser}
                sendAlertMessage={this.getAlertMessage}
              />
            </Route>
            <Route path="/product:id?">
              <Product
                isLogged={this.state.isLogged}
                sendLoggedUser={this.getLoggedUser}
                sendAlertMessage={this.getAlertMessage}
              />
            </Route>
            <Route path="/wyszukaj:q?:w?:s?:p?:l?">
              <SearchResults
                isLogged={this.state.isLogged}
                searchValue={this.state.searchValueToSend}
                searchCategory={this.state.searchCategoryToSend}
                sendUpdatedCartItems={this.getUpdatedCartItems}
                sendAlertMessage={this.getAlertMessage}
                history={history}
              />
            </Route>
            <Route path="/koszyk">
              <ShoppingCart
                sendUpdatedCartItems={this.getUpdatedCartItems}
                sendAlertMessage={this.getAlertMessage}
                isLogged={this.state.isLogged}
                history={history}
              />
            </Route>
          </Switch>
          <PageFooter />
        </div>
      </Router>
    );
  }
}

export default App;
