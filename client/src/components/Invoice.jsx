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
      isLoading: true
    };
  }

  componentDidMount() {
    let url = "http://localhost:9000/invoice";
    fetch(url, {
      method: "post",
      credentials: "include"
    })
      .then(response => response.text())
      .then(response => {
        console.log(response);
        var responseObject = JSON.parse(response);
        this.setState({ response: responseObject, isLoading: false });
      })
      .catch(err => err);
  }

  render() {
    if (this.state.logged === true) {
      if (this.props.redirect === "/invoice") {
        return <Redirect to="/" />;
      }
      return <Redirect to={this.props.redirect} />;
    }
    if (this.state.isLoading) {
      return <div className="loading"></div>;
    } else {
      return (
        <div className="container options shadow-sm bg-white rounded">TEST</div>
      );
    }
  }
}

export default Profile;
