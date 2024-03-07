const express = require("express");
const router = express.Router();
const pool = require('../database');
const fs = require('fs');
const { estaLogueado } = require("../lib/auth");
const multer = require("multer");

// ::::::::::::::::::::::::::::::::::::::::::
// FUNCIONARIO
// ::::::::::::::::::::::::::::::::::::::::::


// INDEX DONDE TRAE {EVIDENCIAS, Y DATOS DE USUARIO LOGUEADO}
router.get("/indexFun", estaLogueado, async (req, res) => {
  try {
    // Obtener el ID de usuario del perfil actual
    const userId = req.user.documento_id;

    // Consultar las evidencias asignadas al usuario actual
    const evidenciasQuery = "SELECT e.*, f.nombres AS nombre_funcionario, f.apellidos AS apellido_funcionario FROM EvidenciaTrabajo e JOIN Asignaciones a ON e.evidencia_trabajo_id = a.evidencia_id JOIN Funcionario f ON f.documento_id = a.documento_id WHERE a.documento_id = ?";
    const evidenciasRaw = await pool.query(evidenciasQuery, [userId]);
    const evidencias = evidenciasRaw[0];
    console.log(evidencias);

    // Define la función para formatear la fecha con hora
    function formatDateTime(dateString) {
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      };
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", options);
    }

    // Formatea la fecha y hora en cada objeto de evidencias
    evidencias.forEach(function (evidencia) {
      evidencia.fecha_formateada = formatDateTime(evidencia.fecha_entrega);
      evidencia.fecha_formateada2 = formatDateTime(evidencia.fecha_actualizacion);
    });

    // Suponiendo que 'evidencias' contiene todas las evidencias
    const evidenciasDescargar = evidencias.filter(
      (evidencia) => evidencia.estado === "Entregado"
    );
    const evidenciasPendientes = evidencias.filter(
      (evidencia) => evidencia.estado === "Pendiente"
    );

    res.render("Funcionario/indexFun", {
      evidencias,
      evidenciasD: evidenciasDescargar,
      evidenciasP: evidenciasPendientes,
      user: req.user
    });
  } catch (error) {
    console.error("Error al obtener la información del funcionario:", error);
    req.flash("error", "Error al obtener la información del funcionario.");
    res.redirect("/");
  }
});

// DESCARGAR EVIDENCIA
router.get('/indexFun/descargarPDF/:id',estaLogueado ,  async (req, res) => {
  const { id } = req.params;

  try {
    // Consulta el nombre del archivo en la base de datos por ID
    const query = 'SELECT archivoPdf FROM EvidenciaTrabajo WHERE evidencia_trabajo_id = ?';
    const [result] = await pool.query(query, [id]);

    if (result.length === 0) {
      console.log('No se encontró ningún archivo PDF con ese ID.');
      return res.status(404).alert('Archivo no encontrado');
    }

    const nombreArchivo = result[0].archivoPdf;
    const pathToFile = `uploads/${nombreArchivo}`;

    // Verifica si el archivo existe
    if (!fs.existsSync(pathToFile)) {
      console.log('El archivo no existe en la ruta:', pathToFile);
      return res.status(404).send('Archivo no encontrado');
    }

    // Crea un flujo de lectura del archivo
    const fileStream = fs.createReadStream(pathToFile);

    // Establece los encabezados de la respuesta para indicar el tipo de contenido y la descarga del archivo
    res.setHeader('Content-disposition', `attachment; filename=${nombreArchivo}`);
    res.setHeader('Content-type', 'application/pdf');

    // Envía el flujo de lectura como respuesta a la solicitud HTTP
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error al descargar el archivo PDF:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// SUBIR EVIDENCIA {FORMULARIO}
router.get("/indexFun/subirEvidencia/:id", estaLogueado ,async (req, res) => {
  const { id } = req.params;
  const evidenciasRaw = await pool.query(
    "SELECT * FROM EvidenciaTrabajo WHERE evidencia_trabajo_id =?",
    [id]
  );

  const evidencias = evidenciasRaw[0];

  res.render("Funcionario/form_subir_evidenciaFun", { evidencias , user: req.user});
});

// SUBIR EVIDENCIA POR PARTE DEL ADMINISTRADOR


const upload = multer();

router.post(
  "/indexFun/subirEvidenciaFun/:id",
  upload.single("archivoPdf"),
  async (req, res) => {
    const { id } = req.params;

    const archivoPdf = req.file; // Aquí obtenemos el archivo adjunto

    try {
      // Verifica que se haya subido un archivo
      if (!archivoPdf) {
        throw new Error("No se ha subido ningún archivo.");
      }

      // Leer el archivo binario
      const pdfData = archivoPdf.buffer;

      // Guardar el archivo en la base de datos como binario
      const fechaActualizacion = req.body.fecha_actualizacion;
      const query = "UPDATE EvidenciaTrabajo SET fecha_actualizacion = ?, archivoPdf = ? , estado = 'Entregado' WHERE evidencia_trabajo_id = ?";
      await pool.query(query, [fechaActualizacion, pdfData, id]);

      console.log("Evidencia actualizada en la base de datos:", archivoPdf.originalname);

      req.flash("success", "Evidencia actualizada exitosamente.");
      res.redirect("/indexFun");
    } catch (error) {
      console.error("Error al actualizar la evidencia:", error.message);
      req.flash("error", "Hubo un error al actualizar la evidencia.");
      res.redirect("/indexFun");
    }
  }
);


module.exports = router;
