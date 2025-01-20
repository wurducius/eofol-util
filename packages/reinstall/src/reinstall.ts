import {join} from "node:path";
import {existsAsync, rmAsync} from "@eofol-utils/fs";
import {getLogger} from "@eofol-utils/logger";
import {npmCacheClean, npmInstall} from "./npm";

const LOGLEVEL = 3;
const {info, warn} = getLogger(LOGLEVEL, "reinstall");

const CWD = process.cwd();

const packageLockPath = join(CWD, "package-lock.json");
const nodeModulesPath = join(CWD, "node_modules");

export const rmPackageLock = () =>
    existsAsync(packageLockPath)
        .then((existsResult: boolean) =>
            existsResult ? rmAsync(packageLockPath) : new Promise(() => {
            }),
        )
        .then(() => {
            info("Deleted package-lock.json");
        });

export const rmNodeModules = () =>
    existsAsync(nodeModulesPath)
        .then((existsResult: boolean) =>
            existsResult ? rmAsync(nodeModulesPath) : new Promise(() => {
            }),
        )
        .then(() => {
            info("Deleted node_modules");
        });

export const npmCleanCache = (force?: boolean) => {
    if (force) {
        warn("Forcefully cleaning NPM cache");
    }
    npmCacheClean(force)
};


export const install = (force?: boolean) => {
    if (force) {
        warn("Forcefully installing NPM");
    }
    npmInstall(force)
};

export const reinstall = (
    cleanCache?: boolean,
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
        .then(() => {
                if (cleanCache) {
                    return npmCleanCache(forceCleanCache)
                } else {
                    return new Promise(() => {
                    })
                }
            }
        )
        .then(() => install(forceInstall));
    info("Reinstalled dependencies");
};
