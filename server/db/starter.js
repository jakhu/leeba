'use strict';
let start = module.exports = {};
const spawn = require('child_process').spawn;
const execFile = require('child_process').execFile;
const debug = require('debug')('leeba:spawn');
/**
 * Start mongodh sudo service
 * @param service {String} service to start
 * @param callback {Function} function as callback - arguments are (err)
*/
start.startMongodbSudo = (service, callback) => {
  debug('Executing %o...', `sudo service ${service} start`)
  let child = spawn('sudo', ['service', service, 'start']);
  setTimeout(function(){
    debug('Starting db took too long. Does sudo require a password?');
    child.stdin.pause();
    child.kill();
    return callback(new Error('Starting db took too long'));
  }, 10000);
  child.stdout.on('data', function(data){
    debug('stdout:'+data);
  });

  child.stderr.on('data', function(data){
    debug('stderr:'+data);
  });
}
/**
 * Start mongodb file
 * @param file {String} mongodb file
 * @param options {Object} options
 * @param callback {Function} function as callback - arguments are (err)
*/
start.startexe = (file, options, callback) => {
  debug('Executting command %o', `${file} ${options.portoption} ${options.port} ${options.datapathoption} ${options.datadir}`)
  const child = execFile(file, [options.portoption, options.port, options.datapathoption, options.datadir], (error, stdout, stderr) => {
  if (error) {
    throw error;
    if (callback) {
      return callback(error);
    } else {
      throw error;
    }
  }
  debug(stdout);
  if (callback) {
    return callback();
  } else {
    return {stdout: stdout, stderr, stderr};
  }
});
}
