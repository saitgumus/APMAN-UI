import Parameter from "../../Models/Parameter";
import { CommonTypes } from "../../Types/Common";

export default {
  user: {
    name: "redux-test-user-name",
  },
  cityList: [
    {
      0: "select",
    },
  ],
  selectedCityId: -1,
  countyList: [
    {
      0: "select",
    },
  ],
  parameterList: [initialParameter()],
  jwtObject: {
    token: "null",
    expiration: new Date(),
    isSuccess: true,
  },
  messageObject: {
    messageType: CommonTypes.MessageTypes.info,
    message: "initial message",
  },
  blockList: [
    {
      siteId: -1,
      code: "",
    },
  ],
  apertment: {
    Name: "",
  },
  site: {
    Name: "",
  },
  actionListInfo: {
    actionKeyList: [],
    resourceCode: "",
  },
  executedAction: {
    onExecute: () => {
      alert("executed redux function");
    },
  },
};

function initialParameter() {
  var initialParameter = new Parameter();
  initialParameter.ParamCode = -1;
  initialParameter.ParamType = "no param";
  return initialParameter;
}
