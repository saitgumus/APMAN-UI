import Parameter from "../Models/Parameter";
import Axios from "axios";
import { CommonTypes } from "../Types/Common";
import { Response, Result, Severity } from "../Core/Response";
import Cache from "./Cache";

/**
 * site/apartman kaydı yapılır.
 * return {Response}
 * @param {object} siteApartmentContract
 */
export async function DefineSiteApartment(siteApartmentContract) {
  var returnObject = new Response();

  if (!siteApartmentContract) {
    returnObject.Results.push(
      new Result("null", "apartman bilgisi boş olamaz.", Severity.Low)
    );
    returnObject.success = false;
    return returnObject;
  }

  await Axios.post(
    CommonTypes.GetUrlForAPI("apartment", "saveapartment"),
    siteApartmentContract
  ).then((res) => {
    if (res.status === CommonTypes.ResponseStatusCode.successful.created) {
      //todo: will set.
    }
  });

  //   /**
  //    * parametre listesi döndürür.
  //    * @param {"paramtype"} parametre
  //    */
  //   async GetParameter(paramType) {
  //     return new Promise((response, reject) => {
  //       if (paramType && paramType.length > 1) {
  //         let prm = new Parameter();
  //         prm.ParamType = paramType;
  //         let returnObject = new Response();

  //         var cache = Cache.getParameter(paramType);
  //         if (cache) {
  //           returnObject.valueList = cache;
  //           response(returnObject);
  //         }
  //         Axios.post(CommonTypes.GetUrlForAPI("core", "getparameter"), {
  //           ParamType: paramType,
  //         })
  //           .then((res) => {
  //             var data = res.data;
  //             if (data && data.length > 0) {
  //               returnObject.valueList = [];

  //               data.forEach((element) => {
  //                 returnObject.valueList.push(element);
  //               });

  //               Cache.setParameter(paramType, returnObject.valueList);
  //             }

  //             response(returnObject);
  //           })
  //           .catch((e) => {
  //             returnObject.success = false;
  //             returnObject.errorMessage = e.toString();
  //             reject(returnObject);
  //           });
  //       } else {
  //         response(new Parameter());
  //       }
  //     });
  //   }

  return returnObject;
}
