import React, { Component } from "react";
import TitleBar from "./components/TitleBar";
import Chart from "./components/Chart";
import Chart_II from "./components/Chart_option_2";
import OverView from "./components/OverView";
import axios from "axios";

function getSocket() {
  const socketPath = `ws://${window.location.host}/ws/new/`;
  const chatSocket = new WebSocket(socketPath);
  return chatSocket;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "AAPL",
      period: "2d",
      interval: "1m",
      socketid: 0,
      stockRealtimeData: null,
      stockHistoricalData: null,
    };
    this.socket = getSocket();
  }

  handleRealtimeData = (ticker) => {
    axios
      .get(`http://${window.location.host}/realtimeData/${ticker}/`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleHistoricalData = (ticker, period, interval) => {
    let data = `${ticker}_${period}_${interval}`;
    axios
      .get(`http://${window.location.host}/historicalData/${data}/`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.handleRealtimeData(ticker);
      });
  };

  handleSetTicker = (symbol) => {
    this.setState({ ticker: symbol }, () => {
      this.handleHistoricalData(
        this.state.ticker,
        this.state.period,
        this.state.interval
      );
    });
  };

  componentDidMount() {
    this.socket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.status === "Connected") {
        this.handleHistoricalData(
          this.state.ticker,
          this.state.period,
          this.state.interval
        );
      } else if (data.status === "HistoricalData") {
        this.setState({ stockHistoricalData: data.price });
      } else if (data.status === "RealTimeData") {
        this.setState({ stockRealtimeData: data.price });
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
            stockdetail={this.state.stockRealtimeData}
          />
        </div>

        <div className="pl-1 my-2">
          {this.state.stockHistoricalData != null ? (
            <Chart_II
              stockHistoricalData={this.state.stockHistoricalData}
              stockRealtimeData={this.state.stockRealtimeData}
            />
          ) : null}
        </div>

        <div className="p-2 my-2">
          <OverView stockdetail={this.state.stockRealtimeData} />
        </div>
      </div>
    );
  }
}

export default App;
