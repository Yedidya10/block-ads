import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  webExt: {
    disabled: true,
  },
  manifest: {
    name: "Block Ads",
    description: "Block Ads",
    version: "0.0.1",
    host_permissions: ["https://1337x.to/"],
    permissions: ["tabs"],
  },
});
