import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
// import {
//     randomCreatedDate,
//     randomUpdatedDate,
// } from '@material-ui/x-grid-data-generator';

const columns = [
    { field: 'name' },
    { field: 'age', type: 'number' },
    // {
    //     field: 'username',
    //     valueGetter: (params) =>
    //         `${params.getValue('name') || 'unknown'} - ${
    //             params.getValue('age') || 'x'
    //         }`,
    //     sortComparator: (v1, v2, row1, row2) => row1.data.age - row2.data.age,
    //     width: 150,
    // },
    // { field: 'dateCreated', type: 'date', width: 180 },
    // { field: 'lastLogin', type: 'date', width: 180 },
];

const rows = [
    {
        id: 1,
        name: 'Damien',
        age: 25,
    },
    {
        id: 2,
        name: 'Nicolas',
        age: 36,
    },
    {
        id: 3,
        name: 'Kate',
        age: 19,
    },
    {
        id: 4,
        name: 'Sebastien',
        age: 28,
    }
];

/**
 * listeleme grid component'i  
 * @param props {{dataSource:Array,columns:Array}}
 * @returns {*}
 * @constructor
 */
function DataGridComponent(props) {
    
    let rows = props.dataSource ? props.dataSource : [{}];
    let columns = props.columns ? props.columns : [{}]
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
}

export default  DataGridComponent;