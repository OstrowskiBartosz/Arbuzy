import React from "react";
import { Link, Redirect } from "react-router-dom";
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
      if (this.state.response.length === 0) {
        return <Redirect to="/profil" />;
      } else {
        return (
          <div className="container options shadow-sm bg-white rounded">
            TEST
          </div>
        );
      }
    }
  }
}

export default Profile;
