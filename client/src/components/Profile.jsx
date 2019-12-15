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
      activeTab: 1
    };
  }

  handleTabChange(event) {
    switch (event.currentTarget.id) {
      case "orders-btn":
        this.setState({ activeTab: 1 });
        break;
      case "products-btn":
        this.setState({ activeTab: 2 });
        break;
      case "complaints-btn":
        this.setState({ activeTab: 3 });
        break;
    }
  }

  render() {
    if (this.state.logged === true) {
      if (this.props.redirect === "/profil") {
        return <Redirect to="/" />;
      }
      return <Redirect to={this.props.redirect} />;
    }
    return (
      <div className="container options">
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
          <div className="col">
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
        </div>
        <div
          className={
            "container orders " + (this.state.activeTab == 1 ? "" : "d-none")
          }
        >
          <div className="row">
            <div className="col">
              <h1>Twoje zamówienia</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">row1</div>
          </div>
          <div className="row">
            <div className="col">row1</div>
          </div>
        </div>
        <div
          className={
            "container products " + (this.state.activeTab == 2 ? "" : "d-none")
          }
        >
          <div className="row">
            <div className="col">
              <h1>Twoje produkty</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">row1</div>
          </div>
          <div className="row">
            <div className="col">row1</div>
          </div>
        </div>
        <div
          className={
            "container complaints " +
            (this.state.activeTab == 3 ? "" : "d-none")
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
                  Do paczki powinien zostać dołączony numer zamówienia, którego
                  dotyczy przesyłana reklamacja.
                </b>
                <br />
                Towar powinien zostać zapakowany w bezpieczny sposób, aby nie
                uległ uszkodzeniu podczas wysyłki. Za wszelkie uszkodzenia
                wynikłe z tego tytułu odpowiada kupujący.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
