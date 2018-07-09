var express = require('express');
var router = express.Router();

// template
router.get('/', function (req, res, next) {
  res.render('template/index', {
    title: '默认模板'
  });
});

// template/vw
router.get('/vw', function (req, res, next) {
  res.render('template/vw', {
    title: 'vw默认模板'
  });
});


module.exports = router;