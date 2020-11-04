export const StringBuilder = require("string-builder"); 

/**
 * metin değerlerinin doluluğunu kontrol eder.
 * @param {string} text kontrol edilecek metin
 */
export function IsNullOrEmpty(text) {
    return !text || text.length < 1;
}