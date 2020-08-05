const path = require("path");
const fs = require("fs");
const database = require("./databaseService");
const uuid = require("uuid").v4;

exports.createUser = (req, res) => {
  const id = uuid();
  const body = req.body;

  const loggedUser = req.body.loggedUser;

  if (!loggedUser) {
    res.status(403).json({ error: "No access to this page" });
    return;
  }

  if (!loggedUser.isAdmin) {
    res.status(403).json({ error: "No access to this page" });
    return;
  }

  const user = { id, ...body };
  database.addUser(user);

  database.updateDatabase(() => {
    res.json(user);
  });
};

exports.getUsers = (req, res) => {
  console.log(req.currentUser);
  res.json(database.getAllUsers());
};

// Post request with body {email, password, username, phonenumber}
exports.registerUser = (req, res) => {
  const id = uuid();
  const body = req.body;
  const user = { id, ...body };
  database.addUser(user);
  this.loginUser(req, res);
};

exports.getUserInfo = (req, res) => {
  if (req.currentUser) {
    const user = database.getUserById(req.currentUser.id);
    console.log(user);

    if (user && user.session) {
      res.json(user);
    } else {
      res.status(401).json({ error: "No auth" });
    }
  }
};

exports.loginUser = (req, res) => {
  // email, password
  const body = req.body;
  const users = database.getAllUsers();
  let existingUser;
  users.forEach((user) => {
    if (user.email == body.email && user.password == body.password) {
      database.updateUser(user.id, { session: uuid() });
      existingUser = user;
    }
  });

  if (existingUser) {
    return res.json(existingUser);
  } else {
    return res.status(401).json({ error: "Auth failed" });
  }
};

exports.logoutUser = (req, res) => {
  const user = req.currentUser;

  if (user) {
    database.updateUser(user.id, { session: null });
  }
  res.json({});
};
