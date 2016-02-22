// Development boot engine
'use strict';
/**
 * Module dependencies
*/
const http = require('http');
const debug = require('debug')('leeba:boot');
const serverdebug = require('debug')('leeba:server');
const normalize = require('../../lib/normalize');
// Boot exports
let boot = module.exports = {};
/**
 * Boot function
 * @param app {Object} Express app Object
 * @param options {Object} Options (i.e. port)
*/
boot.boot = (app, options) => {
  debug('Setting env to %o...', 'production')
  app.set('env', 'production');
  debug('Applying error handlers...')
  // Custom stuff
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.jade', {
      message: err.message,
      error: {}
    });
  });
  // Normalize port
  const port = normalize(options.port)
  // Open server
  serverdebug('Creating server on port %o...', port)
  let server = http.createServer(app);
  server.listen(port, function () {
    if (~process.env.DEBUG.indexOf('leeba:server')) {
      serverdebug('Listenning on port %o', port)
    } else {
      console.log(`[INFO] Listenning on port ${port}`);
    }
  })
}