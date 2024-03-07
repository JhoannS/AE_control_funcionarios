  // Obtener la fecha actual
  const fechaActual = new Date();
  
  // Formatear la fecha actual en formato YYYY-MM-DD
  const year = fechaActual.getFullYear();
  const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaActual.getDate().toString().padStart(2, '0');
  const fechaActualFormatted = `${year}-${month}-${day}`;
  
  // Establecer la fecha actual como la fecha mínima para el campo de entrada de fecha
  document.getElementById('fecha_entrega').setAttribute('min', fechaActualFormatted);