const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const database = require("./databaseService");
const auth = require("./auth-middleware").auth
const emailsController = require('./emailsController');

const fs = require("fs");

const staticFolder = path.join(__dirname, "../dist/email-system");
console.log(__dirname);

const userController = require("./usersController");
const getRequestUser  = require("./user-middleware").getRequestUser;

app.use(express.static(staticFolder));
app.use(cors());
app.use(bodyParser.json());
app.use(getRequestUser(database))

app.post("/auth/register", userController.registerUser);
app.post("/auth/login", userController.loginUser);

app.post("/user/create", auth, userController.createUser);

app.post("/auth/logout", userController.logoutUser)

app.get("/users/current", userController.getUserInfo)

app.get("/users", auth, userController.getUsers);

app.get("/emails", auth, emailsController.getEmails)
app.get("/emails/sent", auth, emailsController.getSentEmails)

app.post("/emails/create", auth, emailsController.createEmail)

app.listen(port, () => {
  console.log(`Server is listerning on port: ${port}`);
  database.readDatabase();
});
