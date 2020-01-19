import React from "react";
import { Redirect } from "react-router-dom";
import "../css/profil.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    this.state = {
      logged: false,
      errorLogin: false,
      errorMessageLogin: "",
      errorSignup: false,
      errorMessageSignup: "",
      activeTab: 1,
      isLoading: true,
      invoiceID: params.get("id")
    };
  }

  componentDidMount() {
    let url = "http://localhost:9000/invoice";
    fetch(url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "invoiceID=" + this.state.invoiceID
    })
      .then(response => response.text())
      .then(response => {
        var responseObject = JSON.parse(response);
        this.setState({ response: responseObject, isLoading: false });
      })
      .catch(err => err);
  }

  render() {
    console.log(this.state.response);
    if (this.state.logged === true) {
      if (this.props.redirect === "/invoice") {
        return <Redirect to="/" />;
      }
      return <Redirect to={this.props.redirect} />;
    }
    if (this.state.isLoading) {
      return <div className="loading"></div>;
    } else {
      if (this.state.response.error) {
        return <Redirect to="/profil" />;
      } else {
        return (
          <div className="container options shadow-sm bg-white rounded">
            <h1>Faktura numer {this.state.response.invoiceID}</h1>
            <div className="row align-left bordered">
              <div className="col">
                <div>
                  <strong>Szczegóły:</strong>
                  <hr></hr>
                </div>
                <div>
                  Status: <strong>Zrealizowane</strong>
                </div>
                <div>
                  Data wystawienia:{" "}
                  <strong>
                    {new Intl.DateTimeFormat("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit"
                    }).format(new Date(this.state.response.invoiceDate))}
                  </strong>
                </div>
                <div>
                  Typ rachunku: <strong>Faktura</strong>
                </div>
              </div>
            </div>
            <div className="row align-left bordered">
              <div className="col">
                <div>
                  <strong>Nabywca:</strong>
                  <hr></hr>
                </div>
                <div
                  className={
                    this.state.response.invoiceFirma == null ? "" : "d-none"
                  }
                >
                  {this.state.response.invoiceNazwa}
                </div>
                <div
                  className={
                    this.state.response.invoiceFirma == null ? "d-none" : ""
                  }
                >
                  {this.state.response.invoiceFirma}
                </div>
                <div>
                  {this.state.response.invoiceKod}{" "}
                  {this.state.response.invoiceMiasto}
                </div>
                <div>{this.state.response.invoiceUlica}</div>
                <div
                  className={
                    this.state.response.invoiceNIP == null ? "d-none" : ""
                  }
                >
                  NIP: {this.state.response.invoiceNIP}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col margin-5">
                <table className="table table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nazwa produktu</th>
                      <th scope="col">Ilość</th>
                      <th scope="col">Wartość netto</th>
                      <th scope="col">Wartość brutto</th>
                      <th scope="col">VAT</th>
                    </tr>
                  </thead>
                  <tbody className="table-striped">
                    {this.state.response.produkty.map((produkt, index) => (
                      <tr key={index}>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default Profile;
