const fs = require('fs');
const path = require('path');
const db = require('../../db/db.js');


module.exports.get = function (req, res) {
  res.render('./pages/admin', {
    title: 'Admin',
  });
};

module.exports.postskills = function (req, res) {
  db.get('skills')
    .push({
      age: req.body.age,
      concerts: req.body.concerts,
      cities: req.body.cities,
      years: req.body.years
    })
    .write();
  req.flash('skills', 'Save!');
  res.redirect('/admin');
};

module.exports.upload = function (req, res) {

};