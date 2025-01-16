import { argv } from "node:process";

export const evalBoolParam = (shortParam: string, longParam: string) => {
  let boolParam = false;
  if (argv.length >= 2) {
    argv.forEach((a, i) => {
      if (i >= 2) {
        if (a === shortParam || a === longParam) {
          boolParam = true;
        }
      }
    });
  }
  return boolParam;
};

export const evalStringParam = (
  shortParam: string,
  longParam: string,
  validation?: (a: string) => true | string,
) => {
  let strParam = "";
  if (argv.length >= 2) {
    let paramPosition: number | undefined = undefined;
    argv.forEach((a, i) => {
      if (i >= 2) {
        if (a === shortParam || a === longParam) {
          paramPosition = i;
        }
      }
      if (i + 1 === paramPosition) {
        strParam = a;
      }
    });
  }
  if (strParam !== undefined) {
    if (validation) {
      const validationResult = validation(strParam);
      if (typeof validationResult === "string") {
        console.error(
          `Validation error for parameter "${longParam}" value "${strParam}" is not acceptable.`,
        );
      }
    } else {
      return strParam;
    }
  }
};

export const evalNumberParam = (
  shortParam: string,
  longParam: string,
  validation?: (a: number) => true | string,
) => {
  const result = evalStringParam(shortParam, longParam);
  if (result !== undefined) {
    if (validation) {
      const validationResult = validation(Number(result));
      if (typeof validationResult === "string") {
        console.error(
          `Validation error for parameter "${longParam}" value "${result}" is not acceptable.`,
        );
      }
    }
    return Number(result);
  }
};
