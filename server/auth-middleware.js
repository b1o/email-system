const database = require("./databaseService");

exports.auth = (req, res, next) => {
  const userId = req.headers.user;
  if (userId) {
    const user = database.getUserById(userId);
    if (user) {
      if (user.session) {
        next();
        return;
      } else {
        return res.status(401).json({error: 'You are not logged in'})
      }
    }
    return res.status(401).json({ error: "No such user" });
  }

  return res.status(401).json({ error: "You are not logged in" });
};
