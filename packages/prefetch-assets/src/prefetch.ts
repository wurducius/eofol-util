import { Attributes, Content } from "./types"
import { jsonToHtml } from "./parser"
import { JSONContent } from "gzip-to-json-parser/dist/types"

export const prefetch = (tagname: string, content?: Content, attributes?: Attributes) => ({
    type: tagname,
    content: Array.isArray(content) ? content : content ? [content] : [],
    attributes: attributes ?? {},
})

export const renderHtml = (html: JSONContent | string): Promise<string> => jsonToHtml(html, true) as Promise<string>