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
          isLoading: false,
          currentImage: responseObject.zdjecia[0].wartosc
        });
      })
      .catch(err => err);
  }

  imageClick(image) {
    this.setState({ currentImage: image });
    console.log(image);
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
            <div className="row">
              <div className="col">
                {this.state.response.zdjecia.map((zdjecie, index) => (
                  <div className="image-thumbnail" key={index}>
                    <img
                      className="img-thumbnail"
                      src={zdjecie.wartosc}
                      key={index}
                      alt="Zdjęcie produktu"
                      onClick={() => this.imageClick(zdjecie.wartosc)}
                    />
                  </div>
                ))}
              </div>
              <div className="col">
                <div className="main-image">
                  <img
                    className="img-thumbnail"
                    src={this.state.currentImage}
                    alt="Zdjęcie produktu"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default Product;
