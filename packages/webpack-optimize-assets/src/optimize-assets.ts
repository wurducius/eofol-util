import {addAsset, getAsset, PLUGIN_INTERNAL} from "@eofol-util/webpack-util"
import {join, read} from "@eofol-util/fs"
import {minifyHtml, minifyJs} from "@eofol-util/minify"

// @TODO finish
const getINTERNALS = () => {
    ["index"]
}

const isAssetView = (views, assetName) =>
    Object.values(views).filter((view) => `assets/js/${view}.js` === assetName).length > 0

const injectInternals = (assetName, source) => {
    const internals = getINTERNALS()
    let appendSource = ""
    if (isAssetView(internals.views, assetName)) {
        appendSource = `let INTERNALS = ${JSON.stringify(internals)}\n`
    }
    return `${appendSource}${source}`
}

const addInternalAssets = (compilation) => {
    const addAssetImpl = addAsset(compilation)

    addAssetImpl(PLUGIN_INTERNAL.EOFOL, "", {})
    // Touch assets/js/dependencies.js in case no views are importing external dependencies
    // @TODO Move somewhere else i guess
    if (!compilation.assets[PLUGIN_INTERNAL.DEPENDENCIES]) {
        addAssetImpl(PLUGIN_INTERNAL.DEPENDENCIES, "", {})
    }

    addAssetImpl("assets/css/base.css", read(join(process.cwd(), "src", "resources", "base.css")).toString(), {})
    addAssetImpl("assets/css/theme.css", read(join(process.cwd(), "src", "resources", "theme.css")).toString(), {})
}

// @TODO parametrize functionality like parameters: minify js, minify html, minify css, inject internal assets with add option, (!ADD!) process images and also icons, inject doctype into html
// inject internals, option to log progress, (!ADD) option for babelize, (!ADD) option for gzipping views
// eslint-disable-next-line no-unused-vars
export const optimizeAssets = async (compiler, compilation) => {
    addInternalAssets(compilation)
    return await Promise.all(
        Object.keys(compilation.assets).map(async (assetName) => {
            const asset = compilation.assets[assetName]
            if (!asset.info || !asset.info.optimized) {
                const source = asset.source()
                let nextSource = undefined
                if (assetName.endsWith(".js")) {
                    nextSource = minifyJs(injectInternals(assetName, source))
                } else if (assetName.endsWith(".css")) {
                    nextSource = await minifyHtml(source)
                } else if (assetName.endsWith(".html")) {
                    const minified = await minifyHtml(source)
                    nextSource = `<!DOCTYPE html>${minified}`
                }

                if (nextSource) {
                    compilation.assets[assetName] = getAsset({
                        nextSource,
                        nextInfo: {...asset.info, optimized: true},
                        nextSize: nextSource.length,
                    })
                }
            }
        }),
    )
}