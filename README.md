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
Run in project root

>$ deploy-app deploy `init`


Adds a `deploy-app.json` config file to your project root


```json
{
  "prod":{
    "user": "deploy",
    "host": "192.168.0.1",
    "port": "22",
    "files": "build src *.json app.js",
    "path": "~/projectFolder",
    "pre-deploy-local" : "mkdir projectFolder; cd projectFolder; foo bar",
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

##  Docs
```js
{
  "prod":{
    //  Used to connect to SSH and SCP
    "user": "deploy",
    "host": "192.168.0.1",
    "port": "22",
    //  Files seperated by " " space
    "files": "build src *.json app.js",
    // Path of the project on target servers
    "path": "~/projectFolder",
    // Commands to execute locally (on the same machine you deploy things)
    // Can be multiple commands separated by the character ";"
    "pre-deploy-local" : "mkdir projectFolder; cd projectFolder; foo bar",
    // Commands to be executed on the server after deploy (in project root)
    "post-deploy" : "npm install --production; node app.js"
  },
  //  Add multiple environments
  "dev":{},
  "staging":{}
}
```

## License

  [MIT](LICENSE)
