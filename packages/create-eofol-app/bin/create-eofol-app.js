#!/usr/bin/env node

"use strict";

const {argv} = require("node:process");
const createEofolApp = require("./create-eofol-app-impl");

let gitUrl = "https://github.com/wurducius/eofol5.git"
let title = "Create Eofol5 app"
let exampleCommand = "npx @eofol-util/create-eofol-app project-name [gitUrl] [title] [exampleCommand]"

if (argv.length > 3) {
    gitUrl = argv[3]
}
if (argv.length > 4) {
    title = argv[4]
}
if (argv.length > 5) {
    exampleCommand = argv[5]
}

createEofolApp(gitUrl, title, exampleCommand)
