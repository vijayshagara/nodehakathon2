const mongo = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.singUp = async (req, res, next) => {
  //console.log(req.body.email);
  try {
    //Email Id Validation
    const existUser = await mongo.selectedDB
      .collection("users")
      .findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).send({ msg: "your emailId is already register" });
    }
    //confirm password checking
    const isSamePassword = checkPassword(
      req.body.password,
      req.body.confirmPassword
    );
    if (!isSamePassword) {
      return res.status(400).send({ msg: "password does not match" });
    } else {
      delete req.body.confirmPassword;
    }
    //password encryption(Hash)
    const randomString = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, randomString);
    //save in DB
    const inseredRegister = await mongo.selectedDB
      .collection("users")
      .insertOne({ ...req.body });
    res.send(inseredRegister);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const checkPassword = (password, confirmPassword) => {
  // return password !== confirmPassword ? false : true;
  if (password == confirmPassword) {
    return true;
  } else {
    return false;
  }
};

module.exports.singIn = async (req, res, next) => {
  //Authentication
  //----req.body:Email & Password----//

  try {
    //Email validation : your not a register user please singup
    const existUser = await mongo.selectedDB
      .collection("users")
      .findOne({ email: req.body.email });
    if (!existUser) {
      return res.status(400).send({ msg: "your not register User" });
    }
    //password validation
    const isSamePassword = await bcrypt.compare(
      req.body.password,
      existUser.password
    );
    if (!isSamePassword) {
      return res.status(400).send({ msg: "Incorrect Password" });
    }

    //Genrate and send token as a response
    const token = jwt.sign(existUser, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.send(token)
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
