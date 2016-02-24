// File for creating db
module.exports = db = {};
// Get db config
const config = require('../config/db');
const debug = require('debug')('leeba:database');
const os = require('os');
const fs = require('fs');
const starter = require('./starter');
const path = require('path');
db.start = (env) => {
  debug('Starting db...');
  debug('Checking if requested environment %o exists...', env);
  if (!config[env]) {
    debug('Environment %o does not exist!', env);
    debug('Tip: run %o to generate an db environment', `leeba generate db:environment ${env}`);
    throw new Error(`Environment ${env} does not exist!`);
  }
  debug('Environment %o exists', env);
  debug('Procceeding...');
  debug('Database: mongodb');
  if (typeof config[env].external !== 'undefined' && config.external === true) {
    debug('Using external db');
    debug('URL: %o', config[env].url);
  } else {
    debug('Location of program to run: %o', `${process.env.PWD}/db/${config[env].program}`);
    debug('Data location: %o', `${process.env.PWD}/db/${config[env].datadir}`);
  }
  if (os.arch() === 'arm') {
    console.log("");
    debug('Mongodb is not supported for your architecture!')
    debug('We do not recommend building it from source.')
    debug('Please consider using an external database and specifiying its url in config/db.json.')
    throw new Error('Mongodb is not supported for your architecture! Please consider using an external database and specifiying its url in config/db.json.');
  }
  debug('Checking for the db...')
  debug('Checking for db executable...')
    if (fs.statSync("db/mongodb/mongod.exe").isFile()) {
      // Start program
      debug('Executable exists!')
      const options = {port: config[env].port, datadir: config[env].datadir, portoption: config[env].portoption, datapathoption: config[env].datapathoption};
      starter.startexe("db/mongodb/mongod", function (err) {
        if (err) {
          debug("Error when starting db!");
          throw err;
        }
      })
    } else {
      debug('No db file!');
    }

}
