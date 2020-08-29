export class Response {
  success = false;
  errorMessage = "";
  results = [{}];
  value = {};
  valueList = [{}];

  constructor() {
    this.success = true;
  }
}
