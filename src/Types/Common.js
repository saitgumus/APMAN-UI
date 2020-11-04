import Messages from "./Messages";

export class CommonTypes {
  static URLaddress = "https://localhost:23163";
  static KafkaHost = "localhost:9092";
  static KafkaTopic = "apmantest";

  /**
   *
   * @param {string} controllerName
   * @param {string} actionName
   */
  static GetUrlForAPI(controllerName, actionName) {
    return this.URLaddress.concat(
      "/api/",
      controllerName.trim(),
      "/",
      actionName.trim()
    );
  }

  static MessageTypes = {
    success: "success",
    error: "error",
    info: "info",
  };

  /**
   * cache keyleri tutulur.
   */
  static CacheKeys = {
    CityList: "CITYLIST",
    CountyList: "COUNTYLIST",
  };

  /**
   * aksiyon isimleri
   */
  static ActionKeys = {
    /**
     * kaydet
     */
    Save: "SAVE",
    /**
     * bilgi getir (listele)
     */
    GetList:"GETLIST",
    /**
     * Temizle
     */
    Clean:"CLEAN",
    /**
     * kapat
     */
    Close:"CLOSE",
    /**
     * düzenle / güncelle
     */
    Edit:"EDIT"
  };

  /**
   * aksiyon tiplerini tutar.
   */
  static ActionTypes = {
    save: "save",
    add: "add",
    delete: "delete",
    info: "info",
    close: "close",
    list:"list"
  };

  /**
   * kaynak tanımları
   */
  static Resources = {
    /**
     * site apartman ekle
     */
    defineSiteApartment: {
      /**
       * DEFAPT
       */
      resourceCode: "DEFAPT",
      actionKeys: [CommonTypes.ActionKeys.Save],
    },
    /**
     * üye tanımlama
     */
    defineMember: {
      resourceCode: "DEFMEM",
      actionKeys: [CommonTypes.ActionKeys.Save],
    },
    /**
     * üye listeleme
     */
    memberList:{
      resourceCode:"DEFLST",
      actionKeys:[CommonTypes.ActionKeys.GetList,CommonTypes.ActionKeys.Edit]
    },
    /**
     * kullanıcı profili
     */
    userProfile:{
      resourceCode:"USRPRF",
      actionKeys:[CommonTypes.ActionKeys.Close]
    }
  };

  /**
   * http response status code
   */
  static ResponseStatusCode = {
    successful: {
      success: 200,
      created: 201,
      accepted: 202,
      nonAuthoritative: 203,
      noContent: 204,
      resetContent: 205,
      partialContent: 206,
    },
    clientError: {
      badRequest: 400,
      unAuthorized: 401,
      paymentRequired: 402,
      forbidden: 403,
      notFound: 404,
      methodNotAllowed: 405,
    },
    serverError: {
      InternalServerError: 500,
      notImplemented: 501,
      badGateway: 502,
      serviceUnavailable: 503,
      gatewayTimeout: 504,
      httpVersionNotSupported: 505,
    },
  };
}

/**
 * aksiyon ismini verir
 * @param key
 * @returns {string}
 */
export function getActionLabel(key) {
  switch (key) {
    case CommonTypes.ActionKeys.Save:
      return Messages.ActionNames.save;
    case CommonTypes.ActionKeys.GetList:
      return Messages.ActionNames.getInfo;
    case CommonTypes.ActionKeys.Edit:
      return Messages.ActionNames.edit;
    case CommonTypes.ActionKeys.Close:
      return Messages.ActionNames.close;
    default:
      return "action";
  }
}
