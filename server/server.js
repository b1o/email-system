const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const staticFolder = path.join(__dirname, '../dist/email-system')
const fs = require('fs');
const database = require('./databaseService');
const userController = require('./usersController');
const emailController = require('./emailsController');
const auth = require('./auth-middleware').auth;
const getRequestUser = require('./user-middleware').getRequestUser;

app.use(express.static(staticFolder));
app.use(cors());
app.use(bodyParser.json());
app.use(getRequestUser(database));

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  database.readDatabase();
})

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/greeting', (req, res) => {
  res.status(200);
  res.json({status: true});
})

app.post('/auth/register', userController.registerUser);

app.post('/auth/login', userController.loginUser);

app.post('/auth/logout', auth, userController.logoutUser)

app.post('/user/create', auth, userController.createUser);

app.post('/users/current', userController.getUserInfo);

app.get('/users', auth, userController.getUsers);

app.get("/emails", auth, emailController.getEmails);

app.get("/emails/sent", auth, emailController.getSentEmails);

app.post("/emails/create", auth, emailController.createEmail);

app.post("/emails/delete", auth, emailController.deleteEmail);

app.post("/emails/update", auth, emailController.updateEmail);
