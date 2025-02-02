import path = require("node:path");
import fs = require("node:fs");
const fsPromises = require("fs").promises;
import { rimrafSync, rimraf } from "rimraf";

const join = path.join;

const parse = path.parse;

const resolve = path.resolve;

const sep = path.sep;

const read = fs.readFileSync;

const readAsync = fsPromises.readFile;

const exists = fs.existsSync;

const existsAsync = fsPromises.exists;

const mkdir = fs.mkdirSync;

const mkdirAsync = fsPromises.mkdir;

const write = (path, content) => fs.writeFileSync(path, content);

const writeAsync = (path, content) => fsPromises.writeFile(path, content);

const cp = fs.cpSync;

const cpAsync = fsPromises.cp;

const readDir = fs.readdirSync;

const readDirAsync = fsPromises.readdir;

const isDirectory = (path) => fs.lstatSync(path).isDirectory();

const isDirectoryAsync = (path) =>
  fsPromises.lstat(path).then((dir) => dir.isDirectory());

const stat = (path) => fs.statSync(path);

const rm = rimrafSync;

const rmAsync = rimraf;

const touch = (path) => {
  if (!exists(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

module.exports = {
  join,
  read,
  readAsync,
  exists,
  existsAsync,
  mkdir,
  mkdirAsync,
  write,
  writeAsync,
  rm,
  rmAsync,
  touch,
  parse,
  resolve,
  sep,
  cp,
  cpAsync,
  readDir,
  readDirAsync,
  isDirectory,
  isDirectoryAsync,
  stat,
};
