const User = require("../db/models/user");
const Token = require("../db/models/emailToken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports = {
  // Registeration for new user
  registerUser(req, res) {
    const { firstName, lastName, phoneNumber, password } = req.body;
    const { token } = req.params;

    Token.findOne(
      {
        verification_token: token,
        verification_token_expires: { $gte: Date.now() }
      },
      (err, token) => {
        if (err) {
          console.log(err);
          res.json({ error: err });
        } else if (token) {
          const email = token.email;

          User.findOne({ phone_number: phoneNumber }, (error, user) => {
            if (error) {
              console.log(`error occured: ${error}`);
              res.json({ error: error });
            } else if (user) {
              res.json({
                msg:
                  "Sorry user is already exist please try with different phone number"
              });
            } else {
              const newUser = new User({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phoneNumber,
                password: password
              });
              newUser.save((err, user) => {
                if (err) {
                  console.log(`error: ${err}`);
                  res.json({ error: err });
                } else {
                  console.log(`user: ${user}`);
                  res.json({ user: user });
                }
              });
            }
          });
        }
      }
    );
  },

  //Email Verification
  verifyEmail(req, res) {
    const { email } = req.body;

    if (email === "" || email === undefined) {
      return res.json({ msg: "Email address is required" });
    }
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log(`error: ${err}`);
        res.json({ error: err });
      } else if (user) {
        console.log("user is already exist");
        res.json({
          msg:
            "Email is already registered please try with a different email address"
        });
      } else {
        const token = crypto.randomBytes(20).toString("hex");
        const newVerificationToken = new Token({
          email: email,
          verification_token: token,
          verification_token_expires: Date.now() + 3600000
        });
        newVerificationToken.save((err, token) => {
          if (err) {
            console.log(err);
            res.json({ error: err });
          } else {
            console.log("token is saved in db");
          }
        });

        const link = `http://localhost:4003/user/register/${token}`;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "testuser.getbasis@gmail.com",
            pass: "basisuser"
          }
        });

        const mailOpts = {
          from: "testuser.getbasis@gmail.com",
          to: email,
          subject: "email verification",
          text: `Dear ${email}
            You are recieving this because you (or someone else) requested to register on Basis.com, 
              please click on the following link or paste this into your browser to complete the process within one hour of recieving it
              
              ${link}
              
              if you did not request this please ignore this email `
        };

        transporter.sendMail(mailOpts, (err, resp) => {
          if (err) {
            console.log(err);
            res.json({ error: err });
          } else {
            console.log("sent");
            res.send(mailOpts);
          }
        });
      }
    });
  },

  //User Login
  userLogin(req, res, next) {}
};
