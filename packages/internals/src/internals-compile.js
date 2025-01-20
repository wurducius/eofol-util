const { mergeDeep } = require("@eofol-utils/merge-deep")

let INTERNALS = {
    instances: {},
    vdom: { tree: [] },
    assets: {},
    env: {},
    views: [],
    config: {},
}

const getINTERNALS = () => INTERNALS

const mergeINTERNALS = (nextInternals) => {
    INTERNALS = mergeDeep(INTERNALS, nextInternals)
}

module.exports = { getINTERNALS, mergeINTERNALS }
