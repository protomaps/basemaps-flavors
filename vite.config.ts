import fs from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

const flavorList = () => {
  const contentDir = path.resolve(__dirname, "flavors");
  const files = fs.readdirSync(contentDir);
  return files.filter((f) => f.endsWith(".ts")).map((f) => f.slice(0, -3));
};

const flavorBody = async (name: string) => {
  return (await import(`./flavors/${name}.ts`)).default;
};

export default defineConfig({
  plugins: [
    {
      name: "basemaps-flavors",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === "/flavors.json") {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(flavorList()));
            return;
          }
          if (req.url?.startsWith("/flavors/")) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(await flavorBody(req.url.slice(9, -5))));
            return;
          }
          next();
        });
      },
      async generateBundle() {
        const flist = flavorList();
        const dir = path.resolve(__dirname, "dist", "flavors");
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(
          path.resolve(__dirname, "dist", "flavors.json"),
          JSON.stringify(flist, null, 2),
        );
        for (const name of flist) {
          fs.writeFileSync(
            path.resolve(__dirname, "dist", "flavors", `${name}.json`),
            JSON.stringify(await flavorBody(name), null, 2),
          );
        }
      },
    },
    solid(),
    tailwindcss(),
  ],
});
