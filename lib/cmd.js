let child_process = require('child_process');
let exec = child_process.exec;
let cmd = module.exports = {};

/*
 * Run commands locally
 */
cmd.run = (commands, type, cb) => {
  if(!commands){
    if(cb) cb();
    return
  }

  console.log(`${type}...`);
  console.log('  > ' + commands);
  exec(commands, (error, stdout, stderr) => {

    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`${type} done!` + '\n');
    if (cb) cb();

  });
};
