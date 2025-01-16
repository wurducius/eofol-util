export const camelCaseToKebabCase = (attributeName: string) =>
    attributeName
        .split("")
        .reduce((acc, next) => acc + (next === next.toUpperCase() ? `-${next.toLowerCase()}` : next), "")

export const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined"