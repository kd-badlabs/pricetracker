import React, { Component } from "react";
import TitleBar from "./components/TitleBar";
import Chart from "./components/Chart";
import OverView from "./components/OverView";

function getSocket() {
  const socketPath = "ws://localhost:8000/ws/test_1/";
  const chatSocket = new WebSocket(socketPath);
  return chatSocket;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "AAPL",
      stockdetail: null,
    };
    this.chatSocket = getSocket();
  }

  sendData = (ticker) => {
    this.chatSocket.send(
      JSON.stringify({
        text: ticker,
      })
    );
  };

  closeConnection = () => {
    this.chatSocket.onclose = () => {
      console.log(e);
    };
  };

  openConnection = () => {
    this.chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.status === "Connected") {
        this.sendData(this.state.ticker);
      } else {
        this.setState({ stockdetail: data.price });
      }
    };
  };

  handleSetTicker = (symbol) => {
    this.setState({ ticker: symbol }, () => {
      alert(this.state.ticker);
      // this.closeConnection();
      // this.openConnection();
      this.sendData(this.state.ticker);
    });
  };

  componentDidMount() {
    this.chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.status === "Connected") {
        this.sendData(this.state.ticker);
      } else {
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
          <OverView />
        </div>
      </div>
    );
  }
}

export default App;
