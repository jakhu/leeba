'use strict';
const express = require('express');
let router = express.Router();
router.get('/', (req, res) => {
  res.render('index.ejs')
})
module.exports = router
