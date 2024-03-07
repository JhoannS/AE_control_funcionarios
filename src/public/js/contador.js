document.addEventListener("DOMContentLoaded", function () {
    // Obtener todas las cajas
    var pendientes = document.querySelectorAll("#pendientes");
    var enviadas = document.querySelectorAll("#enviadas");
    var misEvidencias = document.querySelectorAll("#misEvidencias");

    // Mostrar el número de evidencias
    var contador = document.getElementById("contador");
    contador.textContent = pendientes.length;

    var contador = document.getElementById("contador2");
    contador.textContent = enviadas.length;



    // Obtener la tabla
    var tabla = document.getElementById("tablaf");
    var tablae = document.getElementById("tablae");

    // Obtener todas las filas de la tabla que tienen datos
    var filasConDatos = tabla.querySelectorAll("tbody tr");
    var filasConDatose = tablae.querySelectorAll("tbody tr");

    // Mostrar el número de filas con datos
    var contadorFun = document.getElementById("contadorFun");
    contadorFun.textContent = filasConDatos.length;

    var contadorEvi = document.getElementById("contadorEvi");
    contadorEvi.textContent = filasConDatose.length;


});


// mostrar cantidad de personas en ese equipo
function contarPalabras() {
    var contadorCor = 0;
    var contadorAAC = 0;
    var contadorLAG = 0;
    var contadorADS = 0;
    
    // Buscar todas las celdas de la tabla
    var celdas = document.querySelectorAll('#tablaf td');
    
    // Iterar sobre cada celda y contar las palabras clave
   
    celdas.forEach(function(celda) {
        var textoCelda = celda.textContent.toLowerCase(); // Convertir texto de celda a minúsculas

        // Incrementar el contador correspondiente si el texto de la celda coincide con una palabra clave
        if (textoCelda === 'coordinación') {
            contadorCor++;
        } else if (textoCelda === 'administración archivo central') {
            contadorAAC++;
        } else if (textoCelda === 'lineamientos archivos de gestión') {
            contadorLAG++;
        } else if (textoCelda === 'administración documental sgdea') { // Convertir palabra clave a minúsculas
            contadorADS++;
        }
    });
    
    // Actualizar los contadores en la página
    document.getElementById('contadorCor').textContent = contadorCor;
    document.getElementById('contadorAAC').textContent = contadorAAC;
    document.getElementById('contadorLAG').textContent = contadorLAG;
    document.getElementById('contadorADS').textContent = contadorADS;
}


// Llamar a la función para contar las palabras cuando la página se cargue
window.onload = contarPalabras;

