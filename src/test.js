import Spinner from 'react-bootstrap/Spinner';
import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import FusionMaps from 'fusioncharts/fusioncharts.maps';
import WorldWithCountries from 'fusionmaps/maps/fusioncharts.worldwithcountries';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import axios from 'axios';
import config from './config';
import Cards from './cards'
import TableExample from './TableExample';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

ReactFC.fcRoot(FusionCharts, FusionMaps, WorldWithCountries, FusionTheme);
const configArr = config.COUNTRY_ARR;

// Step 9 - Creating the JSON object to store the map configurations
const chartConfigs = {
    type: 'maps/worldwithcountries',
    width: '1000',
    height: '1000',
    dataFormat: 'json',
    dataSource: {
        "chart": {
            "animation": "1",
            "showbevel": "",
            "usehovercolor": "1",
            "fillalpha": "80",
            "hovercolor": "CCCCCC",
            "theme": "fusion"
        },
        "colorrange": {},
        "data": []
    },
    totalConfirmed: 0,
    totalActive: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    countryStats: {},
    countryInfo: []
};
// Step 10 - Creating the DOM element to pass the react-fusioncharts component
class Test extends React.Component {

    constructor() {
        super();
        this.state = chartConfigs;
        this.entityRollover = this.entityRollover.bind(this);
        this.entityRollout = this.entityRollout.bind(this);
        this.entityClick = this.entityClick.bind(this);
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
        axios.get('https://pomber.github.io/covid19/timeseries.json').then(response => {
            const arr = [];
            const countryInfoTemp = [];
            let confirm = 0;
            let recovered = 0;
            let death = 0;
            Object.keys(response.data).forEach(country => {
                if (country.length > 1 && configArr.find(data => data.Label === ((country).trim()))) {
                    let val = response.data[country]
                    arr.push({ "id": configArr.find(data => data.Label === (country.trim()))['ID'].toString(), "value": val[val.length - 1].confirmed, "dataValue": { as: 'asd' } })
                    confirm += val[val.length - 1].confirmed;
                    recovered += val[val.length - 1].recovered;
                    death += val[val.length - 1].deaths;
                    countryInfoTemp.push({
                        country: country,
                        ID: configArr.find(data => data.Label === (country.trim()))['ID'].toString(),
                        confirm: val[val.length - 1].confirmed,
                        recovered: val[val.length - 1].recovered,
                        death: val[val.length - 1].deaths,
                        active: (val[val.length - 1].confirmed - val[val.length - 1].recovered - val[val.length - 1].deaths)
                    })
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
                    "chart": {
                        "animation": "1",
                        "showbevel": "",
                        "usehovercolor": "1",
                        "fillalpha": "80",
                        "hovercolor": "CCCCCC",
                        "theme": "fusion",
                        'applyCSSTransform': "1",
                    },
                    "colorrange": {
                        "minvalue": "0",
                        "startlabel": "Low",
                        "endlabel": "High",
                        "code": "e44a00",
                        "gradient": "1",
                        "color": [{ "maxvalue": min.value, "code": "#33CC33" }, { "maxvalue": max.value, "code": "#8b0000" }]
                    },
                    "data": arr
                },
                totalConfirmed: confirm,
                totalActive: (confirm - recovered - death),
                totalRecovered: recovered,
                totalDeceased: death,
                countryInfo: countryInfoTemp,
                countryStats: {
                    country: "World",
                    totalConfirmed: confirm,
                    totalActive: (confirm - recovered - death),
                    totalRecovered: recovered,
                    totalDeceased: death
                }
            })
            console.log(this.state.countryInfo)
        })
    }

    entityRollover(eventObj, dataObj) {
        const country = (this.state.countryInfo.find(element => element.ID === dataObj.id));
        if (country) {
            this.setState({
                countryStats: {
                    country: country.country,
                    totalConfirmed: country.confirm,
                    totalActive: country.active,
                    totalRecovered: country.recovered,
                    totalDeceased: country.death,
                }
            });
        } else {
            this.setState({
                countryStats: {
                    country: "World",
                    totalConfirmed: this.state.totalConfirmed,
                    totalActive: this.state.totalActive,
                    totalRecovered: this.state.totalRecovered,
                    totalDeceased: this.state.totalDeceased
                }
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
                totalDeceased: this.state.totalDeceased
            }
        });
    }
    entityClick(eventObj, dataObj) {
    }
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        return (
            this.state.dataSource['data'].length > 0 ?

                <div>
                    {/* </h2> */}
                    < ReactFC {...this.state}
                        fcEvent-entityRollover={this.entityRollover}
                        fcEvent-entityRollout={this.entityRollout}
                        fcEvent-entityClick={this.entityClick} />
                    <Cards confirm={this.numberWithCommas(this.state.countryStats.totalConfirmed)} active={this.numberWithCommas(this.state.countryStats.totalActive)} recovered={this.numberWithCommas(this.state.countryStats.totalRecovered)} deceased={this.numberWithCommas(this.state.countryStats.totalDeceased)} country={this.state.countryStats.country} />
                    <Container className="tableOverlay">
                        <Row>
                            <Col>
                                <Card bg='light' text='dark'>
                                    <Card.Header as="h5">Statistics</Card.Header>
                                    {/* <Card.Body> */}
                                    <TableExample data={this.state.countryInfo} />
                                    {/* </Card.Body> */}
                                </Card>
                            </Col>
                        </Row>


                    </Container>

                </div> : <Spinner animation="grow" className="spinner" />
        );
    }
}

export default Test;