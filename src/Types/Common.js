export class CommonTypes {
  static URLaddress = "https://localhost:23163";

  /**
   *
   * @param {controller} controllerName
   * @param {action} actionName
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
}
