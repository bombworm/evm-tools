#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { program } from "commander";

import log from "./logger";
import startServer from "./server";

program
  .name("evm-tools")
  .usage("[path-to-artifacts-dir] [options]")
  .option("-p, --port <number>", "specify port to host the frontend")
  .parse(process.argv);

let targetPath;
if (program.args[0]) {
  targetPath = program.args[0];
}
const options = program.opts();

if (targetPath) {
  const artifactPath = path.resolve(targetPath);
  const validPath =
    fs.existsSync(artifactPath) && fs.lstatSync(artifactPath).isDirectory();

  if (!validPath) {
    log.error(`Invalid directory: ${chalk.white(artifactPath)}\n`);
    process.exit(1);
  }

  log.info(`Artifact directory: ${chalk.yellow(artifactPath)}`);
  startServer({
    port: options.port || 3000,
    artifactPath,
  });
} else {
  startServer({
    port: options.port || 3000,
  });
}
