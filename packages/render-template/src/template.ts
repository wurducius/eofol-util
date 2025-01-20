import { readAsync,writeAsync,join,parse} from "@eofol-utils/fs"
import { head } from "@eofol-utils/gzip-head"

export const compileTemplate = (buildPath, projectPath, stylesStatic, headData) => async (viewName) => {
  const content = await readAsync(join(projectPath, `${viewName}.html`))
  const html = await head(
      headData,
      content.toString(),
      [viewName, "runtime", "eofol", "dependencies"],
      ["base", "theme"],
      stylesStatic ?? "",
  )
  await writeAsync(join(buildPath, `${viewName}.html`), html)
  return viewName
}

const compileTemplates = (buildPath, projectPath, publicDir) =>
    Promise.all(
        publicDir
            .filter((publicFile) => publicFile.endsWith(".gzip"))
            .map((publicView) => parse(publicView).name)
            // @TODO Fill in styles and head data
            .map(compileTemplate(buildPath, projectPath)),
    )

