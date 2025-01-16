#!/usr/bin/env node

"use strict";

import {getArgs} from "@eofol-util/args";

const lint = require("../src/lint");

let cleanPaths = []

const args = getArgs()

if (args.length > 0) {
    cleanPaths = args
}

lint(cleanPaths)
