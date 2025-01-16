import { JSONContent } from "html-to-json-parser/dist/types"

export interface HeadData {
    title: string
    description: string
    themeColor: string
    keywords: string
    author: string
    descriptionOg: string
    imageOg: string
    imageTypeOg: string
    imageHeightOg: string
    imageWidthOg: string
    favicon: string
    appleTouchIcon: string
    manifest: string
    //
    fontStyle?: string
    style?: string
    language?: string
    pathPrefixJS?: string
    pathPrefixCSS?: string
}

// @TODO typing
export type Attributes = any

export type Content = string | Array<string | JSONContent>