import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardContent, Grid } from "@material-ui/core";
import { bindActionCreators } from "redux";
import * as messageActions from "../../redux/actions/message-actions";
import Action from "../ToolBox/action";
import { CommonTypes } from "../../Types/Common";

import SaveIcon from "@material-ui/icons/Save";

class ActionBar extends Component {
  getIcon = (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.Save:
        return <SaveIcon />;

      default:
        break;
    }
  };

  generateActions = () => {
    debugger;
    if (this.props.actionKeys && this.props.actionKeys.length > 0) {
      var rtnObj = this.props.actionKeys.map((value, index) => {
        return (
          <Action
            Key={value}
            Icon={this.getIcon(value)}
            executeCommand
          ></Action>
        );
      });

      return rtnObj;
    }
  };

  render() {
    // let generateActions = () => {
    //   debugger;
    //   if (this.props.actionKeys) this.generateActions();
    // };
    return (
      <Card>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {this.generateActions()}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  debugger;
  return {
    actionKeys: state.actionListReducer,
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
