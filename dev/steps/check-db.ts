import chalk from "chalk";
import { initializeDbConnection } from "../../api/config/postgres";
import { log } from "../utils/log";
import { sleep } from "../utils/sleep";

/**
 * Verifies that PostgreSQL is available
 */
export const checkDb = async () => {
  log(chalk.green("Checking PostgreSQL..."));

  let retry = 0;
  const maxRetries = 10;

  while (retry < maxRetries) {
    try {
      const connection = await initializeDbConnection();
      await connection.close();
      Object.keys(require.cache).forEach((key) => {
        if (key.endsWith("/fullstack-boilerplate/api/config/postgres.ts")) {
          delete require.cache[key];
        }
      });
      log(chalk.greenBright(`✓ PostgreSQL Ready`));
      return;
    } catch {
      // ignore
      retry++;
      await sleep(2000);
    }
  }

  log(chalk.redBright(`☓ PostgreSQL Not Ready`));
};
