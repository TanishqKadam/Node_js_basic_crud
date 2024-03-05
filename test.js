const express = require("express");
const app = express();
const db = require("./db");

//for parsing the data we require body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // this will give data in req.body

app.get("/", function (req, res) {
  res.send("<h1>hello world<h1/>");
});

//importing menu routes
const menuRoutes = require('./routes/menuRoutes');
//import person routes.
const personRoutes = require('./routes/personRoutes')

//use routes
app.use('/person',personRoutes);
//use that route
app.use('/menu',menuRoutes);


app.get("/home", (req, res) => {
  res.send("You are on home page");
});

app.get("/aboutus", (req, res) => {
  res.send("you are on about us page");
});

app.listen(3000, () => {
  console.log("server is started on port 3000");
});
