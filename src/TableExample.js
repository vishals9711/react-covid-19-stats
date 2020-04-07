import DataTable from "react-data-table-component";
import React, { Component } from "react";
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
  {
    name: "Country",
    selector: "country",
    sortable: true,
    cell: (row) => <button>{row.country}</button>,
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
    format: (row) => row.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  },
];

class TableExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: [
        {
          name: "Country",
          selector: "country",
          sortable: true,
          // cell: (row) => <button onClick={this.buttonClick(row)}>{row.country}</button>,
        },
        {
          name: "Confirmed Cases",
          selector: "confirm",
          sortable: true,
          right: false,
          format: (row) => this.numberWithCommas(row.confirm),
        },
        {
          name: "Active Cases",
          selector: "active",
          sortable: true,
          format: (row) => this.numberWithCommas(row.active),
        },
        {
          name: "Recovered Cases",
          selector: "recovered",
          sortable: true,
          right: false,
          format: (row) => this.numberWithCommas(row.recovered),
        },
        {
          name: "Deceased Cases",
          selector: "death",
          sortable: true,
          right: false,
          format: (row) => this.numberWithCommas(row.death),
        },
      ],
    };
    this.buttonClick=this.buttonClick.bind(this)
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  buttonClick(x) {
    // console.log(x);
    this.props.onTableExample(x);
  }
  render() {
    return (
      <DataTable
        highlightOnHover={true}
        columns={this.state.column}
        data={this.props.data}
        fixedHeader
        fixedHeaderScrollHeight="300px"
        noHeader
        onRowClicked={this.buttonClick}
        pointerOnHover={true}
        responsive={true}
      />
    );
  }
}
export default TableExample;
