/**
 * The default escape code map used by `visualizeAnsiCodes` (an export from "visualize-ansi-codes").
 */
const defaultCodes = {
  "\x1B[30m": "<black>",
  "\x1B[31m": "<red>",
  "\x1B[32m": "<green>",
  "\x1B[33m": "<yellow>",
  "\x1B[34m": "<blue>",
  "\x1B[35m": "<magenta>",
  "\x1B[36m": "<cyan>",
  "\x1B[37m": "<white>",

  "\x1B[30;1m": "<brightBlack>",
  "\x1B[31;1m": "<brightRed>",
  "\x1B[32;1m": "<brightGreen>",
  "\x1B[33;1m": "<brightYellow>",
  "\x1B[34;1m": "<brightBlue>",
  "\x1B[35;1m": "<brightMagenta>",
  "\x1B[36;1m": "<brightCyan>",
  "\x1B[37;1m": "<brightWhite>",

  "\x1B[40m": "<bgBlack>",
  "\x1B[41m": "<bgRed>",
  "\x1B[42m": "<bgGreen>",
  "\x1B[43m": "<bgYellow>",
  "\x1B[44m": "<bgBlue>",
  "\x1B[45m": "<bgMagenta>",
  "\x1B[46m": "<bgCyan>",
  "\x1B[47m": "<bgWhite>",

  "\x1B[1m": "<bold>",
  "\x1B[4m": "<underline>",
  "\x1B[7m": "<reversed>",

  "\x1B[0m": "<reset>",
  "\x1B[39m": "<resetColor>",
  "\x1B[49m": "<resetBg>",
  "\x1B[27m": "<resetReversed>",
  "\x1B[24m": "<resetUnderline>",
  "\x1B[22m": "<resetBold>",
};

function escapeRegex(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

/**
 * Replace ANSI escape codes in `str` with replacements,
 * as specified in `codes` (or defaultCodes).
 *
 * @param {string} str The string to replace stuff in.
 * @param {any} codes An object map where the keys are escape code strings and the values are their replacement strings. If not present, `defaultCodes` (an export from "visualize-ansi-codes") will be used.
 * @returns {string} The string with replacements applied.
 */
function visualizeAnsiCodes(str, codes = defaultCodes) {
  let out = str;

  for (const [key, value] of Object.entries(codes)) {
    out = out.replace(new RegExp(escapeRegex(key), "g"), value);
  }

  return out;
}

module.exports = {
  visualizeAnsiCodes,
  defaultCodes,
};
