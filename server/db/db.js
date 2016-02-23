// File for creating db
module.exports = db = {};
// Get db config
const config = require('../config/db');
const debug = require('debug')('leeba:database');
db.start = (env) => {
  debug('Starting db...');
  debug('Checking if requested environment %o exists...', env);
  if (!config[env]) {
    debug('Environment %o does not exist!', env);
    debug('Tip: run %o to generate an db environment', `leeba generate db:environment ${env}`);
    throw new Error(`Environment ${env} does not exist!`);
  }
  debug('Environment %o exists', env);
  debug('Procceeding...')
  debug('Database: mongodb')
  debug('Location of program to run: %o', `${process.env.PWD}/db/${config[env].program}`)
  debug('Data location: %o', `${process.env.PWD}/db/${config[env].datadir}`)
  debug('Checking if db files exist...');
}
