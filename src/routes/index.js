const express = require("express");
const router = express.Router();
const passport = require("passport");
const { estaLogueado, noEstaLogueado } = require('../lib/auth');

// Middleware para verificar si el usuario está autenticado
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    const user = req.user;
    let ruta;
    if (user.rol_id === 1) {
      ruta = "/indexAdmin";
    } else if (user.rol_id === 2) {
      ruta = "/indexFun";
    } else {
      ruta = "/"; // Redirigir a la página principal en caso de un rol desconocido o no definido
    }
    return res.redirect(ruta);
  }
  next(); // Continuar si el usuario no está autenticado
}


// Ruta principal
router.get("/", noEstaLogueado, (req, res) => {
  res.render("index");
});

// Ruta para manejar el inicio de sesión
router.post("/validate", ensureAuthenticated ,(req, res, next) => {
  passport.authenticate("local.iniciarSesion", (err, user, ruta) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect(ruta);
    });
  })(req, res, next);
});

// Ruta para registrarse
router.get("/registrate", noEstaLogueado, (req, res) => {
  res.render("registrarse");
});

router.post(
  "/signIn",
  passport.authenticate("local.registrate", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
  })
);

// Ruta para manejar el cierre de sesión
router.get("/logout", (req, res, next) => {
  req.logOut(req.user, err => {
      if(err) return next(err);
      res.redirect("/");  
  });
});


module.exports = router;
