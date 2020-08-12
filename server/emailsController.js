const database = require("./databaseService");

exports.getEmails = (req, res) => {
  const allEmails = database.getEmails();

  const myEmails = allEmails.filter((email) =>
    email.to.some((user) => user.id == req.currentUser.id)
  );

  res.json(
    myEmails.map((email) => ({
      ...email,
      from: database.getUserById(email.from),
    }))
  );
};

exports.getSentEmails = (req, res) => {
  const allEmails = database.getEmails();
  const sentEmails = allEmails.filter(
    (email) => email.from == req.currentUser.id
  );

  res.json(
    sentEmails.map((email) => ({
      ...email,
      from: database.getUserById(email.from),
    }))
  );
};

exports.createEmail = (req, res) => {
  const email = req.body;
  const currentUser = req.currentUser;

  const newEmail = { ...email, from: currentUser.id };
  const databaseEmail = database.createEmail(newEmail);

  res.json(databaseEmail);
};

exports.deleteEmail = (req, res) => {
  const emailId = req.body.emailId;
  console.log(emailId);
  database.deleteEmail(emailId);
  res.json({});
}

exports.updateEmail = (req, res) => {
  const emailId = req.body.emailId;
  const changes = req.body.changes;
  console.log(emailId);
  const updatedEmail = database.updateEmail(emailId, changes);
  res.json({email: updatedEmail});
}
