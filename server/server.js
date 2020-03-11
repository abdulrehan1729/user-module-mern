const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./router/router");

//Port
const port = process.env.PORT || 4003;

//body-parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//Router
app.use("/user", routes);

//Server port
app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
