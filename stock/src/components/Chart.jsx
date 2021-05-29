let seriesDataLinear = [];
import React, { Component } from "react";
import ReactApexChart from "../../../stock/node_modules/react-apexcharts";

export default class chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: this.handleHistoricalData(this.props.stockHistoricalData)[0],
        },
      ],
      options: {
        chart: {
          type: "candlestick",
          redrawOnWindowResize: true,
          height: "auto",
          width: "auto",
          id: "candles",
          toolbar: {
            autoSelected: "zoom",
            show: true,
          },
          zoom: {
            enabled: true,
            type: "xy",
            autoScaleYaxis: true,
          },
        },
        plotOptions: {
          columnWidth: "40%",
        },

        xaxis: {
          type: "category",
          tickPlacement: "on",
        },
      },
    };
  }

  handleHistoricalData = (data) => {
    let stock = [];
    let volume = [];
    data.map((val) => {
      stock.push({
        x: new Date(val.Datetime / 1000000).toLocaleString("en-US", {
          timeZone: "America/New_York",
        }),
        y: [
          parseFloat(val.Open.toFixed(2)),
          parseFloat(val.High.toFixed(2)),
          parseFloat(val.Low.toFixed(2)),
          parseFloat(val.Close.toFixed(2)),
        ],
      });
      volume.push(val.Volume);
    });
    console.log(stock);
    let array = [stock, volume];
    return array;
  };

  componentDidMount() {
    this.setState();
  }

  render() {
    return (
      <div class="chart-box">
        <div id="chart-candlestick">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="candlestick"
            height={450}
          />
        </div>
      </div>
    );
  }
}
