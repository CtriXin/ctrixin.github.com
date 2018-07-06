var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users', {
    title: 'aaaaa'
  });
});


router.get('/name', function (req, res, next) {
  // res.send('respond with a resource name');
  res.render('users_test', {
    title: 'bababa'
  });
});

module.exports = router;