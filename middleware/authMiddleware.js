const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Not authorized");
    }
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.jwtSecret
    );
    req.userId = userId;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).send("Not authorized");
  }
};
