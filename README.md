# aws-cli-mfa

MFA authentication for aws-cli



## Features

- Get temporary credentials to use aws-cli
- Cross platform



## Prerequisites

- Node and NPM installed
- AWS cli installed



## Use

### Get started

- Clone repo
- `cd aws-cli-mfa`
- `npm i` to install dependencies



### Run the configuration script

```shell
$ node config --profile awsprofile --mfa arn:aws:iam::000000000000:mfa/account
{
  "profile": "awsprofile",
  "mfa_device_arn": "arn:aws:iam::000000000000:mfa/account"
}
awc-cli-mfa configured! Ready to use.
```



### Run MFA script

```shell
$ node mfa
```

- Enter the generated mfa code from the virtual device

```shell
$ node mfa
MFA code: 123456
```

- You 're now authorized to use `aws-cli`!
