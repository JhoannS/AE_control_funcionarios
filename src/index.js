const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { PDFDocument } = require("pdf-lib");
const passport = require("passport");

const { database } = require("./keys");

// inicializaciones
const app = express();
require("./lib/passport");

// configuraciones
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

// middlewares
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

// variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user && req.user.length > 0 ? req.user[0] : null;
  next();
});

//rutas

// >>> LOGIN
app.use(require("./routes"));

// >>> INDEX ADMINISTRADOR
app.use(require("./routes/indexAdmin"));

// >>> INDEX FUNCIONARIO)
app.use(require("./routes/indexFun"));

// archivos publicos
app.use(express.static(path.join(__dirname, "public")));

// iniciar el servidor
app.listen(app.get("port"), () => {
  console.log(">>> Servidor corriendo en el puerto:", app.get("port"));
});
