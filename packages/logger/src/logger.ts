const LOGLEVEL_DEFAULT = 3;
const LOG_PREFIX_DEFAULT = "eofol-logger";
const LOG_MSG_SEPARATOR_DEFAULT = " -> ";

let LOGLEVEL = LOGLEVEL_DEFAULT;
let LOG_PREFIX = LOG_PREFIX_DEFAULT;
let LOG_MSG_SEPARATOR = LOG_MSG_SEPARATOR_DEFAULT;

export const getLogger = (
  nextLOGLEVEL?: number,
  nextLOG_PREFIX?: string,
  nextLOG_MSG_SEPARATOR?: string,
) => {
  if (nextLOGLEVEL !== undefined) {
    LOGLEVEL = nextLOGLEVEL;
  }
  if (nextLOG_PREFIX !== undefined) {
    LOG_PREFIX = nextLOG_PREFIX;
  }
  if (nextLOG_MSG_SEPARATOR !== undefined) {
    LOG_MSG_SEPARATOR = nextLOG_MSG_SEPARATOR;
  }

  const trace = logImpl(4, "TRACE");
  const info = logImpl(3, "INFO");
  const warn = logImpl(2, "WARNING");
  const error = logImpl(1, "ERROR");
  const fatal = logImpl(0, "FATAL");

  const logger = (
    loglevel: number,
    levelName?: string,
    prefix?: string,
    separator?: string,
  ) => logImpl(loglevel, levelName, prefix, separator);

  return { trace, info, warn, error, fatal, logger };
};

const logImpl =
  (level?: number, levelName?: string, prefix?: string, separator?: string) =>
  (msg: string) => {
    if (level === 0 || (LOGLEVEL ?? 3) >= level) {
      console.log(
        (prefix ?? LOG_PREFIX) +
          `${levelName ? ` [${levelName ?? "LOG"}]` : ""}` +
          (separator ?? LOG_MSG_SEPARATOR) +
          msg,
      );
    }
  };
