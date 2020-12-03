import { getDateIsoDate} from "../Types/Common";
import Alertify from "alertifyjs";

export const StringBuilder = require("string-builder"); 

/**
 * metin değerlerinin doluluğunu kontrol eder.
 * undefined veya boş ise true döner.
 * @param {string} text kontrol edilecek metin
 */
export function IsNullOrEmpty(text) {
    return !(text && text.length > 0);
}

/**
 * obj eğer geçerli bir obje ise true döner.
 * @param obj
 * @returns {boolean}
 * @constructor
 */
export function IsValidObject(obj) {
    return !!(obj && typeof obj === 'object');
}

/**
 * girilen değer geçersiz ise -1 döner.
 * geçerli ise değeri int oalarak döner
 * @param value
 * @returns {number}
 * @constructor
 */
export function GetIntValue(value) {
    if(value && typeof value === 'number'){
        return parseInt(value);
    }
    if(value && typeof value === 'string'){
        let val = -1;
        try {
            val = parseInt(value);
            return val;
        }
        catch (e) {
            return -1;
        }
    }
    else return -1;
}

/**
 * tarih kontrolü yapar.
 * eğer bugünden küçük veya geçersiz ise false döner.
 * @param value
 * @returns {boolean}
 * @constructor
 */
export function DateControlOlderToday(value) {
    // eslint-disable-next-line valid-typeof
 if(value && typeof value === 'date'){
     let date = getDateIsoDate();
     return value >= date;
     
 }
 return false;
}

/**
 * eğer item1 < item2 ise ve tarihler geçerli ise true döner
 * @param item1
 * @param item2
 * @returns {boolean}
 * @constructor
 */
export function IsBiggerDate(item1,item2) {
    // eslint-disable-next-line valid-typeof
    if(item1 && typeof item1 === 'date' && item2 && typeof item2 === 'date'){
        return (item1 <= item2)
    }
    return false;
}

/**
 * is value -1 ? true:
 * @param value
 * @returns {boolean}
 * @constructor
 */
export function IsInvalidIndex(value) {
    return (value === -1);
}

/**
 * returned login user
 * @returns {any}
 * @constructor
 */
export function GetActiveLocalUser() {
    return JSON.parse(localStorage.getItem("user" || {}));
}

/**
 * returned message
 * @param propertyName
 * @constructor
 */
export function GetMessage(propertyName) {
    if(propertyName){
        //mesaj servisi oluşturulacak.
    }
}

//#region status messages

/**
 * status'ta hata mesajı gösterir.
 * @param message
 * @constructor
 */
export function ShowStatusError(message) {
 Alertify.error(message);
}
/**
 * status'ta bilgi mesajı gösterir.
 * @param message
 * @constructor
 */
export function ShowStatusInfo(message) {
    Alertify.notify(message);
}
/**
 * status'ta başarılı mesajı gösterir.
 * @param message
 * @constructor
 */
export function ShowStatusSuccess(message) {
    Alertify.success(message);
}
/**
 * status'ta uyarı mesajı gösterir.
 * @param message
 * @constructor
 */
export function ShowStatusWarning(message) {
    Alertify.warning(message);
}
//#endregion