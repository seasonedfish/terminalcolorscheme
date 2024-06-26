import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/main.ts"),
			name: "terminalcolorscheme",
		},
	},
	esbuild: {
		minifyIdentifiers: false,
		keepNames: true,
	},
	plugins: [dts({
		rollupTypes: true,
	})],
})