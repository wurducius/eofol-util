const wds = require("eofol-dev-server").default;
const open = require("open").default;

const PROTOCOL = "https";
const HOST = "0.0.0.0";
const PORT = "3000";
const WAIT = 150;
const OPEN = true;

const serveUrl = `${PROTOCOL}://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}`

export const serve = (options) => {
  const optionsDefault = {
    root: "./build",
    watch: ["./src"],
    wait: WAIT,
    mount: ["./node_modules"],
    port: PORT,
    host: HOST,
    https: PROTOCOL === "https",
  };
  const optionsImpl = { ...optionsDefault, ...options };

  const openPromise = () => (OPEN ? open(serveUrl) : new Promise(() => {}));

  openPromise().then(() => {
    wds(optionsImpl);
  });
};
