// Dependencies
const homedir = require('os').homedir()
const path = require('path')
const { exec } = require('child_process')
const writeFile = require('fs').writeFile

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Constants
const awsFolder = '.aws'
const authFileName = 'credentials'
const fullPath = path.join(homedir, awsFolder, authFileName)

// Config
const profile = "codecandy"
const mfa_device_arn = "arn:aws:iam::228622503093:mfa/sotiris@ktisis.co"


const xxx = rl.question("MFA code: ", function (mfa_code) {

  // Command template
  const command = `\
  aws sts get-session-token \
  --profile ${profile} \
  --serial-number ${mfa_device_arn} \
  --token-code ${mfa_code} \
  --output json`

  // Running the command
  exec(command, (err, stdout, stderr) => {

    // Command error handling
    if (err) {
      switch (err.code) {
        case 254:
          console.error("MultiFactorAuthentication failed with invalid MFA one time pass code");
          process.exit(1);
        case 252:
          console.error("Parameter validation failed: Invalid length for parameter TokenCode, value: 3, valid range: 6-inf");
          process.exit(1);

        default:
          console.error(err);
          process.exit(1);
      }
    }

    // If no error, parse json
    const data = JSON.parse(stdout)

    // File contents template
    const file_contents = `[default]
aws_access_key_id = ${ data['Credentials']['AccessKeyId']}
aws_secret_access_key = ${ data['Credentials']['SecretAccessKey']}
aws_session_token = ${ data['Credentials']['SessionToken']}
#expiry ${ data['Credentials']['Expiration']}`

    // console.log(file_contents);
    

    // Writing contetns to file
    writeFile(fullPath, file_contents, (err) => {
      if (err) console.error(err)
      process.exit(0);
    })
  });

  
});

