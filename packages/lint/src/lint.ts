import {execCmd} from "@eofol-utils/misc"

export const check = (path?: string, fix?: boolean) =>
    execCmd("npx", ["eslint", "-c", "eslint.config.mjs", fix && "--fix", path ?? "."].filter(Boolean))

export const prettify = (path?: string) =>
    execCmd("npx", ["prettier", "--config", ".prettierrc", "--write", path ?? "."].filter(Boolean))
