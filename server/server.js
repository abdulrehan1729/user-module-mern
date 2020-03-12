const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./router/router");
const session = require("express-session");
const dbConnection = require("./db");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

//Port
const port = process.env.PORT || 4003;

//body-parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//Sessions
app.use(
  session({
    secret: "535510n-53cr37",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Router
app.use("/user", routes);

//Server port
app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
