export default String.prototype.magenta = function (): string {
  return `\u001b[35m${this}\x1b[0m`;
};
