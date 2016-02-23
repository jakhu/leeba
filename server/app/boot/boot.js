// Normal boot tasks
// Module deps
const config = require('../../config/main');
const path = require('path');
const db = require(path.join('../..', config.database.location));
module.exports = (env) => {
  db.start(env);
}
