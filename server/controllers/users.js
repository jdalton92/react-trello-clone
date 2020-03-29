const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { password, email, checkPassword } = request.body;

    const existingUser = await User.find({ email: email });

    if (!email || email.length < 3) {
      return response.status(400).send({
        error: "Email must be longer than 3 characters"
      });
    }

    if (existingUser.length > 0) {
      return response.status(400).send({
        error: "Email already has existing account"
      });
    }

    if (password !== checkPassword) {
      return response.status(400).send({
        error: "Passwords must match"
      });
    }

    if (!password || password.length < 3) {
      return response.status(400).send({
        error: "Pasword minimum length 3"
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (e) {
    next(e);
  }
});

usersRouter.put(
  "/:id",
  middleware.tokenValidate,
  async (request, response, next) => {
    try {
      const {
        newEmail,
        oldPassword,
        newPassword,
        checkPassword
      } = request.body;

      const user = await User.findById(request.params.id);
      const existingEmail = await User.find({ email: newEmail });

      if (existingEmail.length > 0) {
        return response.status(401).json({
          error: "Email already in use"
        });
      }

      if (!user) {
        return response.status(401).json({
          error: "invalid user id"
        });
      }

      // Update password or email depending on
      // what is specified by user
      let passwordHash = user.passwordHash;
      let email = user.email;

      if (newPassword) {
        const passwordCorrect =
          user === null
            ? false
            : await bcrypt.compare(oldPassword, user.passwordHash);

        if (!(user && passwordCorrect)) {
          return response.status(401).json({
            error: "invalid user or password"
          });
        }

        if (newPassword !== checkPassword) {
          return response.status(400).send({
            error: "Passwords must match"
          });
        }

        if (!newPassword || newPassword.length < 3) {
          return response.status(400).send({
            error: "Pasword minimum length 3"
          });
        }
        const saltRounds = 10;
        passwordHash = await bcrypt.hash(newPassword, saltRounds);
      }

      if (newEmail) {
        email = newEmail;
      }

      const updatedUser = {
        email,
        passwordHash
      };

      const newUser = await User.findByIdAndUpdate(
        request.params.id,
        updatedUser,
        {
          new: true
        }
      );

      const userForToken = {
        email: newUser.email,
        id: newUser._id
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      response.status(200).send({
        token,
        email: newUser.email,
        id: newUser._id
      });
    } catch (e) {
      next(e);
    }
  }
);

usersRouter.delete("/:id", async (request, response, next) => {
  try {
    const { password } = request.body;

    const user = await User.findById(request.params.id);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (user && passwordCorrect) {
      await User.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({
        error: "invalid user or password"
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
