let child_process = require('child_process');
let exec = child_process.exec;
let ssh = module.exports = {};

/*
 * Transfer a file to a remote host
 */
ssh.run = (user, host, port, commands, type, cb) => {
  if(!commands){
    if(cb) cb();
    return
  }
  let command = [
    'ssh',
    (user && host ? user+'@' + host: ''),
    '-p',
    (port ? port : 22),
    (commands)
  ];
  console.log(`${type}...`);
  console.log('  > ' + command.join(' '));
  exec(command.join(' '), (error, stdout, stderr) => {

    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`${type} done!` + '\n');
    if (cb) cb();

  });
};
