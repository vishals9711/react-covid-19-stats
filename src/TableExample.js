import DataTable from "react-data-table-component";
import React from "react";
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
  {
    name: "Country",
    selector: "country",
    sortable: true,
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

function TableExample(props) {
  return (
    <DataTable
      highlightOnHover={true}
      columns={columns}
      data={props.data}
      fixedHeader
      fixedHeaderScrollHeight="300px"
      noHeader
    />
  );
}

export default TableExample;
