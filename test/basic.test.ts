import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

await setup({
  rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
  server: true,
});

describe("ssr", () => {
  it("renders the index page", async () => {
    const html = await $fetch("/");
    expect(html).toContain("<div>basic</div>");
  });
});
