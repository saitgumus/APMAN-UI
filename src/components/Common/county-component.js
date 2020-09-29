import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as messageActions from "../../redux/actions/message-actions";
import * as cityCountyActions from "../../redux/actions/city-county-actions";
// eslint-disable-next-line
import { Spinner, Label, Input } from "reactstrap";
import Messages from "../../Types/Messages";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class CountyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.props.actions.getCountyList();
  }

  static createContent(countyList, cityId) {
    var filtered = countyList.filter((x) => x.cityId === parseInt(cityId));
    if (!filtered || filtered.length < 1) {
      return (
        <div>
          <Autocomplete
            id="combo-box-demo"
            options={[{ name: "test", id: 1 }]}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={Messages.LabelNames.county}
                variant="outlined"
              />
            )}
          />
        </div>
      );
    }

    return (
      <div>
        {/* <Label for="county">{Messages.LabelNames.county}</Label>
        <Input type="select" name="county" id="county" placeholder="Seçiniz.">
          {filtered.map((e) => (
            <option key={e.cityId + "cnty"} value={e.countyId}>
              {e.name}
            </option>
          ))}
        </Input> */}
        <Autocomplete
          id="combo-box-demo"
          options={filtered}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={Messages.LabelNames.county}
              variant="outlined"
            />
          )}
          onChange={(e, value, reason) => {
            //value : countyContract
          }}
        />
      </div>
    );
  }

  render() {
    let content =
      this.props.countyList && this.props.countyList.length > 1
        ? CountyComponent.createContent(
            this.props.countyList,
            this.props.currentCityId
          )
        : CountyComponent.createContent([], -1);

    return <div>{content}</div>;
  }
}

function mapStateToProps(state) {
  return {
    countyList: state.countyReducer,
    currentCityId: state.changeSelectedCityReducer,
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
      getCountyList: bindActionCreators(
        cityCountyActions.getCountyListAll,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountyComponent);
