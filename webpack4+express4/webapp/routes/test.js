var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('testing/index', {
    title: 'aaaaa'
  });
});


module.exports = router;