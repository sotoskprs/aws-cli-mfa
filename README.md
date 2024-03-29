[![npm](https://img.shields.io/npm/v/aws-cli-mfa?style=for-the-badge)](https://www.npmjs.com/package/aws-cli-mfa) [![npm](https://img.shields.io/npm/dm/aws-cli-mfa?style=for-the-badge)](https://npmcharts.com/compare/aws-cli-mfa?minimal=true) ![Platforms supported](https://img.shields.io/badge/platform-win%20%7C%20MacOS%20%7C%20Linux-lightgrey?style=for-the-badge)


# aws-cli-mfa

MFA authentication for aws-cli




## Features

- Get temporary credentials to use aws-cli
- Cross platform



## Prerequisites

- Node and NPM installed
- AWS cli installed



## Usage

### Get started

```
$ npm i -g aws-cli-mfa
```



### Run the configuration script (one time)

```
$ aws-mfa-conf --profile awsprofile --mfa arn:aws:iam::000000000000:mfa/account
```

You will get the the json configuration as a response

```
$ aws-mfa-conf --profile awsprofile --mfa arn:aws:iam::000000000000:mfa/account
{
  "profile": "awsprofile",
  "mfa_device_arn": "arn:aws:iam::000000000000:mfa/account"
}
awc-cli-mfa configured! Ready to use.
```

From now on, you can use `aws-mfa` with the saved configuration



### Run MFA script

```
$ aws-mfa
```

Enter the generated mfa code from the virtual device

```
$ aws-mfa
MFA code: 123456
```

You 're now authorized to use `aws-cli`!