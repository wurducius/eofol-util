const webpack = require("webpack")
const {error, success} = require("@eofol-util/dev-tools")
const {join, readDirAsync} = require("@eofol-util/fs")
const getWebpackConfig = require("../src/webpack.config")

const CWD = process.cwd()

export const collectViews = (projectPathImpl) => readDirAsync(projectPathImpl, {recursive: true}).filter((publicFile) => publicFile.endsWith(".html"))

export const webpackBuild = ({views, plugins, analyze, mode, projectDir, buildDir}) => {
    const projectDirImpl = projectDir ?? "project"
    const buildDirImpl = buildDir ?? "build"
    const viewsImpl = views ?? collectViews(join(CWD, projectDir))
    const modeImpl = mode ?? "development"

    webpack(getWebpackConfig({
        views: viewsImpl,
        plugins,
        analyze,
        mode: modeImpl,
        projectDir: projectDirImpl,
        buildDir: buildDirImpl
    }), (err, stats) => {
        if (err || stats.hasErrors()) {
            console.log(error(`Webpack error: ${err}`))
        } else {
            // @TODO Extract "Eofol5" appName
            console.log(success(`Eofol5 project built at /${buildDir}/`))
        }
    })
}