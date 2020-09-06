import Parameter from "../Models/Parameter";
import Axios from "axios";
import { CommonTypes } from "../Types/Common";
import { Response } from "../Models/kernel";
import Cache from "./Cache";

/**
 * the parameter services
 */
export class ParameterService {
  /**
   * parametre listesi döndürür.
   * @param {"paramtype"} parametre
   */
  async GetParameter(paramType) {
    return new Promise((response, reject) => {
      if (paramType && paramType.length > 1) {
        let prm = new Parameter();
        prm.ParamType = paramType;
        let returnObject = new Response();

        var cache = Cache.getParameter(paramType);
        if (cache) {
          returnObject.valueList = cache;
          response(returnObject);
        }
        Axios.post(CommonTypes.GetUrlForAPI("core", "getparameter"), {
          ParamType: paramType,
        })
          .then((res) => {
            var data = res.data;
            if (data && data.length > 0) {
              returnObject.valueList = [];

              data.forEach((element) => {
                returnObject.valueList.push(element);
              });

              Cache.setParameter(paramType, returnObject.valueList);
            }

            response(returnObject);
          })
          .catch((e) => {
            returnObject.success = false;
            returnObject.errorMessage = e.toString();
            reject(returnObject);
          });
      } else {
        response(new Parameter());
      }
    });
  }
}
