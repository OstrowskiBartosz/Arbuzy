import React from 'react';

class SearchResults extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      searchValue: this.props.searchValue,
      searchCategory: this.props.searchCategory,
      prevPageAvailable: false,
      nextPageAvailable: false,
      page: 1,
      activePage: 1,
      
      activeSearchLimit: 10,
      searchLimit10: true,
      searchLimit20: false,
      searchLimit30: false,

      activeSearchSorting: "domyślne",

      isLoading: true,
      ApiResponse: [],
      numberOfPages: 0,
      resItemWord: "produktów",
      resItemCount: 0,

      ProductLoading: []
    });
  }

  componentDidUpdate(prevState) {
    if(this.props.searchValue!==prevState.searchValue){
      this.state = ({
        searchValue: this.props.searchValue,
        searchCategory: this.props.searchCategory,
        prevPageAvailable: false,
        nextPageAvailable: false,
        page: 1,
        activeSearchLimit: 10,
        searchLimit10: true,
      });
      this.fetchSearchData();
    }
  }

  componentDidMount(){
    this.fetchSearchData();
  }

  fetchSearchData(id){


    const data = {
      nazwa_produktu: this.state.searchValue,
      kategoria: this.state.searchCategory,
      strona: this.state.page,
      limit: this.state.activeSearchLimit,
    }
    fetch('http://localhost:9000/search', {
        method: 'post',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }     
    })
    .then(response=>response.text())
    .then(response => { 
      var responseobject = JSON.parse(response);

      let produkt = "";
      if(responseobject.liczba_przedmiotow === 0 || responseobject.liczba_przedmiotow > 4){ produkt = "produktów";
      } else if(responseobject.liczba_przedmiotow > 1 && responseobject.liczba_przedmiotow < 5){produkt = "produkty";
      }else{produkt = "produkt";}

      var nextPageAvailable, prevPageAvailable;
      if(Math.ceil(responseobject.liczba_przedmiotow)/this.state.activeSearchLimit === this.state.activePage){ nextPageAvailable = false; }
      if(this.state.activePage > 1){ prevPageAvailable = true; }

      if(undefined !== responseobject.produkty){
        var produkty = new Array(responseobject.produkty.length);
        for (var i = 0; i < responseobject.produkty.length; i++) { 
          produkty[i] = new Array(2);
          produkty[i][0] = responseobject.produkty[i].id_produktu;
          produkty[i][1] = false;
        }
      }
      this.setState({
        ApiResponse: response,
        isLoading:  false,
        resItemCount: responseobject.liczba_przedmiotow,
        numberOfPages: Math.ceil(responseobject.liczba_przedmiotow/this.state.activeSearchLimit),
        resItemWord: produkt,
        nextPageAvailable: nextPageAvailable,
        prevPageAvailable: prevPageAvailable,
        ProductLoading: produkty,
      });
    })
    .catch(err => err);
  }

  handlePageChange(event){
    console.log(event.target.id);
    this.setState({
      Page: event.target.id,
    })
    // const data = {
    //   nazwa_produktu: this.state.searchValue,
    //   kategoria: this.state.searchCategory,
    //   strona: this.state.page,
    //   limit: this.state.limit,
    // }
    // fetch('http://localhost:9000/search', {
    //     method: 'post',
    //     body: JSON.stringify(data),
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }     
    // })
    // .then(response=>response.text())
    // .then(response => { 
    // })
    // .catch(err => err);
  }

  handleSortChange(event){
    event.preventDefault();
    this.setState({
      activeSearchSorting: event.target.id
    })
  }

  handleToCartClick(event, buttonID){
    event.preventDefault();

    let produkty = this.state.ProductLoading;
    var index = produkty.findIndex(e => e[0] === buttonID);
    produkty[index][1] = true;
    this.setState({
      ProductLoading: produkty,
    })

    const data = {
      id_produktu: event.currentTarget.id,
      ilosc: 1,
    }
    console.log(data);
    fetch('http://localhost:9000/addtocart', {
        method: 'post',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }     
    })
    .then(response=>response.text())
    .then(response => {
      if(response === "Przedmiot został dodany do koszyka."){
        this.props.sendAlertMessage("primary", "Dodano produkt", "Produkt został dodany do koszyka.");
        this.props.sendUpdatedCartItems(true);
        produkty[index][1] = false;
        this.setState({
          ProductLoading: produkty,
        })
      }else if (response === "Limit koszyka."){
        this.props.sendAlertMessage("danger", "Limit w koszyku", "Osiągnięto limit w koszyku.");
        this.props.sendUpdatedCartItems(true);
        produkty[index][1] = false;
        this.setState({
          ProductLoading: produkty,
        })
      }else{
        this.props.sendAlertMessage("danger", "Wystąpił błąd.", "Wystąpił nieoczekiwany błąd.");
        this.props.sendUpdatedCartItems(true);
        produkty[index][1] = false;
        this.setState({
          ProductLoading: produkty,
        })
      }
    })
    .catch(err => err);
  }

  handleLimitChange(event){
    var searchLimit = event.target.id;
    searchLimit = searchLimit.substring(1, (event.target.id.length-2));
    this.setState({
      searchLimit10: false,
      searchLimit20: false,
      searchLimit30: false,
      ["searchLimit" + searchLimit]: "true",
      activeSearchLimit: searchLimit
    });
  }

  render(){
    if (this.state.isLoading) {
      return (<div className="loading"></div>);
    }else{
      let ApiResponse = JSON.parse(this.state.ApiResponse);
      const pages = []
      for (let i = 0; i < 5; i++) {
        pages.push(<li className="page-item"><a className="page-link" id={i+1} key={"p"+(i+1)} onClick={(event) => this.handlePageChange(event)}>{i+1}</a></li>)
      }
      if(undefined !== ApiResponse && undefined !== ApiResponse.produkty && ApiResponse.produkty.length){

        return(
          <div>
            <div className="row navbar-padding">
              <div className="col-1"></div>
              <div className="col-10 pt-5 text-left">
                <div><h4>Znaleziono <span className="font-weight-bold">{this.state.resItemCount + " "}</span>{this.state.resItemWord} dla <span className="font-weight-bold">"{this.state.searchValue}"</span></h4></div>
              </div>
            </div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-2">
                <div className="col-12 componentBackgroundColor mt-3 shadow-sm p-3 mb-1 bg-white rounded">
                  <div className="text-left pb-4 font-weight-bold"> 
                    Wyszukiwanie: "{this.state.searchValue}" 
                  </div>
                  <div className="text-left font-weight-bold">aktywne filtry:</div>
                  <div className="text-left mb-5">brak</div>
                  <div>
                    <div className="text-left pb-2"><h5>Kategorie</h5>
                      {ApiResponse.kategorie.map(api => (
                        <div className=" text-left mb-2">
                          <label className="container"><span className="ml-2">{api.nazwa_kategorii}</span><span className="text-right">{" (" + api.liczba_produktow})</span>
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      ))}
                      <div className="dropdown-divider mt-4 mb-4"></div>
                    </div>
                    <div className="text-left pb-2"><h5>Filtry</h5>
                      {ApiResponse.filtry.map(filtry => (
                        <div className=" text-left mb-4">
                          <label className="container"><span className="ml-2">{filtry.atrybut}</span><span className="text-right">{" (" + filtry.liczba_produktow})</span>
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                          <div className="ml-3 mt-2">
                            {filtry.wartosci.map( wartosci => (
                              <div className="mb-2">
                                <label className="container"><span className="ml-2">{wartosci.wartosc}</span><span className="text-right">{" (" + wartosci.liczba_produktow})</span>
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            ))}
                          </div>
                          <div className="dropdown-divider mt-4 mb-4"></div>
                        </div>
                      ))}
                    </div>
                    <div className="text-left pb-2"><h5>Producenci</h5>
                      {ApiResponse.producenci.map(api => (
                        <div className=" text-left mb-2">
                          <label className="container"><span className="ml-2">{api.nazwa_producenta}</span><span className="text-right">{" (" + api.liczba_produktow})</span>
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      ))}
                      <div className="dropdown-divider mt-4 mb-4"></div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-lg btn-block mt-1 pt-1">filtruj</button>
                </div>
              </div>
              <div className="col-7">
                <div className="row">
                  <div className="col-12 componentBackgroundColor mt-3 shadow-sm pt-3 bg-white rounded">
                    <div className="row">
                      <div className="col-4">
                        <div className="float-left">
                          <ul className="pagination float-right">
                            <li className={"page-item " + (this.state.searchLimit10 ? "active" : "")}><a className="page-link" id="l10-1" onClick={(event) => this.handleLimitChange(event)}>10</a></li> 
                            <li className={"page-item " + (this.state.searchLimit20 ? "active" : "")}><a className="page-link" id="l20-1" onClick={(event) => this.handleLimitChange(event)}>20</a></li>
                            <li className={"page-item " + (this.state.searchLimit30 ? "active" : "")}><a className="page-link" id="l30-1" onClick={(event) => this.handleLimitChange(event)}>30</a></li>
                          </ul>
                          <div className=" float-right btn btn-secondary d-inline outline-primary">wyników na stronie</div>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="center-Element-horizontal d-inline">
                          <div className="btn btn-secondary">sortowanie </div>
                          <div className="dropdown d-inline">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {this.state.activeSearchSorting}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a className="dropdown-item" id="domyślne" onClick={(event) => this.handleSortChange(event)}>domyślne</a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" id="według ceny" onClick={(event) => this.handleSortChange(event)}>według ceny</a>
                              <a className="dropdown-item" id="nazwa produktu A-Z" onClick={(event) => this.handleSortChange(event)}>nazwa produktu A-Z</a>
                              <a className="dropdown-item" id="nazwa produktu Z-A" onClick={(event) => this.handleSortChange(event)}>nazwa produktu Z-A</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <nav aria-label="Page navigation">
                          <ul className="pagination float-right">
                            <div className=" float-right btn btn-secondary d-inline">strona </div>
                            <li className={"page-item " + ((this.state.prevPageAvailable) ? "" : "disabled")}><a className="page-link"><i className="fas fa-chevron-left"></i></a></li>
                            {pages}
                            <li className={"page-item " + ((this.state.prevPageAvailable) ? "" : "disabled")}><a className="page-link"><i className="fas fa-chevron-right"></i></a></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                {ApiResponse.produkty.map((produkt, index) => (
                  <div className="row">
                    <div className="col-12 componentBackgroundColor mt-3 shadow-sm p-3 bg-white rounded">
                      <div className="row">
                        <div className ="col-2 pr-0 mr-0">
                          <div className="image-container">
                            <img className="center-Element-vertical feature_image" alt="obraz produktu" src={produkt.zdjecie}>
                            </img>
                          </div>
                        </div>
                        <div className ="col-7">
                          <div className="font-weight-bold text-left">
                            <h4>{produkt.nazwa_produktu}</h4>
                          </div>
                          <div className="idProduktu text-left"><span>id produktu: </span>{produkt.id_produktu}</div>
                          <div className="row d-inline text-left">
                          <div className="placement-bottomAtributes"></div>
                            <ul>
                              {produkt.atrybuty.map(atrybut => (
                                <div className ="d-block">
                                  <li>
                                    <span className ="d-inline">{atrybut.atrybut}:</span>
                                    <span className ="font-weight-bold pl-2">{atrybut.wartosc}</span>
                                  </li>
                                </div>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className ="col-3">
                          <div className="font-weight-bold text-left"><h3>{produkt.cena_brutto + " zł"}</h3></div>
                          <div className="placement-bottomAddToCart"></div>
                          <button type="button" id={"p" + produkt.id_produktu} className={"btn btn-lg btn-block mt-1 pt-1 " + (this.props.isLogged ? "btn-primary " : "btn-secondary disabled")}
                                                disabled = {(this.state.ProductLoading[index][1] ? false : "disabled")} 
                                                disabled = {(this.props.isLogged ? false : "disabled")} onClick={(event) => this.handleToCartClick(event, produkt.id_produktu)}> 
                                                                                          <span className={"spinner-border spinner-border-sm mb-1 text-light mr-3 " + (this.state.ProductLoading[index][1] ? "" : "hidden" )}></span>
                                                                                          <span className={" " + (this.state.ProductLoading[index][1] ? "" : "hidden" )}>dodawanie ...</span>
                                                                                          <span className={" " +  (this.state.ProductLoading[index][1] ? "hidden" : "" )}>dodaj do koszyka </span>
                                                                                          <i className={"fas fa-cart-plus " +  (this.state.ProductLoading[index][1] ? "hidden" : "" )}></i>   
  
                                                                               
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="row">
                  <div className="col-12 componentBackgroundColor mt-3 shadow-sm pt-3 bg-white rounded">
                    <div className="row">
                      <div className="col-4">
                        <div className="float-left">
                          <ul className="pagination float-right">
                            <li className={"page-item " + (this.state.searchLimit10 ? "active" : "")}><a className="page-link" id="l10-2" onClick={(event) => this.handleLimitChange(event)}>10</a></li> 
                            <li className={"page-item " + (this.state.searchLimit20 ? "active" : "")}><a className="page-link" id="l20-2" onClick={(event) => this.handleLimitChange(event)}>20</a></li>
                            <li className={"page-item " + (this.state.searchLimit30 ? "active" : "")}><a className="page-link" id="l30-2" onClick={(event) => this.handleLimitChange(event)}>30</a></li>
                          </ul>
                          <div className=" float-right btn btn-secondary d-inline outline-primary">wyników na stronie</div>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="center-Element-horizontal d-inline">
                          <div className="btn btn-secondary">sortowanie </div>
                          <div className="dropdown d-inline">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {this.state.activeSearchSorting}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a className="dropdown-item" id="domyślne" onClick={(event) => this.handleSortChange(event)}>domyślne</a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" id="według ceny" onClick={(event) => this.handleSortChange(event)}>według ceny</a>
                              <a className="dropdown-item" id="nazwa produktu A-Z" onClick={(event) => this.handleSortChange(event)}>nazwa produktu A-Z</a>
                              <a className="dropdown-item" id="nazwa produktu Z-A" onClick={(event) => this.handleSortChange(event)}>nazwa produktu Z-A</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <nav aria-label="Page navigation">
                          <ul className="pagination float-right">
                            <div className=" float-right btn btn-secondary d-inline">strona </div>
                            <li className={"page-item " + ((this.state.prevPageAvailable) ? "" : "disabled")} disabled={ this.state.prevPageAvailable ? false : "disabled"}><a className="page-link" ><i className="fas fa-chevron-left"></i></a></li>
                            {pages}
                            <li className={"page-item " + ((this.state.nextPageAvailable) ? "" : "disabled")} disabled={ this.state.nextPageAvailable ? false : "disabled"}><a className="page-link" > <i className="fas fa-chevron-right"></i></a></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-2"></div>
            </div> 
          </div>
        );
      }else{
        return(
          <div className="row navbar-padding">
            <div className='col-3'>
            </div>
            <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
              <div className = "row">
                <div className = "col-12">
                  <h1>Nie mamy takich przedmiotów :-() </h1>
                </div>
              </div>
            </div>
            <div className='col-3'>
            </div>
          </div>
        );
      }
    }
  }
}

export default SearchResults;