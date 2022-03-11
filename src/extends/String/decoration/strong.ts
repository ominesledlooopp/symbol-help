export default String.prototype.strong = function (): string {
  return `\u001b[1m${this}\x1b[0m`;
};
