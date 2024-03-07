const express = require("express");
const router = express.Router();
const pool = require("../database");
const fs = require('fs');
const multer = require("multer");
const { estaLogueado, noEstaLogueado } = require("../lib/auth");


// ::::::::::::::::::::::::::::::::::::::::::
// ADMINISTRADOR
// ::::::::::::::::::::::::::::::::::::::::::


// INDEX DONDE TRAE {FUNCIONARIOS, EVIDENCIAS, EQUIPOS DE TRABAJO}
router.get("/indexAdmin", estaLogueado, async (req, res) => {
  try {
    // Traer funcionarios
    const funcionariosRaw = await pool.query("SELECT * FROM Funcionario");
    const funcionarios = funcionariosRaw[0];

    // Traer instrumentos archivisticos
    const instrumentoRaw = await pool.query("SELECT * FROM InstrumentoArchivistico");
    const instrumentoArchivistico = instrumentoRaw[0];

    // Traer equipos de trabajo
    const equiposTRaw = await pool.query("SELECT * FROM EquipoTrabajo");
    const equiposTrabajo = equiposTRaw[0];

    // Declara evidencias fuera del bucle
    let evidencias = [];

    // Iterar sobre cada funcionario
    for (const funcionario of funcionarios) {
      const funcionario_id = funcionario.documento_id;
      
      // Obtener todas las evidencias asignadas al funcionario específico
      const evidenciasRaw = await pool.query("SELECT E.*, F.nombres AS nombre_funcionario, F.apellidos AS apellido_funcionario FROM EvidenciaTrabajo E INNER JOIN Funcionario F ON E.funcionario_id = F.documento_id WHERE E.funcionario_id = ?", [funcionario_id]);
      const evidenciasFuncionario = evidenciasRaw[0];
      
      // Agregar las evidencias del funcionario actual al arreglo de evidencias
      evidencias.push(...evidenciasFuncionario);
      
      // Aquí puedes hacer algo con las evidencias, como mostrarlas o procesarlas de alguna manera
      // console.log(`Evidencias asignadas al funcionario ${funcionario_id}:`, evidenciasFuncionario);
    }
  

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

    // Renderizar la plantilla y pasarle los datos
    res.render("Admin/indexAdmin", {
      funcionarios,
      instrumentoArchivistico,
      equiposTrabajo,
      evidencias,
      evidenciasD: evidenciasDescargar,
      evidenciasP: evidenciasPendientes,
      user: req.user
    });
  } catch (error) {
    console.error("Error al obtener la información de administrador:", error);
    req.flash("error", "Error al obtener la información de administrador.");
    res.redirect("/");
  }
});

// CREAR FUNCIONARIO
router.post("/indexAdmin",estaLogueado ,async (req, res) => {
  const {
    documento_id,
    nombres,
    apellidos,
    telefono,
    correo,
    equipo_trabajo_id,
    instrumento_archivistico_id,
  } = req.body;

  const newFuncionario = {
    documento_id,
    nombres,
    apellidos,
    telefono,
    correo,
    equipo_trabajo_id,
    instrumento_archivistico_id,
  };

  const registroFun = await pool.query("insert into Funcionario set ?", [
    newFuncionario,
  ]);

  if (!registroFun) {
    console.log(err);
  }
  req.flash("success", "Funcionario creado exitosamente.");
  res.redirect("/indexAdmin");
});

// ELIMINAR FUNCIONARIO
router.get("/indexAdmin/eliminarFun/:id", estaLogueado ,async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM Funcionario WHERE documento_id = ?", [id]);
  req.flash("success", "Funcionario eliminado exitosamente.");
  res.redirect("/indexAdmin");
});

// ACTUALIZAR FUNCIONARIO {FORMULARIO}
router.get("/indexAdmin/actualizarFun/:id",estaLogueado , async (req, res) => {
  const { id } = req.params;

  // trae instrumentos archivisticos
  const instrumentoRaw = await pool.query(
    "SELECT * FROM InstrumentoArchivistico"
  );
  const resultInstrumentoArchivistico = instrumentoRaw[0];

  // trae  equipos
  const equiposTRaw = await pool.query("SELECT * FROM EquipoTrabajo");
  const resultEquiposTrabajo = equiposTRaw[0];

  // trae datos del funcionario
  const datosFunRaw = await pool.query(
    "SELECT * FROM Funcionario WHERE documento_id = ?",
    [id]
  );
  const resultDatosFun = datosFunRaw[0];

  res.render("Admin/form_update_fun", {
    usuario: resultDatosFun[0],
    equiposTrabajo: resultEquiposTrabajo,
    iArchivistico: resultInstrumentoArchivistico,
  });
});

