import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      isLogged: true,
      apiResponse: "Api is NOT working properly",
    });
  }
  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }
  componentDidMount() {
    this.callAPI();
  }
  render(){
    return (
      <div className="App">
        <Navbar isLogged={this.state.isLogged} />
        <Login_signup />
      </div>
    );
  }
}

class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
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
    })
    .catch(err => err);
  }

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <div className='arbuzy3'>
            <i className="fab fa-adn"></i>
          </div>
          <div className='arbuzy1'>A</div>
          <div className='arbuzy2'>rbuzy.co</div>
          <div className='arbuzy1'>m</div>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto center">
            <li>
              <form className="form-inline my-5 my-lg-0">
                <input className="form-control col-l-4 input-lg" type="search" placeholder="Wyszukaj produkt" aria-label="Search"></input>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Wszystkie działy
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Komputery</a>
                    <a className="dropdown-item" href="#">Laptopy</a>
                    <a className="dropdown-item" href="#">Karty Graficzne</a>
                    <a className="dropdown-item" href="#">Procesory</a>
                    <a className="dropdown-item" href="#">Dyski SSD/HDD</a>
                    <a className="dropdown-item" href="#">pamięć RAM</a>
                    <a className="dropdown-item" href="#">Płyty główne</a>
                    <a className="dropdown-item" href="#">Obudowy komputerowe</a>
                  </div>
                </li>
              </form>
            </li>
          </ul>
          <div>
          </div>
            <button className={'btn btn-outline-danger my-2 my-sm-0 acceptbtn ' + (this.props.isLogged ? '' : 'hidden')} type='submit' onClick={(event) => this.handleLogout(event)}>Wyloguj</button>
            <button className={'btn btn-outline-success my-2 my-sm-0 acceptbtn ' + (this.props.isLogged ? 'hidden' : '')} type='submit'>Zaloguj lub zarejestruj</button>
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
          errorMessageLogin: response, })
      }else{
        console.log(response);
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
    return(
      <div>
        <div className='row'>
          <div className='col-4'>
          </div>
          <div className='col-4 pad'>
            <div className = "card-body">
              <div id="Signuptab" className = {"outlinetab col-6 " + (this.state.activeSignup ? " active" : "")} onClick={(event) => this.handleSLChange(event)}>
                Rejestracja
              </div>
              <div id="Logintab" className = {"outlinetab col-6 " + (this.state.activeLogin ? " active" : "")} onClick={(event) => this.handleSLChange(event)}>
                Logowanie
              </div>

            </div>
            <div className= {"card-body " + (this.state.activeSignup ? "" : "hidden")}>
              <div className="outline left">
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
                    {/*<div className={'col-6 signupinput ' + (this.state.czyfirma ? "" : "hidden")}><input type='text' name="telefon_f" className="form-control" placeholder= "telefon firmowy" required></input></div>*/}
                  </div>

                  <div className="signupcheckbox">
                    Czy zakładane jest konto firmy?  <input type='checkbox' className="pad" placeholder= "Nazwisko" onChange={(event) => this.handleFirmaChange(event)}></input>
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
                  <div className="acceptbtns">
                    <input type="submit" value="utwórz konto" className="btn btn-outline-primary acceptbtn"></input>
                  </div>
                </form>
              </div>
            </div>
            
            <div className= {"card-body " + (this.state.activeLogin ? "" : "hidden")}>
              <div className="outline left">
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
                  <div className="acceptbtns">
                    <input type="submit" value="Zaloguj" className="btn btn-outline-primary acceptbtn"></input>
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
          <div className ="col-4 cofnij"><button className="btn btn-outline-danger"> <i className ="fas fa-chevron-left"></i> Cofnij do strony głównej</button></div>
          <div className ="col-4"></div>
        </div>
      </div>
    );
  }
}

export default App;
