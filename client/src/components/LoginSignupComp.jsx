import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';

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
        this.props.sendAlertMessage("primary", "Zarejestrowano i zalogowano!", "Rejestracja konta przebiegła pomyślnie. Konto jest teraz zalogowane.");
      }
    })
    .catch(err => err);
  }

  componentDidMount(){
    if(this.props.hasExpired === true){
      this.setState({
        errorLogin: true, 
        errorMessageLogin: "Sesja wygasła. Proszę się zalogować ponownie.", 
      });
    }
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
        this.props.sendAlertMessage("primary", "Zalogowano", "Konto zostało zalogowane.");
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
        <div className='row navbar-padding'>
          <div className='col-xl-4'>
          </div>
          <div className='col-xl-4 mt-5 componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded'>
            <div className = "card-body">
              <div id="Signuptab" className = {"outlinetab col-lg-6 " + (this.state.activeSignup ? " activeTab" : "")} onClick={(event) => this.handleSLChange(event)}>
                Rejestracja
              </div>
              <div id="Logintab" className = {"outlinetab col-lg-6 " + (this.state.activeLogin ? " activeTab" : "")} onClick={(event) => this.handleSLChange(event)}>
                Logowanie
              </div>

            </div>
            <div className= {"card-body " + (this.state.activeSignup ? "" : "hidden")}>
              <div className="p-3 text-left">
                <h5 className="card-title bigfont">Rejestracja użytkownika/firmy</h5>
                <form id="SignupForm" onSubmit={(event) => this.handleSignupSubmit(event)}>
                  <div>Dane logowania</div>
                  <div className='row'>
                    <div className='col-lg-6 signupinput'><input type='text' name="login" className="form-control" placeholder= "Login" required></input></div>
                    <div className='col-lg-6 signupinput'><input type='password' name="haslo" className="form-control" placeholder= "Hasło" required></input></div>
                  </div>

                  <div className='row'>
                    <div className='col-12 signupinput'><input type='text' name="email" className="form-control" placeholder= "Adres email" required></input></div>
                  </div>

                  <div>Dane personalne</div>
                  <div className='row'>
                    <div className='col-lg-6 signupinput'><input type='text' name="imie" className="form-control" placeholder= "Imie" required></input></div>
                    <div className='col-lg-6 signupinput'><input type='text' name="nazwisko" className="form-control" placeholder= "Nazwisko" required></input></div>
                  </div>

                  <div className='row'>
                    <div className='col-lg-6 signupinput'><input type='text' name="telefon_o" className="form-control" placeholder= "Telefon osobisty" required></input></div>
                  </div>

                  <div className="SignupCompanyCheckbox pb-4">
                    Czy zakładane jest konto firmy?  <input type='checkbox' placeholder= "Nazwisko" onChange={(event) => this.handleFirmaChange(event)}></input>
                  </div>

                  <div className = {'' + (this.state.czyfirma ? "" : "hidden")}>Dane firmy</div>
                  <div className={'row ' + (this.state.czyfirma ? "" : "hidden")}>
                    <div className='col-lg-6 signupinput'><input type='text' name="nazwa_firmy" className="form-control" placeholder= "Nazwa firmy" required={(this.state.czyfirma ? " required" : "")}></input></div>
                    <div className='col-lg-6 signupinput'><input type='text' name="nip" className="form-control" placeholder= "numer NIP" required={(this.state.czyfirma ? " required" : "")}></input></div>
                  </div>


                  <div>Dane zamieszkania</div>
                  <div className='row'>
                    <div className='col-12 signupinput'><input type='text' name="ulica" className="form-control" placeholder= "Ulica zamieszkania, numer budynku i mieszkania" required></input></div>
                  </div>

                  <div className='row'>
                    <div className='col-lg-6 signupinput'><input type='text' name="miasto" className="form-control" placeholder= "Miasto zamieszkania" required></input></div>
                    <div className='col-lg-6 signupinput'><input type='text' name="kod" className="form-control" placeholder= "kod pocztowy" required></input></div>
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
          <div className='col-xl-4'>
          </div>
        </div>
        <div className ="row pt-4">
            <div className ="col-lg-3"></div>
            <div className ="col-lg-5 text-left"><Link className="btn btn-outline-danger" to="/"> <i className ="fas fa-chevron-left"></i> Cofnij do strony głównej</Link></div>
            <div className ="col-lg-4"></div>
          </div>
      </div>
      );
    }
}

export default LoginSignupComp;