import React from 'react';
import PageFooter from "./PageFooter.jsx";
import { Link, Redirect } from "react-router-dom";
import history from './history'

class SearchResults extends React.Component{
  constructor(props){
    super(props);

    const params = new URLSearchParams(window.location.search);
    this.state = ({
      searchValue: this.props.searchValue,
      searchCategory: this.props.searchCategory,

      prevPageAvailable: false,
      nextPageAvailable: false,
      page: params.has('p') ? params.get('p') : 1,
      numberOfPages: 0,
      resItemWord: "produktów",
      resItemCount: 0,
      
      activeSearchLimit: params.has('l') ? params.get('l') : 10,
      searchLimit10: false,
      searchLimit20: false,
      searchLimit30: false,
      ["searchLimit" + (params.has('l') ? params.get('l') : 10)]: "true",

      activeSearchSorting: params.has('s') ? params.get('s') : "domyślne",

      isLoading: true,
      ApiResponse: [],
      ProductLoading: [],
      LastPage: "",
    });
  }

  componentDidUpdate(prevState, prevProps) {
    window.onpopstate  = (e) => {
      this.setStateWithParams();
      
    }

    if( prevState.searchValue !== this.props.searchValue || prevState.searchCategory !==  this.props.searchCategory){
      this.setStateWithParams();
    }
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
      console.log(key);
      if(key != "q" && key != "w" && key != "s" && key != "l" && key != "p" && null !== document.getElementById(key)){
        document.getElementById(key).checked = true;
      }
    })
  }

  componentDidMount(){
    this.fetchSearchData();
  }

  setStateWithParams(){
    const params = new URLSearchParams(window.location.search);
    this.setState({
      searchValue: this.props.searchValue,
      searchCategory: this.props.searchCategory,

      prevPageAvailable: false,
      nextPageAvailable: false,
      page: params.has('p') ? params.get('p') : 1,
      numberOfPages: 0,
      resItemWord: "produktów",
      resItemCount: 0,

      activeSearchLimit: params.has('l') ? params.get('l') : 10,
      searchLimit10: false,
      searchLimit20: false,
      searchLimit30: false,
      ["searchLimit" + (params.has('l') ? params.get('l') : 10)]: "true",

      activeSearchSorting: params.has('s') ? params.get('s') : "domyślne",

      isLoading: true,
      ApiResponse: [],
      ProductLoading: []

    }, () => this.fetchSearchData());

  }

  fetchSearchData(){
    const data = {
      nazwa_produktu: this.state.searchValue,
      kategoria: this.state.searchCategory,
      strona: this.state.page,
      limit: this.state.activeSearchLimit,
      sort: this.state.activeSearchSorting,
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
      if(Math.ceil(responseobject.liczba_przedmiotow)/this.state.activeSearchLimit === this.state.page){ nextPageAvailable = false; }
      if(this.state.page > 1){ prevPageAvailable = true; }

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
        LastPage: window.location.search+window.location.search,
      });
    })
    .catch(err => err);
  }

  handlePageChange(event){
    this.setState({
      page: event.target.id,
    }, () => {
      this.fetchSearchData();
      const params = new URLSearchParams(window.location.search);
      params.set('p', this.state.page);
      history.push(window.location.pathname+"?"+params);  
    });
  }

  handleSortChange(event){
    event.preventDefault();
    this.setState({
      activeSearchSorting: event.target.id,
      page: 1,
    }, () => {
      this.fetchSearchData();
      const params = new URLSearchParams(window.location.search);
      params.set('s', this.state.activeSearchSorting);
      history.push(window.location.pathname+"?"+params);
    });
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
    }, () => {
      this.fetchSearchData();
      const params = new URLSearchParams(window.location.search);
      params.set('l', this.state.activeSearchLimit);
      history.push(window.location.pathname+"?"+params);
    });
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

  handleFilterChange = (event) => {
    const params = new URLSearchParams(window.location.search);
    if(event.target.checked){
      var filter = event.currentTarget.id;
      console.log(filter);
      if(filter.includes("g_f")){
        filter = filter.replace("g_f", "m_f");
        var subfilters = document.querySelectorAll("[id^='" + filter +"']"); 
        for (let i = 0; i < subfilters.length; i++) {
          document.getElementById(subfilters[i].id).checked = true;
          params.set(subfilters[i].id, "tak");
        }
      }else if(filter.includes("g_k")){
        //console.log(event.currentTarget.id);
      }else if(filter.includes("g_p")){
        //console.log(event.currentTarget.id);
      }else if(filter.includes("m_f")){
        //console.log(event.currentTarget.id);
      }
      params.set(event.currentTarget.id, "tak");
    }else{
      var filter = event.currentTarget.id;
      if(filter.includes("g_f")){
        filter = filter.replace("g_f", "m_f");
        var subfilters = document.querySelectorAll("[id^='" + filter +"']"); 
        for (let i = 0; i < subfilters.length; i++) {
          document.getElementById(subfilters[i].id).checked = false;
          params.delete(subfilters[i].id);
        }
      }else if(filter.includes("m_f")){
        filter = filter.replace("m_f", "g_f");
        let filter_index = filter.indexOf('_w_');
        filter = filter.substring(0, filter_index);
        document.getElementById(filter).checked = false;
        params.delete(filter);
      }

      params.delete(event.currentTarget.id);
    }
    history.push(window.location.pathname+"?"+params);
  }

  render(){
    if (this.state.isLoading) {
      return (<div className="loading"></div>);
    }else{
      let ApiResponse = JSON.parse(this.state.ApiResponse);
      const pages = []
      var active;
      for (let i = 0; i < 5; i++) {
        if((i) === this.state.page-1)
          active = "page-item active";
        else
          active = "page-item"
        pages.push(<li className={active} key={"page"+(i+1)}><a className="page-link" id={i+1} onClick={(event) => this.handlePageChange(event)}>{i+1}</a></li>)
      }

      if(undefined !== ApiResponse && undefined !== ApiResponse.produkty && ApiResponse.produkty.length){
        return(
          <div className="container-fluid">
            <div className="row navbar-padding p-relative">
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
                  <div>
                    <div className="text-left pb-2"><h5>Kategorie</h5>
                      {ApiResponse.kategorie.map(api => (
                        <div className=" text-left mb-2" key={"g_k" + api.id_kategorii}>
                          <label className="container"><span className="ml-2">{api.nazwa_kategorii}</span><span className="text-right">{" (" + api.liczba_produktow})</span>
                            <input type="checkbox" id={"g_k" + api.id_kategorii} onChange={this.handleFilterChange}/>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      ))}
                      <div className="dropdown-divider mt-4 mb-4"></div>
                    </div>
                    <div className="text-left pb-2"><h5>Producenci</h5>
                      {ApiResponse.producenci.map(api => (
                        <div className=" text-left mb-2" key={"g_p" + api.id_producenta}>
                          <label className="container"><span className="ml-2">{api.nazwa_producenta}</span><span  className="text-right">{" (" + api.liczba_produktow})</span>
                            <input type="checkbox" id={"g_p" + api.id_producenta} onChange={this.handleFilterChange}/>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      ))}
                      <div className="dropdown-divider mt-4 mb-4"></div>
                    </div>
                    <div className="text-left pb-2"><h5>Filtry</h5>
                      {ApiResponse.filtry.map((filtry, index) => (
                        <div className=" text-left mb-4" key={"g_f" + index}>
                          <label className="container"><span className="ml-2">{filtry.atrybut}</span><span className="text-right">{" (" + filtry.liczba_produktow})</span>
                            <input type="checkbox" id={"g_f" + filtry.atrybut} onChange={this.handleFilterChange}/>
                            <span className="checkmark"></span>
                          </label>
                          <div className="ml-3 mt-2">
                            {filtry.wartosci.map( (wartosci, index) => (
                              <div className="mb-2" key={"m_f" + filtry.atrybut + "_w_f" + wartosci.wartosc}>
                                <label className="container"><span className="ml-2">{wartosci.wartosc}</span><span className="text-right">{" (" + wartosci.liczba_produktow})</span>
                                  <input type="checkbox" id={"m_f" + filtry.atrybut + "_w_f" + wartosci.wartosc} onChange={this.handleFilterChange}/>
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            ))}
                          </div>
                          <div className="dropdown-divider mt-4 mb-4"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-lg btn-block mt-1 pt-1 FilterButton">filtruj</button>
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
                              <a className="dropdown-item" id="cena malejąco" onClick={(event) => this.handleSortChange(event)}>cena malejąco</a>
                              <a className="dropdown-item" id="cena rosnąco" onClick={(event) => this.handleSortChange(event)}>cena rosnąco</a>
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
                  <div className="row" key={"produkt" + produkt.id_produktu}>
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
                                <div className ="d-block" key={"produkt" + produkt.id_produktu + "-w" + atrybut.atrybut}>
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
                              <a className="dropdown-item" id="domyślne2" onClick={(event) => this.handleSortChange(event)}>domyślne</a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" id="cena malejąco" onClick={(event) => this.handleSortChange(event)}>cena malejąco</a>
                              <a className="dropdown-item" id="cena rosnąco" onClick={(event) => this.handleSortChange(event)}>cena rosnąco</a>
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
            <PageFooter />
          </div>
        );
        
      }else{
        return(
          <div className="container-fluid">
            <div>
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
              <div className="row pt-4">
                <div className="col-lg-3"></div>
                <div className="col-lg-5 text-left">
                  <Link className="btn btn-outline-secondary" to={this.state.LastPage}>
                    <i className="fas fa-chevron-left"></i> Cofnij do poprzedniej strony
                  </Link>
                </div>
                <div className="col-lg-4"></div>
              </div>
            </div>
            <div>
              <PageFooter />
            </div>
          </div>
        );
      }
    }
  }
}

export default SearchResults;