const path = require("path");
const fs = require('fs');

let database = {
  users: {},
  emails: {}
}

exports.readDatabase = () => {
  const filePath = path.join(__dirname, '/database.json');
  fs.readFile(filePath, (err, file) => {
    if (err){
      console.error(err);
    }
    database = JSON.parse(file);
  })
}

exports.updateDatabase = (callback) => {
  const filePath = path.join(__dirname, '/database.json');
  fs.writeFile(filePath, JSON.stringify(database), () => {
    console.log("Database updated!");
    if (callback){
      callback();
    }
  })
}

exports.getAllUsers = () => {
  return Object.keys(database.users).map(key => database.users[key]);
}

exports.getUserById = (id) => {
  return database.users[id];
}

exports.addUser = (user) => {
  database.users[user.id] = user;
  this.updateDatabase();
}

exports.deleteUser = (user) => {
  delete database.users[user.id];
  this.updateDatabase();
}

exports.updateUser = (userId, changes) => {
  const userToUpdate = database.users[userId];
  const updatedUser = {...userToUpdate, ...changes};
  database.users[userId] = updatedUser;
  this.updateDatabase();
}

exports.getEmails = () => {
  return Object.keys(database.emails).map(key => database.emails[key]);
}
