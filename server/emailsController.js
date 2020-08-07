const database = require('./databaseService');

exports.getEmails = (req, res) => {
  return res.json(database.getEmails());
}
