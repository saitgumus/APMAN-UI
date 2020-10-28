import {CommonTypes} from "../Types/Common";
import {HttpClientServiceInstance} from "./HttpClient";
import Cache from "./Cache";


/*
* kullanıcının yönetiminde olan apartman listesini döndürür
* @param {string} userName
* */
export async function GetApartmentListByManagerUserName(userName = "") {
    let user = JSON.parse(localStorage.getItem("user" || {}))
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

