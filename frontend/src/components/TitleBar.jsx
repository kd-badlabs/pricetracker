import React, { Component } from "react";
export default class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      tickerTag: ["AAPL", "MSFT", "GOOG"],
      ticker_index: "AAPL",
    };
  }

  handleAddticker = () => {
    if (this.state.ticker != "") {
      this.setState((prevState) => ({
        tickerTag: [...prevState.tickerTag, this.state.ticker],
        ticker: "",
      }));
    }
  };

  handleTicker = (e) => {
    const { value } = e.target;
    this.setState({ ticker: value.toUpperCase() });
  };

  handleDeleteTicker = (e) => {
    const index = this.state.tickerTag.indexOf(e.target.id);
    let array = [...this.state.tickerTag];
    if (index > -1) {
      array.splice(index, 1);
      this.setState({
        tickerTag: array,
      });
    }
  };

  handletickerChange = (e) => {
    this.setState({ ticker_index: e.target.id });
    this.props.handleSetTicker(e.target.id, e.target.getAttribute("target_id"));
  };

  render() {
    return (
      <div>
        <div className="row my-2">
          <input
            name="ticker"
            type="text"
            value={this.state.ticker}
            className="col-2 mt-2 px-2 border bg-light "
            placeholder="Type Symbol"
            onChange={this.handleTicker}
          />
          <div
            className="col-1 text-center pointer p-1 mr-2  mt-2  border text-bold bg-light rounded-right"
            onClick={this.handleAddticker}
          >
            Add
          </div>
          {this.state.tickerTag.map((ticker, index) => (
            <div
              id={ticker}
              key={index}
              target_id={index}
              className={`border p-1 mr-2 mt-2 text-center col-1 pointer ${
                this.state.ticker_index == ticker
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              }`}
              onDoubleClick={this.handleDeleteTicker}
              onClick={this.handletickerChange}
            >
              {ticker}
            </div>
          ))}
        </div>

        <div className="row  border bg-light p-2 ">
          <div className="col-9 align-self-end">
            <div>
              <span className="title_price   align-self-end">
                {this.props.stockdetail != null
                  ? this.props.stockdetail.close.toFixed(2)
                  : "NA"}
              </span>
              <span> USD </span>
              {this.props.stockdetail != null ? (
                <span
                  className={`${
                    this.props.stockdetail.close -
                      this.props.stockdetail.open <=
                    0
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {(
                    this.props.stockdetail.close - this.props.stockdetail.open
                  ).toFixed(2)}
                  [
                  {(
                    ((this.props.stockdetail.close -
                      this.props.stockdetail.open) /
                      this.props.stockdetail.open) *
                    100
                  ).toFixed(3)}
                  % ]
                </span>
              ) : (
                "NA"
              )}
            </div>
            <div className="sub_heading">{`${this.props.symbol}`}</div>
          </div>
          <div className="col-3 text-right align-self-end">
            <div>Market Open</div>
            <div>12-May-2021 01:00</div>
          </div>
        </div>
      </div>
    );
  }
}
