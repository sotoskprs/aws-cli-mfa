const fs = require('fs')
const { ourPath, ourConfigFile } = require('./paths')

exports.paths = {
  ourPath: ourPath,
  ourConfigFile: ourConfigFile
}

exports.createOurDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    return true
  }
  return false
}

exports.consoleJson = (data) => {
  console.log(JSON.stringify(data, null, "\t"))
  return true
}

exports.createConfigFile = (ourConfigFile, data) => {
  fs.writeFileSync(ourConfigFile, JSON.stringify(data, null, "\t"))
  console.log("awc-cli-mfa configured! Ready to use.");
  return true
}

exports.cliData = {
  cliHelp: `
Usage
  $ node config

Options
  --profile, -p 
  --mfadevice, -M

Examples
  $ node config --profile awsprofile --mfa arn:aws:iam::000000000000:mfa/account
  {
    "profile": "awsprofile",
    "mfa_device_arn": "arn:aws:iam::000000000000:mfa/account"
  }
  awc-cli-mfa configured! Ready to use.
`,
  flags: {
    profile: {
      type: 'string',
      alias: 'p',
      isRequired: true
    },
    mfadevice: {
      type: 'string',
      alias: 'M',
      isRequired: true
    }
  }
}