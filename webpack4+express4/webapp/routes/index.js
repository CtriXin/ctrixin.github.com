var express = require('express');
var app = express();
var router = express.Router();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

// router.use(myLogger)

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('LOGGED');
  next();
}, function (req, res, next) {
  // console.log(req.query.token, req.query.uid);
  res.render('index', {
    title: 'try me',
    test: '/dist/images'
  });
});

module.exports = router;