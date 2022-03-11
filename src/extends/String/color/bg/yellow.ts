export default String.prototype.bg_yellow = function (): string {
  return `\u001b[43m${this}\x1b[0m`;
};
