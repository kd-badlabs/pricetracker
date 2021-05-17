// x: new Date(1538793000000),
// y: [6605, 6608.03, 6598.95, 6604.01],
let seriesDataLinear = [];
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

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
          height: 290,
          id: "candles",
          toolbar: {
            autoSelected: "pan",
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          columnWidth: "40%",
          candlestick: {
            colors: {
              upward: "#3C90EB",
              downward: "#DF7D46",
            },
          },
        },
        xaxis: {
          type: "datetime",
        },
      },

      seriesBar: [
        {
          name: "volume",
          data: this.handleHistoricalData(this.props.stockHistoricalData)[1],
        },
      ],

      optionsBar: {
        chart: {
          height: 160,
          type: "bar",
          brush: {
            enabled: true,
            target: "candles",
          },
          selection: {
            enabled: true,
            xaxis: {
              min: new Date(
                `${
                  this.props.stockHistoricalData[
                    this.props.stockHistoricalData.length - 10
                  ].Datetime
                }`
              ),
              max: new Date(
                `${
                  this.props.stockHistoricalData[
                    this.props.stockHistoricalData.length - 1
                  ].Datetime
                }`
              ),
            },
            fill: {
              color: "#ccc",
              opacity: 0.4,
            },
            stroke: {
              color: "#0D47A1",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: "100%",
            colors: {
              ranges: [
                {
                  from: Math.min.apply(
                    null,
                    this.handleHistoricalData(this.props.stockHistoricalData)[1]
                  ),
                  to:
                    Math.max.apply(
                      null,
                      this.handleHistoricalData(
                        this.props.stockHistoricalData
                      )[0]
                    ) / 2,
                  color: "#F15B46",
                },
                {
                  from:
                    Math.max.apply(
                      null,
                      this.handleHistoricalData(
                        this.props.stockHistoricalData
                      )[1]
                    ) / 2,
                  to: Math.max.apply(
                    null,
                    this.handleHistoricalData(this.props.stockHistoricalData)[1]
                  ),

                  color: "#FEB019",
                },
              ],
            },
          },
        },
        stroke: {
          width: 0,
        },
        xaxis: {
          type: "datetime",
          axisBorder: {
            offsetX: 13,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
      },
    };
  }

  handleHistoricalData = (data) => {
    let stock = [];
    let volume = [];
    data.map((val) => {
      stock.push({
        x: new Date(val.Datetime / 1000000),
        y: [
          val.Open.toFixed(2),
          val.High.toFixed(2),
          val.Low.toFixed(2),
          val.Close.toFixed(2),
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
            height={290}
          />
        </div>
        <div id="chart-bar">
          <ReactApexChart
            options={this.state.optionsBar}
            series={this.state.seriesBar}
            type="bar"
            height={160}
          />
        </div>
      </div>
    );
  }
}
