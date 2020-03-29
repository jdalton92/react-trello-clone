const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    const user = await User.findOne({ email: body.email });
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid email or password"
      });
    }

    const userForToken = {
      email: user.email,
      id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response.status(200).send({
      token,
      email: user.email,
      id: user._id
    });
  } catch (e) {
    next(e);
  }
});

module.exports = loginRouter;
