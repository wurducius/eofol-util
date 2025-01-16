const rimraf = require("rimraf");

export const clean = (paths: string | string[]) => {
  if (Array.isArray(paths)) {
    paths.forEach((path) => {
      rimraf.rimrafSync(path);
    });
  } else {
    rimraf.rimrafSync(paths);
  }
};
