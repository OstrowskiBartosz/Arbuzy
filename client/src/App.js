import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.getSearchValue = this.getSearchValue.bind(this);
    this.state = ({
      isLogged: false,
      showSearchResult: false,
      searchValue: "",
      searchCategory: "",
    });
  }

  componentDidMount() {
    this.fetchLoggedUser();
  }

  fetchLoggedUser(){
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
      }
    })
    .catch(err => err);
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
          <Navbar isLogged={this.state.isLogged} sendSearchValue={this.getSearchValue} />
        </div>
    );
  }
}

class CategoryBar extends React.Component{
  constructor(props){
    super(props);
    this.state = ({});
  }
  render(){
    return(
      <div>
        <div>
            <div className = "categoryBar componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded">
              <div className ="categoryHeader">Kategorie</div>
              <ul>
                <li className = "categoryLink">Komputery</li>
                <li className = "categoryLink">Laptopy</li>
                <li className = "categoryLink">Karty Graficzne</li>
                <li className = "categoryLink">Procesory</li>
                <li className = "categoryLink">Dyski SSD/HDD</li>
                <li className = "categoryLink">pamięć RAM</li>
                <li className = "categoryLink">Płyty główne</li>
                <li className = "categoryLink">Obudowy komputerowe</li>
              </ul>
            </div>
        </div>
      </div>
    );
  }


}

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
    });
  }
  render(){
      return(
        <div>
          <div>
            <div className = "row">
              <div className ="col-1"></div>
              <div className ="col-2">
                <CategoryBar />
              </div>
              <div className ="col-8 MainPageBar componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded">
                <div className = "testheader">
                  STRONA GŁÓWNA
                </div>
                <div>
                super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                </div>
              </div>
              <div className ="col-1">
              </div>
            </div>
            <div className = "row">
              <div className ="col-1"></div>
              <div className ="col-10 polecaneProduktyBar componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded">
                <div className = "testheader">
                  POLECANE PRODUKTY
                </div>
                <div>
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                </div>
              </div>
              <div className ="col-1">
              </div>
            </div>

            <div className = "row">
              <div className ="col-1"></div>
              <div className ="col-10 megaPromocjeBar componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded">
                <div className = "testheader">
                  MEGA PROMOCJE
                </div>
                <div>
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                </div>
              </div>
              <div className ="col-1">
              </div>
            </div>

          </div>
          <PageFooter />
        </div>
      );
    }
  }
  
class Navbar extends React.Component{
  
