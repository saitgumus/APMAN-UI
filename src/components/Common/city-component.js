import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as messageActions from "../../redux/actions/message-actions";
import * as cityCountyActions from "../../redux/actions/city-county-actions";
// import { Label, Input } from "reactstrap";
// import Messages from "../../Types/Messages";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class CityComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.props.actions.getCityList();
  }

  render() {
    return (
      <div>
        <Autocomplete
          id="combo-box-demo"
          options={
            this.props.cityList && this.props.cityList.length > 1
              ? this.props.cityList
              : [{ name: "" }]
          }
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="İl" variant="outlined" />
          )}
          onChange={(e, value, reason) => {
            //value : cityContract
            if (value && value.cityId) {
              this.props.actions.changeSelectedCityId(value.cityId);
              if (this.props.onSelectedCity) {
                this.props.onSelectedCity(value);
              }
            }
          }}
        />
      </div>
    );
  }
}

CityComponent.propTypes = {
  onSelectedCity: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cityList: state.cityReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      /**
       * showStatusMessage(message, type)
       */
      showMessage: bindActionCreators(
        messageActions.showStatusMessage,
        dispatch
      ),
      getCityList: bindActionCreators(cityCountyActions.getCityList, dispatch),
      changeSelectedCityId: bindActionCreators(
        cityCountyActions.changeSelectedCityId,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityComponent);
