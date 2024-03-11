const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");


// INICIAR SESION CON CREDENCIALES
passport.use(
  "local.iniciarSesion",
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contrasenia",
      passReqToCallback: true,
    },
    async (req, correo, contrasenia, done) => {
      const resultRaw = await pool.query(
        "select * from Funcionario where correo = ?",
        [correo]
      );
      const resultado = resultRaw[0];

    
      if (resultado.length > 0) {
        const user = resultado[0];
        const validPassword = await helpers.matchPassword(
          contrasenia,
          user.contrasenia
        )
        if (validPassword) {
          // Verificar el rol del usuario y redirigir en consecuencia
          let ruta;
          if (user.rol_id === 1) {
            ruta = "/indexAdmin";
          } else if (user.rol_id === 2) {
            ruta = "/indexFun";
          }
          // Redirigir al usuario a la ruta correspondiente
          return done(null, user, ruta);
        }
        return done(null, false, req.flash("message", "Contraseña incorrecta"));

      }
      done(null, false, req.flash("message", "Credenciales desconocidas"));

    }
  )
);


///


// REGISTRARSE DESDE EL INICIO

passport.use(
  "local.registrate",
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contrasenia",
      passReqToCallback: true,
    },
    async (req, correo, contrasenia, done) => {
      const { documento_id } = req.body;
      const newFuncionario = {
        correo,
        contrasenia,
        documento_id,
      };

      newFuncionario.contrasenia = await helpers.encryptPassword(contrasenia);
      const resultRaw = await pool.query("insert into Funcionario set ?", [
        newFuncionario,
      ]);
      const resultado = resultRaw;
      
      console.log(`>>> Se acaba de registrar el usuario: ${resultado} `);
      newFuncionario.documento_id = resultado.insertId;
      return done(null, newFuncionario[0]);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.documento_id);
});

passport.deserializeUser(async (documento_id, done) => {
  try {
    const resultRows = await pool.query(
      "SELECT * FROM Funcionario WHERE documento_id = ?",
      [documento_id]
    );
    const user = resultRows; // Accede al primer elemento del array de resultados
  
    done(null, user[0][0]);
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    done(error);
  }
});




module.exports = passport;
