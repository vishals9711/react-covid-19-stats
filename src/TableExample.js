import DataTable from 'react-data-table-component';
import React, { Component } from 'react'
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
    {
        name: 'Country',
        selector: 'country',
        sortable: true,
    },
    {
        name: 'Confirmed Cases',
        selector: 'confirm',
        sortable: true,
        right: false,
        format: row => (row.confirm).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    {
        name: 'Active Cases',
        selector: 'active',
        sortable: true,
        format: row => (row.active).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    },
    {
        name: 'Recovered Cases',
        selector: 'recovered',
        sortable: true,
        right: false,
        format: row => (row.recovered).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    {
        name: 'Deceased Cases',
        selector: 'death',
        sortable: true,
        right: false,
        format: row => (row.death).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

];

class TableExample extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    prepareData() {

    }
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        return (
            <DataTable
                // title="Arnold Movies"
                highlightOnHover={true}
                columns={columns}
                data={this.props.data}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                format={row => console.log(row)}
                noHeader
            />
        )
    }
};

export default TableExample;
