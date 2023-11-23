import cac from "cac";
import { createDevServer } from "./dev";
import { build } from "./build";
const path = require("path");

const version = require("../../package.json").version;

const cli = cac("island").version(version).help();

cli
  .command("[root]", "start dev server")
  .alias("dev")
  .action(async (root: string) => {
    console.log("dev", root);

    root = root ? path.resolve(root) : process.cwd();
    const server = await createDevServer(root);
    await server.listen();
    server.printUrls();
  });

cli
  .command("build [root]", "build for production")
  .action(async (root: string) => {
    console.log("build", root);

    try {
      root = path.resolve(root);
      await build(root);
    } catch (error) {
      console.log(error);
    }
  });

cli.parse();
