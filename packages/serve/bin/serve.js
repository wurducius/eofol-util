#!/usr/bin/env node

"use strict";

const {evalNamedParam, getArgs} = require("@eofol-utils/args");
const {serve} = require("../src/serve")

const args = getArgs()

let root
if (args.length > 0) {
    root = args[0]
}

// @TODO use all args 1-1
serve({
    root: root ?? ".",
    host: evalNamedParam("host"),
    port: evalNamedParam("port"),
    wait: evalNamedParam("wait"),
    https: evalNamedParam("https")
})