  constructor(props){
    super(props);
    this.getLoggedUser = this.getLoggedUser.bind(this);
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
      CartItems: 0,
      searchCategory: w,
    };
    
  }

  componentDidUpdate(prevState) {
    if(this.props.isLogged!==prevState.isLogged){
      this.setState({ 
        isLogged: this.props.isLogged, 
      });
    }
  }

  getLoggedUser(loggedData){
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

  render(){
    return(
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light Navbar-border sticky-top">
          <Link className="navbar-brand" to="/">
            <div className='NavbarLogoPart3 center-Element'>
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
            <div className="center-Element">
              <form className="form-inline" id="searchBar">
                <input className="form-control" type="text" placeholder="Nazwa produktu..." aria-label="Search" id="NavbarLeftBar" value={this.state.searchValue} onChange= {(event) => this.handleSearchChange(event)} required></input>
                <li className="nav-item dropdown" id="searchBarDropdown">
                  <a className="nav-link" id="navbarCategory" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.searchCategory} <i className="fas fa-chevron-down"></i>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarCategory">
                    <a className="dropdown-item" id="Wszędzie" onClick={(event) => this.handleCategoryChange(event)}>Wszędzie</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" id="Komputery" onClick={(event) => this.handleCategoryChange(event)}>Komputery</a>
                    <a className="dropdown-item" id="Laptopy" onClick={(event) => this.handleCategoryChange(event)}>Laptopy</a>
                    <a className="dropdown-item" id="Karty Graficzne" onClick={(event) => this.handleCategoryChange(event)}>Karty Graficzne</a>
                    <a className="dropdown-item" id="Procesory" onClick={(event) => this.handleCategoryChange(event)}>Procesory</a>
                    <a className="dropdown-item" id="Dyski SSD" onClick={(event) => this.handleCategoryChange(event)}>Dyski SSD</a>
                    <a className="dropdown-item" id="Dyski HDD" onClick={(event) => this.handleCategoryChange(event)}>Dyski HDD</a>
                    <a className="dropdown-item" id="pamięć RAM" onClick={(event) => this.handleCategoryChange(event)}>pamięć RAM</a>
                    <a className="dropdown-item" id="Płyty główne" onClick={(event) => this.handleCategoryChange(event)}>Płyty główne</a>
                    <a className="dropdown-item" id="Obudowy" onClick={(event) => this.handleCategoryChange(event)}>Obudowy</a>
                  </div>
                </li>
                <Link to={`/wyszukaj?q=${this.state.searchValue}&w=${this.state.searchCategory}`}>
                  <button type="submit"  onClick={(event) => this.handleSearchClick(event)}>Wyszukaj <i className="fa fa-search"></i></button>
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
                <li className='nav-item pr-3'>
                  <Link className='font-weight-bold navbar-Font-Size nav-link cursor-pointer position-relative' to="/koszyk">
                    <span className = "pr-1">Koszyk</span>
                    <i className='bigicon fas fa-shopping-cart'></i><span className="badge badge-dark navbarCartStyle position-absolute">{this.state.CartItems}</span>
                  </Link>
                </li>
                <li className={'nav-item ' + (this.state.isLogged ? 'hidden' : '')}>
                  <Link className='font-weight-bold navbar-Font-Size nav-link cursor-pointer' to="/zaloguj" >
                    <span className = "pr-2">Zaloguj</span>
                    <i className='bigicon fas fa-sign-in-alt'></i>
                  </Link>
                </li>
                <li className={'nav-item ' + (this.state.isLogged ? '' : 'hidden')}>
                  <Link className='font-weight-bold navbar-Font-Size nav-link cursor-pointer' to="/wyloguj">
                    <span className = "pr-2">Wyloguj</span>
                    <i className='bigicon fas fa-sign-out-alt'></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" >
            <MainPage />
          </Route>
          <Route path="/zaloguj">
            <Login_signup  sendLoggedUser={this.getLoggedUser}  />
          </Route>
          <Route path="/wyloguj">
            <Logout isLogged={this.state.isLogged} sendLoggedUser={this.getLoggedUser} />
          </Route>
          <Route path="/wyszukaj">
            <SearchResults isLogged={this.state.isLogged} searchValue={this.state.searchValue} searchCategory={this.state.searchCategory} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

class Login_signup extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      czyfirma: false,
      activeLogin: true,
      activeSignup: false,
      logged: false,
      errorLogin: false,
      errorMessageLogin: "",
      errorSignup: false,
      errorMessageSignup: "",
    });

  };

  handleSignupSubmit(event){
    event.preventDefault();
    this.setState({ 
      errorSignup: false, 
      errorMessageSignup: "", });
    let myForm = document.getElementById('SignupForm');
    let formData = new FormData(myForm);
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    let url = "http://localhost:9000/users";
    fetch(url, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(object),
        headers: new Headers({'content-type': 'application/json'})
    })
    .then(response=>response.text())
    .then(response=>{ 
      if(response !== "signedup"){
        this.setState({ 
          errorSignup: true, 
          errorMessageSignup: response, })
      }else{
        console.log(response);
        this.setState({ 
          logged: true,
        });
        this.props.sendLoggedUser(this.state.logged);
      }
    })
    .catch(err => err);
  }

  handleLoginSubmit(event){
    event.preventDefault();
    this.setState({ 
      errorLogin: false, 
      errorMessageLogin: "", });
    let myForm = document.getElementById('loginForm');
    let formData = new FormData(myForm);
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    let url = "http://localhost:9000/login";
    fetch(url, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(object),
        headers: new Headers({'content-type': 'application/json'}),        
    })
    .then(response=>response.text())
    .then(response => { 
      if(response !== "logged"){
        this.setState({ 
          errorLogin: true, 
          errorMessageLogin: response, 
        });
      }else{
        console.log(response);
        this.setState({ 
          logged: true,
        });
        this.props.sendLoggedUser(this.state.logged);
      }
    })
    .catch(err => err);
  }

  handleFirmaChange(event){
    var czyfirma = event.target.checked ? true : false;
    this.setState({
      czyfirma: czyfirma,
    })
  }

  handleSLChange(event){
    let activeSignup;
    let activeLogin;
    if(event.target.id === "Signuptab"){
      activeSignup = true;
      activeLogin = false;
    }
    else if(event.target.id === "Logintab"){
      activeSignup = false;
      activeLogin = true;
    }
    this.setState({
      activeLogin: activeLogin,
      activeSignup: activeSignup,
    })
  }

  render(){
      if (this.state.logged === true) {
        return <Redirect to='/' />
      }
      return(
        <div>
        <div className='row '>
          <div className='col-4'>
          </div>
          <div className='col-4 m-5 componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded'>
            <div className = "card-body">
              <div id="Signuptab" className = {"outlinetab col-6 " + (this.state.activeSignup ? " active" : "")} onClick={(event) => this.handleSLChange(event)}>
                Rejestracja
              </div>
              <div id="Logintab" className = {"outlinetab col-6 " + (this.state.activeLogin ? " active" : "")} onClick={(event) => this.handleSLChange(event)}>
                Logowanie
              </div>

            </div>
            <div className= {"card-body " + (this.state.activeSignup ? "" : "hidden")}>
              <div className="p-3 text-left">
                <h5 className="card-title bigfont">Rejestracja użytkownika/firmy</h5>
                <form id="SignupForm" onSubmit={(event) => this.handleSignupSubmit(event)}>
                  <div>Dane logowania</div>
                  <div className='row'>
                    <div className='col-6 signupinput'><input type='text' name="login" className="form-control" placeholder= "login" required></input></div>
                    <div className='col-6 signupinput'><input type='password' name="haslo" className="form-control" placeholder= "hasło" required></input></div>
                  </div>

                  <div className='row'>
                    <div className='col-12 signupinput'><input type='text' name="email" className="form-control" placeholder= "adres email" required></input></div>
                  </div>

                  <div>Dane personalne</div>
                  <div className='row'>
                    <div className='col-6 signupinput'><input type='text' name="imie" className="form-control" placeholder= "Imie" required></input></div>
                    <div className='col-6 signupinput'><input type='text' name="nazwisko" className="form-control" placeholder= "Nazwisko" required></input></div>
                  </div>

                  <div className='row'>
                    <div className='col-6 signupinput'><input type='text' name="telefon_o" className="form-control" placeholder= "telefon osobisty" required></input></div>
                  </div>

                  <div className="SignupCompanyCheckbox">
                    Czy zakładane jest konto firmy?  <input type='checkbox' placeholder= "Nazwisko" onChange={(event) => this.handleFirmaChange(event)}></input>
                  </div>

                  <div className = {'' + (this.state.czyfirma ? "" : "hidden")}>Dane firmy</div>
                  <div className={'row ' + (this.state.czyfirma ? "" : "hidden")}>
                    <div className='col-6 signupinput'><input type='text' name="nazwa_firmy" className="form-control" placeholder= "Nazwa firmy" required={(this.state.czyfirma ? " required" : "")}></input></div>
                    <div className='col-6 signupinput'><input type='text' name="nip" className="form-control" placeholder= "numer NIP" required={(this.state.czyfirma ? " required" : "")}></input></div>
                  </div>


                  <div>Dane zamieszkania</div>
                  <div className='row'>
                    <div className='col-12 signupinput'><input type='text' name="ulica" className="form-control" placeholder= "Ulica zamieszkania, numer budynku i mieszkania" required></input></div>
                  </div>

                  <div className='row'>
                    <div className='col-6 signupinput'><input type='text' name="miasto" className="form-control" placeholder= "Miasto zamieszkania" required></input></div>
                    <div className='col-6 signupinput'><input type='text' name="kod" className="form-control" placeholder= "kod pocztowy" required></input></div>
                  </div>
                  <small id="notka" className="form-text text-muted">Nigdy nie podzielimy się z nikim twoimi danymi.</small>

                  <div className= {"error " + (this.state.errorSignup ? "" : "hidden")}>
                      <div className = "errorWarning">
                        <i className="fas fa-exclamation-triangle errorWarning"></i>
                        <div className = "errorMessage">{this.state.errorMessageSignup}</div>
                      </div>
                    </div>
                  <div className="loginSignupSubmitButton">
                    <input type="submit" value="utwórz konto" className="btn btn-outline-primary"></input>
                  </div>
                </form>
              </div>
            </div>
            
            <div className= {"card-body " + (this.state.activeLogin ? "" : "hidden")}>
              <div className="p-3 text-left">
                <h5 className="card-title bigfont">Logowanie użytkownika/firmy</h5>
                <form id="loginForm" onSubmit={(event) => this.handleLoginSubmit(event)}>
                  <div>Dane logowania</div>
                    <div className='signupinput'><input type='text' name="login" className="form-control" placeholder= "login" required></input></div>
                    <div className='signupinput'><input type='password' name="haslo" className="form-control" placeholder= "hasło" required></input></div>
                    <div className= {"error " + (this.state.errorLogin ? "" : "hidden")}>
                      <div className = "errorWarning">
                        <i className="fas fa-exclamation-triangle errorWarning"></i>
                        <div className = "errorMessage">{this.state.errorMessageLogin}</div>
                      </div>
                    </div>
                  <div className="loginSignupSubmitButton">
                    <input type="submit" value="Zaloguj" className="btn btn-outline-primary"></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='col-4'>
          </div>
        </div>
        <div className ="row">
          <div className ="col-4"></div>
          <div className ="col-4 text-left"><Link className="btn btn-outline-danger" to="/"> <i className ="fas fa-chevron-left"></i> Cofnij do strony głównej</Link></div>
          <div className ="col-4"></div>
        </div>
      </div>

      );
    }
  }

