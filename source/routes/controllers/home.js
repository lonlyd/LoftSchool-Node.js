const db = require('../../db/db.js');

module.exports.get = function (req, res) {
  res.render('./pages/index', {
    title: 'Homepage',
  });
};

module.exports.post = function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.json({ msg: 'Заполните все поля', status: 'Error' });
  } else {
    db.get('messages')
      .push({ name: req.body.name },
        { email: req.body.email },
        { message: req.body.message })
      .write();

    req.flash('email', 'Message send');
    res.redirect('/');
  }
};

