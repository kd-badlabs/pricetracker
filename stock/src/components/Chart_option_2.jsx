import React, { Component } from "react";
let candleSeries;
let chart;
export default class Chart_II extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartProperties: {
        height: 450,
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
        },
      },
    };
  }
  handleStockData_formate = (data) => {
    let stock = [];
    data.map((val) => {
      stock.push({
        time: val.Datetime / 100000000,
        open: parseFloat(val.Open.toFixed(2)),
        high: parseFloat(val.High.toFixed(2)),
        low: parseFloat(val.Low.toFixed(2)),
        close: parseFloat(val.Close.toFixed(2)),
      });
    });
    console.log(stock);
    return stock;
  };

  handle_div = () => {
    let base_id = document.getElementById("base_id");
    base_id.removeChild(base_id.childNodes[0]);
    let chart_id = document.createElement("div");
    chart_id.setAttribute("id", "chart_candlestick");
    base_id.appendChild(chart_id);
  };

  componentDidMount() {
    chart = LightweightCharts.createChart(
      document.getElementById("chart_candlestick"),
      this.state.chartProperties
    );
    candleSeries = chart.addCandlestickSeries();
    let cdata = this.handleStockData_formate(this.props.stockHistoricalData);
    candleSeries.setData(cdata);
  }

  componentDidUpdate(prevPos) {
    if (prevPos.stockHistoricalData !== this.props.stockHistoricalData) {
      this.handle_div();
      chart = null;
      candleSeries = null;
      chart = LightweightCharts.createChart(
        document.getElementById("chart_candlestick"),
        this.state.chartProperties
      );
      candleSeries = chart.addCandlestickSeries();
      let cdata = this.handleStockData_formate(this.props.stockHistoricalData);
      candleSeries.setData(cdata);
    } else {
      let realtimeData = this.props.stockRealtimeData;
      let update = {
        time: Date.now(),
        open: parseFloat(realtimeData.open.toFixed(2)),
        high: parseFloat(realtimeData.high.toFixed(2)),
        low: parseFloat(realtimeData.low.toFixed(2)),
        close: parseFloat(realtimeData.close.toFixed(2)),
      };
      candleSeries.update(update);
    }
  }

  render() {
    return (
      <div id="base_id" className="w-100 ">
        <div id="chart_candlestick"></div>
      </div>
    );
  }
}
