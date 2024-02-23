import TerminalTheme from "./TerminalTheme.js";
import fs from "node:fs";

const file = fs.readFileSync("/Users/fisher/Downloads/Cobalt2.toml")
const str = file.toString()
const theme = TerminalTheme.fromAlacritty(str)

console.log(theme)
