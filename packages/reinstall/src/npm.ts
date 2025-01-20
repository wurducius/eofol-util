import {spawnOptions,execCmd} from "@eofol-utils/misc"

const LOGLEVEL = 3;
const {info} = getLogger(LOGLEVEL, "npm-scripts");

const execNpm = (args, successMsg) => execCmd("npm", args, () => {
    if (successMsg) {
        info(successMsg);
    }
})


export const npmInstall = (force?: boolean) => execNpm(["i", force && "--force"], "Installed dependencies")


export const npmCacheClean = (force?: boolean) => {
    const cleaning = exec(`npm cache clean${force ? " --force" : ""}`);
    cleaning.on("error", (data) => {
        error(data.message);
    });
    cleaning.on("close", () => {
        info("Cleaned forcefully npm cache");
    });
}

export const npmStart = () => execNpm("start")

export const npmRun = (args) => execNpm(["run", ...args])

export const npmTest = (args) => execNpm(["test", ...args])

export const npmLogin = () => execNpm("login")

export const npmLogout = execNpm("logout")

export const npmPublish = execNpm("publish")

export const npmPublishWorkspaces = () => execNpm(["publish", "--workspaces"])

export const npmUpdate = () => execNpm("update")

export const npmAudit = (force?: boolean) => execNpm(["audit", force && "--force"])

export const npx = (args) => execCmd("npx", args)
