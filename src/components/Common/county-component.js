import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as messageActions from "../../redux/actions/message-actions";
import * as cityCountyActions from "../../redux/actions/city-county-actions";
import { Spinner, Label, Input } from "reactstrap";
import Messages from "../../Types/Messages";

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
    if (!filtered || filtered.length < 1)
      return (
        <div>
          <Label for="county">{Messages.LabelNames.county}</Label>
          <Input
            type="select"
            name="params"
            id="county"
            placeholder="Seçiniz."
          ></Input>
        </div>
      );

    return (
      <div>
        <Label for="county">{Messages.LabelNames.county}</Label>
        <Input type="select" name="county" id="county" placeholder="Seçiniz.">
          {filtered.map((e) => (
            <option key={e.cityId + "cnty"} value={e.countyId}>
              {e.name}
            </option>
          ))}
        </Input>
      </div>
    );
  }

  render() {
    let content =
      this.props.countyList && this.props.countyList.length > 1 ? (
        CountyComponent.createContent(
          this.props.countyList,
          this.props.currentCityId
        )
      ) : (
        <Spinner size="sm" color="secondary" />
      );

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
