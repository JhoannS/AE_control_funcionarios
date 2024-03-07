const timeago = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
    // Obtener la diferencia en segundos
    const diff = (new Date() - new Date(timestamp)) / 1000;

    // Si han pasado más de 24 horas, devuelve la fecha de creación
    if (diff > 24 * 60 * 60) {
        // Formatear la fecha de creación
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(timestamp).toLocaleDateString('es-ES', options);
    } else {
        // Sino, utilizar la librería timeago.js
        return timeago.format(timestamp, 'es_ES');
    }
};

module.exports = helpers;
