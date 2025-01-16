const babel = require("@babel/core")

const babelOptions = {}

export const babelize = (content) => babel.transform(content, babelOptions).code.toString()

export const babelizeSync = (content) => babel.transformSync(content, babelOptions).code.toString()
