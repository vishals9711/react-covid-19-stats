import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
charts(FusionCharts);
class Piechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {
        chart: {
          caption: "World Statistics",
          // plottooltext: "<b>$percentValue</b> of web servers run on $label servers",
          showlegend: "1",
          showpercentvalues: "1",
          legendposition: "top",
          usedataplotcolorforlabels: "1",
          theme: "fusion",
          showLabels: "0",
        },
        data: [
          {
            label: "Active",
            value: this.props.active,
          },
          {
            label: "Deaceased",
            value: this.props.deceased,
          },
          {
            label: "Recovered",
            value: this.props.recovered,
          },
        ],
      },
    };
  }
  // componentDidMount() {
  //     this.setState({

  //     })
  // }

  render() {
    return (
      <ReactFusioncharts
        type="pie2d"
        width="100%"
        height="30%"
        dataFormat="JSON"
        dataSource={this.state.dataSource}
      />
    );
  }
}

export default Piechart;
