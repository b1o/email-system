const path = require("path");
const fs = require('fs')
let users = [];

exports.createUser = (req, res) => {
  const id = Math.random();
  const body = req.body;

  const user = { id, ...body };
  users.push(user);

  updateDatabase(() => {
    res.json(user);
  });
}

exports.getUsers = (req, res) => {
  console.log(users);
  res.json(users);
}

function updateDatabase(callback) {
  const filePath = path.join(__dirname, "/database.json");
  fs.writeFile(filePath, JSON.stringify(users), () => {
    console.log("database update complete");

    if (callback) {
      callback();
    }
  });
}

exports.readDatabase = () => {
  const filePath = path.join(__dirname, "/database.json");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.error(err);
    }
    users = JSON.parse(file);
    console.log(users)
  });
}
