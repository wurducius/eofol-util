#!/usr/bin/env node

"use strict";

const {getArgs} = require("@eofol-utils/args");
const deploy = require("./deploy-impl");

let winscpExecutablePath = undefined
let winscpLogPath = undefined
let ipAddress = undefined
let username = undefined
let privateKeyPath = undefined
let hostkey = undefined
let localBuildPath = undefined
let remoteDeployPath = undefined

const args = getArgs()

let cmd = undefined

if (args.length > 0) {
    winscpExecutablePath = args[0]
}

if (args.length > 1) {
    winscpLogPath = args[1]
}
if (args.length > 2) {
    ipAddress = args[2]
}
if (args.length > 3) {
    username = args[3]
}
if (args.length > 4) {
    privateKeyPath = args[4]
}
if (args.length > 4) {
    hostkey = args[4]
}
if (args.length > 4) {
    localBuildPath = args[4]
}
if (args.length > 4) {
    remoteDeployPath = args[4]
}

deploy(winscpExecutablePath, winscpLogPath, ipAddress, username, privateKeyPath, hostkey, localBuildPath, remoteDeployPath)
