import React, { Component } from "react";

export default class Summary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.stock !== null ? (
      <div className="col-12 bg-light border">
        <div className="px-2 pt-3 row justify-content-between ">
          <div className="col-5">
            <div className="border-bottom   py-2 sub_heading_sm row">
              <div className="col-3"> Open</div>
              <div className="col-9 text-end font-weight-bold">
                {this.props.stock.open.toFixed(2)}
              </div>
            </div>
            <div className="border-bottom   py-2 sub_heading_sm row">
              <div className="col-3"> High</div>
              <div className="col-9 text-end font-weight-bold">
                {this.props.stock.high.toFixed(2)}
              </div>
            </div>

            <div className="border-bottom   py-2 sub_heading_sm row">
              <div className="col-3"> Low</div>
              <div className="col-9 text-end font-weight-bold">
                {this.props.stock.low.toFixed(2)}
              </div>
            </div>

            <div className="  py-2 sub_heading_sm row">
              <div className="col-3"> Close</div>
              <div className="col-9 text-end font-weight-bold">
                {this.props.stock.close.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="col-5">
            <div className="border-bottom   py-2 sub_heading_sm row">
              <div className="col-6"> Volume</div>
              <div className="col-6 text-end font-weight-bold">
                {this.props.stock.volume}
              </div>
            </div>

            <div className="border-bottom   py-2 sub_heading_sm row">
              <div className="col-6"> Dividends</div>
              <div className="col-6 text-end font-weight-bold">
                {this.props.stock.dividends}
              </div>
            </div>
            <div className="border-bottom   py-2 sub_heading_sm row">
              <div className="col-6"> 52W High</div>
              <div className="col-6 text-end font-weight-bold">NA</div>
            </div>
            <div className="  py-2 sub_heading_sm row">
              <div className="col-6"> 52W Low</div>
              <div className="col-6 text-end font-weight-bold">NA</div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
