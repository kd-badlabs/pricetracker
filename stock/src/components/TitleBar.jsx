import React, { Component, Fragment } from "react";
import Search from "./Search";
import axios from "axios";

export default class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_state: false,
      symbol_index: "AAPL",
      symbols_list: [
        {
          ticker: "AAPL",
          name: "Apple Inc. Common Stock",
          industry: "Computer Manufacturing",
          country: "United States",
        },
        {
          ticker: "MSFT",
          name: "Microsoft. Common Stock",
          industry: "Computer Manufacturing",
          country: "United States",
        },
        {
          ticker: "GOOGL",
          name: "NA",
          industry: "NA",
          country: "NA",
        },
      ],
      search: "",
      search_results: [],
    };
  }

  // Ticker bar
  handleAddSymbol = (e) => {
    let symbol_creds = e.target.name.split(",");
    let data = {
      ticker: symbol_creds[1],
      name: symbol_creds[2],
      industry: symbol_creds[3],
      country: symbol_creds[4],
    };
    if (e.target.checked === true) {
      this.setState((prevState) => ({
        symbols_list: [...prevState.symbols_list, data],
      }));
    } else if (e.target.checked === false) {
      let filteredArray = this.state.symbols_list.filter(
        (item) => item.ticker !== data.ticker
      );
      this.setState({ symbols_list: filteredArray }, () => {
        console.log(this.state.symbols_list);
      });
    }
  };

  handleSymbolChange = (e) => {
    this.setState({ symbol_index: e.target.id });
    this.props.handleSetTicker(e.target.id);
  };

  handleSymbolDelete = (e) => {
    let filteredArray = this.state.symbols_list.filter(
      (item) => item.ticker !== e.target.id
    );
    this.setState({ symbols_list: filteredArray }, () => {
      console.log(this.state.symbols_list);
    });
  };

  // Search Bar
  handleTicker = (e) => {
    this.setState({ search: e.target.value.toUpperCase() });
  };

  handleSearchTicker = () => {
    this.handleShow();
    axios
      .get(`http://${window.location.host}/searchresult/${this.state.search}/`)
      .then((response) => {
        this.setState({ search_results: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Modal Code
  handleClose = () => {
    this.setState({
      modal_state: false,
      ticker: "",
      search: "",
      search_results: [],
    });
  };
  handleShow = () => {
    this.setState({ modal_state: true });
  };

  render() {
    return (
      <div>
        <div className="row my-2">
          <div className=" pl-0 col-3 mt-2  ">
            <div className="input-group ">
              <input
                type="text"
                name="ticker"
                value={this.state.search}
                onChange={this.handleTicker}
                className="form-control "
                placeholder="Search Symbol..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary px-4"
                  type="button"
                  onClick={this.handleSearchTicker}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>

          {this.state.symbols_list.map((value, index) => (
            <div key={index} className="col-1 mt-2 px-1 ">
              <div className="btn-group w-100" key={index}>
                <button
                  id={value.ticker}
                  type="button"
                  className={`${
                    value.ticker == this.props.symbol
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }`}
                  onClick={this.handleSymbolChange}
                >
                  {value.ticker}
                </button>

                <button
                  type="button"
                  id={value.ticker}
                  className="btn btn-primary"
                  onClick={this.handleSymbolDelete}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="row  border bg-light p-2 ">
          <div className="col-8 align-self-end">
            <div>
              <span className="title_price align-self-end font-weight-bold">
                {this.props.stockdetail != null
                  ? this.props.stockdetail.close.toFixed(2)
                  : "NA"}
              </span>
              <span className="mr-4 "> USD</span>
              {this.props.stockdetail != null ? (
                <Fragment>
                  <span
                    className={`sub_heading_sm ${
                      this.props.stockdetail.close -
                        this.props.stockdetail.open <=
                      0
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    {`${(
                      this.props.stockdetail.close - this.props.stockdetail.open
                    ).toFixed(2)}  `}
                    [
                    {(
                      ((this.props.stockdetail.close -
                        this.props.stockdetail.open) /
                        this.props.stockdetail.open) *
                      100
                    ).toFixed(3)}
                    %]
                  </span>
                  <span
                    className={`${
                      this.props.stockdetail.close -
                        this.props.stockdetail.open <=
                      0
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    {this.props.stockdetail.close -
                      this.props.stockdetail.open <=
                    0 ? (
                      <i className="bi bi-arrow-down-square-fill"></i>
                    ) : (
                      <i className="bi bi-arrow-up-square-fill"></i>
                    )}
                  </span>
                </Fragment>
              ) : (
                "NA"
              )}
            </div>
            <div className="sub_title">
              {`${this.props.symbol}`} <small> {}</small>
            </div>
          </div>
          <div className="col-4 text-right align-self-end sub_heading_sm">
            <div>Market Open</div>
            <div className="">
              <span className="mr-2">{new Date().toLocaleDateString()}</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <Search
          data={this.state.search_results}
          symbol_list={this.state.symbols_list}
          ticker={this.state.search}
          show={this.state.modal_state}
          handleShow={this.handleShow}
          handleClose={this.handleClose}
          handleAddSymbol={this.handleAddSymbol}
          handleTicker={this.handleTicker}
          handleSearchTicker={this.handleSearchTicker}
        />
      </div>
    );
  }
}
