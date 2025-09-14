const express = require("express");
const app = express();
const hbs = require("hbs");
const nocache = require("nocache");
const session = require("express-session");
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const userRoute = require("./Routes/user.js");

app.use(express.static("public"));
app.set("view engine", "hbs");

app.use(
  session({
    secret: "mySecretKey",
    resave: false, //only saved if something changes in req.session(it improves performence)
    saveUninitialized: true, //save new session if it empty
    cookie: {
      httpOnly: true, // prevents client-side JS from reading cookie
      secure: false, // set true only if using HTTPS
      sameSite: "strict", // cross-site is not allowed
      maxAge: 1000 * 60 * 60, // session lasts 1 hour
    },
  })
);



app.use(nocache());

app.use("/", userRoute);

app.listen(3003, () => console.log(`Server is running at the port 3000`));
