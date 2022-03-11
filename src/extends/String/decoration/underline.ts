export default String.prototype.underline = function (): string {
  return `\u001b[4m${this}\x1b[0m`;
};
