const path = require('path');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

db.defaults({
  messages: [],
  products: [],
  skills: []
})
  .write();

module.exports = db;