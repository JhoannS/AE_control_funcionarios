const path = require("path");
const exphbs = require("express-handlebars");

module.exports = function (app) {
  app.set("port", process.env.PORT || 4000);
  app.set("views", path.join(__dirname, "../views"));
  app.engine(
    ".hbs",
    exphbs.engine({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
      helpers: require("../lib/handlebars"),
    })
  );
  app.set("view engine", ".hbs");
};
