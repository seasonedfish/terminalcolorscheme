import { TerminalTheme } from "./terminal_theme.js";
import * as terminal_theme from "./terminal_theme.js";

import fs from "node:fs";

const file = fs.readFileSync("/Users/fisher/Downloads/Cobalt2.toml")
const str = file.toString()
const theme = terminal_theme.fromAlacritty(str)

console.log(theme)
