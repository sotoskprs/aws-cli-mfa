'use strict';
const fs = require('fs')
const meow = require('meow')

const cli = meow(`
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
`, {
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
})

// console.log(cli.flags)

const data = {
  profile: cli.flags.profile,
  mfa_device_arn: cli.flags.mfadevice
}

console.log(JSON.stringify(data, null, "\t"))

fs.writeFileSync('config.json', JSON.stringify(data, null, "\t"))
console.log("awc-cli-mfa configured! Ready to use.");
