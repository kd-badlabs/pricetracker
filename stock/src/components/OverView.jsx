import React, { Component } from "react";
import Summary from "./Summary";

export default class OverView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_id: "menu_1",
      colour_mode: false,
      titles: ["Summary", "Technical", "Financials", "About", "News"],
    };
  }

  handleClick = (e) => {
    const id = e.target.getAttribute("id");
    this.setState({ menu_id: id });
  };

  render() {
    return (
      <div className="row my-2 p-2 ">
        {/* ST. Analysis Report - Header  */}
        <div className="col-12">
          <div className="row  px-2 bg-light border">
            {this.state.titles.map((title, index) => (
              <div
                key={index}
                id={`menu_${index + 1}`}
                className={
                  this.state.menu_id === `menu_${index + 1}`
                    ? "col-2 border-bottom border-primary border-3  py-2 sub_heading font-weight-bold "
                    : "col-2  py-2 sub_heading "
                }
                onClick={this.handleClick}
              >
                {title}
              </div>
            ))}

            <div
              id="menu_6"
              className={
                this.state.menu_id === "menu_6"
                  ? "col-2 border-bottom border-3 border-primary py-2 font-weight-bold text-right"
                  : "col-2  py-2 text-right"
              }
              onClick={this.handleClick}
            >
              <span className="font-weight-bold text-primary ">+</span>
            </div>
          </div>
        </div>
        {this.props.stockdetail !== null && this.state.menu_id === "menu_1" ? (
          <Summary stock={this.props.stockdetail} />
        ) : // ) : this.state.menu_id === "menu_2" ? (
        //   <Technical />
        // ) : this.state.menu_id === "menu_3" ? (
        //   <Financials />
        // ) : this.state.menu_id === "menu_4" ? (
        //   <About />
        null}
      </div>
    );
  }
}
