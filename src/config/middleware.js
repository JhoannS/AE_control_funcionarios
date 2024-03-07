const morgan = require("morgan");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const { database } = require("../keys");

module.exports = function (app) {
  app.use(
    session({
      secret: "secretKey",
      resave: false,
      saveUninitialized: false,
      store: new MySQLStore(database),
    })
  );
  app.use(flash());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(passport.initialize());
  app.use(passport.session());
};
