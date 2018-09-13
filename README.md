# deploy-app
Lightweight deployment option for apps, projects and stuff


>$ deploy-app deploy prod



## Installation
[![NPM version](https://img.shields.io/badge/deploy--app-v1.0.0-blue.svg)](https://www.npmjs.com/package/env-path)
```sh
$ npm install deploy-app
```

## Usage

### Init
Run in your project

>$ deploy-app deploy `init`


Adds a `deploy-app.json` config file to your project root


```json
{
  "prod":{
    "user": "deploy",
    "host": "192.168.0.1",
    "port": "22",
    "files": "build src *.json app.js",
    "path": "~/myProject",
    "pre-deploy" : "[ -d myProject ] || mkdir myProject ",
    "post-deploy" : "npm install --production; node app.js"
  },
  "dev":{},
  "staging":{}
}
```


### Deploy
Chose a environment to deploy: `prod`


>$ deploy-app `deploy prod`


That's it.<br>
Happy coding!

## License

  [MIT](LICENSE)
