import { html, renderHtml,HeadData } from "@eofol-util/html-parser"
import { JSONContent } from "html-to-json-parser/dist/types"
import mergeDeep from "@eofol-util/merge-deep"
import defaultHeadData from "./default-head-data"

const relativizePathDefault = (path: string | undefined) => path

const script =
    (relativizePathImpl: (path: string | undefined) => string | undefined, prefixPathJS?: string) =>
        (scriptName: string) =>
            html("script", [], {
                src: relativizePathImpl(`${prefixPathJS ?? "./assets/js/"}${scriptName}.js`),
                async: "async",
                defer: "defer",
            })

export const helmet = (
    data: HeadData,
    viewStylesStatic?: string,
    viewStylesheets?: string[],
    relativizePath?: (path: string | undefined) => string | undefined,
) => {
    const dataImpl = mergeDeep(defaultHeadData, data) as HeadData
    const relativizePathImpl = relativizePath ?? relativizePathDefault

    return html("head", [
        html("meta", [], { charset: "UTF-8" }),
        html("meta", [], {
            name: "viewport",
            content: "width=device-width, initial-scale=1, shrink-to-fit=no",
        }),
        html("meta", [], { name: "theme-color", content: dataImpl.themeColor }),
        html("meta", [], { name: "description", content: dataImpl.description }),
        html("meta", [], { property: "og:description", content: dataImpl.descriptionOg }),
        html("meta", [], { name: "keywords", content: dataImpl.keywords }),
        html("meta", [], { name: "author", content: dataImpl.author }),
        html("meta", [], { property: "og:image", content: relativizePathImpl(dataImpl.imageOg) }),
        html("meta", [], { property: "og:image:type", content: dataImpl.imageTypeOg }),
        html("meta", [], { property: "og:image:width", content: dataImpl.imageWidthOg }),
        html("meta", [], { property: "og:image:height", content: dataImpl.imageHeightOg }),
        html("link", [], { rel: "icon", href: relativizePathImpl(dataImpl.favicon) }),
        html("link", [], { rel: "apple-touch-icon", href: relativizePathImpl(dataImpl.appleTouchIcon) }),
        html("link", [], { rel: "manifest", href: relativizePathImpl(dataImpl.manifest) }),
        html("title", [dataImpl.title], {}),
        ...(viewStylesheets ?? []).map((stylesheetSource) =>
            html("link", [], {
                rel: "stylesheet",
                href: relativizePathImpl(`${data.pathPrefixCSS ?? "./assets/css/"}${stylesheetSource}.css`),
            }),
        ),
        html(
            "style",
            [relativizePathImpl(dataImpl.fontStyle), dataImpl.style, viewStylesStatic].filter(Boolean) as string[],
            {},
        ),
    ])
}

export const head = (
    headData: HeadData,
    content: string,
    scripts?: string | string[] | undefined,
    stylesheets?: string | string[] | undefined,
    stylesStatic?: string,
    relativizePath?: (path: string | undefined) => string | undefined,
) => {
    const relativizePathImpl = relativizePath ?? relativizePathDefault
    const scriptImpl = script(relativizePathImpl, headData.pathPrefixJS)

    return renderHtml(
        html(
            "html",
            [
                helmet(
                    headData,
                    stylesStatic,
                    (Array.isArray(stylesheets) ? stylesheets : [stylesheets]).filter(Boolean) as string[],
                    relativizePathImpl,
                ),
                html(
                    "body",
                    [
                        content,
                        ...((Array.isArray(scripts) ? scripts : [scripts]).filter(Boolean) as string[]).map((scriptSource) =>
                            scriptImpl(scriptSource),
                        ),
                        html("noscript", ["You need to enable JavaScript to run this app."], {}),
                    ].filter(Boolean) as JSONContent[],
                    {},
                ),
            ],
            { lang: headData.language ?? "en" },
        ),
    )
}