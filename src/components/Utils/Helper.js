/**
 * metin değerlerinin doluluğunu kontrol eder.
 * @param {string} text kontrol edilecek metin
 */
export function IsNullOrEmpty(text) {
  if (!text || text.length < 1) {
    return true;
  }
  return false;
}

/**
 * string builder
 */
export function StringBuilder() {
  let values = [];

  return {
    append: function (value) {
      values.push(value);
    },
    toString: function () {
      return values.join("");
    },
  };
}
