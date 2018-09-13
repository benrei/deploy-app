const scp = require('./scp');
const ssh = require('./ssh');
const jsonfile = require('jsonfile');
const fs = require('fs');
const json = require('../lib/config/config');

const run = function (program) {

  //  init  //
  if (program.init) {
    console.log('Start init');
    const arg = program.init;
    const exists = fs.existsSync('deploy-app.json');
    if(exists) console.log('deploy-app.json already exists!');
    else {
      if(arg === 'full'){
        jsonfile.writeFile('deploy-app.json', json.full,{ spaces: 2 }, function (err) {
          if (err) console.error(err);
          else console.log('deploy-app.json created!')
        })
      }else if(arg === true || arg === 'simple'){
        jsonfile.writeFile('deploy-app.json', json.simple,{ spaces: 2 }, function (err) {
          if (err) console.error(err);
          else console.log('deploy-app.json created!')
        })
      }
    }
    console.log('End init');
  }

  //  deploy  //
  if (program.deploy) {
    const arg = program.deploy;
    jsonfile.readFile('deploy-app.json', function (err, obj) {
      if (err) console.error(err);
      if(arg === true) console.log('  ' + Object.keys(obj).join(' '));
      else{
        if(obj[arg]){
          console.log('Start deploy');
          const myObj = obj[arg];
          if(!myObj.user || !myObj.host || !myObj.path) console.log("NB! 'user', 'host' and 'path' are required.");
          else{
            ssh.run(myObj.user,myObj.host,myObj.port,myObj['pre-deploy'],'pre-deploy',(callback)=>{
              scp.send(myObj.user,myObj.host,myObj.port,myObj.files,myObj.path, (callback)=>{
                ssh.run(myObj.user,myObj.host,myObj.port,myObj['post-deploy'],'post-deploy')
              });
            });
          }
        }
        else console.log("<" + arg + '> not found in deploy-app.json')
      }

    })
  }

};

module.exports.run = run;