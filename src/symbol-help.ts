import { help_text } from './symbol-help/help-text.ts';
import { init_text } from './symbol-help/init-text.ts';

const symbol_help = Object.create(null, {
  [Symbol.for('help')]: {
    enumerable: true,
    value: help_text,
  },
  [Symbol.for('init')]: {
    enumerable: true,
    value: init_text,
  },
});

export default symbol_help;
