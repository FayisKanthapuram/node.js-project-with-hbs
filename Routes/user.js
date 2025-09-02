const express = require("express");
const user = express.Router();
const {
  validateLoginInput,
  validateUsernameAndPassword,
  checkAuth,
} = require("../middleware/middlewares");
let flag = false;

user.get("/", validateLoginInput, (req, res) => {
  if (flag) {
    res.render("login", { msg: "Logout Successfully", title: "Login Page" });
    flag = false;
  } else {
    res.render("login", {
      msg: req.session.wrongPassword ? "Invalid Credentials" : "",
      title: "Login Page",
    });
    req.session.wrongPassword = false;
  }
});

user.post("/verify", validateUsernameAndPassword, (req, res) => {
  req.session.wrongPassword = true;
  res.redirect("/");
});

user.get("/home", checkAuth, (req, res) => {
  res.render("home", { User: req.session.user, title: "Home page" });
});

user.post("/logout", (req, res) => {
  flag = true;
  req.session.destroy();
  res.redirect("/");
});

module.exports = user;

