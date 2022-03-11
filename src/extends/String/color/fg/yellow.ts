export default String.prototype.yellow = function (): string {
  return `\u001b[33m${this}\x1b[0m`;
};
