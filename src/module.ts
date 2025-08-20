import {
  defineNuxtModule,
  addComponent,
  addImports,
  addPlugin,
  addTemplate,
  createResolver,
} from "@nuxt/kit";
import { name, version } from "../package.json";

export default defineNuxtModule({
  meta: {
    name,
    version,
    compatibility: {
      nuxt: "^3.0.0 || ^4.0.0",
    },
  },

  hooks: {},
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    // expose the options to nuxt
    nuxt.options.css.push(resolve("./runtime/styles.css"));
    // removed nuxt-config-schema integration

    // add composables
    addImports({
      name: "useNuxtOverlay",
      as: "useNuxtOverlay",
      from: resolve("./runtime/composables"),
    });

    // add plugins
    addPlugin(resolve("./runtime/plugins"));

    // add components
    addComponent({
      name: "NuxtOverlay",
      global: true,
      filePath: resolve("./runtime/components/NuxtOverlay.vue"),
    });

    // provide type augmentations to consumer app
    const typeTemplate = addTemplate({
      filename: "types/nuxt-overlay.d.ts",
      getContents: () => `
declare module '#app' {
  interface NuxtApp {
    $overlay: import('${resolve("./runtime/composables")}').INuxtOverlay
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $overlay: import('${resolve("./runtime/composables")}').INuxtOverlay
  }
}

export {}
`,
    });

    nuxt.hook("prepare:types", (opts) => {
      opts.references.push({ path: typeTemplate.dst });
    });
  },
});
