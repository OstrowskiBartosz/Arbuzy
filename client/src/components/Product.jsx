import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../css/profil.css";

class Product extends React.Component {
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
      productID: params.get("id")
    };
    console.log("svadvsadsa");
  }

  componentDidMount() {
    let url = "http://localhost:9000/product";
    fetch(url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "productID=" + this.state.productID
    })
      .then(response => response.text())
      .then(response => {
        var responseObject = JSON.parse(response);
        this.setState({
          response: responseObject,
          isLoading: false
        });
      })
      .catch(err => err);
  }

  render() {
    console.log(this.state.response);
    if (this.state.isLoading) {
      return <div className="loading"></div>;
    } else {
      if (this.state.response.error) {
        return <Redirect to="/" />;
      } else {
        return (
          <div className="container options shadow-sm bg-white rounded">
            TESTTTTTTT PRODUKTUUUUU
          </div>
        );
      }
    }
  }
}

export default Product;
