// Main server file
'use strict';

/**
 * Module dependencies
 */
const express = require('express');
const http = require('http');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expresssession = require('express-session');
const paths = require('./config/main.json').paths;
const config = require('./config/main.json');
const path = require('path');
let app = express();

// Use middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Paths
app.use(express.static(path.join(__dirname, 'assets')));
for (var i = 0; i < paths.length; i++) {
  app.use(express.static(path.join(__dirname, paths[i])));
}
// Insert routes
for (var i = 0; i < config.routes.files.length; i++) {
  app.use(config.routes.files[i].path, require('./'+path.join(config.routes.dir, config.routes.files[i].file)));
}

// Set settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');
// Export app
module.exports = app;