class Logout extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      isLogged: this.props.isLogged,
    });
  };
  
  handleLogout(event){
    event.preventDefault();
    let url = "http://localhost:9000/logout";
    fetch(url, {
        method: 'get',
        credentials: 'include',      
    })
    .then(response=>response.text())
    .then(response => { 
      console.log(response);
      this.setState({
        isLogged: false,
      });
      this.props.sendLoggedUser(this.state.isLogged);
    })
    .catch(err => err);
  }
  
  render(){
    if (this.state.isLogged === false) {
      return <Redirect to='/' />
    }else{
      return(
        <div>
          <div className='row '>
            <div className='col-4'>
            </div>
            <div className='col-4 m-5 componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded'>
              <div className= "card-body ">
                <div className="p-3 text-left">
                  <h5 className="card-title bigfont">Czy na pewno chcesz się wylogować?</h5>
                  <div className="loginSignupSubmitButton">
                    <div className ="d-inline pr-5"><Link className="btn btn-outline-danger" to="/"> <i className ="fas fa-chevron-left"></i> Cofnij do strony głównej</Link></div>
                    <button  className="btn btn-outline-success" onClick = {(event) => this.handleLogout(event)}>Wyloguj</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )};
  }
}

class PageFooter extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className = "Footer">
        FOOTER
      </div>
    );
  }
}


class SearchResults extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      searchValue: this.props.searchValue,
      searchCategory: this.props.searchCategory,
    });
  }
  render(){
    return(
      <div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-2">
            <div className="col-12 componentBackgroundColor mt-5 pt-5 shadow-sm p-3 mb-1 bg-white rounded">
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
            </div>
          </div>
          <div className="col-7">
            <div className="row">
              <div className="col-12 componentBackgroundColor mt-5 pt-5 shadow-sm p-3 mb-1 bg-white rounded">
              super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
              </div>
            </div>
            <div className="row">
              <div className="col-12 componentBackgroundColor mt-5 pt-5 shadow-sm p-3 mb-1 bg-white rounded">
              super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
              </div>
            </div>
            <div className="row">
              <div className="col-12 componentBackgroundColor mt-5 pt-5 shadow-sm p-3 mb-1 bg-white rounded">
              super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
                  super promocja super promocja super promocja super promocja super promocja super promocja super promocja 
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>

      </div>
    );
  }
}

export default App;
