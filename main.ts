// exporting to make the functions available.
// Deno hints to put an underscore before the variable deliberately not being used anywhere.
export { default as _fg_black } from './src/extends/String/color/fg/black.ts';
export { default as _fg_color } from './src/extends/String/color/fg/color.ts';
export { default as _fg_cyan } from './src/extends/String/color/fg/cyan.ts';
export { default as _fg_green } from './src/extends/String/color/fg/green.ts';
export { default as _fg_magenta } from './src/extends/String/color/fg/magenta.ts';
export { default as _fg_red } from './src/extends/String/color/fg/red.ts';
export { default as _fg_white } from './src/extends/String/color/fg/white.ts';
export { default as _fg_yellow } from './src/extends/String/color/fg/yellow.ts';
export { default as _bg_black } from './src/extends/String/color/bg/black.ts';
export { default as _bg_color } from './src/extends/String/color/bg/color.ts';
export { default as _bg_cyan } from './src/extends/String/color/bg/cyan.ts';
export { default as _bg_green } from './src/extends/String/color/bg/green.ts';
export { default as _bg_magenta } from './src/extends/String/color/bg/magenta.ts';
export { default as _bg_red } from './src/extends/String/color/bg/red.ts';
export { default as _bg_white } from './src/extends/String/color/bg/white.ts';
export { default as _bg_yellow } from './src/extends/String/color/bg/yellow.ts';
export { default as _strong } from './src/extends/String/decoration/strong.ts';
export { default as _underline } from './src/extends/String/decoration/underline.ts';

// importing the input module.
import { input } from './src/input.ts';

/**
 * _conditional 'if' 'else if'_
 *
 * **no arguments exit with error**
 *
 * **more than one argument exit with error**
 */
if (Deno.args.length === 0) {
  console.error(`
${'symbol-help'.color(20)} ${
    'error -> required at least on argument'.bg_red().color(255)
  }
`);
  Deno.exit(1);
} else if (Deno.args.length > 1) {
  console.error(`
${'symbol-help'.color(20)} ${'error -> too many arguments'.bg_red().color(255)}
`);
  Deno.exit(1);
}

/**
 * Here we get the response from the input module.
 * @type {string | {code: number, error: string}}
 */
const stdout: string | { code: number; error: string } = input(Deno.args[0]);

// simple conditional 'if' to stdout o stderr the response from the input module.
if (typeof stdout === 'string') {
  console.log(stdout);
  Deno.exit(0);
} else {
  console.error(stdout.error);
  Deno.exit(stdout.code);
}
