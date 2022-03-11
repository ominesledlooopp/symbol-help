export default String.prototype.blue = function (): string {
  return `\u001b[34m${this}\x1b[0m`;
};
