#!/usr/bin/env node

"use strict";

const {evalNamedParam} = require("@eofol-utils/args")
const {webpackBuild} = require("../src/webpack-build");

const analyze = evalNamedParam("analyze")
const mode = evalNamedParam("mode")
const projectDir = evalNamedParam("projectDir")
const buildDir = evalNamedParam("buildDir")

webpackBuild({analyze, mode, projectDir, buildDir})
