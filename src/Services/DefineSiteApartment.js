//import Parameter from "../Models/Parameter";
import Axios from "axios";
import { CommonTypes } from "../Types/Common";
import { Response, Result, Severity } from "../Core/Response";
//import Cache from "./Cache";

/**
 * site/apartman kaydı yapılır.
 * return {Response}
 * @param {object} siteApartmentContract
 */
export async function DefineSiteApartmentService(siteApartmentContract) {
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
      console.log("defined new apartment.");
      returnObject.success = true;
    }
  });

  return returnObject;
}
