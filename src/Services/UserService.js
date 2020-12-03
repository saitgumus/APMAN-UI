import { CommonTypes } from "../Types/Common";
import { HttpClientServiceInstance } from "./HttpClient";
import Cache from "./Cache";
import { Response, Severity } from "../Core/Response";
import { InboxmessageContract } from "../Models/InboxMessageContract";
import User from "../Models/User";

/**
 * login the user
 * @param userContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function LoginUser(userContract) {
  let response = new Response();
  let contract = userContract;
  let url = CommonTypes.GetUrlForAPI("user", "login");

  await HttpClientServiceInstance.post(url, contract)
    .then((res) => {
      if (res.data.success) {
        let userData = res.data.value.userDefinitionContract;

        let user = new User();
        user.userId = userData.userId;
        user.email = userData.email;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.userName = userData.userName;

        user.token = res.data.value.accessToken.token;
        user.expiration = res.data.value.accessToken.expiration;

        user.inboxNotificationCount = userData.inboxNotificationCount;
        user.generalNotificationCount = 0; //doldurulacak - sunucu tarafı null

        //resources
        user.resourceActionList = res.data.value.resourceActions;

        localStorage.setItem("user", JSON.stringify(user));
        HttpClientServiceInstance.setTokenOnLogin(user.token);

        response.value = user;
        SetUserResources(user.resourceActionList);
      } else {
        response.addCoreResults(res.data.results);
      }
    })
    .catch((e) => {
      response.addResult(e.message, Severity.High, "login");
    });
  return response;
}

/**
 * gelen kutusu bilgilerini getirir.
 * @param inboxmessageContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function GetUserInboxList(inboxmessageContract) {
  let response = new Response();
  let inboxContract = new InboxmessageContract();
  inboxContract = inboxmessageContract;

  if (inboxContract.receiverUserId > 0) {
    await HttpClientServiceInstance.post(
      CommonTypes.GetUrlForAPI("user", "getusermessages"),
      inboxContract
    )
      .then((res) => {
        response.value = res.data;
        console.log("inbox data:", response.value);
      })
      .catch((err) => {
        response.addResult("mesajlar getirilemedi.", Severity.High, "server");
      });
  } else {
    response.addResult(
      "üye id bilgisi alınamadı",
      Severity.Low,
      "null parameter"
    );
  }

  return response;
}

/**
 *
 * @returns {Promise<void>}
 * @param inboxId
 */
export async function updateMessageStatusForReaded(inboxId) {
  let response = new Response();
  let inboxContract = new InboxmessageContract();
  inboxContract.inboxId = inboxId;

  if (inboxContract.inboxId > 0) {
    await HttpClientServiceInstance.post(
      CommonTypes.GetUrlForAPI("user", "updatemessagestatus"),
      inboxContract
    )
      .then((res) => {
        response.value = res.data;
        console.log("message status updated");
      })
      .catch((err) => {
        response.addResult("mesajlar getirilemedi.", Severity.High, "server");
      });
  } else {
    response.addResult(
      "mesaj id bilgisi alınamadı",
      Severity.Low,
      "null parameter"
    );
  }

  return response;
}

function SetUserResources(resourceActions) {
  if (resourceActions && resourceActions.length > 0) {
    // var s = {
    //     parentCode:'',
    //     parentName:'',
    //     resources=[{
    //         resourceCode:'',
    //         resourceName:'',
    //         Actions:[{
    //
    //         }]
    //     }]
    // }
    let resourceList = [];

    for (let item of resourceActions) {
      //parent yoksa eklenir.
      if (!resourceList.find((x) => x.parentCode === item.parentCode)) {
        let tmpRes = {};
        tmpRes.parentCode = item.parentCode;
        tmpRes.parentName = item.parentName;
        tmpRes.resources = [];
        tmpRes.resources.Actions = [];
        resourceList.push(tmpRes);
      }

      let ind = resourceList.findIndex((r) => r.parentCode === item.parentCode);
      // let tmpR = resourceList[ind].Resources.find(val => val.resourceCode === item.resourceCode);

      //ekran eklenmemişse eklenir.
      if (
        !resourceList[ind].resources.find(
          (val) => val.resourceCode === item.resourceCode
        )
      ) {
        let resourceSub = {
          resourceCode: item.resourceCode,
          name: item.name,
          iconKey: item.iconKey,
          path: item.path,
          actions: [],
        };
        resourceList[ind].resources.push(resourceSub);
      }

      //aksiyon eklenmemişse eklenir
      if (
        resourceList[ind].resources.find(
          (val) => val.resourceCode === item.resourceCode
        ) &&
        !resourceList[ind].resources
          .find((val) => val.resourceCode === item.resourceCode)
          .actions.find((r) => r.actionKey === item.actionKey)
      ) {
        let act = {
          actionName: item.actionName,
          actionKey: item.actionKey,
        };
        resourceList[ind].resources
          .find((val) => val.resourceCode === item.resourceCode)
          .actions.push(act);
      }
    }
    Cache.overrideItem("resources", resourceList);
  }
}
