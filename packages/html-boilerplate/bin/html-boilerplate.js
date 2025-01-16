const {writeAsync, readAsync, join, mkdirAsync} = require("@eofol-util/fs")

const touchBuildDirs = async (buildPath) => {
    if (!exists(buildPath)) {
        await mkdirAsync(buildPath)
            .then(() => mkdirAsync(join(buildPath, "assets")))
            .then(() =>
                Promise.all([
                    mkdirAsync(join(buildPath, "assets", "js")),
                    mkdirAsync(join(buildPath, "assets", "css")),
                    mkdirAsync(join(buildPath, "assets", "media")).then(() =>
                        Promise.all([
                            mkdirAsync(join(buildPath, "assets", "media", "fonts")),
                            mkdirAsync(join(buildPath, "assets", "media", "images")),
                            mkdirAsync(join(buildPath, "assets", "media", "icons")),
                        ]),
                    ),
                ]),
            )
    }
}

const copyResource = (sourcePath, targetPath) => readAsync(join(CWD, "resources", sourcePath)).then((content) => writeAsync(join(CWD, targetPath ?? sourcePath), content, {flag: "w"}))

const CWD = process.cwd()

copyResource("index.html")
copyResource("manifest.json")
copyResource("favicon.ico")
copyResource("robots.txt")
copyResource("service-worker.js")

touchBuildDirs().then(() => {
    copyResource("base.css", "assets/css/base.css")
    copyResource("theme.css", "assets/css/theme.css")
    copyResource("Roboto-Regular.ttf", "assets/media/fonts/Roboto-Regular.ttf")
    copyResource("phi.svg", "assets/media/icons/phi.svg")
    copyResource("favicon.png", "assets/media/images/favicon.png")
    copyResource("logo.png", "assets/media/images/logo.png")
    copyResource("logo-lg.png", "assets/media/images/logo-lg.png")
    copyResource("logo-md.png", "assets/media/images/logo-md.png")
    copyResource("logo-sm.png", "assets/media/images/logo-sm.png")
})
