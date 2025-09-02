const users = [
  { username: "fayis", password: "fayis@123" },
  { username: "azarin", password: "1234" },
  { username: "shejin", password: "123" },
];
function validateLoginInput(req, res, next) {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    next();
  }
}

function validateUsernameAndPassword(req, res, next) {
  const validUser = users.find(
    (user) =>
      req.body.username === user.username && req.body.password === user.password
  );
  if (validUser) {
    req.session.user = req.body.username;
    res.redirect("/home");
  } else {
    next();
  }
}

function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = { validateLoginInput, validateUsernameAndPassword, checkAuth };
