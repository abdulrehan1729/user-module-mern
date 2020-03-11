const User = require("../db/models/user");

module.exports = {
  // Registeration for new user
  registerUser(req, res) {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    User.findOne(
      { $or: [{ phone_number: phoneNumber }, { email: email }] },
      (error, user) => {
        if (error) {
          console.log(`error occured: ${error}`);
          res.json({ error: error });
        } else if (user) {
          res.json({
            msg:
              "Sorry user is already exist please try with different phoen number or email address"
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
      }
    );
  },

  //User Login
  userLogin(req, res, next) {}
};
