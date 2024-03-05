const passport = require("passport");
const LocalStartegy = require("passport-local").Strategy;
const person = require("./models/Person");

passport.use(
    new LocalStartegy(async (USERNAME, password, done) => {
      //authetication logic here
      try {
        console.log("recieved credentials");
        const user = await person.findOne({ username: USERNAME });
        if (!user) {
          return done(null, false, { message: "Incorrect Username" });
        }
        const IspasswordMatch = await user.comparePassword(password);
        if (IspasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      } catch (error) {
        console.log("failed in authentication");
        return done(err); //callback function
      }
    })
  );

module.exports = passport;