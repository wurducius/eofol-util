import { getHash } from "@eofol-utils/crypto"

import { SX } from "./constants"
import { camelCaseToKebabCase, isBrowser } from "./util"
import { SxStyleObject } from "./types"

let compileCache = ""

export const getCompileCache = () => compileCache

export const clearCompileCache = () => {
    compileCache = ""
}

const cache: string[] = []

const injectStyle = (hash: string, styleContent: string, prefix?: string, skipCompileCache?: boolean) => {
    const style = (prefix === undefined ? "." : prefix) + hash + styleContent
    if (isBrowser()) {
        document.styleSheets.item(0)?.insertRule(style)
    } else if (!skipCompileCache) {
        compileCache = compileCache + style
    }
    cache.push(hash)
}

const getStyleContent = (styleObj: SxStyleObject, selector?: string) =>
    `${selector || ""} { ${Object.keys(styleObj).reduce((acc, next) => `${acc} ${camelCaseToKebabCase(next)}: ${styleObj[next]};`, "")} } `

export const sx = (styleObj: SxStyleObject, selector?: string, prefix?: string, skipCompileCache?: boolean) => {
    const styleContent = getStyleContent(styleObj, selector)
    const hash = `${SX.STYLE_CLASSNAME_PREFIX}${getHash(styleContent).toString()}`
    if (!cache.includes(hash)) {
        injectStyle(hash, styleContent, prefix, skipCompileCache)
    }
    return hash
}

export const sy = (classname: string, styleObj: SxStyleObject, selector?: string, prefix?: string) => {
    const style = (prefix === undefined ? "." : prefix) + classname + getStyleContent(styleObj, selector)
    if (isBrowser()) {
        document.styleSheets.item(0)?.insertRule(style)
    }
    return classname
}

export const syy = (styleName: string, styleObj: SxStyleObject) => sy(styleName, styleObj, undefined, "")

const EofolSx = { sx, sy, syy, getCompileCache, clearCompileCache }

export default EofolSx