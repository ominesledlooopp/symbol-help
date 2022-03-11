/**
 * 256 background color. not all the shells are compatible.
 *
 * @param {number=}code - range from 0-255.
 * @returns {string}
 */
export default String.prototype.bg_color = function (code?: number): string {
  // 'code' undefined returns black.
  const _code: number = code || 0;
  return `\u001b[48;5;${_code}m${this}\x1b[0m`;
};
