import {
  defineNuxtModule,
  addComponent,
  addImports,
  addPlugin,
  createResolver,
  installModule,
} from "@nuxt/kit";
import { name, version } from "../package.json";
import type { ModuleOptions } from "./runtime/types";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    compatibility: {
      nuxt: "^3.0.0",
    },
  },

  hooks: {},
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    // expose the options to nuxt
    nuxt.options.css.push(resolve("./runtime/styles.css"));
    nuxt.hook("schema:extend", (schemas) => {
      schemas.push({
        appConfig: {
          nuxtOverlay: {
            $schema: {
              title: "Nuxt Overlay",
              description: "Configure the defaults of Nuxt Overlay",
            },
            queueName: {
              $default: "default",
              $schema: {
                title: "Queue Name",
                description:
                  "Set the default queue name. You can create many queues at once and treat them as separate habilities",
                tags: ["@klaveren"],
                tsType: "string",
              },
            },
            position: {
              $default: "top-center",
              $schema: {
                title: "The position of the overlay",
                description:
                  "Choose the position available top-center top-left top-right center center-left center-right bottom-left bottom-right bottom-center",
                tags: ["@klaveren"],
                tsType: "string",
              },
            },
            closeOnClick: {
              $default: true,
              $schema: {
                title: "OnClick close the overlay",
                description: "Enable/Disable to close the overlay on click",
                tags: ["@klaveren"],
                tsType: "boolean",
              },
            },
            duration: {
              $default: 5000,
              $schema: {
                title: "Auto close overlay",
                description:
                  "Set timeout for auto close overlay in milliseconds, if number is negative | undefined or false auto close will be ignored",
                tags: ["@klaveren"],
                tsType: "number | boolean | undefined",
              },
            },
          },
        },
      });
    });

    installModule("nuxt-config-schema");

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
  },
});
