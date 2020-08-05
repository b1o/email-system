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
