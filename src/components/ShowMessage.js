import React from "react";
import { useAlert } from "react-alert";
import { CommonTypes } from "../Types/Common";
import { connect } from "react-redux";

function ShowMessage(props) {
  const alert = useAlert();

  let show = () => {
    if (!props.messageObject) {
      return;
    }

    var type = props.messageObject.messageType;
    var message = props.messageObject.message;
    switch (type) {
      case CommonTypes.MessageTypes.success:
        alert.success(message);
        break;
      case CommonTypes.MessageTypes.error:
        alert.error(message);
        break;
      default:
        alert.info(message);
        break;
    }
  };
  return <div>{show()}</div>;
}

function mapStateToProps(state) {
  return {
    messageObject: state.showMessageReducer,
  };
}

export default connect(mapStateToProps)(ShowMessage);
