import React, { Component } from "react";
import TitleBar from "./components/TitleBar";
import Chart from "./components/Chart";
import OverView from "./components/OverView";
import axios from "axios";

function getSocket() {
  const socketPath = `ws://localhost:8000/ws/new/`;
  const chatSocket = new WebSocket(socketPath);
  return chatSocket;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "AAPL",
      socketid: 0,
      stockdetail: null,
    };
    this.chatSocket = getSocket();
  }

  getData = (route, ticker) => {
    axios
      .get(`http://${window.location.host}/${route}/${ticker}/`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSetTicker = (symbol) => {
    this.setState({ ticker: symbol }, () => {
      this.getData("ticker", this.state.ticker);
    });
  };

  componentDidMount() {
    this.chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.status === "Connected") {
        this.getData("ticker", this.state.ticker);
      } else {
        console.log("Hello");
        this.setState({ stockdetail: data.price });
      }
    };
  }

  render() {
    return (
      <div className="p-3">
        <div className="py-2 px-3 my-2">
          <TitleBar
            symbol={this.state.ticker}
            handleSetTicker={this.handleSetTicker}
            stockdetail={this.state.stockdetail}
          />
        </div>

        <div className="py-2 px-3 my-2">
          <Chart />
        </div>
        <div className="p-2 my-2">
          <OverView stockdetail={this.state.stockdetail} />
        </div>
      </div>
    );
  }
}

export default App;
