document.addEventListener("DOMContentLoaded", function () {
    var inputBusqueda = document.getElementById("inputBusqueda");
    var inputBusquedaEvi = document.getElementById("inputBusquedaEvi");
    var filas = document.querySelectorAll(".lista tr");
    var filasEvi = document.querySelectorAll(".listaEvi tr");

    inputBusqueda.addEventListener("input", function () {
        var filtro = inputBusqueda.value.trim().toLowerCase();
        

        filas.forEach(function (fila) {
            var mostrar = false;
            fila.querySelectorAll("td").forEach(function (celda) {
                if (celda.textContent.trim().toLowerCase().includes(filtro)) {
                    mostrar = true;
                }
            });
            fila.style.display = mostrar ? "table-row" : "none";
        });

    });

    inputBusquedaEvi.addEventListener("input", function () {
        var filtroEvi = inputBusquedaEvi.value.trim().toLowerCase();

        filasEvi.forEach(function (filaE) {
            var mostrarE = false;
            filaE.querySelectorAll("td").forEach(function (celdaE) {
                if (celdaE.textContent.trim().toLowerCase().includes(filtroEvi)) {
                    mostrarE = true;
                }
            });
            filaE.style.display = mostrarE ? "table-row" : "none";
        });
    });
});
