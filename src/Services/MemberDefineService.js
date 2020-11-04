import { CommonTypes } from "../Types/Common";
import { HttpClientServiceInstance } from "./HttpClient";
import Cache from "./Cache";
import {Response} from "../Core/Response";
import {MemberUserContract} from "../Models/MemberUserContract";

/*
 * kullanıcının yönetiminde olan apartman listesini döndürür
 * @param {string} userName
 * */
export async function GetApartmentListByManagerUserName(userName = "") {
  let user = JSON.parse(localStorage.getItem("user" || {}));
  let returnData = [];

  let listfromcache = [];
  if (Cache.lru.has("managerapartmentlist")) {
    listfromcache = Cache.lru.get("managerapartmentlist");
    returnData = listfromcache;
  } else if (user.token && user.token.length > 1) {
    await HttpClientServiceInstance.post(
      CommonTypes.GetUrlForAPI("apartment", "getapartmentsbymanager"),
      user
    )
      .then((res) => {
        returnData = res.data;
      })
      .catch((err) => {
        console.log("apartman listesi getirilirken hata oluştu :", err);
      });
  }
  return returnData;
}

/**
 * yeni üye kaydı yapılır.
 * @param {MemberUserContract} memberContract
 */
export async function SaveNewMember(memberContract) {
  if (!memberContract) {
    return;
  }

  let url = CommonTypes.GetUrlForAPI("user", "addmember");
  let response = {};

  await HttpClientServiceInstance.post(url, memberContract)
    .then((res) => {
      if (res.status === 201) {
        console.log("saved new member:", memberContract);
      }
      response = res;
    })
    .catch((e) => {
      console.log("occurred error for add member: ", e);
      response = e;
    });

  return response;
}

/**
 * yöneticinin kontrolündeki kullanıcıları getirir.
 * @param {MemberUserContract} memberContract
 * @returns {Promise<Response>}
 * @constructor
 */
export async function GetMemberListByUserId(memberContract) {
  let response = new Response();
  let member = new MemberUserContract();
  member.apartmentName = memberContract.apartmentName;

  let userlogin = JSON.parse(localStorage.getItem("user"));
  member.userId = userlogin.userId;
  
  if(!member || member.userId < 1){
    response.addResult("Kullanıcı bilginiz alınamadı..");
    return response;
  }
  else {
    await HttpClientServiceInstance.post(
        CommonTypes.GetUrlForAPI("user", "memberlistbyuserid"),
        member
    )
        .then((res) => {
          console.log("getting list member..",res.data);
          response.value = res.data;
        })
        .catch((err) => {
          console.log("üye listesi getirilirken hata oluştu :", err);
          response.addResult("üye listesi getirilemedi...");
        });
    
    return response;
  }
}