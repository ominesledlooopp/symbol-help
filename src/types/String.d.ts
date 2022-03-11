/**
 * _Types definitions for String built-in Javascript Object._
 * @file ./src/types/String.d.ts
 * **this file will be loaded by Deno from deno.json configuration file before compiling main.ts**
 */
interface String {
  // foregrounds
  color(code?: number): string;
  black(): string;
  blue(): string;
  cyan(): string;
  green(): string;
  magenta(): string;
  red(): string;
  white(): string;
  yellow(): string;
  // backgrounds
  bg_color(code?: number): string;
  bg_black(): string;
  bg_blue(): string;
  bg_cyan(): string;
  bg_green(): string;
  bg_magenta(): string;
  bg_red(): string;
  bg_white(): string;
  bg_yellow(): string;
  // decorations
  strong(): string;
  underline(): string;
}
