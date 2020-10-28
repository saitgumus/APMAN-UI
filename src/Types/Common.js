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
    GetList:"GETLIST"
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
     * üye ekle
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
      actionKeys:[CommonTypes.ActionKeys.GetList]
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

export function getActionLabel(key) {
  switch (key) {
    case CommonTypes.ActionKeys.Save:
      return Messages.ActionNames.save;
    default:
      return "action";
  }
}
