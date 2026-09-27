import { defineConfig } from "tsup";
import packageJson from "./package.json";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"],
    sourcemap: true,
    dts:false,
    clean: true,

    external: [
        "react",
        "react-dom",
    ],
    
});