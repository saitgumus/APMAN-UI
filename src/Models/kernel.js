export class Response {
  success = false;
  errorMessage = "";
  results = [{}];
  value = {};
  valueList = [{}];

  constructor(isSuccess = true, errorMessage = "") {
    this.success = isSuccess;
    this.errorMessage = errorMessage;
  }
}
