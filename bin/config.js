#!/usr/bin/env node
const meow = require('meow')
const { 
  consoleJson,
  createConfigFile,
  createOurDir,
  cliData,
  paths
} = require('../lib/config-lib')

const cli = meow(cliData.cliHelp, {
  flags: cliData.flags
})

const data = {
  profile: cli.flags.profile,
  mfa_device_arn: cli.flags.mfadevice
}

// Create directory
createOurDir(paths.ourPath)

// Output
consoleJson(data)

// Create config file
createConfigFile(paths.ourConfigFile, data)
