const User = require("../db/models/user");

module.exports = {
  registerUser(req, res) {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    User.find(
      { $or: [{ phone_number: phoneNumber }, { email: email }] },
      (error, user) => {
        console.log("hey");
        if (error) {
          console.log(`error occured: ${error}`);
          res.json({ error: error });
        } else if (user) {
          res.json({
            msg: "Sorry user is already exist please try with different number"
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
    console.log("end");
  }
};
