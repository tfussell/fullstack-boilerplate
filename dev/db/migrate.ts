import chalk from "chalk";
import { exec } from "child_process";
import { log } from "util";
import readlineSync from "readline-sync";

export const execCmd = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }

      if (stdout) {
        log(stdout.trim());
      }

      if (stderr) {
        log(stderr.trim());
      }

      resolve();
    });
  });
};


(async () => {
  const migrationName = readlineSync.question(chalk.blue("Enter a migration name:\n"));
  await execCmd(`yarn typeorm migration:generate --name ${migrationName}`);
})();
