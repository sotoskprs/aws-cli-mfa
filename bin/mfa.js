#!/usr/bin/env node
const { commandTmpl, commandExec } = require("../lib/mfa-lib")
const { ourConfigFile } = require('../lib/paths')
const config = require(ourConfigFile)
const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let commandData = config

// Input MFA code
rl.question("MFA code: ", function (mfa_code) {

    commandData.mfa_code = mfa_code

    const command = commandTmpl(commandData)

    commandExec(command)
})