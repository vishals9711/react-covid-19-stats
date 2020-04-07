import React, { Component } from "react";
import ReactFC from "react-fusioncharts";
// import Piechart from "./Piechart";
import FusionCharts from "fusioncharts";
import FusionMaps from "fusioncharts/fusioncharts.maps";
import India from "fusionmaps/maps/fusioncharts.india";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";
import config from "./config";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataTable from "react-data-table-component";
import ReactFusioncharts from "react-fusioncharts";
ReactFC.fcRoot(FusionCharts, FusionMaps, India, FusionTheme);

const chartConfigs = {
  type: "maps/india",
  width: "100%",
  height: "100%",
  dataFormat: "json",
  dataSource: {
    chart: {
      animation: "1",
      showbevel: "",
      usehovercolor: "0",
      fillalpha: "80",
      hovercolor: "CCCCCC",
      theme: "fusion",
    },
    colorrange: {},
    data: [{}],
  },
  totalConfirmed: 0,
  totalActive: 0,
  totalRecovered: 0,
  totalDeceased: 0,
  countryStats: {},
  countryInfo: [],
  filterCountryInfo: [],
  searchString: "",
  columns: [
    {
      name: "State/UT",
      selector: "state",
      sortable: true,
      // overflow:true,
      wrap: true,
      style: {},
    },
    {
      name: "Confirmed Cases",
      selector: "confirm",
      sortable: true,
      right: false,
      format: (row) =>
        row.confirm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      name: "Active Cases",
      selector: "active",
      sortable: true,
      format: (row) =>
        row.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      name: "Recovered Cases",
      selector: "recovered",
      sortable: true,
      right: false,
      format: (row) =>
        row.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      name: "Deceased Cases",
      selector: "death",
      sortable: true,
      right: false,
      format: (row) =>
        row.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
  ],
};

export class ChildMap extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // console.log(this.props);
    this.state = chartConfigs;
  }
  handleClick = (value) => {
    // console.log(value);
    this.props.routeBack(value);
  };

  componentDidMount() {
    axios({
      url: "https://api.covid19india.org/data.json",
      method: "get",
    })
      .then((response) => {
        const arr = [];
        const countryInfoTemp = [];
        let active = 0;
        let recovered = 0;
        let death = 0;

        console.log(response.data);
        if (response.data && response.data.statewise) {
          response.data.statewise.forEach((stateData) => {
            const data = config.INDIA_ARR.find(
              (element) => element["CODE"] === stateData.statecode.trim()
            );
            if (data !== undefined) {
              // console.log(data);
              arr.push({
                id: data["ID"],
                value: parseInt(stateData.confirmed),
              });
            } else {
              // console.log(stateData);
              // console.log(data);
            }
            if (stateData.state !== "Total") {
              countryInfoTemp.push({
                state: stateData.state,
                confirm: parseInt(stateData.confirmed),
                death: parseInt(stateData.deaths),
                active: parseInt(stateData.active),
                recovered: parseInt(stateData.recovered),
              });
            } else {
              death = parseInt(stateData.deaths);
              active = parseInt(stateData.active);
              recovered = parseInt(stateData.recovered);
            }
          });
          const min = arr.reduce(function (prev, curr) {
            return parseInt(prev.value) < parseInt(curr.value) ? prev : curr;
          });
          const max = arr.reduce(function (prev, curr) {
            return parseInt(prev.value) > parseInt(curr.value) ? prev : curr;
          });
          // console.log(max);
          // console.log(arr);
          this.setState(
            Object.assign({}, this.state, {
              dataSource: {
                chart: {
                  animation: "1",
                  showbevel: "",
                  usehovercolor: "0",
                  fillalpha: "80",
                  hovercolor: "CCCCCC",
                  theme: "fusion",
                },
                colorrange: {
                  minvalue: "0",
                  startlabel: "Low",
                  endlabel: "High",
                  code: "#DD8686",
                  gradient: "1",
                  color: [
                    { maxvalue: min.value, code: "#fff5f0" },
                    { maxvalue: max.value, code: "#bb161b" },
                  ],
                },
                data: arr,
              },
              countryInfo: countryInfoTemp,
              countryStats: {
                totalActive: active,
                totalRecovered: recovered,
                totalDeceased: death,
              },
              pieChartdataSource: {
                chart: {
                  // caption: "World Statistics",
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
                    value: active,
                  },
                  {
                    label: "Deaceased",
                    value: death,
                  },
                  {
                    label: "Recovered",
                    value: recovered,
                  },
                ],
              },
            })
          );
          console.log(this.state);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <Container fluid>
        {/* <Row>
          <Col>
           
          </Col>
        </Row> */}
        <Row>
          {" "}
          <Col lg={6} md={12} className="fullHeight">
            <ReactFC {...this.state} />{" "}
          </Col>
          <Col lg={6} md={12}>
            <h2>
              India
              <button
                onClick={this.handleClick}
                className="btn btn-light floatRight"
              >
                {" "}
                Go Back{" "}
              </button>
            </h2>

            {/* <div class="countryPieChart">
              <ReactFusioncharts
                type="pie2d"
                width="100%"
                height="50%"
                dataFormat="JSON"
                dataSource={this.state.pieChartdataSource}
              />
            </div> */}
            <DataTable
              highlightOnHover={true}
              columns={this.state.columns}
              data={this.state.countryInfo}
              fixedHeader
              fixedHeaderScrollHeight="300px"
              noHeader
              responsive={true}
              // compact={true}
              // overflow={true}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ChildMap;
