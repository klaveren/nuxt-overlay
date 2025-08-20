import NuxtOverlayComponent from "..";

export default defineNuxtConfig({
  devServer: {
    port: 3100,
  },
  compatibilityDate: "2025-08-19",
  modules: [NuxtOverlayComponent],

  vite: {
    server: {
      // Prevent Vite FS allowlist errors when importing from sibling repos during local dev
      fs: {
        // allow: [
        //   "..",
        //   "./",
        //   process.cwd(),
        //   "/Volumes/SSD-02/Dev/repositories",
        // ],
        strict: false,
      },
    },
  },
  nitro: {
    // Nitro options
  },
});
