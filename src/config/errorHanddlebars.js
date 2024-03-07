module.exports = function (app) {
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('¡Algo salió mal!');
    });
  };
  