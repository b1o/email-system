const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const fs = require("fs");

const staticFolder = path.join(__dirname, "../dist/email-system");
console.log(__dirname);

const userController = require('./usersController')

app.use(express.static(staticFolder));
app.use(cors());
app.use(bodyParser.json());


app.post("/user/create", (req, res) => {
  userController.createUser(req, res);
});

app.get('/users', (req, res) => {
  userController.getUsers(req, res);
})



app.listen(port, () => {
  console.log(`Server is listerning on port: ${port}`);
  userController.readDatabase();
});