// ACTUALIZAR FINALMENTE EL FUNCIONARIO
router.post("/indexAdmin/actualizarFun/:id", estaLogueado ,async (req, res) => {
  
  const { id } = req.params;
  const {  nombres,
    apellidos,
    telefono,
    correo,
    equipo_trabajo_id,
    instrumento_archivistico_id } = req.body;

  const camposActualizables = {  nombres,
    apellidos,
    telefono,
    correo,
    equipo_trabajo_id,
    instrumento_archivistico_id };
  const updateFuncionario = {};

  // Recorrer todos los campos actualizables
  for (const campo in camposActualizables) {
    // Verificar si el campo está presente en la solicitud y no es vacío
    if (camposActualizables[campo]) {
      // Agregar el campo al objeto de actualización
      updateFuncionario[campo] = camposActualizables[campo];
    }
  }

  const query = "update Funcionario set ? where documento_id = ?";
  await pool.query(query, [updateFuncionario, id]);

  req.flash("success", "Funcionario actualizada exitosamente.");
  res.redirect("/indexAdmin");
});

///////////////////////////////////
// EVIDENCIAS
//////////////////////////////////

// CREAR EVIDENCIA POR PARTE DEL ADMINISTRADOR {FORMULARIO}
router.post("/indexAdmin/addEvidencia", estaLogueado, async (req, res) => {
  const { funcionario_id, titulo, descripcion, fecha_entrega } = req.body;

  try {
    // Verifica si el usuario seleccionado existe en la base de datos
    const usuarioExistente = await pool.query("SELECT * FROM Funcionario WHERE documento_id = ?", [funcionario_id]);
    if (usuarioExistente.length === 0) {
      req.flash("error", "El usuario seleccionado no existe.");
      return res.redirect("/indexAdmin");
    }

    // Crear una nueva evidencia
    const newEvidencia = {
      funcionario_id,
      titulo,
      descripcion,
      fecha_entrega
    };

    // Insertar la nueva evidencia en la tabla EvidenciaTrabajo
    await pool.query("INSERT INTO EvidenciaTrabajo SET ?", [newEvidencia]);

    // Obtener el ID de la evidencia recién insertada mediante una consulta
    const evidenciaIdQuery = await pool.query("SELECT LAST_INSERT_ID() AS last_id");
    const evidenciaId = evidenciaIdQuery[0][0].last_id;

    // Crear una nueva asignación asociada al usuario seleccionado y a la evidencia recién creada
    const nuevaAsignacion = {
      documento_id: funcionario_id, // ID del usuario seleccionado
      evidencia_id: evidenciaId // ID de la evidencia recién insertada
    };

    // Insertar la nueva asignación en la tabla Asignaciones
    await pool.query("INSERT INTO Asignaciones SET ?", [nuevaAsignacion]);

    req.flash("success", "Evidencia creada exitosamente.");
    res.redirect("/indexAdmin");
  } catch (error) {
    console.error("Error al registrar la evidencia:", error);
    req.flash("error", "Hubo un problema al crear la evidencia.");
    res.redirect("/indexAdmin");
  }
});

// SUBIR EVIDENCIA {FORMULARIO}
router.get("/indexAdmin/subirEvidencia/:id", estaLogueado ,async (req, res) => {
  const { id } = req.params;
  const evidenciasRaw = await pool.query(
    "SELECT * FROM EvidenciaTrabajo WHERE evidencia_trabajo_id =?",
    [id]
  );

  const evidencias = evidenciasRaw[0];

  res.render("Admin/form_subir_evidencia", { evidencias });
});

// SUBIR EVIDENCIA POR PARTE DEL ADMINISTRADOR
const upload = multer({
  dest: "src/uploads/",
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("Solo se permiten archivos PDF"));
    }
    cb(null, true);
  },
});

