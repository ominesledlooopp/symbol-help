export default String.prototype.green = function (): string {
  return `\x1b[32m${this}\x1b[0m`;
};
