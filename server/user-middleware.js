exports.getRequestUser = (database) => {
  return (req, res, next) => {
    if (req.headers.user){
      const user = database.getUserById(req.headers.user);
      req.currentUser = user;
    }
    next();
  }
}
