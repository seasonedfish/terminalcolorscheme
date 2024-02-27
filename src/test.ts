import TerminalTheme from "./TerminalTheme.js";
import * as terminalTheme from "./TerminalTheme.js";

import fs from "node:fs";

const file = fs.readFileSync("/Users/fisher/Downloads/Cobalt2.toml")
const str = file.toString()
const theme = terminalTheme.fromAlacritty(str)

console.log(theme)
