import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getLoggedUser = this.getLoggedUser.bind(this);
    this.getLoginClick = this.getLoginClick.bind(this);
    this.getMainClick = this.getMainClick.bind(this);
    this.state = ({
      isLogged: false,
      showLoginSignup: false,
      showMainPage: true,
    });
  }

  getLoggedUser(loggedData){
    this.setState({
      isLogged: loggedData,
    });
  }

  getLoginClick(clickData){
    this.setState({
      showLoginSignup: clickData,
      showMainPage: !clickData,
    });
  }

  getMainClick(clickData){
    this.setState({
      showMainPage: clickData,
      showLoginSignup: !clickData,
    });
  }

  render(){
    return (
      <div className="App">
        <Navbar isLogged={this.state.isLogged} sendLoggedUser={this.getLoggedUser} sendLoginClick={this.getLoginClick} sendMainClick={this.getMainClick} />
        <MainPage showComponent={this.state.showMainPage} isLogged={this.state.isLogged} sendMainClick={this.getMainClick} />
        <Login_signup showComponent={this.state.showLoginSignup} sendLoggedUser={this.getLoggedUser} sendMainClick={this.getMainClick} />
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
    if (!this.props.showComponent) {
      return null;
    }else{
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
}

class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  handleMainClick(event){
    this.props.sendMainClick(true);
  }

  handleLoginClick(){
    this.props.sendLoginClick(true);
  }

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
      this.props.sendLoggedUser(false);
    })
    .catch(err => err);
  }

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light Navbar-border sticky-top">
        <a className="navbar-brand" onClick={() => this.handleMainClick()}>
          <div className='NavbarLogoPart3 center-Element'>
            <i className="fab fa-adn"></i>
          </div>
          <div className='NavbarLogoPart1'>A</div>
          <div className='NavbarLogoPart2'>rbuzy.co</div>
          <div className='NavbarLogoPart1'>m</div>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <div className="center-Element">
            <form className="form-inline" id="searchBar">
              <input className="form-control" type="text" placeholder="Nazwa produktu..." aria-label="Search" id="NavbarLeftBar"></input>
              <li className="nav-item dropdown" id="searchBarDropdown">
                <a className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Wszędzie <i className="fas fa-chevron-down"></i>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item">Wszędzie</a>
                  <a className="dropdown-item">Komputery</a>
                  <a className="dropdown-item">Laptopy</a>
                  <a className="dropdown-item">Karty Graficzne</a>
                  <a className="dropdown-item">Procesory</a>
                  <a className="dropdown-item">Dyski SSD/HDD</a>
                  <a className="dropdown-item">pamięć RAM</a>
                  <a className="dropdown-item">Płyty główne</a>
                  <a className="dropdown-item">Obudowy komputerowe</a>
                </div>
              </li>
              <button type="submit">Wyszukaj <i className="fa fa-search"></i></button>
            </form>
          </div>
          <div className = "float-right">
            <ul className='navbar-nav mr-auto'>
              <li className={'nav-item pr-3 ' + (this.props.isLogged ? 'hidden' : '')}>
                <a className='font-weight-bold navbar-Font-Size nav-link cursor-pointer' onClick={() => this.handleLoginClick()}>
                  <span className = "pr-2">Profil</span>
                  <i className='bigicon fas fa-user'></i>
                </a>
              </li>
              <li className={'nav-item pr-3 '  + (this.props.isLogged ? '' : 'hidden')}>
                <a className='font-weight-bold navbar-Font-Size nav-link cursor-pointer'>
                  <span className = "pr-2">Profil</span>
                  <i className='bigicon fas fa-user'></i>
                </a>
              </li>
              <li className='nav-item pr-3'>
                <a className='font-weight-bold navbar-Font-Size nav-link cursor-pointer'>
                <span className = "pr-1">Koszyk</span>
                  <i className='bigicon fas fa-shopping-cart'></i>
                </a>
              </li>
              <li className={'nav-item ' + (this.props.isLogged ? 'hidden' : '')}>
                <a className='font-weight-bold navbar-Font-Size nav-link cursor-pointer' onClick={() => this.handleLoginClick()}>
                <span className = "pr-2">Zaloguj</span>
                  <i className='bigicon fas fa-sign-in-alt'></i>
                </a>
              </li>
              <li className={'nav-item ' + (this.props.isLogged ? '' : 'hidden')}>
                <a className='font-weight-bold navbar-Font-Size nav-link cursor-pointer' onClick={(event) => this.handleLogout(event)}>
                  <span className = "pr-2">Wyloguj</span>
                  <i className='bigicon fas fa-sign-out-alt'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

class Login_signup extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      czyfirma: false,
      apiCreateUser: "",
      activeLogin: true,
      activeSignup: false,
      logged: false,
      waitngLogin: false,
      errorLogin: false,
      errorMessageLogin: "",
      errorSignup: false,
      errorMessageSignup: "",
    })
  };

  handleMainClick(event){
    event.preventDefault();
    this.props.sendMainClick(true);
  }

  handleSignupSubmit(event){
    event.preventDefault();
    let myForm = document.getElementById('SignupForm');
    let formData = new FormData(myForm);
    var object = {};
    formData.forEach((value, key) => {object[key] = value});
    let url = "http://localhost:9000/users";
    fetch(url, {
        method: 'post',
        body: JSON.stringify(object),
        headers: new Headers({'content-type': 'application/json'})
    })
    .then(response=>response.text())
    .then(response=>{ 
      console.log(response);
      if(response !== "signedup"){
        this.setState({ 
          errorSignup: true, 
          errorMessageSignup: response, })
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
        this.props.sendMainClick(true);
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
    if (!this.props.showComponent) {
      return null;
    }else{
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
          <div className ="col-4 text-left"><button className="btn btn-outline-danger" onClick={(event) => this.handleMainClick(event)}> <i className ="fas fa-chevron-left"></i> Cofnij do strony głównej</button></div>
          <div className ="col-4"></div>
        </div>
      </div>
      );
    }
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
export default App;
