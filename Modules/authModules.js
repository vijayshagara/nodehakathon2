const jwt = require("jsonwebtoken");
//Authentication
module.exports.authenticaterUser = (req, res, next) => {
  // check whether accessToken exist in headers
   if (!req.headers.accesstoken) {
    return res.status(400).send({ msg: "Token Not Found" });
  } 
  //Verify Token
  try {
    const userData = jwt.verify(
      req.headers.accesstoken,
      process.env.SECRET_KEY
    );
    req.body.currentUser = userData;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "unauthorised" });
  }
};
//Authorisation
module.exports.authorisedUser = (req, res, next) => {
  if (req.body.currentUser.role === "admin") {
    next();
  } else {
    return res
      .status(400)
      .send({ msg: "Forbidden : No Permission To Access " });
  }
};
