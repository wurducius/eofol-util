const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const {join} = require("@eofol-util/fs")

const getEntry = (view, projectDir) =>
    views.reduce((acc, next) => ({...acc, [next]: join(projectDir, `${next}.ts`)}), {})

const getWebpackConfig = ({views, plugins, analyze, mode, projectDir, buildDir}) => ({
    mode: mode ?? "development",
    entry: getEntry(views, projectDir),
    output: {
        filename: "assets/js/[name].js",
        path: buildDir,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [...plugins, analyze && new BundleAnalyzerPlugin()].filter(Boolean),
    optimization: {
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                dependencies: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "dependencies",
                    chunks: "all",
                    reuseExistingChunk: true,
                    idHint: "dependencies",
                },
            },
        },
    },
    devtool: mode === "development" ? "source-map" : false,
})

module.exports = getWebpackConfig
