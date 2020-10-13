import { Button } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfoIcon from "@material-ui/icons/Info";
import { bindActionCreators } from "redux";
import * as messageActions from "../../redux/actions/message-actions";
import * as pageActions from "../../redux/actions/page-actions";
import { getActionLabel } from "../../Types/Common";

/**
 * action bar için aksiyon döndürür.
 * executeCommand() aksiyon tetikler.
 * @param {props} props (key,icon,text)
 */
const Action = (props) => {
  let key = props.Key;

  return (
    <div>
      {key ? (
        <Button
          variant="contained"
          color="primary"
          size="medium"
          startIcon={props.Icon ? props.Icon : <InfoIcon />}
          onClick={(e) => {
            if (props.onExecuteCommand && props.onExecuteCommand.onExecute)
              props.onExecuteCommand.onExecute(key);
          }}
        >
          {getActionLabel(key)}
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

Action.propType = {
  ResourceCode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  onExecuteCommand: state.actionExecuteReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      /**
       * showStatusMessage(message, type)
       */
      showMessage: bindActionCreators(
        messageActions.showStatusMessage,
        dispatch
      ),

      executeCommand: bindActionCreators(pageActions.executeCommand, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Action);
