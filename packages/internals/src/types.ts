export type View = { url:string }

export interface Asset {
    url: string
    size: number
    page: string
    priority: number
}

export type AssetMap = Record<string, Asset>

export interface Assets {
    pages: Asset[]
    images: AssetMap[]
    other: Asset[]
}

export type InternalsConfig = Record<string, string>

export type InternalsEnv = Record<string, string>

export interface Internals {
    instances: Record<string, Instance>
    vdom: { tree: VDOM[] }
    views: View[]
    assets: Assets
    config: InternalsConfig
    env: InternalsEnv
}

// @TODO finish
export interface Instance {
    id: string
    // @TODO state typing
    state: State<any>
    def: string
}

export const VDOM_TYPE = {
    COMPONENT: "component",
    TAG: "tag",
    TEXT: "text",
}

export type VDOM_TAG = {
    type: typeof VDOM_TYPE.TAG
    id: string
    class?: string
    attributes?: Attributes
    properties: Properties
    tag: string
    children?: VDOM[]
}

export type VDOM_COMPONENT = {
    type: typeof VDOM_TYPE.COMPONENT
    id: string
    props?: Props
    children?: VDOM[]
    def: string
}

export type VDOM_TEXT = string

export type VDOM = VDOM_TAG | VDOM_COMPONENT | VDOM_TEXT