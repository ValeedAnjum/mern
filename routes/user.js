const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { sendEmailToUser } = require("./util/sendEmailToUser");
const auth = require("../middleware/auth");
const User = require("../models/user");
const Token = require("../models/token");
const { json } = require("express");

// @route    POST user
// @desc     Register user
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please Enter a password with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await token.save();
      sendEmailToUser(res, token.token);

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST user
// @desc     Register user
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Plase length must be 6 or more"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Wrong Password" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    get user
// @desc     get user data
// @access   Private
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(400).json({ error: [{ msg: "User deos not exicts" }] });
    }
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    get alluser
// @desc     get users data
// @access   Private
router.get("/allusers", auth, async (req, res) => {
  try {
    const user = await User.find().sort({ date: -1 });
    if (!user) {
      res.status(400).json({ error: [{ msg: "Users deos not exists" }] });
    }
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    get sendemail
// @desc     send email to user
// @access   Private
router.get("/sendemail", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get("email"),
      pass: config.get("pass"),
    },
  });

  const mailOptions = {
    from: "noreplay@gmail.com",
    to: "valeedanjumsiddiqui@gmail.com",
    subject: "Sending Email using Node.js",
    html: '<h1 style="color: blue;">no was easy!</h1>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email send");
    }
  });
});

// @route    post verification:token
// @desc     send email to user
// @access   Private
router.post("/verification/:usertoken", async (req, res) => {
  const { usertoken } = req.params;
  // const token = await Token.findOneAndDelete({ token: usertoken });
  const token = await Token.findOne({ token: usertoken });
  if (!token) {
    return res.status(400).json({ errors: [{ msg: "Token is not valid" }] });
  }
  const user = await User.findById(token._userId);
  user.isVarified = true;
  await user.save();
  res.json(user);
});

module.exports = router;
