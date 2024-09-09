var time = new Date(); // Tiempo actual
var deltaTime = 0; // Diferencia de tiempo entre frames

// Inicializa el juego cuando la página esté lista
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(Init, 1); // Llama a Init después de 1 ms
} else {
    document.addEventListener("DOMContentLoaded", Init); // Llama a Init cuando el DOM esté listo
}

function Init() {
    time = new Date(); // Resetea el tiempo
    Start(); // Configura el juego
    Loop(); // Inicia el bucle del juego
}

function Loop() {
    deltaTime = (new Date() - time) / 1000; // Calcula el tiempo desde el último frame
    time = new Date(); // Actualiza el tiempo
    Update(); // Actualiza el estado del juego
    requestAnimationFrame(Loop); // Continúa el bucle
}

// Variables del juego
var sueloY = 22; // Posición Y del suelo
var velY = 0; // Velocidad vertical
var impulso = 900; // Fuerza de salto
var gravedad = 2500; // Gravedad

var dinoPosX = 42; // Posición X del dinosaurio
var dinoPosY = sueloY; // Posición Y del dinosaurio

var sueloX = 0; // Posición X del suelo
var velEscenario = 1280 / 3; // Velocidad del suelo
var gameVel = 1; // Velocidad del juego
var score = 0; // Puntuación

var parado = false; // Estado del juego
var saltando = false; // Estado de salto

// Temporizadores y posiciones de obstáculos
var tiempoHastaObstaculo = 2; 
var tiempoObstaculoMin = 0.7;
var tiempoObstaculoMax = 1.8;
var obstaculoPosY = 16;
var obstaculos = []; // Lista de obstáculos

// Temporizadores y posiciones de nubes
var tiempoHastaNube = 0.5; 
var tiempoNubeMin = 0.7;
var tiempoNubeMax = 2.7;
var maxNubeY = 270; 
var minNubeY = 100; 
var nubes = []; // Lista de nubes
var velNube = 0.5; // Velocidad de nubes

// Referencias a elementos del DOM
var contenedor;
var dino;
var textoScore;
var suelo;
var gameOver;

function Start() {
    // Obtiene referencias a los elementos del juego
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    textoScore = document.querySelector(".score");
    dino = document.querySelector(".dino");
    document.addEventListener("keydown", HandleKeyDown); // Escucha teclas
}

function Update() {
    if (parado) return; // Si el juego está parado, no actualiza

    MoverDinosaurio(); // Mueve el dinosaurio
    MoverSuelo(); // Mueve el suelo
    DecidirCrearObstaculos(); // Decide si crear obstáculos
    DecidirCrearNubes(); // Decide si crear nubes
    MoverObstaculos(); // Mueve los obstáculos
    MoverNubes(); // Mueve las nubes
    DetectarColision(); // Verifica colisiones

    velY -= gravedad * deltaTime; // Aplica gravedad
}

function HandleKeyDown(ev) {
    if (ev.keyCode == 32) { // Si se presiona espacio
        Saltar(); // Llama a la función de salto
    }
}

function Saltar() {
    if (dinoPosY === sueloY) { // Solo salta si está en el suelo
        saltando = true;
        velY = impulso; // Aplica impulso
        dino.classList.remove("dino-corriendo"); // Cambia clase
    }
}

function MoverDinosaurio() {
    dinoPosY += velY * deltaTime; // Actualiza la posición
    if (dinoPosY < sueloY) {
        TocarSuelo(); // Verifica si toca el suelo
    }
    dino.style.bottom = dinoPosY + "px"; // Aplica estilo
}

function TocarSuelo() {
    dinoPosY = sueloY; // Resetea posición Y
    velY = 0; // Resetea velocidad
    if (saltando) {
        dino.classList.add("dino-corriendo"); // Cambia a corriendo
    }
    saltando = false; // Finaliza salto
}

function MoverSuelo() {
    sueloX += CalcularDesplazamiento(); // Mueve el suelo
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px"; // Aplica posición
}

function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel; // Calcula desplazamiento
}

function Estrellarse() {
    dino.classList.remove("dino-corriendo"); // Cambia a estrellado
    dino.classList.add("dino-estrellado");
    parado = true; // Detiene el juego
}

function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime; // Reduce el tiempo
    if (tiempoHastaObstaculo <= 0) {
        CrearObstaculo(); // Crea un nuevo obstáculo
    }
}

function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime; // Reduce el tiempo
    if (tiempoHastaNube <= 0) {
        CrearNube(); // Crea una nueva nube
    }
}

function CrearObstaculo() {
    var obstaculo = document.createElement("div"); // Crea un obstáculo
    contenedor.appendChild(obstaculo); // Añade al contenedor
    obstaculo.classList.add("cactus"); // Añade clase
    if (Math.random() > 0.5) obstaculo.classList.add("cactus2"); // Alterna tipo
    obstaculo.posX = contenedor.clientWidth; // Posición inicial
    obstaculo.style.left = contenedor.clientWidth + "px"; // Estilo

    obstaculos.push(obstaculo); // Agrega a la lista
    // Resetea el temporizador
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
}

function CrearNube() {
    var nube = document.createElement("div"); // Crea una nube
    contenedor.appendChild(nube); // Añade al contenedor
    nube.classList.add("nube"); // Añade clase
    nube.posX = contenedor.clientWidth; // Posición inicial
    nube.style.left = contenedor.clientWidth + "px"; // Estilo
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY - minNubeY) + "px"; // Altura aleatoria

    nubes.push(nube); // Agrega a la lista
    // Resetea el temporizador
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin) / gameVel;
}

function MoverObstaculos() {
    for (var i = obstaculos.length - 1; i >= 0; i--) {
        if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]); // Elimina obstáculo
            obstaculos.splice(i, 1); // Elimina de la lista
            GanarPuntos(); // Aumenta la puntuación
        } else {
            obstaculos[i].posX -= CalcularDesplazamiento(); // Mueve el obstáculo
            obstaculos[i].style.left = obstaculos[i].posX + "px"; // Aplica estilo
        }
    }
}

function MoverNubes() {
    for (var i = nubes.length - 1; i >= 0; i--) {
        if (nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]); // Elimina nube
            nubes.splice(i, 1); // Elimina de la lista
        } else {
            nubes[i].posX -= CalcularDesplazamiento() * velNube; // Mueve la nube
            nubes[i].style.left = nubes[i].posX + "px"; // Aplica estilo
        }
    }
}

function GanarPuntos() {
    score++; // Aumenta puntuación
    textoScore.innerText = score; // Actualiza en pantalla
    // Aumenta la velocidad del juego en ciertos puntos
    if (score == 5) {
        gameVel = 1.5;
        contenedor.classList.add("mediodia"); // Cambia estilo
    } else if (score == 10) {
        gameVel = 2;
        contenedor.classList.add("tarde"); // Cambia estilo
    } else if (score == 15) {
        gameVel = 2.5;
        contenedor.classList.add("noche"); // Cambia estilo
    }
}

function DetectarColision() {
    for (var i = 0; i < obstaculos.length; i++) {
        if (obstaculos[i].posX < dinoPosX + dino.clientWidth && // Verifica colisión
            obstaculos[i].posX + obstaculos[i].clientWidth > dinoPosX &&
            dinoPosY < obstaculos[i].posY + obstaculos[i].clientHeight) {
            Estrellarse(); // Llama a colisión
        }
    }
}