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
    req.flash("message", "Debes iniciar primero sesion.")
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
  passport.authenticate("local.iniciarSesion", (err, user, ruta, validarCampos) => {
    if (err) {
      return next(err);
    }
    function validarCampos(req) {
      const { correo, contrasenia } = req.body;
      return correo && contrasenia; // Devuelve true si todos los campos están llenos, false si no
    }
    if(!validarCampos(req)){
        req.flash("message", "Ningún campo puede quedar vacío.");
        return res.redirect("/");
    }
    if (!user) {
      return res.redirect("/");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", `Bienvenido nuevamente ${user.nombres}`);

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
  (req, res, next) => {
    function validarCampos(req) {
      const { documento_id, correo, contrasenia } = req.body;
      return documento_id && correo && contrasenia; // Devuelve true si todos los campos están llenos, false si no
    }
    // Validar campos antes de la autenticación
    if (!validarCampos(req)) {
      req.flash("message", "Ningún campo puede quedar vacío.");
      return res.redirect("/registrate");
    }

    // Usar passport.authenticate con la configuración
    passport.authenticate("local.registrate", {
      successRedirect: "/",
      failureRedirect: "/",
      failureFlash: true,
    })(req, res, next);
  }
);

// Ruta para manejar el cierre de sesión
router.get("/logout", (req, res, next) => {
  req.logOut(req.user, err => {
      if(err) return next(err);
      req.flash("success", "Nos vemos luego.")
      res.redirect("/");  
  });
});


module.exports = router;
