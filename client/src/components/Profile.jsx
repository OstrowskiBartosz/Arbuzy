import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../css/profil.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      czyfirma: false,
      activeLogin: true,
      activeSignup: false,
      logged: false,
      errorLogin: false,
      errorMessageLogin: "",
      errorSignup: false,
      errorMessageSignup: ""
    };
  }

  render() {
    if (this.state.logged === true) {
      if (this.props.redirect === "/profil") {
        return <Redirect to="/" />;
      }
      return <Redirect to={this.props.redirect} />;
    }
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col">kolumna 1</div>
            <div className="col">kolumna 2</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
