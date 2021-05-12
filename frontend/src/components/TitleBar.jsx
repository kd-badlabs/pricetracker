import React, { Component } from "react";
export default class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      tickerTag: ["MSFT", "GOOG"],
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
    this.props.handleSetTicker(e.target.id);
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
            className="col-1 text-center p-1 mr-2  mt-2  border text-bold bg-light rounded-right"
            onClick={this.handleAddticker}
          >
            Add
          </div>
          {this.state.tickerTag.map((ticker, index) => (
            <div
              id={ticker}
              key={index}
              className="border bg-light p-1 mr-2 mt-2 text-center col-1"
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
              <span> USD</span>
              <span className="text-danger"> +2.01 [ +.09 %]</span>
            </div>
            <div>
              {`${this.props.symbol}`} . Apple Technology . Technology &
              Communication
            </div>
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
