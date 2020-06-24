module.exports.get = function (req, res) {
  res.render('/', { title: 'Home' });
};

module.exports.post = function (req, res, next) {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.json({ msg: 'Заполните все поля', status: 'Error' });
  } else {
    res.json({
      name: '',
      email: '',
      message: ''
    });
  }
};

