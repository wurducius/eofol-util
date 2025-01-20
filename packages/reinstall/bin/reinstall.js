#!/usr/bin/env node

"use strict";

const {evalBoolParam} = require("@eofol-utils/args");
const {reinstall} = require("../src/reinstall")

const noCleanCache = evalBoolParam("-c", "--no-lint")
const forceCleanCache = evalBoolParam("-f", "--force")
const forceInstall = evalBoolParam("-if", "--install-force")

reinstall(!noCleanCache, forceCleanCache, forceInstall)