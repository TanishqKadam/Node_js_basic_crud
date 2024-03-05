const express = require("express");
const app = express();
const db = require("./db");
const passport = require('./auth');
//for parsing the data we require body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // this will give data in req.body

//middleware functions
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next(); //move on to the next phase.
};
app.use(logRequest);

//about auth
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get("/",localAuthMiddleware,function (req, res) {
  res.send("<h1>hello world<h1/>");
});

//importing menu routes
const menuRoutes = require("./routes/menuRoutes");
//import person routes.
const personRoutes = require("./routes/personRoutes");

//use routes
app.use("/person", localAuthMiddleware,personRoutes);
//use that route
app.use("/menu", menuRoutes);

app.get("/home", (req, res) => {
  res.send("You are on home page");
});

app.get("/aboutus", (req, res) => {
  res.send("you are on about us page");
});

app.listen(3000, () => {
  console.log("server is started on port 3000");
});
