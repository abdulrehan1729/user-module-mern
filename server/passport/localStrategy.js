const User = require("../db/models/user");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "phoneNumber" // not necessary, DEFAULT
  },
  function(phoneNumber, password, done) {
    User.findOne({ phone_number: phoneNumber }, (err, user) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        console.log("not a user");
        return done(null, false, { msg: "Incorrect phone number" });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { msg: "Incorrect password" });
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;
