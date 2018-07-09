var express = require('express');
var router = express.Router();

// template
router.get('/', function (req, res, next) {
  res.render('monster', {
    title: '默认模板'
  });
});


module.exports = router;