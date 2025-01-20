#!/usr/bin/env node

"use strict";

const {getArgs} = require("@eofol-utils/args");
const createEofolApp = require("./create-eofol-app-impl");

let gitUrl = "https://github.com/wurducius/eofol5.git"
let title = "Create Eofol5 app"
let exampleCommand = "npx @eofol-utils/create-eofol-app project-name [gitUrl] [title] [exampleCommand]"

const args = getArgs()

if (args.length > 0) {
    gitUrl = args[0]
}
if (args.length > 1) {
    title = args[1]
}
if (args.length > 2) {
    exampleCommand = args[2]
}

createEofolApp(gitUrl, title, exampleCommand)
