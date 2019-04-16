import chalk from "chalk";
import http from "http";
import minimatch from "minimatch";
import { log } from "../utils/log";

let server: http.Server | undefined;

/**
 * Starts API server
 */
export const startApi = async () => {
  if (server) {
    log(chalk.red("Stopping API server..."));
    server.close();
    log(chalk.redBright("API server stopped"));
  }

  server = undefined;

  Object.keys(require.cache).forEach((key) => {
    if (key.endsWith("/fullstack-boilerplate/api/config/postgres.ts")) {
      return;
    }
    if (minimatch(key, "*.ts", { matchBase: true })) {
      delete require.cache[key];
    }
  });

  server = await require("../../api/server").server();
};
