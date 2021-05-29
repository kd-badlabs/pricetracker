import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

export default class Search extends Component {
  componentDidMount() {
    console.log(this.props.symbol_list);
  }
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Body>
            <div className="input-group mb-1">
              <input
                type="text"
                name="ticker"
                value={this.props.ticker}
                onChange={this.props.handleTicker}
                className="form-control "
                placeholder="Search Symbol..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary px-4"
                  type="button"
                  onClick={this.props.handleSearchTicker}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            
            {this.props.symbol_list.length !== 0 ? (
              <div className="row mx-1 mb-1">
                {this.props.symbol_list.map((value, index) => (
                  <small
                    key={index}
                    className="border p-1 mr-2 mt-2 text-center col-2 pointer bg-primary text-white fs-6 rounded rounded-1"
                  >
                    {value.ticker}
                  </small>
                ))}
              </div>
            ) : null}

            {this.props.data != []
              ? this.props.data.map((result, index) => (
                  <Card className="my-3" key={index}>
                    <Card.Header>
                      <div className="row">
                        <div className="col text-bold"> {result[1]}</div>
                        <div className="col text-right">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              name={this.props.data[index]}
                              onChange={this.props.handleAddSymbol}
                              checked={
                                this.props.symbol_list.findIndex(
                                  (a) => a.ticker == result[1]
                                ) > -1
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {result[2]}
                        <br></br>
                        {result[3]}
                        <br></br>
                        {result[4]}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              : null}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
