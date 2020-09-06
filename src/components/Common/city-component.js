import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as messageActions from "../../redux/actions/message-actions";
import * as cityCountyActions from "../../redux/actions/city-county-actions";
import { Label, Input } from "reactstrap";
import Messages from "../../Types/Messages";

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
        <Label for="city">{Messages.LabelNames.city}</Label>
        <Input
          type="select"
          name="params"
          id="city"
          placeholder="Seçiniz."
          onChange={(e) => {
            this.props.actions.changeSelectedCityId(e.target.value);
          }}
        >
          {this.props.cityList && this.props.cityList.length > 1 ? (
            this.props.cityList.map((e) => {
              return (
                <option key={e.cityId} value={e.cityId}>
                  {e.name}
                </option>
              );
            })
          ) : (
            <option>loading...</option>
          )}
        </Input>
      </div>
    );
    // <div>{content}</div>;
  }
}

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
