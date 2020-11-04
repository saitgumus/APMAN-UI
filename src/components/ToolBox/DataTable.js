import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";

class DataTable extends Component {

    options = {
        filterType: 'checkbox',
    };
    render() {
        return (
            <div>
                <MUIDataTable
                title={this.props.title}
                data={this.props.data}
                columns={this.props.columns}
                options={this.options}
                />
            </div>
        );
    }
}

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data : PropTypes.array.isRequired,
};

export default DataTable;