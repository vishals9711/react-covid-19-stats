import React, { Component } from "react";
import "./App.scss";
import MainChartComponent from "./MainChartComponent";
import HeadingComponent from "./HeadingComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import ChildMap from "./ChildMap";
class App extends Component {
  constructor() {
    super();
    this.countryClick = this.countryClick.bind(this);
    this.routeBack = this.routeBack.bind(this);

    this.state = {
      renderParent: true,
      childContent: {},
    };
  }
  countryClick(mapContent) {
    console.log(mapContent);
    this.setState(
      Object.assign({}, { renderParent: false, childContent: mapContent })
    );
  }
  routeBack() {
    console.log('-----------------')
    this.setState({ renderParent: true });
  }
  render() {
    return (this.state.renderParent) ? (
      <div className="App">
        <HeadingComponent />
        <MainChartComponent mapClick={this.countryClick} />
      </div>
    ) : (
      <ChildMap routeBack={this.routeBack} data={this.state.childContent} />
    );
  }
}
export default App;
