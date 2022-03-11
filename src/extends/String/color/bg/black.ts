export default String.prototype.bg_black = function (): string {
  return `\u001b[40m${this}\x1b[0m`;
};
