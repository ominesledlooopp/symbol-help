export default String.prototype.bg_cyan = function (): string {
  return `\u001b[46m${this}\x1b[0m`;
};
