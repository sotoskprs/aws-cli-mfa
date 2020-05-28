const path = require('path')
const homedir = require('os').homedir()

// Constants
const awsFolder = '.aws'
const authFileName = 'credentials'
const awsCredentialsFullPath = path.join(homedir, awsFolder, authFileName)
const ourFolder = '.aws-cli-mfa'
const ourPath = path.join(homedir, ourFolder)
const ourConfigFile = path.join(ourPath, 'config.json')


exports.ourConfigFile = ourConfigFile
exports.awsCredentialsFullPath = awsCredentialsFullPath
exports.ourPath = ourPath