#!/usr/bin/env node

"use strict";

import {getArgs} from "@eofol-util/args";

const clean = require("../src/clean");

let cleanPaths = []

const args = getArgs()

if (args.length > 0) {
    cleanPaths = args
}

clean(cleanPaths)
