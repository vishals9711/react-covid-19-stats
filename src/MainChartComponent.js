import Spinner from "react-bootstrap/Spinner";
import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import FusionMaps from "fusioncharts/fusioncharts.maps";
import WorldWithCountries from "fusionmaps/maps/fusioncharts.worldwithcountries";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";
import config from "./config";
import Cards from "./cards";
import TableExample from "./TableExample";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Piechart from "./Piechart";
ReactFC.fcRoot(FusionCharts, FusionMaps, WorldWithCountries, FusionTheme);
const configArr = config.COUNTRY_ARR;
const chartConfigs = {
  type: "maps/worldwithcountries",
  width: "100%",
  height: "500",
  dataFormat: "json",
  dataSource: {
    chart: {
      animation: "1",
      showbevel: "",
      usehovercolor: "1",
      fillalpha: "80",
      hovercolor: "CCCCCC",
      theme: "fusion",
    },
    colorrange: {},
    data: [],
  },
  totalConfirmed: 0,
  totalActive: 0,
  totalRecovered: 0,
  totalDeceased: 0,
  countryStats: {},
  countryInfo: [],
  filterCountryInfo: [],
  searchString: "",
};
class MainChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = chartConfigs;
    this.entityRollover = this.entityRollover.bind(this);
    this.entityRollout = this.entityRollout.bind(this);
    this.entityClick = this.entityClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // axios.get('https://api.covid19api.com/summary').then(response => {
    //     // console.log(response.data.Countries);
    //     const arr = [];
    //     response.data.Countries.forEach(country => {
    //         // this.state.response.filter(element => element.Country.length > 1).map(country => ({ "id": configArr.find(data => data.Label === country.Country.trim()).ID, "value": country.TotalConfirmed }));
    //         if (country.Country.length > 1 && configArr.find(data => data.Label === country.Country.trim())) {
    //             arr.push({ "ID": configArr.find(data => data.Label === country.Country.trim())['ID'].toString(), "value": country.TotalConfirmed })
    //         } else {
    //             // console.log(country)
    //         }

    //     });
    //     const min = arr.reduce(function (prev, curr) {
    //         return prev.value < curr.value ? prev : curr;
    //     });
    //     const max = arr.reduce(function (prev, curr) {
    //         return prev.value > curr.value ? prev : curr;
    //     });
    //     this.setState({
    //         dataSource: {
    //             "chart": {
    //                 "animation": "1",
    //                 "showbevel": "",
    //                 "usehovercolor": "1",
    //                 "fillalpha": "80",
    //                 "hovercolor": "CCCCCC",
    //                 "theme": "fusion"
    //             },
    //             "colorrange": {
    //                 "minvalue": "0",
    //                 "startlabel": "Low",
    //                 "endlabel": "High",
    //                 "code": "e44a00",
    //                 "gradient": "1",
    //                 "color": [{ "maxvalue": min.value, "code": "#33CC33" }, { "maxvalue": max.value, "code": "#cc0000" }]
    //             },
    //             "data": arr
    //         }
    //     })
    // }).catch(error => {
    //     console.log(error);
    // })
    axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then((response) => {
        const arr = [];
        const countryInfoTemp = [];
        let confirm = 0;
        let recovered = 0;
        let death = 0;
        Object.keys(response.data).forEach((country) => {
          if (
            country.length > 1 &&
            configArr.find((data) => data.Label === country.trim())
          ) {
            let val = response.data[country];
            arr.push({
              id: configArr
                .find((data) => data.Label === country.trim())
                ["ID"].toString(),
              value: val[val.length - 1].confirmed,
            });
            confirm += val[val.length - 1].confirmed;
            recovered += val[val.length - 1].recovered;
            death += val[val.length - 1].deaths;
            countryInfoTemp.push({
              country: country,
              ID: configArr
                .find((data) => data.Label === country.trim())
                ["ID"].toString(),
              confirm: val[val.length - 1].confirmed,
              recovered: val[val.length - 1].recovered,
              death: val[val.length - 1].deaths,
              active:
                val[val.length - 1].confirmed -
                val[val.length - 1].recovered -
                val[val.length - 1].deaths,
            });
          }
        });

        const min = arr.reduce(function (prev, curr) {
          return prev.value < curr.value ? prev : curr;
        });
        const max = arr.reduce(function (prev, curr) {
          return prev.value > curr.value ? prev : curr;
        });
        this.setState({
          dataSource: {
            chart: {
              animation: "1",
              showbevel: "",
              usehovercolor: "1",
              fillalpha: "80",
              hovercolor: "CCCCCC",
              theme: "fusion",
              applyCSSTransform: "1",
            },
            colorrange: {
              minvalue: "0",
              startlabel: "Low",
              endlabel: "High",
              code: "e44a00",
              gradient: "1",
              color: [
                { maxvalue: min.value, code: "#33CC33" },
                { maxvalue: max.value, code: "#8b0000" },
              ],
            },
            data: arr,
          },
          totalConfirmed: confirm,
          totalActive: confirm - recovered - death,
          totalRecovered: recovered,
          totalDeceased: death,
          countryInfo: countryInfoTemp,
          countryStats: {
            country: "World",
            totalConfirmed: confirm,
            totalActive: confirm - recovered - death,
            totalRecovered: recovered,
            totalDeceased: death,
          },
        });
        console.log(this.state.countryInfo);
      });
  }

  entityRollover(eventObj, dataObj) {
    const country = this.state.countryInfo.find(
      (element) => element.ID === dataObj.id
    );
    if (country) {
      this.setState({
        countryStats: {
          country: country.country,
          totalConfirmed: country.confirm,
          totalActive: country.active,
          totalRecovered: country.recovered,
          totalDeceased: country.death,
        },
      });
    } else {
      this.setState({
        countryStats: {
          country: "World",
          totalConfirmed: this.state.totalConfirmed,
          totalActive: this.state.totalActive,
          totalRecovered: this.state.totalRecovered,
          totalDeceased: this.state.totalDeceased,
        },
      });
    }

    // console.log(eventObj);
    // console.log(dataObj)
  }

  entityRollout(eventObj, dataObj) {
    this.setState({
      countryStats: {
        country: "World",
        totalConfirmed: this.state.totalConfirmed,
        totalActive: this.state.totalActive,
        totalRecovered: this.state.totalRecovered,
        totalDeceased: this.state.totalDeceased,
      },
    });
  }
  entityClick(eventObj, dataObj) {
    console.log(eventObj);
    this.props.mapClick(dataObj);
    console.log(dataObj);
  }
  handleChange(e) {
    // console.log(e);
    // console.log(this.state);
    // this.state.searchString;
    // console.log(e.target.value);
    const filterValue = e?.target?.value.trim();
    if (filterValue && filterValue.length > 0) {
      const filteredArr = this.state.countryInfo.filter((element) =>
        element.country.toLowerCase().includes(filterValue.toLowerCase())
      );
      this.setState(
        Object.assign({}, this.state, {
          filterCountryInfo: filteredArr,
          searchString: filterValue,
        })
      );
    } else {
      this.setState(
        Object.assign({}, this.state, {
          filterCountryInfo: [],
          searchString: "",
        })
      );
    }
  }
  handleClick = (value) => {
    console.log(value);
    this.props.mapClick(value);
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return this.state.dataSource["data"].length > 0 ? (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <Cards
                confirm={this.numberWithCommas(
                  this.state.countryStats.totalConfirmed
                )}
                active={this.numberWithCommas(
                  this.state.countryStats.totalActive
                )}
                recovered={this.numberWithCommas(
                  this.state.countryStats.totalRecovered
                )}
                deceased={this.numberWithCommas(
                  this.state.countryStats.totalDeceased
                )}
                country={this.state.countryStats.country}
              />
            </Col>
          </Row>
          <Row>
            <div className="height75">
              <Col lg={9} md={12} className="floatleft">
                {/* <div className="map"> */}
                <ReactFC
                  {...this.state}
                  fcEvent-entityRollover={this.entityRollover}
                  fcEvent-entityRollout={this.entityRollout}
                  fcEvent-entityClick={this.entityClick}
                />
                {/* </div> */}
              </Col>
              <Col lg={3} md-none={12} sm-none={12} className="floatleft height100 pieChartShow">
                <div className="pieName">
                  <Piechart
                    active={this.state.countryStats.totalActive}
                    recovered={this.state.countryStats.totalRecovered}
                    deceased={this.state.countryStats.totalDeceased}
                  />
                </div>
              </Col>
            </div>
          </Row>
        </Container>
        <Container className="tableOverlay" fluid>
          <Row>
            <Col>
              <Card bg="light" text="dark" className="cardFixedHeight">
                <Card.Header>
                  <h3 className="header">Country Wise Statistics</h3>
                  <div className="filter">
                    <h5 className="countryNumber">
                      {this.state.filterCountryInfo.length > 0
                        ? this.state.filterCountryInfo.length
                        : this.state.countryInfo.length}{" "}
                      {this.state.filterCountryInfo.length === 1
                        ? "Country"
                        : "Countries"}
                    </h5>
                    <input
                      placeholder="Search"
                      onChange={this.handleChange}
                      value={this.state.searchString}
                    ></input>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={() => this.handleChange("")}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </Card.Header>
                <TableExample
                  data={
                    this.state.filterCountryInfo.length > 0
                      ? this.state.filterCountryInfo
                      : this.state.countryInfo
                  }
                  onTableExample={this.handleClick}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
      <Spinner animation="grow" className="spinner" />
    );
  }
}

export default MainChartComponent;
