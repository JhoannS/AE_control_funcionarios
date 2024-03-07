const $fecha = document.querySelector(".dia");

function Relojdigital() {
  let f = new Date(),
    dia = f.getDate(),
    mes = f.getMonth(),
    anio = f.getFullYear();
  semana = f.getDay();

  dia = ("0" + dia).slice(-2);

  let mesN = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let nombreD = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  let showMes = mesN[mes];
  let showdia = nombreD[semana];
  $fecha.innerHTML = `${showdia}, ${dia}  ${showMes} de ${anio}`;
}
setInterval(() => {
  Relojdigital();
}, 1000);

let subMenuP = document.getElementById("subMenuP");

function menuP() {
  subMenuP.classList.toggle("visible-perfil");
}

// modales

// ENVIAR ACTIVIDAD
const modal_containerS = document.getElementById("modal_containerS");





// AÑADIR ACTIVIDAD
const openE = document.getElementById("openE");
const modal_containerE = document.getElementById("modal_containerE");
const closeE = document.getElementById("closeE");

openE.addEventListener("click", () => {
  modal_containerE.classList.add("showE");
});

closeE.addEventListener("click", () => {
  modal_containerE.classList.remove("showE");
});

// AÑADIR FUNCIONARIO
const openAñadirF = document.getElementById("openAñadirF");
const modal_containerAñadirF = document.getElementById(
  "modal_containerAñadirF"
);
const closeAñadirF = document.getElementById("closeAñadirF");

openAñadirF.addEventListener("click", () => {
  modal_containerAñadirF.classList.add("showF");
});

closeAñadirF.addEventListener("click", () => {
  modal_containerAñadirF.classList.remove("showF");
});
// COORDINACION
const openC = document.getElementById("openC");
const modal_containerC = document.getElementById("modal_containerC");
const closeC = document.getElementById("closeC");

openC.addEventListener("click", () => {
  modal_containerC.classList.add("show");
});

closeC.addEventListener("click", () => {
  modal_containerC.classList.remove("show");
});

// ADMINISTRACION ARCHIVO CENTRAL
const openAAC = document.getElementById("openAAC");
const modal_containerAAC = document.getElementById("modal_containerAAC");
const closeAAC = document.getElementById("closeAAC");

openAAC.addEventListener("click", () => {
  modal_containerAAC.classList.add("show");
});

closeAAC.addEventListener("click", () => {
  modal_containerAAC.classList.remove("show");
});

// LINEAMIENTOS ARCHIVO GESTION
const openLAG = document.getElementById("openLAG");
const modal_containerLAG = document.getElementById("modal_containerLAG");
const closeLAG = document.getElementById("closeLAG");

openLAG.addEventListener("click", () => {
  modal_containerLAG.classList.add("show");
});

closeLAG.addEventListener("click", () => {
  modal_containerLAG.classList.remove("show");
});

// ADMINISTRACION DOCUMENTAL SGDEA
const openADS = document.getElementById("openADS");
const modal_containerADS = document.getElementById("modal_containerADS");
const closeADS = document.getElementById("closeADS");

openADS.addEventListener("click", () => {
  modal_containerADS.classList.add("show");
});

closeADS.addEventListener("click", () => {
  modal_containerADS.classList.remove("show");
});

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el botón y el formulario
  var botonEnviar = document.getElementById("botonEnviar");
  var formulario = document.getElementById("formSubirEvidencias");

  // Agregar evento clic al botón
  botonEnviar.addEventListener("click", function () {
    // Enviar el formulario
    formulario.submit();
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Función para mapear números a texto
  function numeroATexto(numero) {
    switch (numero) {
      case "1":
        return "Coordinación";
      case "2":
        return "Administración archivo central";
      case "3":
        return "Lineamientos archivos de gestión";
      case "4":
        return "Administración documental SGDEA";
      default:
        return numero;
    }
  }
  function numeroATextoInstrumento(numero) {
    switch (numero) {
      case "1001":
        return "NA";
      case "2001":
        return "TVD";
      case "2002":
        return "CCD";
      case "2003":
        return "TRD";
      case "2004":
        return "Inventarios";
      case "2005":
        return "PGD";
      case "2006":
        return "Pinar";
      case "2007":
        return "SIC";
      case "2008":
        return "TCA";
      case "3001":
        return "Inventario";
      case "3002":
        return "NA";
      case "4001":
        return "MOREQ";
      case "4002":
        return "NA";
      default:
        return numero;
    }
  }

  // Selecciona todos los elementos con la clase "texto_a_cambiar_equipo"
  var elementosEquipo = document.querySelectorAll("#texto_a_cambiar_equipo");
  elementosEquipo.forEach(function (elemento) {
    // Cambia el texto llamando a la función de mapeo
    elemento.textContent = numeroATexto(elemento.textContent.trim());
  });

  // Selecciona todos los elementos con la clase "texto_a_cambiar_instrumento"
  var elementosInstrumento = document.querySelectorAll(
    "#texto_a_cambiar_instrumento"
  );
  elementosInstrumento.forEach(function (elemento) {
    // Cambia el texto llamando a la función de mapeo
    elemento.textContent = numeroATextoInstrumento(elemento.textContent.trim());
  });

  
});

    