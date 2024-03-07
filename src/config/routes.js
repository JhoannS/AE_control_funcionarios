const express = require("express");
const path = require("path");
const app = express();

const indexRoutes = require("../routes/index");
const indexAdminRoutes = require("../routes/indexAdmin");
const indexFunRoutes = require("../routes/indexFun");

module.exports = function (app) {
  app.use(indexRoutes);
  app.use(indexAdminRoutes);
  app.use(indexFunRoutes);
};
