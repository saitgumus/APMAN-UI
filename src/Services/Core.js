import Parameter from "../Models/Parameter";
import Axios from "axios";
import { CommonTypes } from "../Types/Common";
import { Response } from "../Models/kernel";

/**
 * the parameter services
 */
export class ParameterService {
  /**
   * parametre listesi döndürür.
   * @param {"paramtype"} parametre
   */
  async GetParameter(paramType) {
    if (paramType && paramType.length > 1) {
      let prm = new Parameter();
      prm.ParamType = paramType;
      let returnObject = new Response();

      await Axios.post(CommonTypes.GetUrlForAPI("kernel", "getparameter"), {
        ParamType: paramType,
      })
        .then((res) => {
          var data = res.data;
          debugger;
          if (data && data.length > 0) {
            returnObject.valueList = [];

            data.forEach((element) => {
              returnObject.valueList.push(element);
            });
          }

          return returnObject;
        })
        .catch((e) => {
          returnObject.success = false;
          returnObject.errorMessage = e.toString();
        });
    } else {
      return new Parameter();
    }
  }
}
