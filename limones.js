var canvas = document.getElementById("areaJuego");
var ctx    = canvas.getContext("2d");

var JUGADOR_ANCHO = 60;
var JUGADOR_ALTO  = 25;
 
var LIMON_ANCHO = 22;
var LIMON_ALTO  = 22;

var SUELO_Y = 390;

var jugadorX = 0;
var jugadorY = 0;
 
var limonX = 0;
var limonY = 0;
 
var puntaje = 0;
var vidas   = 3;

var velocidadCaida = 200;
var intervalo = null;

function obtenerAleatorio(maximo) {
    return Math.floor(Math.random() * maximo);
}
 
function actualizarPuntaje() {
    document.getElementById("puntos").textContent = puntaje;
}
 
function actualizarVidas() {
    document.getElementById("vidas").textContent = vidas;
}
 
function mostrarMensaje(texto) {
    document.getElementById("mensaje").textContent = texto;
}

function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}
 
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
 
function graficarSuelo() {
    graficarRectangulo(0, SUELO_Y, canvas.width, 10, "#1565c0");
}
 
function graficarJugador() {
    graficarRectangulo(jugadorX, jugadorY, JUGADOR_ANCHO, JUGADOR_ALTO, "#ffeb3b");
}
 
function graficarLimon() {
    graficarRectangulo(limonX, limonY, LIMON_ANCHO, LIMON_ALTO, "#4caf50");
}
 
function redibujarTodo() {
    limpiarCanvas();
    graficarSuelo();
    graficarJugador();
    graficarLimon();
}

function detectarAtrapado() {
 
    var tocaEnX = (jugadorX < limonX + LIMON_ANCHO) && (jugadorX + JUGADOR_ANCHO > limonX);
    var tocaEnY = (jugadorY < limonY + LIMON_ALTO)  && (jugadorY + JUGADOR_ALTO  > limonY);
 
    if (tocaEnX && tocaEnY) {
        puntaje = puntaje + 1;
        actualizarPuntaje();
        if (puntaje == 3) {
            velocidadCaida = 150;
            clearInterval(intervalo);
            intervalo = setInterval(bajarLimon, velocidadCaida);
        }
 
        if (puntaje == 6) {
            velocidadCaida = 100;
 
            clearInterval(intervalo);
            intervalo = setInterval(bajarLimon, velocidadCaida);
        }
        if (puntaje == 10) {
            clearInterval(intervalo);
            mostrarMensaje("Tienes los limones! Ahora te falta sal y tequila");
            alert("GANASTE!");
            return;
        }
        limonX = obtenerAleatorio(canvas.width - LIMON_ANCHO);
        limonY = 0;
    }
}

function detectarPiso() {
 
    if (limonY + LIMON_ALTO >= SUELO_Y) {

        vidas = vidas - 1;
        actualizarVidas();
        if (vidas == 0) {
            clearInterval(intervalo);
            mostrarMensaje("PERDISTE Se te cayeron todos los limones.");
            alert("GAME OVER!");
            return;
        }
        limonX = obtenerAleatorio(canvas.width - LIMON_ANCHO);
        limonY = 0;
    }
}

function bajarLimon() {
    limonY = limonY + 10;
    detectarAtrapado();
    detectarPiso();
    redibujarTodo();
}

function moverIzquierda() {
    jugadorX = jugadorX - 20;
    if (jugadorX < 0) {
        jugadorX = 0;
    }
 
    redibujarTodo();
}
 
function moverDerecha() {
    jugadorX = jugadorX + 20;
    if (jugadorX + JUGADOR_ANCHO > canvas.width) {
        jugadorX = canvas.width - JUGADOR_ANCHO;
    }
 
    redibujarTodo();
}

function iniciar() {
    jugadorX = (canvas.width  / 2) - (JUGADOR_ANCHO / 2);
    jugadorY = SUELO_Y - JUGADOR_ALTO - 2;
    limonX = obtenerAleatorio(canvas.width - LIMON_ANCHO);
    limonY = 0;
    redibujarTodo();
    intervalo = setInterval(bajarLimon, velocidadCaida);
}

function reiniciar() {
    clearInterval(intervalo);
    puntaje        = 0;
    vidas          = 3;
    velocidadCaida = 200;
    actualizarPuntaje();
    actualizarVidas();
    mostrarMensaje("");
    iniciar();
}