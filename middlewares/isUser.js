function isUser(req, res, next) {
    res.locals.user = req.header.authorization;
    next();
  }
  
  module.exports = isUser;  