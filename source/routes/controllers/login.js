module.exports.get = function (req, res) {
  res.render('/login', { title: 'Login' });
}

module.exports.post = function (req, res) {
  res.json({
    email: '',
    password: ''
  });
}