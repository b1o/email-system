const path = require("path");
const fs = require("fs");
const objectToArray = require("./helpers").objectToArray;
const uuid = require('uuid').v4;

let database = {
  users: {},
  emails: {},
};

exports.updateDatabase = (callback) => {
  const filePath = path.join(__dirname, "/database.json");
  fs.writeFile(filePath, JSON.stringify(database), () => {
    console.log("database update complete");

    if (callback) {
      callback();
    }
  });
};

exports.readDatabase = () => {
  const filePath = path.join(__dirname, "/database.json");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.error(err);
    }
    database = JSON.parse(file);
    console.log(database.user);
  });
};

//#region Users

exports.addUser = (user) => {
  database.users[user.id] = user;
  this.updateDatabase();
};

exports.deleteUser = (userId) => {
  delete database.users[userId];
  this.updateDatabase();
};

exports.getUserById = (userId) => {
  return database.users[userId];
};

exports.updateUser = (userId, changes) => {
  const userToUpdate = database.users[userId];
  const updatedUser = { ...userToUpdate, ...changes };
  database.users[userId] = updatedUser;
  this.updateDatabase();
};

exports.getAllUsers = () => {
  return objectToArray(database.users);
};
//#endregion

//#region Emails
exports.getEmails = () => {
  return objectToArray(database.emails);
};

exports.createEmail = (email) => {
  const emailId = uuid();
  const emailWithId =  { ...email, emailId };
  database.emails[emailId] = emailWithId;
  this.updateDatabase();
  return emailWithId;
}

//#endregion
