import { error_text } from './input/error-text.ts';
import symbol_help from './symbol-help.ts';

/**
 * Gets the Deno.args[0] ad returns string from symbol_help module.
 * If it does not find the symbol return an object {code:number, error: string}
 * @param {string} args - Deno.args[0] argument
 * @returns {string|{code:number, error:string}}
 */
export function input(args: string): string | { code: number; error: string } {
  // found Symbol property return the text.
  return symbol_help[Symbol.for(args)] ||
    // if no Symbol property is found return the error.
    {
      code: 1,
      error: error_text(args),
    };
}
