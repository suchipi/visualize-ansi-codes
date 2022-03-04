import { test, expect, beforeAll } from "vitest";
import kleur from "kleur";
import { visualizeAnsiCodes, defaultCodes } from ".";

beforeAll(() => {
  kleur.enabled = true;
});

test("defaultCodes", () => {
  expect(defaultCodes).toMatchInlineSnapshot(`
    {
      "[0m": "<reset>",
      "[1m": "<bold>",
      "[22m": "<resetBold>",
      "[24m": "<resetUnderline>",
      "[27m": "<resetReversed>",
      "[30;1m": "<brightBlack>",
      "[30m": "<black>",
      "[31;1m": "<brightRed>",
      "[31m": "<red>",
      "[32;1m": "<brightGreen>",
      "[32m": "<green>",
      "[33;1m": "<brightYellow>",
      "[33m": "<yellow>",
      "[34;1m": "<brightBlue>",
      "[34m": "<blue>",
      "[35;1m": "<brightMagenta>",
      "[35m": "<magenta>",
      "[36;1m": "<brightCyan>",
      "[36m": "<cyan>",
      "[37;1m": "<brightWhite>",
      "[37m": "<white>",
      "[39m": "<resetColor>",
      "[40m": "<bgBlack>",
      "[41m": "<bgRed>",
      "[42m": "<bgGreen>",
      "[43m": "<bgYellow>",
      "[44m": "<bgBlue>",
      "[45m": "<bgMagenta>",
      "[46m": "<bgCyan>",
      "[47m": "<bgWhite>",
      "[49m": "<resetBg>",
      "[4m": "<underline>",
      "[7m": "<reversed>",
    }
  `);
});

test("visualizeAnsiCodes 1", () => {
  const input = "\u001b[32mhello\u001b[39m";
  const output = visualizeAnsiCodes(input);
  expect(output).toMatchInlineSnapshot('"<green>hello<resetColor>"');
});

test("visualizeAnsiCodes 2", () => {
  const input = "\u001b[32mhello\u001b[39m";
  const output = visualizeAnsiCodes(input, {
    "\u001b[32m": "[GREEN]",
    "\u001b[39m": "[RESET]",
  });
  expect(output).toMatchInlineSnapshot('"[GREEN]hello[RESET]"');
});

test("visualizeAnsiCodes 3", () => {
  const input = "\u001b[32mhello\u001b[39m";
  const output = visualizeAnsiCodes(input, {
    ...defaultCodes,
    "\u001b[32m": "[GREEN]",
  });
  expect(output).toMatchInlineSnapshot('"[GREEN]hello<resetColor>"');
});

test("with kleur", () => {
  expect(visualizeAnsiCodes(kleur.green("hi"))).toMatchInlineSnapshot(
    '"<green>hi<resetColor>"'
  );

  expect(visualizeAnsiCodes(kleur.bgBlack("hi"))).toMatchInlineSnapshot(
    '"<bgBlack>hi<resetBg>"'
  );

  expect(visualizeAnsiCodes(kleur.inverse("hi"))).toMatchInlineSnapshot(
    '"<reversed>hi<resetReversed>"'
  );

  expect(visualizeAnsiCodes(kleur.underline("hi"))).toMatchInlineSnapshot(
    '"<underline>hi<resetUnderline>"'
  );

  expect(visualizeAnsiCodes(kleur.bold("hi"))).toMatchInlineSnapshot(
    '"<bold>hi<resetBold>"'
  );

  expect(
    visualizeAnsiCodes(kleur.bgBlack().green().underline("hi"))
  ).toMatchInlineSnapshot('"<bgBlack><green><underline>hi<resetBg><resetColor><resetUnderline>"');
});
