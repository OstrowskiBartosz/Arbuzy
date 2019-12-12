import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';

import ShoppingCart from './components/ShoppingCart.jsx';
import SearchResults from './components/SearchResults.jsx';
import Logout from './components/Logout.jsx';
import LoginSignupComp from './components/LoginSignupComp.jsx';
//import PageFooter from './components/PageFooter.jsx';
import MainPage from './components/MainPage.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.getSearchValue = this.getSearchValue.bind(this);
    this.state = ({
      isLogged: false,
      showSearchResult: false,
      searchValue: "",
      searchCategory: "",
      hasExpired: false,
    });
  }

  componentDidMount() {
    this.fetchLoggedUser();
  }

  fetchLoggedUser(){
    if(undefined !== Cookies.get('user_sid')){
      let url = "http://localhost:9000/session";
      fetch(url, {
          method: 'get',
          credentials: 'include',
          headers: new Headers({'content-type': 'application/json'}),        
      })
      .then(response=>response.text())
      .then(response => { 
        if(response === "logged"){
          this.setState({ 
            isLogged: true,
          });
        }else{
          this.setState({ 
            hasExpired: true,
          });
        }
      })
      .catch(err => err);
    }
  }

  getSearchValue(searchValue, searchCategory){
    this.setState({
      searchValue: searchValue,
      searchCategory: searchCategory,
    });

  }

  render(){
    return (
        <div className="App">
          <Navbar isLogged={this.state.isLogged} hasExpired={this.state.hasExpired} sendSearchValue={this.getSearchValue} />
        </div>
    );
  }
}
  
