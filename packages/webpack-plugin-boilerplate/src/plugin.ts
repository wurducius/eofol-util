import {LIFECYCLE} from "./lifecycle"

const noop = () => {}
const id =  ((x) => x)

// eslint-disable-next-line no-unused-vars
const onBuildStarted = (handler, PLUGIN_NAME) => (compilation) => {
    LIFECYCLE.onCompilationStart()
    handler(undefined, compilation)
}

const onInitCompilation = (handler, PLUGIN_NAME) => (compiler) => (compilation) => {
    compilation.hooks.processAssets.tapPromise(
        {
            name: PLUGIN_NAME,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        // @TODO Is this really neccessary?
        async () => {
            return await handler(compiler, compilation)
        },
    )
}

const onCompilationFinished = (handler, PLUGIN_NAME) => (compiler) => (compilation) => {
    compilation.hooks.processAssets.tapPromise(
        {
            name: PLUGIN_NAME,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
            additionalAssets: true,
        },
        handler(compiler, compilation)
    )
}

// eslint-disable-next-line no-unused-vars
const onAfterCompile = (handler, PLUGIN_NAME) => (compiler) => (compilation) => {
    handler(compiler, compilation)
    LIFECYCLE.onCompilationFinished()
}

export class Eofol4CompilerWebpackPlugin {
    PLUGIN_NAME = "Eofol5 webpack plugin"

    beforeBuild = noop
    processViews = noop
    optimizeAssets =  id
    afterCompile =  id

    constructor({PLUGIN_NAME, processViews, optimizeAssets, beforeBuild, afterCompile}) {
        this.PLUGIN_NAME = PLUGIN_NAME ??  "Eofol5 webpack plugin"
        this.beforeBuild = beforeBuild ?? noop
        this.processViews = processViews ?? noop
        this.optimizeAssets = optimizeAssets ?? id
        this.afterCompile = afterCompile ?? id
    }

    apply(compiler) {
        compiler.hooks.run.tap(this.PLUGIN_NAME, onBuildStarted(this.beforeBuild, this.PLUGIN_NAME))
        compiler.hooks.compilation.tap(this.PLUGIN_NAME, onCompilationFinished(this.optimizeAssets, this.PLUGIN_NAME)(compiler))
        compiler.hooks.thisCompilation.tap(this.PLUGIN_NAME, onInitCompilation(this.processViews, this.PLUGIN_NAME)(compiler))
        compiler.hooks.afterCompile.tap(this.PLUGIN_NAME, onAfterCompile(this.afterCompile, this.PLUGIN_NAME)(compiler))
    }
}