module.exports.get = function (req, res) {
  res.render('./pages/login', { title: 'Login' });
};

module.exports.login = function (req, res) {
  if (!req.body.email || !req.body.password) {
    return res.json({ msg: 'Заполните все поля', status: 'Error' });
  } else {
    res.json({
      email: req.body.email ,
      password: req.body.password
    });
    req.session.isAdmin = true;
    res.redirect('/admin');
  }
};