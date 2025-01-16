import { join } from "node:path";
import { spawn, exec } from "child_process";
import { existsAsync, rmAsync } from "@eofol-util/fs";
import { getLogger } from "@eofol-util/logger";

const LOGLEVEL = 3;
const { info, warn, error } = getLogger(LOGLEVEL, "NPM");

// @TODO extract to command line util
const spawnOptions = {
  encoding: "utf8",
  cwd: process.cwd(),
  env: process.env,
  shell: process.platform === "win32",
  stdio: "inherit",
};

const CWD = process.cwd();

const packageLockPath = join(CWD, "package-lock.json");
const nodeModulesPath = join(CWD, "node_modules");

export const rmPackageLock = () =>
  existsAsync(packageLockPath)
    .then((existsResult: boolean) =>
      existsResult ? rmAsync(packageLockPath) : new Promise(() => {}),
    )
    .then(() => {
      info("Deleted package-lock.json");
    });

export const rmNodeModules = () =>
  existsAsync(nodeModulesPath)
    .then((existsResult: boolean) =>
      existsResult ? rmAsync(nodeModulesPath) : new Promise(() => {}),
    )
    .then(() => {
      info("Deleted node_modules");
    });

export const cleanNPMCache = (force?: boolean) => {
  if (force) {
    warn("Forcefully cleaning NPM cache");
  }
  const cleaning = exec(`npm cache clean${force ? " --force" : ""}`);
  cleaning.on("error", (data) => {
    error(data.message);
  });
  cleaning.on("close", () => {
    info("Cleaned forcefully npm cache");
  });
};

export const install = (force?: boolean) => {
  if (force) {
    warn("Forcefully installing NPM");
  }
  const installing = spawn(
    "npm",
    (["i", force && "--force"] as string[]).filter(Boolean),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    spawnOptions,
  );
  installing.on("error", (data) => {
    error(data.message);
  });
  installing.on("close", () => {
    process.exit(0);
    info("Installed dependencies");
  });
};

export const reinstall = (
  forceCleanCache?: boolean,
  forceInstall?: boolean,
) => {
  if (forceCleanCache) {
    warn("Forcefully cleaning cache when reinstalling NPM");
  }
  if (forceInstall) {
    warn("Forcefully installing when reinstalling NPM");
  }
  rmPackageLock()
    .then(rmNodeModules)
    .then(() => cleanNPMCache(forceCleanCache))
    .then(() => install(forceInstall));
  info("Reinstalled dependencies");
};
