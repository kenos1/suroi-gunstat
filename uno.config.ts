// uno.config.ts
import { defineConfig } from "unocss";
import { presetWind } from "unocss";

export default defineConfig({
  presets: [presetWind({
    theme: {
      fontFamily: {
        "mono": ["Fira Code", "monospace"]
      }
    }
  })],
});
