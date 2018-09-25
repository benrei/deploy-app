let scp = module.exports = {};
let child_process = require('child_process');
let exec = child_process.exec;

/*
 * Transfer a file to a remote host
 */
scp.send = (user, host, port, files, path, cb) => {
  let command = [
    'scp',
    '-r',
    '-P',
    (port ? port : 22),
    files,
    (user && host && path ? user+'@' + host + ':' + path : ''),
  ];
  console.log('Deploying...');
  console.log('  > ' + command.join(' '));
  exec(command.join(' '), (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log('Deploying done!' + '\n');
    if (cb) cb();

  });
};