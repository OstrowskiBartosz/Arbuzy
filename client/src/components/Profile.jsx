import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../css/profil.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      errorLogin: false,
      errorMessageLogin: "",
      errorSignup: false,
      errorMessageSignup: "",
      activeTab: 1,
      isLoading: true,
      userEdit: false
    };
  }

  componentDidMount() {
    let url = "http://localhost:9000/profileOrders";
    fetch(url, {
      method: "post",
      credentials: "include"
    })
      .then(response => response.text())
      .then(response => {
        var responseObject = JSON.parse(response);
        this.setState({
          activeTab: 1,
          response: responseObject,
          isLoading: false
        });
      })
      .catch(err => err);
  }

  handleTabChange(event) {
    switch (event.currentTarget.id) {
      case "orders-btn":
      default:
        let url = "http://localhost:9000/profileOrders";
        fetch(url, {
          method: "post",
          credentials: "include"
        })
          .then(response => response.text())
          .then(response => {
            var responseObject = JSON.parse(response);
            this.setState({ activeTab: 1, response: responseObject });
          })
          .catch(err => err);
        break;
      case "products-btn":
        this.setState({ activeTab: 2 });
        break;
      case "complaints-btn":
        this.setState({ activeTab: 3 });
        break;
      case "settings-btn":
        this.setState({ activeTab: 4 });
        break;
    }
  }

  editUserData(){
    var userEdit = !this.state.userEdit;
    this.setState({userEdit: userEdit});
  }

  render() {
    console.log(this.state.userEdit);
    if (this.state.logged === true) {
      if (this.props.redirect === "/profil") {
        return <Redirect to="/" />;
      }
      return <Redirect to={this.props.redirect} />;
    }
    if (this.state.isLoading) {
      return <div className="loading"></div>;
    } else {
      return (
        <div className="container options shadow-sm bg-white rounded">
          <div className="d-flex flex-wrap">
            <div className="col">
              <button
                id="orders-btn"
                className="btn btn-primary option"
                onClick={event => this.handleTabChange(event)}
              >
                <i className="fa fa-shopping-bag"></i> Zamówienia
              </button>
            </div>
            <div className="col d-none">
              <button
                id="products-btn"
                className="btn btn-primary option"
                onClick={event => this.handleTabChange(event)}
              >
                <i className="fab fa-product-hunt"></i> Produkty
              </button>
            </div>
            <div className="col">
              <button
                id="complaints-btn"
                className="btn btn-primary option"
                onClick={event => this.handleTabChange(event)}
              >
                <i className="fa fa-share-square"></i> Reklamacje
              </button>
            </div>
            <div className="col">
              <button
                id="settings-btn"
                className="btn btn-primary option"
                onClick={event => this.handleTabChange(event)}
              >
                <i className="fas fa-cog"></i> Ustawienia
              </button>
            </div>
          </div>
          <div
            className={
              "container orders " + (this.state.activeTab === 1 ? "" : "d-none")
            }
          >
            <div className="row">
              <div className="col">
                <h1>Twoje zamówienia</h1>
                <table className="table table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Data</th>
                      <th scope="col">Wartość netto</th>
                      <th scope="col">Wartość brutto</th>
                      <th scope="col">Akcja</th>
                    </tr>
                  </thead>
                  <tbody className="table-striped">
                    {this.state.response.invoice.map((faktura, index) => (
                      <tr key={faktura.id_faktury}>
                        <td>{faktura.id_faktury}</td>
                        <td>
                          {new Intl.DateTimeFormat("pl-PL", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                          }).format(new Date(faktura.data))}
                        </td>
                        <td>
                          {faktura.wartosc_netto.toLocaleString("pl-PL", {
                            minimumFractionDigits: 2
                          })}{" "}
                          zł
                        </td>
                        <td>
                          {faktura.wortosc_brutto.toLocaleString("pl-PL", {
                            minimumFractionDigits: 2
                          })}{" "}
                          zł
                        </td>
                        <td>
                          <Link
                            className="btn btn-primary"
                            to={"/invoice?id=" + faktura.id_faktury}
                          >
                            Szczegóły
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col"></div>
            </div>
          </div>
          <div
            className={
              "container products " +
              (this.state.activeTab === 2 ? "" : "d-none")
            }
          >
            <div className="row">
              <div className="col">
                <h1>Twoje produkty</h1>
              </div>
            </div>
            <div className="row">
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col"></div>
            </div>
          </div>
          <div
            className={
              "container complaints " +
              (this.state.activeTab === 3 ? "" : "d-none")
            }
          >
            <div className="row">
              <div className="col">
                <h1>Reklamacje w sklepie Arbuzy.com</h1>
              </div>
            </div>
            <div className="row">
              <div className="col left">
                <span>
                  W celu złożenia reklamacji w sklepie Arbuzy.com należy wysłać
                  reklamowany towar na adres:
                  <br />
                  <br />
                  Arbuzy.com
                  <br />
                  Dział Obsługi Reklamacji
                  <br />
                  ul. Owocowa 16/5b
                  <br />
                  45-123 Opole <br />
                  <br />
                  <b>
                    Do paczki powinien zostać dołączony numer zamówienia,
                    którego dotyczy przesyłana reklamacja.
                  </b>
                  <br />
                  Towar powinien zostać zapakowany w bezpieczny sposób, aby nie
                  uległ uszkodzeniu podczas wysyłki. Za wszelkie uszkodzenia
                  wynikłe z tego tytułu odpowiada kupujący.
                </span>
              </div>
            </div>
          </div>
          <div
            className={
              "container settings " +
              (this.state.activeTab === 4 ? "" : "d-none")
            }
          >
            <div className="row">
              <div className="col">
                <h1>Ustawienia konta</h1>
              </div>
            </div>
              {this.state.response.user.map((user, index) => (
                <div key={index} className="row">
                  <div className={this.state.userEdit ? "d-none" : "col left"}>
                    <div className={user.nazwa_firmy == null ? "d-none" : ""}>{user.nazwa_firmy}</div>
                    <div>{user.imie} {user.nazwisko}</div>
                    <div>{user.ulica_zamieszkania}</div>
                    <div>{user.miasto_zamieszkania} {user.kod_pocztowy}</div>
                    <div className={user.numer_nip == null ? "d-none" : ""}>{user.numer_nip}</div>
                  </div>
                  <div className={this.state.userEdit ? "col left" : "d-none"}>
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <input type="text" className="form-control" placeholder="Imie" defaultValue={user.imie}></input>
                        </div>
                        <div className="form-group col-md-6">
                          <input type="text" className="form-control" placeholder="Nazwisko" defaultValue={user.nazwisko}></input>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="col left">
                  <button type="button" className="btn btn-primary" onClick={() => this.editUserData()}>Edytuj dane</button>
                </div>
              </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
