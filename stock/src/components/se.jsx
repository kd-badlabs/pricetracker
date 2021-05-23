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
            <div className="input-group">
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
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>

            {this.props.data != []
              ? this.props.data.map((result, index) => (
                  <Card className="my-3" key={index}>
                    <Card.Header>
                      <div className="row">
                        <div className="col text-bold"> {result[1]}</div>
                        <div className="col text-right">
                          {this.props.symbol_list.length != 0 ? (
                            <Fragment>
                              {this.props.symbol_list.map((value) =>
                                value.ticker == result[1] ? (
                                  <i className="bi bi-check-circle-fill text-primary"></i>
                                ) : (
                                  <i
                                    className="bi bi-plus-circle pointer"
                                    id={this.props.data[index]}
                                    onClick={this.props.handleAddSymbol}
                                  ></i>
                                )
                              )}
                            </Fragment>
                          ) : (
                            <i
                              className="bi bi-plus-circle pointer"
                              id={this.props.data[index]}
                              onClick={this.props.handleAddSymbol}
                            ></i>
                          )}
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
