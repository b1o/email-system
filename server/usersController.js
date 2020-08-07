const database = require('./databaseService');
const uuid = require('uuid').v4;

exports.createUser = (req, res) => {
  const body = req.body;
  const loggedUser = body.loggedUser;
  if (!loggedUser || !loggedUser.isAdmin){
    res.status(403).json({error: "No access to this page!"});
    return;
  }
  const id = uuid();
  const user = {id, ...body};
  database.addUser(user);
  database.updateDatabase(() => {
    res.json(user);
  })
}

exports.getUsers = (req, res) => {
  if (req.currentUser.isAdmin){
    res.json(database.getAllUsers());
  }
  else {
    res.status(401).json({error: 'No access!'})
  }
}

exports.registerUser = (req, res) => {
  const id = uuid();
  const body = req.body;
  const user = {id, ...body};
  database.addUser(user);
  this.loginUser(res, req);
}

exports.loginUser = (req, res) => {
  const body = req.body;
  const users = database.getAllUsers();
  let existingUser;
  users.forEach(user => {
    if (user.email == body.email && user.password == body.password){
      database.updateUser(user.id, {session: uuid()});
      existingUser = user;
    }
  })
  if (existingUser){
    return res.json(existingUser);
  }
  else {
    return res.status(401).json({error: 'Auth failed.'})
  }
}

exports.logoutUser = (req, res) => {
  const body = req.body;
  database.updateUser(body.userId, {session: null});
  res.json();
}

exports.getUserInfo = (req, res) => {
  const body = req.body;
  userId = body.userId;
  const user = database.getUserById(userId);
  if (user && user.session){
    res.json(user);
  }
  else {
    res.status(401).json({error: 'No auth.'});
  }
}
