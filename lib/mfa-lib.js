const fs = require('fs')
const { exec } = require('child_process')
const { awsCredentialsFullPath } = require("./paths")

exports.commandTmpl = (data) => {
  // Command template
  return `\
aws sts get-session-token \
--profile ${data.profile} \
--serial-number ${data.mfa_device_arn} \
--token-code ${data.mfa_code} \
--output json`
}

const contentsTmpl = (data) => {
  // File contents template
  return `[default]
aws_access_key_id = ${ data['Credentials']['AccessKeyId']}
aws_secret_access_key = ${ data['Credentials']['SecretAccessKey']}
aws_session_token = ${ data['Credentials']['SessionToken']}
#expiry ${ data['Credentials']['Expiration']}`
}

const contentsWrite = (file_contents) => {
  // Writing contetns to file
  fs.writeFile(awsCredentialsFullPath, file_contents, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
}

exports.commandExec = (command) => {
  // Running the comman
  exec(command, (err, stdout, stderr) => {

    // Command error handling
    if (err) {
      switch (err.code) {
        case 254:
          console.error("MultiFactorAuthentication failed with invalid MFA one time pass code")
          process.exit(1)
        case 252:
          console.error("Parameter validation failed: Invalid length for parameter TokenCode, value: 3, valid range: 6-inf")
          process.exit(1)
        default:
          console.error(err)
          process.exit(1)
      }
    }

    // If no error, parse json
    const data = JSON.parse(stdout)
    // console.log(data);

    const contents = contentsTmpl(data)
    // console.log(contents);

    contentsWrite(contents)
  })
}
