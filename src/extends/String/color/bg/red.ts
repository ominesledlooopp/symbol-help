export default String.prototype.bg_red = function (): string {
  return `\x1b[41m${this}\x1b[0m`;
};
