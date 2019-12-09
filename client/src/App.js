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
    this.getUpdatedCartItems = this.getUpdatedCartItems.bind(this);

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
      searchCategory: w,
      CartItems: 0,
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
              <form className="form-inline" onSubmit={(event) => this.handleSearchClick(event)} id="searchBar">
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
                <Link to={`/wyszukaj?q=${this.state.searchValue}&w=${this.state.searchCategory}`}>
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
            <LoginSignupComp redirect={window.location.pathname  + window.location.search} sendLoggedUser={this.getLoggedUser}  />
          </Route>
          <Route path="/wyloguj">
            <Logout isLogged={this.state.isLogged} sendLoggedUser={this.getLoggedUser} />
          </Route>
          <Route path="/wyszukaj">
            <SearchResults isLogged={this.state.isLogged} searchValue={this.state.searchValue} searchCategory={this.state.searchCategory} sendUpdatedCartItems={this.getUpdatedCartItems} />
          </Route>
          <Route path="/koszyk">
            <ShoppingCart sendUpdatedCartItems={this.getUpdatedCartItems} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

class LoginSignupComp extends React.Component{
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
        if(this.props.redirect === "/zaloguj"){
          return <Redirect to='/' />
        }
        return <Redirect to={this.props.redirect} />
      }
      return(
        <div>
        <div className='row '>
          <div className='col-4'>
          </div>
          <div className='col-4 m-5 componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded'>
            <div className = "card-body">
              <div id="Signuptab" className = {"outlinetab col-6 " + (this.state.activeSignup ? " activeTab" : "")} onClick={(event) => this.handleSLChange(event)}>
                Rejestracja
              </div>
              <div id="Logintab" className = {"outlinetab col-6 " + (this.state.activeLogin ? " activeTab" : "")} onClick={(event) => this.handleSLChange(event)}>
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
      prevPageAvailable: false,
      nextPageAvailable: false,
      page: 1,
      activePage: 1,
      
      activeSearchLimit: 10,
      searchLimit10: true,
      searchLimit20: false,
      searchLimit30: false,

      activeSearchSorting: "domyślne",

      isLoading: true,
      ApiResponse: [],
      numberOfPages: 0,
      resItemWord: "produktów",
      resItemCount: 0,
    });
  }

  componentDidMount(){
    const data = {
      nazwa_produktu: this.state.searchValue,
      kategoria: this.state.searchCategory,
      strona: this.state.page,
      limit: this.state.activeSearchLimit,
    }
    fetch('http://localhost:9000/search', {
        method: 'post',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }     
    })
    .then(response=>response.text())
    .then(response => { 
      var responseobject = JSON.parse(response);

      let produkt = "";
      if(responseobject.liczba_przedmiotow === 0 || responseobject.liczba_przedmiotow > 4){ produkt = "produktów";
      } else if(responseobject.liczba_przedmiotow > 1 && responseobject.liczba_przedmiotow < 5){produkt = "produkty";
      }else{produkt = "produkt";}

      var nextPageAvailable, prevPageAvailable;
      if(Math.ceil(responseobject.liczba_przedmiotow)/this.state.activeSearchLimit === this.state.activePage){ nextPageAvailable = false; }
      if(this.state.activePage > 1){ prevPageAvailable = true; }
      this.setState({
        ApiResponse: response,
        isLoading:  false,
        resItemCount: responseobject.liczba_przedmiotow,
        numberOfPages: Math.ceil(responseobject.liczba_przedmiotow/this.state.activeSearchLimit),
        resItemWord: produkt,
        nextPageAvailable: nextPageAvailable,
        prevPageAvailable: prevPageAvailable,
      });
    })
    .catch(err => err);
  }

  handlePageChange(event){
    console.log(event.target.id);
    this.setState({
      Page: event.target.id,
    })
    // const data = {
    //   nazwa_produktu: this.state.searchValue,
    //   kategoria: this.state.searchCategory,
    //   strona: this.state.page,
    //   limit: this.state.limit,
    // }
    // fetch('http://localhost:9000/search', {
    //     method: 'post',
    //     body: JSON.stringify(data),
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }     
    // })
    // .then(response=>response.text())
    // .then(response => { 
    // })
    // .catch(err => err);
  }

  handleSortChange(event){
    event.preventDefault();
    this.setState({
      activeSearchSorting: event.target.id
    })
  }

  handleToCartClick(event){
    event.preventDefault();
    const data = {
      id_produktu: event.target.id,
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
        this.props.sendUpdatedCartItems(true);
      }
    })
    .catch(err => err);
  }

  handleLimitChange(event){
    var searchLimit = event.target.id;
    searchLimit = searchLimit.substring(1, (event.target.id.length-2));
    this.setState({
      searchLimit10: false,
      searchLimit20: false,
      searchLimit30: false,
      ["searchLimit" + searchLimit]: "true",
      activeSearchLimit: searchLimit
    });
  }

  render(){
    if (this.state.isLoading) {
      return (<div>Loading...</div>);
    }else{
      let ApiResponse = JSON.parse(this.state.ApiResponse);
      const pages = []
      for (let i = 0; i < 5; i++) {
        pages.push(<li className="page-item"><a className="page-link" id={i+1} key={"p"+(i+1)} onClick={(event) => this.handlePageChange(event)}>{i+1}</a></li>)
      }
      if(undefined !== ApiResponse && undefined !== ApiResponse.produkty && ApiResponse.produkty.length){
        return(
          <div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10 pt-5 text-left">
                <div><h4>Znaleziono <span className="font-weight-bold">{this.state.resItemCount + " "}</span>{this.state.resItemWord} dla <span className="font-weight-bold">"{this.state.searchValue}"</span></h4></div>
              </div>
            </div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-2">
                <div className="col-12 componentBackgroundColor mt-3 shadow-sm p-3 mb-1 bg-white rounded">
                  <div className="text-left pb-4 font-weight-bold"> 
                    Wyszukiwanie: "{this.state.searchValue}" 
                  </div>
                  <div className="text-left font-weight-bold">aktywne filtry:</div>
                  <div className="text-left mb-5">brak</div>
                  <div>
                    <div className="text-left pb-2"><h5>Kategorie</h5>
                      {ApiResponse.kategorie.map(api => (
                        <div className=" text-left mb-2">
                          <label className="container"><span className="ml-2">{api.nazwa_kategorii}</span><span className="text-right">{" (" + api.liczba_produktow})</span>
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      ))}
                      <div className="dropdown-divider mt-4 mb-4"></div>
                    </div>
                    <div className="text-left pb-2"><h5>Filtry</h5>
                      {ApiResponse.filtry.map(filtry => (
                        <div className=" text-left mb-4">
                          <label className="container"><span className="ml-2">{filtry.atrybut}</span><span className="text-right">{" (" + filtry.liczba_produktow})</span>
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                          <div className="ml-3 mt-2">
                            {filtry.wartosci.map( wartosci => (
                              <div className="mb-2">
                                <label className="container"><span className="ml-2">{wartosci.wartosc}</span><span className="text-right">{" (" + wartosci.liczba_produktow})</span>
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            ))}
                          </div>
                          <div className="dropdown-divider mt-4 mb-4"></div>
                        </div>
                      ))}
                    </div>
                    <div className="text-left pb-2"><h5>Producenci</h5>
                      {ApiResponse.producenci.map(api => (
                        <div className=" text-left mb-2">
                          <label className="container"><span className="ml-2">{api.nazwa_producenta}</span><span className="text-right">{" (" + api.liczba_produktow})</span>
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      ))}
                      <div className="dropdown-divider mt-4 mb-4"></div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-lg btn-block mt-1 pt-1">filtruj</button>
                </div>
              </div>
              <div className="col-7">
                <div className="row">
                  <div className="col-12 componentBackgroundColor mt-3 shadow-sm pt-3 bg-white rounded">
                    <div className="row">
                      <div className="col-4">
                        <div className="float-left">
                          <ul className="pagination float-right">
                            <li className={"page-item " + (this.state.searchLimit10 ? "active" : "")}><a className="page-link" id="l10-1" onClick={(event) => this.handleLimitChange(event)}>10</a></li> 
                            <li className={"page-item " + (this.state.searchLimit20 ? "active" : "")}><a className="page-link" id="l20-1" onClick={(event) => this.handleLimitChange(event)}>20</a></li>
                            <li className={"page-item " + (this.state.searchLimit30 ? "active" : "")}><a className="page-link" id="l30-1" onClick={(event) => this.handleLimitChange(event)}>30</a></li>
                          </ul>
                          <div className=" float-right btn btn-secondary d-inline outline-primary">wyników na stronie</div>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="center-Element d-inline">
                          <div className="btn btn-secondary">sortowanie </div>
                          <div className="dropdown d-inline">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {this.state.activeSearchSorting}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a className="dropdown-item" id="domyślne" onClick={(event) => this.handleSortChange(event)}>domyślne</a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" id="według ceny" onClick={(event) => this.handleSortChange(event)}>według ceny</a>
                              <a className="dropdown-item" id="nazwa produktu A-Z" onClick={(event) => this.handleSortChange(event)}>nazwa produktu A-Z</a>
                              <a className="dropdown-item" id="nazwa produktu Z-A" onClick={(event) => this.handleSortChange(event)}>nazwa produktu Z-A</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <nav aria-label="Page navigation">
                          <ul className="pagination float-right">
                            <div className=" float-right btn btn-secondary d-inline">strona </div>
                            <li className={"page-item " + ((this.state.prevPageAvailable) ? "" : "disabled")}><a className="page-link"><i className="fas fa-chevron-left"></i></a></li>
                            {pages}
                            <li className={"page-item " + ((this.state.prevPageAvailable) ? "" : "disabled")}><a className="page-link"><i className="fas fa-chevron-right"></i></a></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                {ApiResponse.produkty.map(produkt => (
                  <div className="row">
                    <div className="col-12 componentBackgroundColor mt-3 shadow-sm p-3 bg-white rounded">
                      <div className="row">
                        <div className ="col-3 mb-5"><img height="140px" width="auto" alt="obraz produktu" src={produkt.zdjecie}></img></div>
                        <div className ="col-6">
                          <div className="font-weight-bold text-left">
                            <h4>{produkt.nazwa_produktu}</h4>
                          </div>
                          <div className="idProduktu text-left"><span>id produktu: </span>{produkt.id_produktu}</div>
                          <div className="row d-inline text-left">
                          <div className="placement-bottomAtributes"></div>
                            <ul>
                              {produkt.atrybuty.map(atrybut => (
                                <div className ="d-block">
                                  <li>
                                    <span className ="d-inline">{atrybut.atrybut}:</span>
                                    <span className ="font-weight-bold pl-2">{atrybut.wartosc}</span>
                                  </li>
                                </div>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className ="col-3 mb-5">
                          <div className="font-weight-bold text-left"><h3>{produkt.cena_brutto + " zł"}</h3></div>
                          <div className="placement-bottomAddToCart"></div>
                          <button type="button" id={"p" + produkt.id_produktu} className={"btn btn-lg btn-block mt-1 pt-1 " + (this.props.isLogged ? "btn-primary " : "btn-secondary disabled")} 
                                                disabled = {(this.props.isLogged ? "" : "disabled")} onClick={(event) => this.handleToCartClick(event)}>dodaj do koszyka <i className="fas fa-cart-plus"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="row">
                  <div className="col-12 componentBackgroundColor mt-3 shadow-sm pt-3 bg-white rounded">
                    <div className="row">
                      <div className="col-4">
                        <div className="float-left">
                          <ul className="pagination float-right">
                            <li className={"page-item " + (this.state.searchLimit10 ? "active" : "")}><a className="page-link" id="l10-2" onClick={(event) => this.handleLimitChange(event)}>10</a></li> 
                            <li className={"page-item " + (this.state.searchLimit20 ? "active" : "")}><a className="page-link" id="l20-2" onClick={(event) => this.handleLimitChange(event)}>20</a></li>
                            <li className={"page-item " + (this.state.searchLimit30 ? "active" : "")}><a className="page-link" id="l30-2" onClick={(event) => this.handleLimitChange(event)}>30</a></li>
                          </ul>
                          <div className=" float-right btn btn-secondary d-inline outline-primary">wyników na stronie</div>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="center-Element d-inline">
                          <div className="btn btn-secondary">sortowanie </div>
                          <div className="dropdown d-inline">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {this.state.activeSearchSorting}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a className="dropdown-item" id="domyślne" onClick={(event) => this.handleSortChange(event)}>domyślne</a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" id="według ceny" onClick={(event) => this.handleSortChange(event)}>według ceny</a>
                              <a className="dropdown-item" id="nazwa produktu A-Z" onClick={(event) => this.handleSortChange(event)}>nazwa produktu A-Z</a>
                              <a className="dropdown-item" id="nazwa produktu Z-A" onClick={(event) => this.handleSortChange(event)}>nazwa produktu Z-A</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <nav aria-label="Page navigation">
                          <ul className="pagination float-right">
                            <div className=" float-right btn btn-secondary d-inline">strona </div>
                            <li className={"page-item " + ((this.state.prevPageAvailable) ? "" : "disabled")} disabled={ this.state.prevPageAvailable ? false : "disabled"}><a className="page-link" ><i className="fas fa-chevron-left"></i></a></li>
                            {pages}
                            <li className={"page-item " + ((this.state.nextPageAvailable) ? "" : "disabled")} disabled={ this.state.nextPageAvailable ? false : "disabled"}><a className="page-link" > <i className="fas fa-chevron-right"></i></a></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-2"></div>
            </div> 
          </div>
        );
      }else{
        return(
          <div className="row">
            <div className='col-3'>
            </div>
            <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
              <div className = "row">
                <div className = "col-12">
                  <h1>Nie mamy takich przedmiotów :-() </h1>
                </div>
              </div>
            </div>
            <div className='col-3'>
            </div>
          </div>
        );
      }
    }
  }
}

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
      if(apiOBject.produkty.length == 0){
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

      var cenastr = cena.toString();
      cenastr = cenastr.replace(".", ",")
      
      this.setState({
        ApiResponse: response,
        isLoading:  false,
        cartNumberElements: apiOBject.produkty.length,
        cartArray: produktyWKoszykach,
        fullPrice: parseFloat(cenastr),
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
        var produktyWKoszykach = this.state.cartArray;
        var index = produktyWKoszykach.findIndex(e => e[0] === id_produktu_w_koszyku);
        var cena = this.state.fullPrice-(produktyWKoszykach[index][2]*produktyWKoszykach[index][1]);

        produktyWKoszykach.splice(index, 1);
        this.setState({
          cartArray: produktyWKoszykach,
          fullPrice: cena,
        });
        if(produktyWKoszykach.length == 0){
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
    var cena = 0;
    var produktyWKoszykach = this.state.cartArray;
    var index = produktyWKoszykach.findIndex(e => e[0] === id);
    if(sign === "+"){
      if(produktyWKoszykach[index][1] < 5){
        produktyWKoszykach[index][1] = produktyWKoszykach[index][1] + 1;
        cena = produktyWKoszykach[index][2];
      }
    }
    else{
      if(produktyWKoszykach[index][1] > 1){
        produktyWKoszykach[index][1] = produktyWKoszykach[index][1] - 1;
        cena = -produktyWKoszykach[index][2];
      }
    }
    this.setState({
      cartArray: produktyWKoszykach,
      fullPrice: this.state.fullPrice + cena,
    });
  }

  render(){
    if (this.state.isLoading) {
      return (<div>Loading...</div>);
    }else{
      if(this.state.isEmpty === false){
        return(
          <div>
          <div className='row '>
            <div className='col-3'>
            </div>
            <div className= "col-6">
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
              <div className="row">
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
                      <div className ="col-2 p-0">
                        <img height="70px" width="auto" alt="obraz produktu" src={produkt[4]}></img>
                      </div>
                      <div className ="col-5 align-text-center">
                        <div className="text-left">
                          {produkt[3]}
                        </div>
                      </div>
                        <div className ="col-2 align-text-center">
                          <div className="text-left">
                            {produkt[2] + " zł"}
                          </div>
                          <div className="placement-bottomAddToCart"></div>
                        </div>
                        <div className ="col-2 align-text-center">
                          <i className="fas fa-minus cursor-pointer" onClick={(event) => this.handleQuantityClick(event, produkt[0], "-")}></i>
                          <div className="text-left pl-2 pr-2">
                            <input className="text-center" size="1" value={produkt[1]} readOnly></input>
                          </div>
                          <i className="fas fa-plus cursor-pointer" onClick={(event) => this.handleQuantityClick(event, produkt[0], "+")}></i>
                        </div>
                        <div className ="col-1 align-text-center">
                          <span><i className="fas fa-trash-alt cursor-pointer" onClick={() => this.handleTrashClick(produkt[0], produkt[5])}></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6 mt-2 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
                  <div className="row pb-2">
                    <div className="col-xl-4">
                      łącznie do zapłaty
                    </div>
                    <div className="col-xl-4"></div>
                    <div className="col-xl-4">
                      <h4>{this.state.fullPrice} zł</h4>
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
            <div className='col-3'>
            </div>
          </div>
          <div className ="row pt-4">
            <div className ="col-3"></div>
            <div className ="col-5 text-left"><Link className="btn btn-outline-danger" to="/"> <i className ="fas fa-chevron-left"></i> Cofnij do strony głównej</Link></div>
            <div className ="col-4"></div>
          </div>
        </div>
        );
      }else{
        return(
          <div className="row">
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

export default App;
