import {readDirAsync,isDirectory,join,cpAsync } from "@eofol-util/fs"

// publicDir result from promise is VIEWS (internal)
export const copyPublicFiles = (buildPath, projectPath, doNotSkipHtml) =>
    readDirAsync(projectPath, { recursive: true }).then((publicDir) =>
    Promise.all(
        publicDir
            .filter((publicFile) => (doNotSkipHtml || !publicFile.endsWith(".html")) && !isDirectory(join(projectPath, publicFile)))
            .map((publicFile) => cpAsync(join(projectPath, publicFile), join(buildPath, publicFile))),
    ))
