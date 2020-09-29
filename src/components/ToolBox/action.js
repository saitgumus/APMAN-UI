import { Button } from "@material-ui/core";
import React from "react";
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
          onClick={(e) => props.executeCommand()} //todo: redux
        >
          {getActionLabel(key)}
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

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
