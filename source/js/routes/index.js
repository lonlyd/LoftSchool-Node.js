const express = require('express');
const router = express.Router();

const home = require('./controllers/home');
const admin = require('./controllers/admin');
const login = require('./controllers/login');

//Проверка прав доступа
const isAdmin = function (req, res, next) {
  if (req.session.isAdmin) {
    return next();
  } else {
    res.redirect('/login');
  }
};

router.get('/', home.get);
router.post('/', home.post);

router.get('/login', login.get);
router.post('/login', login.login);

router.get('/admin', admin.get);
router.post('/admin/skills', isAdmin, admin.postskills);
router.post('/admin/upload', isAdmin, admin.upload);

module.exports = router;