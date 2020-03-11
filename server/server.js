const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./router/router");
const session = require("express-session");
const dbConnection = require("./db");
const MongoStore = require("connect-mongo")(session);

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
    secret: "535510n-53cr37", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
);

//Router
app.use("/user", routes);

//Server port
app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
