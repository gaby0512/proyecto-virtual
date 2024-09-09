var contador = 1; // Variable para llevar el conteo de las imágenes 
var temporizador; // Variable para almacenar el identificador del temporizador

function iniciar(){
    
    temporizador = setInterval(rotarImagenes, 3000);// Configura el temporizador cada 3 segundos
    temporizador = setInterval(parar, 0); // Configura el temporizador para ejecutar la función parar

function rotarImagenes(){// Función para rotar las imágenes
    // Si el contador llega a 10 se reinicia a 0
    if (contador >= 10) {
        contador = 0;
    }
    var img = document.getElementById('imgSlide');
    
   
    img.src = './images/img' + ++contador + '.jpg'; // Actualiza la fuente de la imagen para mostrar la siguiente imagen en la secuencia
}
}