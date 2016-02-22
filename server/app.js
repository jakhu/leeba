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

// Set settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');
// Export app
module.exports = app;
