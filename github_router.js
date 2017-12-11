/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express');
var sign = require('./controllers/sign');
var site = require('./controllers/site');
var user = require('./controllers/user');
var message = require('./controllers/message');
var topic = require('./controllers/topic');
var reply = require('./controllers/reply');
var rss = require('./controllers/rss');
var staticController = require('./controllers/static');
var auth = require('./middlewares/auth');
var limit = require('./middlewares/limit');
var github = require('./controllers/github');
var passport = require('passport');
var configMiddleware = require('./middlewares/conf');
var config = require('./config.default');

var router = express.Router();


router.get('github/auth/github', configMiddleware.github, passport.authenticate('github'));
router.get('github/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/signin' }),
  github.callback);
router.get('github/auth/github/new', github.new);
router.post('github/auth/github/create', limit.peripperday('create_user_per_ip', config.create_user_per_ip, {showJson: false}), github.create);




module.exports = router;
