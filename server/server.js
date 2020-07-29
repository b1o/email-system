const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const fs = require("fs");

const staticFolder = path.join(__dirname, "../dist/email-system");
console.log(__dirname);

app.use(express.static(staticFolder));
app.use(cors());
app.use(bodyParser.json());

let users = [];

app.post("/user/create", (req, res) => {
  const id = Math.random();
  const body = req.body;

  const user = { id, ...body };
  users.push(user);

  updateDatabase(() => {
    res.json(user);
  });
});

app.get('/users', (req, res) => {
  res.json(users);
})

function readDatabase() {
  const filePath = path.join(__dirname, "/database.json");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.error(err);
    }
    users = JSON.parse(file);
    console.log(users)
  });
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

app.listen(port, () => {
  console.log(`Server is listerning on port: ${port}`);
  readDatabase();
});
