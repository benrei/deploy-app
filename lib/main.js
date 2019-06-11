const scp = require('./scp');
const ssh = require('./ssh');
const cmd = require('./cmd');
const jsonfile = require('jsonfile');
const fs = require('fs');
const config = require('../lib/config-samples');

const configFileName = 'deploy-app-config.json';

const run = function (program) {

  //  init  //
  if (program.init) {
    const arg = program.init;

    if(arg === true || arg === 'full'){
      if(checkIfConfigFileExists(configFileName)) return;
      jsonfile.writeFile(configFileName, config.full,{ spaces: 2 }, function (err) {
        if (err) console.error(err);
        else console.log(`  ${configFileName} created!`)
      })
    }else if(arg === 'minimal'){
      if(checkIfConfigFileExists(configFileName)) return;
      jsonfile.writeFile(configFileName, config.minimal,{ spaces: 2 }, function (err) {
        if (err) console.error(err);
        else console.log(`  ${configFileName} created!`)
      })
    }else {
      console.log(`  <${arg}> not found`);
      console.log(`  Use either: [full, minimal]`)
    }
  }

  //  deploy  //
  if (program.deploy) {
    const arg = program.deploy;
    jsonfile.readFile(configFileName, function (err, obj) {
      if (err) {
        console.error(err);
        console.error("NB! Didn't find a config file, first run:\n  deploy-app init");
        return;
      }
      if(arg === true) console.log('  ' + Object.keys(obj).join(' '));
      else{
        const deploySettings = obj[arg];
        if(deploySettings) deploy(deploySettings);
        else {
          console.log(`  <${arg}> not found in ${configFileName}`);
          console.log('  Found instead: ' + Object.keys(obj).join(' '));
        }
      }
    })
  }
};

const checkIfConfigFileExists = (fileName)=> {
  const exists = fs.existsSync(fileName);
  if(exists){
    console.log(`  ${fileName} already exists!`);
    return true;
  }
  return false;
};

const deploy = (deploy) => {
  const start = new Date().getTime();
  if(!deploy.user || !deploy.host || !deploy.path) console.log("  NB! 'user', 'host' and 'path' are required.");
  else if(!deploy.files) console.log('  No files to deploy!');
  else{
    const preDeployLocal = deploy['pre-deploy-local']
      ? deploy['pre-deploy-local']
      : null;
    const preDeployRemote = deploy['pre-deploy-remote']
      ? `"${deploy['pre-deploy-remote']}; exit;"`
      : null;
    const postDeploy = deploy['post-deploy']
      ? `"cd ${deploy.path}; ${deploy['post-deploy']}; exit;"`
      : null;
    cmd.run(preDeployLocal,'pre-deploy-local',(callback)=>{
      ssh.run(deploy.user,deploy.host,deploy.port, preDeployRemote,'pre-deploy-remote',(callback)=>{
        scp.send(deploy.user,deploy.host,deploy.port,deploy.files,deploy.path, (callback)=>{
          ssh.run(deploy.user,deploy.host,deploy.port,postDeploy,'post-deploy', (callback) =>{
            const time = ((new Date().getTime()-start)/1000).toFixed(1);
            console.log(`Finished in ${time} seconds!`)
          });
        });
      });
    });

  }
};

module.exports.run = run;