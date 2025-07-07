/* sonidos: 
- https://pixabay.com/sound-effects/spin-complete-295086/
- https://pixabay.com/sound-effects/error-126627/ */

function reiniciar() {
    /* Borramos todo el texto, los colores de fondo y las animaciones
    En realidad bastaría hacerlo en aquellos rellenos, con colores o
    animaciones, pero vamos a lo fácil y se lo quitamos a todos
    */
    /* Para no repetir muchas veces lo del document.getElementById,
    creamos vairables */
    const c1 = document.getElementById("c1");
    const c2 = document.getElementById("c2");
    const c3 = document.getElementById("c3");
    const c4 = document.getElementById("c4");
    const c5 = document.getElementById("c5");
    const c6 = document.getElementById("c6");
    const c7 = document.getElementById("c7");
    const c8 = document.getElementById("c8");
    const c9 = document.getElementById("c9");

    c1.textContent = "";
    c2.textContent = "";
    c3.textContent = "";
    c4.textContent = "";
    c5.textContent = "";
    c6.textContent = "";
    c7.textContent = "";
    c8.textContent = "";
    c9.textContent = "";
    c1.style.backgroundColor = "inherit";
    c2.style.backgroundColor = "inherit";
    c3.style.backgroundColor = "inherit";
    c4.style.backgroundColor = "inherit";
    c5.style.backgroundColor = "inherit";
    c6.style.backgroundColor = "inherit";
    c7.style.backgroundColor = "inherit";
    c8.style.backgroundColor = "inherit";
    c9.style.backgroundColor = "inherit";
    c1.classList.remove("animacionVictoria");
    c2.classList.remove("animacionVictoria");
    c3.classList.remove("animacionVictoria");
    c4.classList.remove("animacionVictoria");
    c5.classList.remove("animacionVictoria");
    c6.classList.remove("animacionVictoria");
    c7.classList.remove("animacionVictoria");
    c8.classList.remove("animacionVictoria");
    c9.classList.remove("animacionVictoria");

    // Volvemos a suscribirnos al evento
    document.querySelector("main")
        .addEventListener("click", jugar);
}

function comprobarCeldas(celdaA, celdaB, celdaC) {
    if (celdaA.textContent == celdaB.textContent
        && celdaA.textContent == celdaC.textContent
        && celdaC.textContent != "") {
        sonidoVictoria.play();
        // Accedemos a la variable --colorFondoVictoria definida en :root de CSS 
        // Para cambiarla podemos hacer document.documentElement.style.setProperty('--colorFondoVictoria', 'colorDeseado');
        const colorFondo = window.getComputedStyle(document.documentElement).getPropertyValue('--colorFondoVictoria');
        celdaA.style.backgroundColor = colorFondo;
        celdaB.style.backgroundColor = colorFondo;
        celdaC.style.backgroundColor = colorFondo;
        celdaA.classList.add("animacionVictoria");
        celdaB.classList.add("animacionVictoria");
        celdaC.classList.add("animacionVictoria");

        // Cuando gane alguien no debemos dejar seguir jugando.
        // Una opción es "desuscribirse" del evento click
        document.querySelector("main")
            .removeEventListener("click", jugar);
        // Para mostrar el div de la victoria
        document.getElementById("victoria").style.display = "block";
        document.querySelector("#victoria span").textContent = turno;
        if (turno == "X") {
            puntosX++;
            document.getElementById("puntosX").textContent = puntosX;
            document.getElementById("puntosX").classList.add("animacionPunto");
        } else {
            puntosY++;
            document.getElementById("puntosY").textContent = puntosY;
            document.getElementById("puntosY").classList.add("animacionPunto");
        }
    }
}

function comprobarVictoria() {
    const c1 = document.getElementById("c1");
    const c2 = document.getElementById("c2");
    const c3 = document.getElementById("c3");
    const c4 = document.getElementById("c4");
    const c5 = document.getElementById("c5");
    const c6 = document.getElementById("c6");
    const c7 = document.getElementById("c7");
    const c8 = document.getElementById("c8");
    const c9 = document.getElementById("c9");

    comprobarCeldas(c1, c2, c3);
    comprobarCeldas(c4, c5, c6);
    comprobarCeldas(c7, c8, c9);
    comprobarCeldas(c1, c4, c7);
    comprobarCeldas(c2, c5, c8);
    comprobarCeldas(c3, c6, c9);
    comprobarCeldas(c1, c5, c9);
    comprobarCeldas(c3, c5, c7);
}

function jugar(evt) {
    //console.log(evt.target, evt.currentTarget);
    // Como se puede hacer clic en el main, en su cabeceran en las celdas
    // o en el botón, solo nos interesan las celdas
    // Usamos target pues currentTarget siempre es el que se suscribe
    // al evento (en este caso el main)
    if (evt.target.classList.contains("celda")) {
        const celda = evt.target;
        if (celda.textContent == "") {
            celda.textContent = turno;
            comprobarVictoria();
            if (turno == "X") {
                turno = "O";
            } else {
                turno = "X";
            }
            //turno = turno == "X"? "O" : "X";
            document.getElementById("juegan").textContent = turno;
        } else {
            sonidoError.play();
        }
    }
}

function eliminarAnimacion(evt) {
    evt.target.classList.remove("animacionPunto");
}

// Para saber a quien le toca jugar
let turno = "X";
let puntosX = 0;
let puntosY = 0;
const sonidoError = new Audio("sonidos/error.mp3");
const sonidoVictoria = new Audio("sonidos/victoria.mp3");

document.getElementById("reiniciar")
    .addEventListener("click", reiniciar);

/* Una animación solo se vuelve a ejecutar si eliminamos la clase y
luego la volvemos a añadir. En este caso usamos el evento animationend 
que se produce cuando termina la animación */
document.getElementById("puntosX").addEventListener("animationend", eliminarAnimacion);
document.getElementById("puntosY").addEventListener("animationend", eliminarAnimacion);

document.querySelector("main")
    .addEventListener("click", jugar);

// Usamos una función anónima. 
document.getElementById("cerrar")
    .addEventListener("click", function () {
        document.getElementById("victoria").style.display = "none";
    });

/* Como en HTML hemos cargado el script con defer, el HTML ya está cargado.
Es lo que se llama el DOM (Document Object Model) con lo que podemos
acceder a las etiquetas, ids, ... sin problemas.
De no usar defer debemos suscribirnos al evento DOMContentLoaded:
document.addEventListener("DOMContentLoaded", nombreFuncion);
*/
// Generamos un número aleatorio entre 1 y 2 para elegir el turno inicial
const valor = Math.floor(Math.random() * 2 + 1);
if (valor == 1) {
    turno = "X";
} else {
    turno = "O";
}
//turno = Math.floor(Math.random() * 2 + 1) == 1 ? "X" : "O";
document.getElementById("juegan").textContent = turno;