router.post(
  "/indexAdmin/subirEvidencia/:id",
  upload.single("archivoPdf"),
  async (req, res) => {
    const { id } = req.params;

    const archivoPdf = req.file; // Aquí obtenemos el archivo adjunto

    try {
      // Verifica que se haya subido un archivo
      if (!archivoPdf) {
        throw new Error("No se ha subido ningún archivo.");
      }

      // Guardar el archivo en la base de datos como .pdf
      const nombreArchivo = archivoPdf.originalname;
      const fechaActualizacion = req.body.fecha_actualizacion;

      // Mueve el archivo subido de la carpeta temporal a la carpeta de destino
      fs.renameSync(archivoPdf.path, `src/uploads/${nombreArchivo}`);

      // Guardar en la base de datos
      const query = "UPDATE EvidenciaTrabajo SET fecha_actualizacion = ?, archivoPdf = ?, estado = 'Entregado' WHERE evidencia_trabajo_id = ?";
      await pool.query(query, [fechaActualizacion, nombreArchivo, id]);

      console.log("Evidencia actualizada en la base de datos:", nombreArchivo);

      req.flash("success", "Evidencia actualizada exitosamente.");
      res.redirect("/indexAdmin");
    } catch (error) {
      console.error("Error al actualizar la evidencia:", error.message);
      req.flash("error", "Hubo un error al actualizar la evidencia.");
      res.redirect("/indexAdmin");
    }
  }
);



// ELIMINAR EVIDENCIAS
router.get('/indexAdmin/eliminarEvi/:id',estaLogueado ,async (req, res)=>{
  const {id} = req.params

  await pool.query("Delete from Asignaciones where evidencia_id  = ?", [id])
  await pool.query("Delete from EvidenciaTrabajo where evidencia_trabajo_id  = ?", [id])
  req.flash('success', "Evidencia Eliminada")
  res.redirect('/indexAdmin')


})

// DESCARGAR EVIDENCIA
router.get('/indexAdmin/descargarPDF/:id',estaLogueado ,  async (req, res) => {
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
    const pathToFile = `src/uploads/${nombreArchivo}`;

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

// ACTUALIZAR EVIDENCIA {FORMULARIO}
router.get("/indexAdmin/actualizarEvi/:id",estaLogueado , async (req, res) => {
  const { id } = req.params;

  // trae  funcionarios
  const funcionarioRaw = await pool.query("SELECT * FROM Funcionario");
  const resultFun = funcionarioRaw[0];

  // trae datos de la evidencia
  const datosEviRaw = await pool.query(
    "SELECT * FROM EvidenciaTrabajo WHERE evidencia_trabajo_id = ?",
    [id]
  );
  const resultDatosEvi = datosEviRaw[0];

  res.render("Admin/form_update_evi", {
    evidencia: resultDatosEvi[0],
    funcionario: resultFun,
   
  });
});

router.post("/indexAdmin/actualizarEvi/:id", estaLogueado, async (req, res) => {
  const { id } = req.params;
  const { funcionario_id, titulo, descripcion, fecha_entrega, estado } = req.body;

  try {
    // Verificar si el usuario seleccionado existe en la base de datos
    const usuarioExistente = await pool.query("SELECT * FROM Funcionario WHERE documento_id = ?", [funcionario_id]);
    if (usuarioExistente.length === 0) {
      req.flash("error", "El usuario seleccionado no existe.");
      return res.redirect("/indexAdmin");
    }

    const camposActualizables = { funcionario_id, titulo, descripcion, fecha_entrega, estado };
    const updateEvidencia = {};

    // Recorrer todos los campos actualizables
    for (const campo in camposActualizables) {
      // Verificar si el campo está presente en la solicitud y no es vacío
      if (camposActualizables[campo]) {
        // Agregar el campo al objeto de actualización
        updateEvidencia[campo] = camposActualizables[campo];
      }
    }

    // Actualizar la evidencia en la tabla EvidenciaTrabajo
    await pool.query("UPDATE EvidenciaTrabajo SET ? WHERE evidencia_trabajo_id = ?", [updateEvidencia, id]);

    // Actualizar la asignación asociada a la evidencia recién actualizada
    const updateAsignacion = { documento_id: funcionario_id };
    await pool.query("UPDATE Asignaciones SET ? WHERE evidencia_id = ?", [updateAsignacion, id]);

    req.flash("success", "Evidencia actualizada exitosamente.");
    res.redirect("/indexAdmin");
  } catch (error) {
    console.error("Error al actualizar la evidencia:", error);
    req.flash("error", "Hubo un problema al actualizar la evidencia.");
    res.redirect("/indexAdmin");
  }
});



module.exports = router;
