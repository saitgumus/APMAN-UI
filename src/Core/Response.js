/**
 * Response class for the all responses
 */
export class Response {
  constructor() {
    this.success = true;
    this.value = {};
    this.Results = [];
  }
}

/**
 * the result
 */
export class Result {
  constructor(code, message, severity) {
    this.ErrorCode = code;
    this.ErrorMessage = message;
    this.Severity = severity;
  }
}

/**
 * hata seviyeleri
 */
export const Severity = {
  Low: 1,
  High: 2,
};
