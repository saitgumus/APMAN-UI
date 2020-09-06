import { CommonTypes } from "../../Types/Common";
import * as actionTypes from "./action-types";
import Axios from "axios";
import Cache from "../../Services/Cache";


export function getParameterSuccess(parameters) {
  return {
    type: actionTypes.GETPARAMETER,
    payload: parameters,
  };
}

export function getParameter(paramtype) {
  var parameter = {
    ParamType: paramtype,
    ParamCode: "",
    ParamDescription: "",
    ParamValue: "",
    ParamValue2: "",
    ParamValue3: "",
    ParamValue4: "",
    ParamValue5: "",
  };
  return function (dispatch) {
    var cache = Cache.getParameter(paramtype);
    if(cache){
      return cache;
    }

    let url = CommonTypes.GetUrlForAPI("core", "getparameter");
    return Axios.post(url, parameter)
      .then((res) => {
        var formatData = JSON.parse(JSON.stringify(res.data));
        Cache.setParameter(paramtype,formatData);
        dispatch(getParameterSuccess(formatData));
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function parameterChanged()