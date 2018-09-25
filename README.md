# deploy-app
[![Build Status](https://travis-ci.org/benrei/deploy-app.svg?branch=master)](https://travis-ci.org/benrei/deploy-app)
[![NPM version](https://img.shields.io/npm/v/deploy-app.svg)](https://www.npmjs.com/package/deploy-app)


Lightweight deployment solution for node apps, projects and stuff


>$ deploy-app -d prod



## Installation

```sh
$ npm install deploy-app
```

## Usage

### Init
Run in project root

>$ deploy-app `init`


Adds a `deploy-app-config.json` config file in your project folder


```json
{
  "prod":{
    "user": "deploy",
    "host": "192.168.0.1",
    "port": "22",
    "files": "build src *.json app.js",
    "path": "~/projectFolder",
    "pre-deploy-local" : "npm run build",
    "pre-deploy-remote" : "mkdir projectFolder; cd projectFolder; foo bar",
    "post-deploy" : "npm install --production; node app.js"
  },
  "dev":{},
  "staging":{}
}
```


### Deploy
To deploy `prod`, simply run:


>$ deploy-app `-d prod`


That's it.<br>
Happy coding!

### Help
For help see:
>$ deploy-app -h

##  Docs
```js
{
  "prod":{
    //  Used to connect to SSH and SCP
    "user": "deploy",
    "host": "192.168.0.1",
    "port": "22",
    //  Add files and folders seperated by " " space
    "files": "build src *.json app.js",
    // Path to project on target server
    "path": "~/projectFolder",
    // Can be multiple commands separated by the character ";"
    // Commands to execute locally before deploying
    "pre-deploy-local" : "npm run build",
    // Commands to execute remote before deploy
    "pre-deploy-remote" : "mkdir projectFolder; cd projectFolder; foo bar",
    // Commands to execute remote after deploy (in project root)
    "post-deploy" : "npm install --production; node app.js"
  },
  //  Add multiple environments
  "dev":{},
  "staging":{}
}
```

## License

  [MIT](LICENSE)
