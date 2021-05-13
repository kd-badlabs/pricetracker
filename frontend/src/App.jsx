import React, { Component } from "react";
import TitleBar from "./components/TitleBar";
import Chart from "./components/Chart";
import OverView from "./components/OverView";

function getSocket(id) {
  const socketPath = `ws://localhost:8000/ws/stock${id}/`;
  const chatSocket = new WebSocket(socketPath);
  return chatSocket;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "AAPL",
      stockdetail: null,
      socketid: 0,
    };
    this.chatSocket = getSocket(this.state.socketid);
  }

  sendData = (ticker) => {
    this.chatSocket.send(
      JSON.stringify({
        text: ticker,
      })
    );
  };

  handleSetTicker = (symbol, id) => {
    alert(id);
    this.setState({ ticker: symbol, socketid: id }, () => {
      this.chatSocket = getSocket(this.state.socketid);
      setTimeout(this.sendData(this.state.ticker), 5000);
    });
  };

  componentDidMount() {
    this.chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.status === "Connected") {
        this.sendData(this.state.ticker);
      } else {
        this.setState({ stockdetail: data.price }, () => {
          // this.sendData(this.state.ticker);
          console.log("hello");
        });
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
