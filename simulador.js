//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
    // Leer ingresos y egresos como números decimales
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    // Llamar a la función calcularDisponible
    let disponible = calcularDisponible(ingresos, egresos);

    // Mostrar resultado en pantalla
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidad.toFixed(2);
}

// Evento del botón
document.getElementById("btnCalcularCredito").onclick = calcular;