import React from "react";
import { useAlert } from "react-alert";
import { CommonTypes } from "../Types/Common";

export default function ShowMessage(props) {
  const alert = useAlert();

  let show = () => {
    var type = props.MessageType;
    switch (type) {
      case CommonTypes.MessageTypes.success:
        alert.success(props.Message);
        break;
      case CommonTypes.MessageTypes.error:
        alert.error(props.Message);
        break;
      default:
        alert.info(props.Message);
        break;
    }
  };
  return <div>{show()}</div>;
}
