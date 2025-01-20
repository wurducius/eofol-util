import {prettySize} from "@eofol-utils/dev-tools"
import {resolve, stat} from "@eofol-utils/fs"

// @TODO proofead this script!

// @TODO finish
const getVIEWS = () => []

// @TODO Do we need this
const SERVICE_WORKER_PAGES_PLACEHOLDER = '"@@VIEWS@@"'

const PLUGIN_INTERNAL = {
    DEPENDENCIES: "assets/js/dependencies.js",
    EOFOL: "assets/js/eofol.js",
    RUNTIME: "assets/js/runtime.js",
}

const getAsset = ({asset, nextSource, nextSize, nextInfo}) => {
    const map = asset ? asset.map() : null
    return {
        source: () => nextSource,
        map: () => map,
        sourceAndMap: () => ({
            source: nextSource,
            map,
        }),
        size: () => nextSize,
        info: nextInfo,
    }
}

const addAsset = (compilation) => (name, content, info) => {
    compilation.assets[name] = getAsset({
        nextSize: content.length,
        nextInfo: info ?? {},
        nextSource: content,
    })
}

export const sourceSize = (source) => Buffer.byteLength(source, "utf8")

export const logSizeDelta = (filename, prevSize, nextSize) => {
    const delta = prevSize - nextSize
    const isSaved = delta >= 0
    console.log(
        `[${filename}]: original size = ${prettySize(prevSize)}, minified size = ${prettySize(nextSize)}, ${isSaved ? "saved" : "added"} = ${prettySize(isSaved ? delta : -delta)}.`,
    )
}

export const getFileSizes = (filenames, basepath) =>
    filenames.map((filename) => stat(resolve(basepath, filename)).size).reduce((acc, next) => acc + next, 0)
