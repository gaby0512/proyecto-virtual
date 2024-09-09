function calcular() {
  
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let operacion = document.getElementById("operacion").value;
    
    let resultado;   // Variable para almacenar el resultado de la operación

    switch(operacion) {
        case "+":
            // Si el operador es "+", realiza la suma de los dos números
            resultado = num1 + num2;
            break;

        case "-":
            // Si el operador es "-", realiza la resta de los dos números
            resultado = num1 - num2;
            break;

        case "*":
            // Si el operador es "*", realiza la multiplicación de los dos números
            resultado = num1 * num2;
            break;

        case "/":
            // Si el operador es "/", realiza la división de los dos números
            // Primero verifica si el divisor (num2) no es cero para evitar la división por cero
            if (num2 !== 0) { 
                resultado = num1 / num2;
            } else {
                // Si el divisor es cero, establece el resultado a un mensaje de error
                resultado = "No se puede dividir por cero";
            }
            break;

        default:
            resultado = "Operación no válida"; 
            
    }


    document.getElementById("resultado").innerText = "Resultado: " + resultado;
}
