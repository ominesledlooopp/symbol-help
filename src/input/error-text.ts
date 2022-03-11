/**
 * **Text for error property.**
 *
 * @param {string} args - Deno.args[0]
 * @returns {string} - formatted and decorated text.
 */
export function error_text(args: string): string {
  return `
  ${'help for the flag'.red()} ~${
    args.color(255).bg_red()
  }~ ${'not found'.red()}
  
  usage -> ${'symbol-help'.color(20).bg_color(254)}${
    ' init'.color(33).bg_color(254)
  }
  
  ${'available topics:'.color(255).bg_green()}
  
    - help
    - init
`;
}
