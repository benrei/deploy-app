let json = module.exports = {};

json.minimal = {
  "prod":{
    "user": "deploy",
    "host": "192.168.0.1",
    "port": "22",
    "files": "app.js",
    "path": "~",
  }
};
json.full = {
  "prod":{
    "user": "deploy",
    "host": "192.168.0.1",
    "port": "22",
    "files": "build src *.json app.js",
    "path": "~/myProject",
    "pre-deploy-local" : "npm run build",
    "pre-deploy-remote" : "[ -d myProject ] || mkdir myProject ",
    "post-deploy" : "npm install --production; node app.js"
  },
  "dev":{},
  "staging":{}
};
