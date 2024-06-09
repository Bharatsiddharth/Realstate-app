var express = require('express');
var router = express.Router();


const UserSchema = require("../models/userSchema")
const PropertySchema = require("../models/propertySchema")
const passport = require("passport");
const LocalStrategy = require("passport-local");

const { isLoggedIn } = require("../utils/auth");


passport.use(UserSchema.createStrategy());


/* GET home page. */
router.get('/',async function(req, res, next) {
  try {
    const properties = await PropertySchema.find();
    res.render("index", {properties: properties})
  } catch (error) {
    res.send(error.message)
  }
});


router.get('/login', function(req, res, next) {
  res.render("login", {user:req.user})
});

router.get('/register', function(req, res, next) {
  res.render("register", {user:req.user})
});




router.post("/current", isLoggedIn, function (req, res, next) {
  res.send(req.user);
});


router.post("/register", async function (req, res, next) {
  try {
      const { name, email, password, role } = req.body;
      const newuser = new UserSchema({ name, email, role });
      await UserSchema.register(newuser, password);
      res.redirect("/login")
  } catch (error) {
      res.send(error.message);
  }
});

router.post(
  "/login",
  passport.authenticate("local"),
  function (req, res, next) {
      res.redirect("/user/profile")
  }
);

router.get("/profile",isLoggedIn,async function (req, res, next) {
  try {
    const properties = await PropertySchema.find();
    res.render("profile", {properties:properties, user:req.user})
  } catch (error) {
    
  }
});


router.get("/logout", function (req, res, next) {
  req.logout(() => {
    res.redirect("/user")
  });
});


module.exports = router;