class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.getLoggedUser = this.getLoggedUser.bind(this);
    this.getUpdatedCartItems = this.getUpdatedCartItems.bind(this);

    this.getAlertMessage = this.getAlertMessage.bind(this);

    const params = new URLSearchParams(window.location.search);
    let q = "";
    let w = "Wszędzie";
    if(params.has('q')){
      q = params.get('q');
    }
    if(params.has('w')){
      w = params.get('w');
    }

    this.state = {
      isLogged: false,
      searchValue: q,
      searchValueToSend: q,
      searchCategory: w,
      CartItems: 0,

      alertColor: "",
      alertHeading: "",
      alertText: "",
      showAlert: false,
    };
  }

  componentDidUpdate(prevState) {
    if(this.props.isLogged!==prevState.isLogged){
      this.setState({ 
        isLogged: this.props.isLogged, 
      });
      if(this.props.isLogged === true){
        this.fetchCartData();
      }
    }
  }

  fetchCartData(){
    let url = "http://localhost:9000/users";
    fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: new Headers({'content-type': 'application/json'})
    })
    .then(response=>response.text())
    .then(response=>{
      this.setState({ 
        CartItems: response, 
      });
    })
    .catch(err => err);
  }

  getUpdatedCartItems(updateCartData){
    if(updateCartData === true){
     this.fetchCartData();
    }
  }

  getLoggedUser(loggedData){
    if(loggedData === true){
     this.fetchCartData();
    }else if(loggedData === false){
      this.setState({
        CartItems: 0, 
     });
    }
    this.setState({
       isLogged: loggedData, 
    });
  }

  handleSearchClick(){
    this.props.sendSearchValue(this.state.searchValue, this.state.searchCategory);
  }

  handleCategoryChange(event){
    event.preventDefault();
    this.setState({
      searchCategory: event.target.id
    })
  }

  handleSearchChange(event){
    this.setState({
      searchValue: event.target.value,
    });
  }

  handleSearchSubmit(event){
    if(this.state.searchValue.length === 0){
      event.preventDefault();
    }else{
      this.setState({
        searchValueToSend: this.state.searchValue,
      })
    }
  }

  getAlertMessage(alertColor, alertHeading, alertText){
      this.setState({
          showAlert: false
      });
      setTimeout(
        function() {
          this.setState({
            alertColor: alertColor,
            alertHeading: alertHeading,
            alertText: alertText,
            showAlert: true,
          })
        }
        .bind(this), 1);
  }

  render(){
    return(
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light Navbar-border fixed-top">
          <Link className="navbar-brand" to="/">
            <div className='NavbarLogoPart3 center-Element-horizontal'>
              <i className="fab fa-adn"></i>
            </div>
            <div className='NavbarLogoPart1'>A</div>
            <div className='NavbarLogoPart2'>rbuzy.co</div>
            <div className='NavbarLogoPart1'>m</div>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <div className="center-Element-horizontal">
              <form className="form-inline" id="searchBar">
                <input className="form-control" type="text" placeholder="Nazwa produktu..." aria-label="Search" id="NavbarLeftBar" value={this.state.searchValue} onChange= {(event) => this.handleSearchChange(event)} required></input>
                <li className="nav-item dropdown" id="searchBarDropdown">
                  <a className="nav-link" id="navbarCategory" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.searchCategory} <i className="fas fa-chevron-down"></i>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarCategory">
                    <a className="dropdown-item" id="Wszędzie" onClick={(event) => this.handleCategoryChange(event)}>Wszędzie</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" id="Dyski HDD" onClick={(event) => this.handleCategoryChange(event)}>Dyski HDD</a>
                    <a className="dropdown-item" id="Dyski SSD" onClick={(event) => this.handleCategoryChange(event)}>Dyski SSD</a>
                    <a className="dropdown-item" id="Karty graficzne" onClick={(event) => this.handleCategoryChange(event)}>Karty graficzne</a>
                    <a className="dropdown-item" id="Napędy optyczne" onClick={(event) => this.handleCategoryChange(event)}>Napędy optyczne</a>
                    <a className="dropdown-item" id="Obudowy" onClick={(event) => this.handleCategoryChange(event)}>Obudowy</a>
                    <a className="dropdown-item" id="Pamięci RAM" onClick={(event) => this.handleCategoryChange(event)}>Pamięci RAM</a>
                    <a className="dropdown-item" id="Płyty główne" onClick={(event) => this.handleCategoryChange(event)}>Płyty główne</a>
                    <a className="dropdown-item" id="Procesory" onClick={(event) => this.handleCategoryChange(event)}>Procesory</a>
                    <a className="dropdown-item" id="Zasilacze" onClick={(event) => this.handleCategoryChange(event)}>Zasilacze</a>
                  </div>
                </li>
                <Link to={`/wyszukaj?q=${this.state.searchValue}&w=${this.state.searchCategory}`} onClick={(event) => this.handleSearchSubmit(event)}>
                  <button type="submit">Wyszukaj <i className="fa fa-search"></i></button>
                </Link>
              </form>
            </div>
            <div className = "float-right">
              <ul className='navbar-nav mr-auto'>
                <li className={'nav-item pr-3 ' + (this.state.isLogged ? 'hidden' : '')}>
                  <Link className='font-weight-bold navbar-Font-Size nav-link cursor-pointer' to="/zaloguj">
                    <span className = "pr-2">Profil</span>
                    <i className='bigicon fas fa-user'></i>
                  </Link>
                </li>
                <li className={'nav-item pr-3 '  + (this.state.isLogged ? '' : 'hidden')}>
                  <Link className='font-weight-bold navbar-Font-Size nav-link cursor-pointer' to="/profil">
                    <span className = "pr-2">Profil</span>
                    <i className='bigicon fas fa-user'></i>
                  </Link>
                </li>
                <li className={'nav-item pr-3 '  + (this.state.isLogged ? 'hidden' : '')}>
                  <Link className='font-weight-bold navbar-Font-Size nav-link cursor-pointer position-relative' to="/zaloguj">
                    <span className = "pr-1">Koszyk</span>
                    <i className='bigicon fas fa-shopping-cart'></i><span className="badge badge-dark navbarCartStyle position-absolute">{this.state.CartItems}</span>
                  </Link>
                </li>
                <li className={'nav-item pr-3 '  + (this.state.isLogged ? '' : 'hidden')}>
                  <Link className='font-weight-bold navbar-Font-Size nav-link cursor-pointer position-relative' to="/koszyk">
                    <span className = "pr-2">Koszyk</span>
                    <i className='bigicon fas fa-shopping-cart'></i><span className="badge badge-dark navbarCartStyle position-absolute">{this.state.CartItems}</span>
                  </Link>
                </li>
                <li className={'nav-item ' + (this.state.isLogged ? 'hidden' : '')}>
                  <Link className='font-weight-bold navbar-Font-Size nav-link cursor-pointer' to="/zaloguj" >
                    <span className = "pr-2">Zaloguj</span>
                    <i className='bigicon fas fa-sign-in-alt'></i>
                  </Link>
                </li>
                <li className={'nav-item small-left ' + (this.state.isLogged ? '' : 'hidden')}>
                  <Link className='font-weight-bold navbar-Font-Size nav-link cursor-pointer' to="/wyloguj">
                    <span className = "pr-2">Wyloguj</span>
                    <i className='bigicon fas fa-sign-out-alt'></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
            <div id="alertBox" className={"alert alert-" + this.state.alertColor + " position-absolute main-alert " + (this.state.showAlert ? "fade-out-alert" : "hide-alert")}>
              <button type="button" className="close" onClick={() => this.setState({ showAlert: false, })} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="alert-heading text-left ">{this.state.alertHeading}!</h4>
              <hr className="mb-3 mt-3"/>
              {this.state.alertText}
            </div>
        </nav>
        <Switch>
          <Route exact path="/" >
            <MainPage />
          </Route>
          <Route path="/zaloguj">
            <LoginSignupComp redirect={window.location.pathname  + window.location.search} hasExpired={this.props.hasExpired} sendLoggedUser={this.getLoggedUser}  sendAlertMessage={this.getAlertMessage}/>
          </Route>
          <Route path="/wyloguj">
            <Logout isLogged={this.state.isLogged} sendLoggedUser={this.getLoggedUser} sendAlertMessage={this.getAlertMessage}/>
          </Route>
          <Route path="/wyszukaj">
            <SearchResults isLogged={this.state.isLogged} searchValue={this.state.searchValueToSend} searchCategory={this.state.searchCategory} sendUpdatedCartItems={this.getUpdatedCartItems} sendAlertMessage={this.getAlertMessage}/>
          </Route>
          <Route path="/koszyk">
            <ShoppingCart sendUpdatedCartItems={this.getUpdatedCartItems} sendAlertMessage={this.getAlertMessage}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}





export default App;
