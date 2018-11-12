var express = require('express');
var router = express.Router();

var Users = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/review', function(req, res, next) {
  res.render('review');
});

router.get('/login', function(req, res){
  res.render('login');
});

router.get('/signup', function(req, res){
  res.render('signup');
});

router.post('/signup', function(req, res){
  console.log('request.....', req.body);
  var user = new Users({
    username: req.body.username,
    password: req.body.password
  });
  var promise = user.save();
  promise.then((user) => {
    console.log('user signed up with values', user);
    res.render('login')
  })
});

router.post('/login', function(req, res){
  if (req.body.username && req.body.password){
  Users.findOne({
    username:req.body.username,
    password: req.body.password,
  },function(err, user){
    console.log('user logged in with values:', user);
    res.redirect('/review')
  })
}
  else { console.log('Not a valid id'); }
});


module.exports = router;
