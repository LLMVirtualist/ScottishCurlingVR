import { defineConfig } from "vite";

import { join, parse, resolve } from "path";

// import basicSsl from "@vitejs/plugin-basic-ssl";

// uncomment to debug Oculus over network (enable SSL)
export default defineConfig({
  // plugins: [basicSsl()],
  server: {
    // host: true,
    // https: true,
  },
  build: {
    rollupOptions: {
      input: entryPoints(
        "index.html",
        "start.html",
        "level1.html",
        "level2.html"
      ),
    },
  },
});

function entryPoints(...paths) {
  const entries = paths.map(parse).map((entry) => {
    const { dir, base, name } = entry;
    const key = join(dir, name);
    const path = resolve(__dirname, dir, base);
    return [key, path];
  });

  const config = Object.fromEntries(entries);
  return config;
}
