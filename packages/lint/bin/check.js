#!/usr/bin/env node

"use strict";

const {getArgs} = require("@eofol-util/args");
const { check, prettify } = require("../src/lint")

const args = getArgs()
const path = args.length > 0 && !args[0] === ("-f") && !args[0] === ("--force")? args[0] : undefined

const fix = evalBoolParam("-f", "--fix")

reinstall(!noCleanCache, forceCleanCache, forceInstall)