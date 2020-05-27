const AWS = require('aws-sdk')
const homedir = require('os').homedir()
const path = require('path')
const { exec } = require('child_process');
writeFile = require('fs').writeFile;

const sts = new AWS.STS();

// Constants
const awsFolder = '.aws'
const authFileName = 'credentials'
const fullPath = path.join(homedir, awsFolder, authFileName)

// console.log(fullPath)


// Config
const profile = "codecandy"
const aws_access_key_id = "AKIATKOXWRS2TPH2TTU3"
const aws_secret_access_key = "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"
const mfa_device_arn = "arn:aws:iam::228622503093:mfa/sotiris@ktisis.co"
const mfa_code = "407901"

// var params = {
//   DurationSeconds: 3600,
//   SerialNumber: "arn:aws:iam::228622503093:mfa/sotiris@ktisis.co",
//   TokenCode: "123456"
// }

const command = `\
aws sts get-session-token \
--profile ${profile} \
--serial-number ${mfa_device_arn} \
--token-code ${mfa_code} \
--output json`

// sts.getSessionToken(params, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else     console.log(data);
// })

exec(command, (err, stdout, stderr) => {
  if (err) {
    switch (err.code) {
      case 254:
        console.error("MultiFactorAuthentication failed with invalid MFA one time pass code");
        break;

      default:
        console.error(err);
        break;
    }
  }

  const data = JSON.parse(stdout)

  console.log(data);
  

  const file_contents = `[default]\
  aws_access_key_id = ${ result['Credentials']['AccessKeyId'] }\
  aws_secret_access_key = ${ result['Credentials']['SecretAccessKey'] }\
  aws_session_token = ${ result['Credentials']['SessionToken'] }\
  #expiry ${ result['Credentials']['Expiration'] }`

  // writeFile(fullPath)


  // the *entire* stdout and stderr (buffered)
  // console.log(stdout);
  // console.log(`stderr: ${stderr}`);
});

