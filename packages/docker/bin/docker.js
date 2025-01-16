#!/usr/bin/env node

"use strict";

const {getArgs} = require("@eofol-util/args");
const {dockerBuild, dockerRun, dockerStop, dockerStart} = require("./docker-impl");

let gitUrl = "https://github.com/wurducius/eofol5"
let imageName = "eofol5-test"
let port = "3000"
let workDir = "./docker"

const args = getArgs()

let cmd = undefined

if (args.length > 0) {
    cmd = args[0]
}

if (args.length > 1) {
    gitUrl = args[1]
}
if (args.length > 2) {
    imageName = args[2]
}
if (args.length > 3) {
    port = args[3]
}
if (args.length > 4) {
    workDir = args[4]
}

if (cmd === "build") {
    dockerBuild(imageName, workDir)
} else if (cmd === "run") {
    dockerRun(port, workDir)
} else if (cmd === "start") {
    dockerStart(gitUrl, imageName, port, workDir)
} else if (cmd === "stop") {
    dockerStop(port, workDir)
} else {
    console.log("No docker command specified. Supported commands are: build, run, start, stop.")
}
