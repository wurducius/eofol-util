const {existsAsync, writeAsync, join, mkdirAsync} = require("@eofol-utils/fs")
import { execCmd} from "@eofol-utils/misc"

const writeIdempotent = (pathname, content) => {
    existsAsync(pathname).then((existsResult) => {
        if (!existsResult) {
            return writeAsync(pathname, content)
        } else {
            return new Promise(() => {
            })
        }
    })
}

const mkdirIdempotent = (pathname) => {
    existsAsync(pathname).then((existsResult) => {
        if (!existsResult) {
            return mkdirAsync(pathname)
        } else {
            return new Promise(() => {
            })
        }
    })
}

const CWD = process.cwd()

const init = (gitUrlImpl, imageNameImpl, portImpl, workDirImpl) => {
    const split = gitUrlImpl.split("/")
    const projectName = split[split.length - 1]

    mkdirIdempotent(join(CWD, workDirImpl))

    writeIdempotent(join(CWD, workDirImpl, "docker-start.sh"), `#!/bin/bash
echo "${projectName} Docker test"
echo "[1/3] Cloning ${projectName}..."
git clone ${gitUrlImpl}
cd ${projectName}
rm ./package-lock.json
echo "[2/3] Installing ${projectName}..."
npm i
echo "[3/3] Running ${projectName}..."
npm start
`)

    writeIdempotent(join(CWD, workDirImpl, "docker-stop.sh"), `#!/bin/bash
RUNNING=$(docker ps -q -f ancestor=${imageNameImpl})
COUNT=$\{#RUNNING}
if [ $((COUNT)) != 0 ]; then
docker rm $(docker stop $RUNNING) > /dev/null
fi
`)

    writeIdempotent(join(CWD, workDirImpl, "Dockerfile"), `FROM node:latest
COPY docker-start.sh .
CMD ["./docker-start.sh"]
EXPOSE ${portImpl}`)
}

const dockerBuild = (imageNameImpl, workDirImpl) => {
    execCmd("docker", ["build", "-t", imageNameImpl, workDirImpl])
}

const dockerRun = (portImpl, workDirImpl) => {
    execCmd("docker", ["run", "-p", `${portImpl}:${portImpl}`, workDirImpl])
}

const dockerStop = (portImpl, workDirImpl) => {
    execCmd("bash", [join(CWD, workDirImpl, "docker-stop.sh")])
}

const dockerStart = (
    gitUrl,
    imageName,
    port,
) => {
    const gitUrlImpl = gitUrl ?? "https://github.com/wurducius/eofol5"
    const imageNameImpl = imageName ?? "eofol5-test"
    const portImpl = port ?? 3000
    const workDirImpl = "./docker"

    init(gitUrlImpl, imageNameImpl, portImpl, workDirImpl)
    dockerBuild(imageNameImpl, workDirImpl)
    dockerRun(portImpl, workDirImpl)


};

module.exports = {dockerBuild, dockerRun, dockerStop, dockerStart}