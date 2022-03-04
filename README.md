# visualize-ansi-codes

> Replace ansi escape sequences with tokens indicating what they are.

## Usage

```js
const { visualizeAnsiCodes, defaultCodes } = require("visualize-ansi-codes");

const input = "\u001b[32mhello\u001b[39m";
const output = visualizeAnsiCodes(input);

console.log(output); // <green>hello<reset>

// To change the tokens or add other escape sequences, pass in a different codes map:

const input2 = "\u001b[32mhello\u001b[39m";
const output2 = visualizeAnsiCodes(input2, {
  "\u001b[32m": "[GREEN]",
  "\u001b[39m": "[RESET]",
});

console.log(output2); // [GREEN]hello[RESET]

// It may be useful to base your codes object on the default code object:
const input3 = "\u001b[32mhello\u001b[39m";
const output3 = visualizeAnsiCodes(input3, {
  ...defaultCodes,
  "\u001b[32m": "[GREEN]",
});

console.log(output3); // [GREEN]hello<reset>
```

## License

MIT
