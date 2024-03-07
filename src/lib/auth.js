module.exports = {
    noEstaLogueado(req, res, next) {
        if (req.isAuthenticated()) {
            // Redirigir al usuario a su vista correspondiente
            if (req.user.rol_id === 1) {
                return res.redirect('/indexAdmin');
            } else if (req.user.rol_id === 2) {
                return res.redirect('/indexFun');
            }
        }
        // Si no está autenticado, permite el acceso
        return next();
    },
    estaLogueado(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        
        // Si el usuario intenta acceder a una vista que no le corresponde, muestra un mensaje de error
        if (req.user.rol_id === 1 && req.originalUrl.includes('/indexFun')) {
            req.flash('message', 'Acceso prohibido');
            return res.redirect('/indexAdmin');
        }
        if (req.user.rol_id === 2 && req.originalUrl.includes('/indexAdmin')) {
            req.flash('message', 'Acceso prohibido');
            return res.redirect('/indexFun');
        }

        // Si el usuario está autenticado y trató de acceder a su vista, continúa con la solicitud
        return next();
    }
}
