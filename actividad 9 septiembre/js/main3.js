let numeroSecreto = Math.floor(Math.random() * 100) + 1; // Genera un número secreto aleatorio entre 1 y 100
let intentos = 0; // Inicializa el contador de intentos

function adivinar() {// Función que se llama cuando el usuario hace un intento de adivinar el número secreto

    let intento = document.getElementById("numero").value;

    intentos++; // Incrementa el contador de intentos
    
    // Compara el valor ingresado con el número secreto
    if (intento == numeroSecreto) { // Incrementa el contador de intentos
       
        document.getElementById("resultado").innerText = "¡Correcto! Adivinaste en " + intentos + " intentos."; // Si el intento es correcto, muestra un mensaje indicando que el usuario adivinó correctamente
    } else if (intento < numeroSecreto) {
       
        document.getElementById("resultado").innerText = "El número es mayor. Inténtalo de nuevo."; // Si el intento es menor que el número secreto, muestra un mensaje indicando que el número es mayor
    } else {
       
        document.getElementById("resultado").innerText = "El número es menor. Inténtalo de nuevo."; // Si el intento es mayor que el número secreto, muestra un mensaje indicando que el número es menor
    }
}
