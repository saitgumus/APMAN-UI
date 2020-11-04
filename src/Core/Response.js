/**
 * Response class for the all responses
 */
import {StringBuilder} from "./Helper";

export class Response {
    constructor() {
        this.success = true;
        this.value = {};
        this.results = [];
    }

    /**
     * hata ekler
     * @param message {string}
     * @param severity {number}
     * @param errorCode {string}
     */
    addResult = (message, severity, errorCode = "standart") => {
        if (message && message.length > 0) {
            this.results.push(new Result(errorCode, message, severity))
            if (this.results.length > 0) {
                this.success = false;
            }
        }
    }

    getResultsStringFormat = () => {
        let string = new StringBuilder();

        if (this.results.length > 0) {
            for (let result of this.results) {
                if (result.ErrorMessage.length > 1)
                    string.appendLine(result.ErrorMessage);
            }
        }
        return string.toString();
    }
}

/**
 * the result
 */
class Result {
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
