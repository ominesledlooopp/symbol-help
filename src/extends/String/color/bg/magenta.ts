export default String.prototype.bg_magenta = function (): string {
  return `\u001b[45m${this}\x1b[0m`;
};
